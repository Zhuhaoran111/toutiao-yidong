<template>
  <div class="update-name">
    <!-- 1.导航栏 -->
    <!-- 子组价不能关闭父组件中的弹层 -->
    <van-nav-bar
      left-text="取消"
      title="设置昵称"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />

    <!-- 2.输入框 -->
    <div class="field-wrap">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="13"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user";
export default {
  name: "UpdateName",
  data() {
    return {
      localName: this.value,
    };
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: "保存中....",
        forbidClick: true, //禁止背景点击
        duration: 0, //持续展示
      });
      try {
        const localName = this.localName;
        if (!localName.length) {
          this.$toast("昵称不能为空");
          return;
        }
        const { data } = await updateUserProfile({
          name: localName,
        });

        //更新视图
        this.$emit("input", localName);
        //关闭弹出层
        this.$emit("close");
        //提示成功
        this.$toast.success("更新成功");
      } catch (err) {
        this.$toast.fail("更新失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.field-wrap {
  padding: 20px;
}
</style>
