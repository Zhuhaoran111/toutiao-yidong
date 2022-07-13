<template>
  <div class="user-profile">
    <!-- 1.导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input type="file" hidden ref="file" @change="onFileChange" />

    <!-- 2.个人信息 is-link 是箭头-->
    <van-cell title="头像" is-link center @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isUpdateNameShow = true"
    />
    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
      @click="isUpdateGenderShow = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isUpdateBirthdayShow = true"
    />

    <!-- 3. 编辑昵称 弹出层-->
    <van-popup
      v-model="isUpdateNameShow"
      style="height: 100%"
      position="bottom"
    >
      <!-- 这里是加载修改昵称的组件 -->
      <!-- 子组件通知父组件，然后父组件关闭弹层 -->
      <!--  v-if="isUpdateNameShow"这里重新渲染，会当取消弹窗时会清除组件 -->
      <UpdateName
        v-if="isUpdateNameShow"
        v-model="user.name"
        @close="isUpdateNameShow = false"
      />
    </van-popup>

    <!-- 4.编辑性别 弹出层 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <!-- 这里是加载修改昵称的组件 -->
      <!-- 子组件通知父组件，然后父组件关闭弹层 -->
      <UpdateGender
        v-if="isUpdateGenderShow"
        @close="isUpdateGenderShow = false"
        v-model="user.gender"
      />
    </van-popup>

    <!-- 5.编辑生日弹出层 -->
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <!-- 这里是加载修改昵称的组件 -->
      <!-- 子组件通知父组件，然后父组件关闭弹层 -->
      <UpdateBirthday
        v-if="isUpdateBirthdayShow"
        v-model="user.birthday"
        @close="isUpdateBirthdayShow = false"
      />
    </van-popup>

    <!-- 编辑图像弹出层 -->
    <van-popup
      v-model="isUpdatePhotoShow"
      position="bottom"
      style="height: 100%"
    >
      <!-- 这是图像的组件  $event就是传过来的参数，才模板中是这么写的 -->
      <UpdatePhoto
        v-if="isUpdatePhotoShow"
        :img="img"
        @update-photo="user.photo = $event"
        @close="isUpdatePhotoShow = false"
      />
      <!-- 这里是加载修改昵称的组件 -->
      <!-- 子组件通知父组件，然后父组件关闭弹层 -->
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user";
import UpdateName from "./components/update-name";
import UpdateGender from "./components/update-gender.vue";
import UpdateBirthday from "./components/update-birthday.vue";
import UpdatePhoto from "./components/update-photo.vue";

export default {
  name: "UserProfile",
  data() {
    return {
      user: {}, //个人信息
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null, //预览的图片
    };
  },
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto,
  },
  created() {
    this.loadUserProfile();
  },
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile();
        console.log(data);
        this.user = data.data;
      } catch (err) {
        this.$toast("数据获取失败");
      }
    },

    onFileChange() {
      //获取文件对象
      const file = this.$refs.file.files[0]; //拿到input元素的DOM
      //基于文章对象获取blob数据
      const data = window.URL.createObjectURL(file);
      console.log(data);
      this.img = data;
      //展示预览图片弹出层
      this.isUpdatePhotoShow = true;

      //file-input  如果选择了同一个文件不会触发 change事件
      //解决办法就是每次使用完毕，把它的value清空
      this.$refs.file.value = "";
    },
  },
};
</script>

<style scoped lang="less">
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
