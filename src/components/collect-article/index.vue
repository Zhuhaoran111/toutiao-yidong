<template>
  <div class="collect-article">
    <van-button
      :icon="value ? 'star' : 'star-o'"
      :class="{
        collected: value,
      }"
      :loading="loading"
      @click="onCollect"
    ></van-button>
  </div>
</template>

<script>
import { addCollect, deleteCollect } from "@/api/article";
export default {
  name: "CollectionArticle",
  data() {
    return {
      loading: false,
    };
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    articleId: {
      type: [String, Object, Number],
      required: true,
    },
  },
  methods: {
    async onCollect() {
      this.loading = true;
      try {
        if (this.value) {
          //已经收藏，这里取消收藏
          await deleteCollect(this.articleId);
        } else {
          //未收藏，然后点击收藏
          await addCollect(this.articleId);
        }
        //更新视图(下面这里有点不好理解，)
        //注意自定义事件修改数据并不是立即的
        this.$emit("input", !this.value);

        this.$toast.success(!this.value ? "收藏成功" : "取消收藏");
      } catch (err) {
        this.$toast("操作失败，请重试");
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped lang="less">
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>
