<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="onPost">发布</van-button>
  </div>
</template>

<script>
import addComment from "@/api/comment";
export default {
  name: "CommentPost",
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onPost() {
      try {
        const { data } = await addComment({
          //target评论文章的id
          target: this.target,
          content: this.message,
          art_id: null,
        });
        console.log(data);
      } catch (err) {
        this.$toast.fail("发布失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
