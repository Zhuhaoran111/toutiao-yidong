<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(text, index) in suggestions"
      :key="index"
      :title="text"
      icon="search"
    >
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from "@/api/search";
export default {
  data() {
    return {
      suggestions: [], //联想建议数据列表
    };
  },
  props: {
    searchText: {
      type: String,
      require: true,
    },
  },

  //监听数据变化
  watch: {
    searchText: {
      //当父组件中传过来的searchText一旦发生改变时，就会调用handler这个函数
      handler(value) {
        this.loadSearchSuggestion(value);
      },
      immediate: true, //会立即监听，而不会等页面出来在监听
    },
  },

  methods: {
    async loadSearchSuggestion(q) {
      try {
        const { data } = await getSearchSuggestion(q);
        console.log(data);
        this.suggestions = data.data.options;
      } catch (err) {
        this.$toast("数据获取失败,请稍后重试");
      }
    },
  },
};
</script>

<style></style>
