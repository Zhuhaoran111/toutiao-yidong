<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <!--头部固定定位，脱离文档流 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <!-- 利用插槽加个叉号的按钮 -->
      <van-button
        class="search-btn"
        type="info"
        size="small"
        slot="title"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>

    <!-- 2.频道列表 -->
    <!--绑定当前激活标签对应的索引值，默认情况下启用第个标签 -->
    <!-- 通过 animated 属性可以开启切换标签内容时的转场动画。 -->
    <!-- 通过 swipeable 属性可以开启滑动切换标签页。 -->
    <van-tabs class="channel-tabs" v-model:active="active" animated swipeable>
      <van-tab
        v-for="(item, index) in channels"
        :key="index"
        :title="item.name"
      >
        <!-- 这里放list列表里面的内容放入组件,并把item这对象传给子组件 -->
        <Article-list :item="item" />
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user";
import ArticleList from "./components/Article-list.vue";
export default {
  name: "Home",
  components: {
    ArticleList,
  },
  data() {
    return {
      active: 0,
      channels: [], //频道列表
    };
  },
  created() {
    this.loadChannels();
    console.log("aaa");
  },
  methods: {
    async loadChannels() {
      try {
        const { data } = await getUserChannels();
        this.channels = data.data.channels;
      } catch (err) {
        this.$toast("获取频道数据失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  //下面的导航栏挡住了，所以这么写
  padding-bottom: 100px;
  ::v-deep .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px;
      height: 6px;
      background-color: #3296fa;
    }
    .placeholder {
      width: 66px;
      height: 82px;
      flex-shrink: 0;
      //1表示参与宽度计算，0表示不参与
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
