<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error="error"
      error-text="加载失败，请点击重试"
      @load="onLoad"
    >
    </van-list>
    <CommentItem v-for="(item, index) in list" :key="index" :comment="item" />
  </div>
</template>

<script>
import { getComments } from "@/api/comment";
import CommentItem from "./comment-item";
export default {
  name: "CommentList",
  components: {
    CommentItem,
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null, //获取下一页数据的标记
      limit: 10, //评论个数
      error: false,
    };
  },

  created() {
    this.onLoad();
  },

  methods: {
    async onLoad() {
      try {
        //1.请求获取数据
        const { data } = await getComments({
          type: "a", //评论的类型有a和c,a是评论，c是评论的回复
          source: this.source, //文章的id或评论的id
          offset: this.offset, //页码
          limit: this.limit,
        });
        console.log(data);
        //2.将数据添加到列表中
        const { results } = data.data;
        this.list.push(...results);

        //把文章的评论的总数量传到父组件
        this.$emit("onload-success", data.data);
        //3.将loading设置为false
        this.loading = false;
        //4.判断是否还有参数
        if (results.length) {
          //    有就获取下一页数据页码
          this.offset = data.data.last_id;
        }
        //    没有将finished设置为true
        this.finished = true;
      } catch (err) {
        this.error = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style></style>
