<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    size="small"
    :loading="loading"
    @click="onFollow"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="loading"
    @click="onFollow"
    >关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from "@/api/user";
export default {
  name: "FollowUser",
  data() {
    return {
      loading: false,
    };
  },
  /* 这里的名字不能随便起，在传输的哪一方
  两种情况，
  1.和传的一方名字一样
  2.注意只要在传值的地方用-链接的字段例如:user-id  这里接收必须用驼峰命名法 userId
   */
  props: {
    isFollowed: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  methods: {
    async onFollow() {
      this.loading = true; //展示关注按钮的loading状态
      try {
        if (this.isFollowed) {
          //已关注，这里取消关注
          const { data } = await deleteFollow(this.userId);
          // this.article.is_followed = false;
        } else {
          //未关注，这里点击关注
          const { data } = await addFollow(this.userId);
          // this.article.is_followed = true;
        }
        //下面简写更新视图状态
        this.$emit("update-is_followed", !this.isFollowed);
      } catch (err) {
        let message = "操作失败，请重试";
        if (err.response && err.response.status === 400) {
          message = "你不能关注你自己";
        }
        this.$toast = message;
      }
      this.loading = false; //无论成功还是失败都会关闭loading
    },
  },
};
</script>

<style></style>
