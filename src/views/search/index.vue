<template>
  <!-- 搜索栏 -->
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
      <!-- focus获取焦点时触发，就触发联想记忆，就是把isResultShow=false即可 -->
      <!--   @cancel="onCancel" 点击取消触发的函数
             @search="onSearch" 触发搜索或者回车触发事件，还可以把值传到函数中
       -->
    </form>
    <!-- 搜索结果：回车，搜索时就会触发这行 -->
    <SearchResults v-if="isResultShow" />
    <!-- 联想记忆 当文本框中有数据时，就会执这行 -->
    <SearchSuggestion v-else-if="searchText" :searchText="searchText" />

    <!-- 搜索历史记录，没有数据时就会执行这行 -->
    <SearchHistory v-else="" />
  </div>
</template>

<script>
import SearchHistory from "./components/search-history.vue";
import SearchSuggestion from "./components/search-suggestion.vue";
import SearchResults from "./components/search-results.vue";

export default {
  data() {
    return {
      searchText: "",
      isResultShow: false, //控制结果的展示
    };
  },
  components: {
    SearchHistory,
    SearchResults,
    SearchSuggestion,
  },
  methods: {
    onSearch(val) {
      //当点击搜索时触发搜索结果那行
      this.isResultShow = true;
    },
    onCancel() {
      this.$router.back();
      /* 从哪里来回哪里去 */
    },
  },
};
</script>

<style scoped lang="less">
.van-search__action {
  color: #fff;
}
</style>
