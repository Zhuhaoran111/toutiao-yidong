<template>
  <div class="update-gender">
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      :default-index="value"
      @change="onPickerChange"
    />
    <!-- :default-index="2" 这是初始项的索引-->
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user";
export default {
  name: "UpdateGender",
  data() {
    return {
      columns: ["男", "女"],
      localGender: this.value,
    };
  },
  props: {
    value: {
      type: Number,
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
        const localGender = this.localGender;
        const { data } = await updateUserProfile({
          gender: localGender,
        });

        //更新视图
        this.$emit("input", localGender);
        //关闭弹出层
        this.$emit("close");
        //提示成功
        this.$toast.success("更新成功");
      } catch (err) {
        this.$toast.fail("更新失败");
      }
    },
    onPickerChange(picker, value, index) {
      this.localGender = index;
    },
  },
};
</script>

<style></style>
