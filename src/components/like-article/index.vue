<template>
  <div class="like-article">
    <!--value是1表示点赞，其它表示不点赞 -->
    <van-button
      :icon="value === 1 ? 'good-job' : 'good-job-o'"
      :class="{
        liked: value === 1,
      }"
      :loading="loading"
      @click="onLike"
    ></van-button>
  </div>
</template>

<script>
import { addLike, deleteLike } from "@/api/article";
export default {
  name: "LikeArticle",

  data() {
    return {
      loading: false,
    };
  },
  props: {
    value: {
      type: Number,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  methods: {
    async onLike() {
      this.loading = true;
      try {
        let status = -1;
        if (this.value === 1) {
          //已点赞，这里取消点赞
          await deleteLike(this.articleId);
        } else {
          //没有点赞，这里点击点赞
          await addLike(this.articleId);
          status = 1;
        }
        this.$emit("input", status);
        this.$toast.success(status === 1 ? "点赞成功" : "取消点赞");
      } catch (err) {
        this.$toast.fail("操作失败，请重试");
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped lang="less">
.liked {
  .van-icon {
    color: #e5645f;
  }
}
</style>
