<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <!-- 利用插槽加个叉号的按钮 -->
      <van-icon slot="left" name="cross" @click="$router.back()"></van-icon>
    </van-nav-bar>

    <!-- 登录表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>

      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <!--   发送验证码 time就是倒计时时间 ss秒的格式  s是字符s-->
          <!-- finish事件表示倒计时结束 -->
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 10"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <!--  native-type="button"这样不会触发表单提交 -->
          <van-button
            v-else
            class="send-sms-btn"
            native-type="button"
            round
            size="small"
            type="default"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
// import request from "../../untils/request";

//下面是引入封装好的axios
import { login, sendSms } from "@/api/user";

export default {
  name: "index",
  data() {
    return {
      user: {
        mobile: "",
        code: "",
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /1[3|5|7|8]\d{9}/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "密码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
      isCountDownShow: false, //是否展示倒计时
    };
  },
  methods: {
    async onSubmit() {
      // 1.获取表单数据
      const user = this.user;

      // 2.表单验证,在组件中必须用this.$toast来调用toast组件
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true, //禁用背景点击
        duration: 0, //持续时间，默认是2000，如果为0则持续展示
      });
      //3.提交表单请求登陆
      try {
        const res = await login(this.user);
        // 登录成功调用vuex里面的方法,并把token值传过去
        this.$store.commit("setUser", res.data.data);

        this.$toast.success("登录成功"); // 新的toast会覆盖之前的toast
        //登录成功跳转回原来的页面
        //back方式不严谨
        this.$router.back();
        console.log(res);
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail("手机号或验证码错误");
        } else {
          this.$toast.fail("登录失败，请稍后重试");
        }
      }
    },
    async onSendSms() {
      //1.校验手机号,validate不加参数默认验证整个表单
      try {
        await this.$refs.loginForm.validate("mobile");
        console.log("验证通过");
      } catch (err) {
        return console.log("验证失败", err);
        /* 这里的return表示失败是，外面的代码就不执行了，成功了，外面的代码依然执行 */
      }
      //2.验证通过，显示倒计时(上面默认是false)
      this.isCountDownShow = true;

      //3.请求发送验证码
      try {
        const res = await sendSms(this.user.mobile);
        console.log("发送成功", res);
      } catch (err) {
        console.log("发送失败", err);
        if (err.response.status === 429) {
          this.$toast("发送太频繁，请稍后重试");
        } else {
          this.$toast("发送失败，请稍后重试");
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    background-color: #ededed;
    width: 156px;
    height: 46px;
    line-height: 46px;
    font-size: 16px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
