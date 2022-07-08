<template>
  <!-- 搜索栏 -->
  <div class="search-container">
    <form class="search-from" action="/">
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
             注意这里的  @search="onSearch"是回车时或者点击搜索时跳转到搜索结果的页面
             和下面点击每个联想记忆是不同的
       -->
    </form>
    <!-- 搜索结果：回车，搜索时就会触发这行   ,把:search-text="searchText"是搜索的值传给搜索结果子组件-->
    <SearchResults v-if="isResultShow" :search-text="searchText" />
    <!-- 联想记忆 当文本框中有数据时，就会执这行 -->
    <!--
        @click="$emit('search', text)"     这是子组件写法
        @search="onsearch" 父组件进行接收并触发
         就是点击下面联想记忆内容进行触发onSearch搜索结果函数
      -->
    <SearchSuggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    />

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
      /* 这里的val接收的是点击联想记忆的文本，并把文本框进行渲染你点击的两项记忆的内容 */
      this.searchText = val;
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
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
}

.search-from {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
</style>
