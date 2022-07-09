<!-- 根据文章列表接收参数 -->
<template>
  <!-- 第一种方式通过es6进行传参 :to="`/article/${article.art_id}`" 路由并携带动态参数
       第二种方式通过路由传参的形式 params(动态路由参数)
       :to{
        name:'srticle'
        params:{
          articleId:article.art_id
        }
       } 
  -->
  <van-cell class="article-item" :to="`/article/${article.art_id}`">
    <div slot="title" class="title van-multi-ellipsis--l2">
      {{ article.title }}
    </div>
    <div slot="label">
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <!-- 下面的三张图片进行遍历 -->
        <div class="cover-item" v-for="(img, index) in article.cover.images">
          <van-image
            class="cover-item-img"
            width="100"
            heihgt="100"
            :src="img"
            fit="cover"
          />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <!-- 下面是存放图片的如果是一张图片就放在div后面 -->
    <!--  fit="cover"短边显示出来 -->
    <van-image
      v-if="article.cover.type === 1"
      slot="default"
      class="right-cover"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  //这里从article-list接收过来，并在这个组件进行列表的渲染
  props: {
    article: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset; //去除默认样式
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      /* 不包括最后一个元素设置样式 */
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
