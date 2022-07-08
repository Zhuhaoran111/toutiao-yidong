<template>
  <div class="search-suggestion">
    <!--   @click="$emit('search', text)"
    这计划是绑定一个子组件绑定一个自定义事件(并把你自己搜索的内容赋值过去，然后父组件进行触发并接收)，
    -->
    <van-cell
      v-for="(text, index) in suggestions"
      :key="index"
      icon="search"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>

    <!-- 使用v-html指令可以绑定带有html标签的字符串 -->
  </div>
</template>

<script>
import { getSearchSuggestion } from "@/api/search";

//按需加载有好处，只会把使用到的成员打包的结果中
import { debounce } from "loadsh";
export default {
  data() {
    return {
      suggestions: [], //联想建议数据列表
      htmlStr: 'Hello <span style="color:red">World</span>',
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
      // handler(value) {
      //   this.loadSearchSuggestion(value);
      // },

      //debounce 参数1：一个函数
      //         参数2：延迟时间，单位是毫秒
      //返回值:防抖之后的函数
      handler: debounce(function (value) {
        this.loadSearchSuggestion(value);
      }, 1000),
      //这个在一秒之内输入，不会触发，等1s后会触发
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

    //高亮函数
    highlight(text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`;
      //正则表达式  中间的内容都会当做匹配字符串来使用，而不是数据变量
      //如果需要根据数据变量动态的创建正则表达式，则手动的new RegExp
      //RegExp正则表达式构造函数
      //参数1：匹配模式字符串，它会根据字符串创建正则对象，就是不需要人工去创建
      //参数2：匹配模式，写到字符串中
      const reg = new RegExp(this.searchText, "gi");
      return text.replace(reg, highlightStr);
    },
  },
};
</script>

<style scoped lang="less">
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>
