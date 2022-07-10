<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 1.加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>

      <!-- 2.加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 3文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <!-- 这里是给子组件绑定样式和传值 -->
          <!--模板中$event就是事件参数，$event就是事件参数，就是传过来的参数 -->
          <!-- 当我们传递给子组件的数据既要使用还要修改
             传递：props
             修改：自定义事件
             简写形式在组件上使用v-model
             v-model="article.is_followed"
             value="article.is_followed"
             @input="article.is_followed = $event"
             如果需要修改v-model的规则名称，可以通过子组件的model属性来配置修改
          -->
          <FollowUser
            class="follow-btn"
            :is-followed="article.is_followed"
            :user-id="article.aut_id"
            @update-is_followed="article.is_followed = $event"
          />
          <!-- .is_followed 为true就是关注，为false就是不关注-->
          <!-- <van-button
            v-if="article.is_followed"
            class="follow-btn"
            round
            size="small"
            :loading="followLoading"
            @click="onFollow"
            >已关注</van-button
          >
          <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading="followLoading"
            @click="onFollow"
            >关注</van-button
          > -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容  v-html可把标签内容提出出来-->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 底部区域 ,前面文章渲染完毕，在执行这个评论区-->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small"
            >写评论</van-button
          >
          <van-icon class="comment-icon" name="comment-o" info="123"></van-icon>
          <!-- 下面是引用评论组件 -->
          <CollectArticle
            :article-id="article.art_id"
            class="btn-item"
            v-model="article.is_collected"
          />

          <!-- 下面是引用点赞组件 -->
          <LikeArticle
            class="btn-item"
            v-model="article.attitude"
            :article-id="article.art_id"
          />

          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>

      <!-- 3.加载失败：404 -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>

      <!--4.加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button @click="loadArticle" class="retry-btn">点击重试</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleById } from "@/api/article";
import { ImagePreview } from "vant";
import { addFollow, deleteFollow } from "@/api/user";
import FollowUser from "@/components/follow-user";
import CollectArticle from "@/components/collect-article";
import LikeArticle from "@/components/like-article";
export default {
  name: "ArticleIndex",
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      article: {}, //文章详情
      loading: true, //加载中的文章状态
      errStatus: 0, //失败的状态码
      followLoading: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticle();
  },
  mounted() {},
  methods: {
    async loadArticle() {
      //展示loading加载中
      this.loading = true;
      try {
        const { data } = await getArticleById(this.articleId);
        //数据驱动视图不是立即的，因为上面是if条件渲染的
        this.article = data.data;

        //初始化点击图片预览
        setTimeout(() => {
          this.previewImage();
        }, 0);
      } catch (err) {
        // this.loading = false;
        if (err.response && err.response.status === 404) {
          this.errStatus = 404;
        }

        console.log("获取数据失败", err);
      }
      //无论成功还是失败都会关闭loading
      this.loading = false;
    },

    previewImage() {
      //得到所有的img节点
      const articleContent = this.$refs["article-content"];
      const imgs = articleContent.querySelectorAll("img");
      const images = [];
      //forEach遍历
      imgs.forEach((img, index) => {
        images.push(img.src);
        img.onclick = () => {
          ImagePreview({
            images,
            //这是预览图片的起始位置从0开始，会使第一张
            startPosition: index,
          });
        };
      });
    },

    async onFollow() {
      this.followLoading = true; //展示关注按钮的loading状态
      try {
        if (this.article.is_followed) {
          //已关注，这里取消关注
          const { data } = await deleteFollow(this.article.aut_id);
          // this.article.is_followed = false;
        } else {
          //未关注，这里点击关注
          const { data } = await addFollow(this.article.aut_id);
          // this.article.is_followed = true;
        }
        //下面简写
        this.article.is_followed = !this.article.is_followed;
      } catch (err) {
        let message = "操作失败，请重试";
        if (err.response && err.response.status === 400) {
          message = "你不能关注你自己";
        }
        this.$toast = message;
      }
      this.followLoading = false; //无论成功还是失败都会关闭loading
    },
  },
};
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    /deep/ .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
