<template>
  <div class="search-results">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，请点击重试"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from "@/api/search";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10,
      error: false,
    };
  },
  //接收父组件的内容
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  methods: {
    async onLoad() {
      try {
        //1.请求获取数据
        const { data } = await getSearchResult({
          page: this.page, //页码
          per_page: this.perPage, //每页大小
          q: this.searchText, //查询的关键词
        });
        //2.将数据添加到数据列表中
        const { results } = data.data;
        this.list.push(...results);
        //3.将本次加载中额loading关闭
        this.loading = false;
        //4.判断是否还有数据
        if (results.length) {
          //如果有，则更新下一个数据的页码
          this.page++;
        } else {
          //如果没有，则将加载状态finished设置为结束
          this.finished = true; //不会触发加载更多了
        }
      } catch (err) {
        //展示就加载失败的提示状态
        this.error = true;
        //加载失败了,loading关闭
        this.Loading = false;
        this.$toast("数据请求失败，请稍后重试");
      }
    },
  },
};
</script>

<style></style>
