<template>
  <div class="my-container">
    <!-- 这是登录的时候的页面 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" :src="userInfo.photo" round fit="cover" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>

    <!-- 这是未登录的时候的页面 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <!-- 导航 -->
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item" icon="photo-o" text="文字">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <!-- 这里的span必须要加slot，要不然被当做默认插槽，覆盖具名插槽 -->
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item" icon="photo-o" text="文字">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小智同学" is-link />
    <van-cell
      @click="onLogout"
      v-if="user"
      clickable
      class="logout-cell"
      title="退出登录"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserinfo } from "@/api/user";

export default {
  data() {
    return {
      userInfo: {}, //用户信息
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    //如果用户登陆则请求加载数据
    if (this.user) {
      this.loadUserinfo();
      console.log("3333333333333333");
    }
  },

  methods: {
    onLogout() {
      //是否确认退出
      //在组件中需要使用this.$dialog来调用弹窗组件
      this.$dialog
        .confirm({
          title: "确认退出吗",
        })
        .then(() => {
          //确认退出，清除登陆状态,commit是提交mutations
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          console.log("取消执行这里");
        });
    },
    async loadUserinfo() {
      try {
        const { data } = await getUserinfo();
        this.userInfo = data.data;
      } catch (err) {
        this.$toast("获取数据失败,请稍后重试");
      }
    },
  },
};
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 360px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      span {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      height: 231px;

      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 4px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 141px;
      .toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      .text {
        font-size: 28px;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>
