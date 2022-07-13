<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />

    <!-- 标签导航栏  route开启路由模式-->
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item to="/home">
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="toutiao toutiao-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <span v-if="user" class="text">我的</span>
        <span v-else class="text">未登录</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    .toutiao {
      font-size: 40px;
    }
    .text {
      font-size: 20px;
    }
  }
}
</style>
