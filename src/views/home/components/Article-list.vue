<template>
  <div class="article-list">
    <!-- 用下拉刷新包裹文章列表 -->
    <van-pull-refresh
      v-model="isreFreshLoading"
      @refresh="onRefresh"
      :success-duration="1500"
      :success-text="refreshSuccessText"
    >
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        @load="onLoad"
      >
        <!-- 这里把article这个对象传给 article-item这个组件-->
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import ArticleItem from "@/components/article-item";
export default {
  name: "Articlelist",
  data() {
    return {
      list: [], //存储列表数据的数组
      loading: false, //控制加加载中loading的状态
      finished: false, //控制数据结束
      timestamp: null, //请求获取下一页数据的时间戳
      error: false, //列表失败的控制状态
      isreFreshLoading: false, //控制下拉刷新的loading状态
      refreshSuccessText: "刷新成功", //下拉刷新成功提示文本
    };
  },
  components: {
    ArticleItem,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  methods: {
    async onLoad() {
      //1.请求获取数据
      try {
        const { data } = await getArticles({
          channel_id: this.item.id, //频道id
          timestamp: this.timestamp || Date.now(), //简单理解就是请求数据的页码，
          with_top: 1, //是否包含指定文章
        });
        const { results } = data.data;
        //2.每次滚动加载追加内容...results展开运算符，类似就是results[0]就是每一项数据，而不是数组
        //把数组元素一个一个拿出来
        this.list.push(...results);

        //3.本次数据加载结束之后把加载状态设置为结束
        this.loading = false;

        // 4.判断数据时候全部加载完成
        if (results.length) {
          //更新获取下一页数据的时间戳???????
          this.timestamp = data.data.pre_timestamp;
        } else {
          //没有数据，将finished设置为true
          this.finished = true;
        }
      } catch (err) {
        //请求失败了，loading也需要关闭
        this.error = true;
        this.loading = false;
      }
    },
    //当下拉刷新会触发该函数
    async onRefresh() {
      try {
        //1.请求获取数据
        const { data } = await getArticles({
          channel_id: this.item.id, //频道id
          timestamp: Date.now(), //下拉刷新。每次请求获取数据，所以传递的是当前最新的时间
          with_top: 1,
        });

        //2.将数据追加到列表的顶部
        const { results } = data.data;
        this.list.unshift(...data.data.results);

        //3.刷新成功后的提示的文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}数据`;
        //4.关闭下拉刷新的loading 状态
        this.isreFreshLoading = false;
      } catch (err) {
        this.refreshSuccessText = "刷新成失败，请重试";
        this.isreFreshLoading = false;
      }
    },
  },
};
</script>

<style coped lang="less">
.article-list {
  /* 这是让每个列表都有自己的滚动容器，不会共享一个滚动容器 */
  /* 记住滚动列表位置，每个列表都是不同的容器 */
  height: 79vh;
  overflow-y: auto;
}
</style>
