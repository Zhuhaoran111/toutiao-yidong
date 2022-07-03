import Vue from 'vue'
import Vuex from 'vuex'

import {getItem,setItem} from '@/utils/storage'

Vue.use(Vuex)
const TOKEN_KETY='TOUTIAO_USER'

export default new Vuex.Store({
  //  state使用来保存值的，就相当于与vue中data里面的数据
  state: {
    //user是一个对象，用来存储登录用户信息，token的数据
    // user:JSON.parse(window.localStorage.getItem(TOKEN_KETY)) //不封装写法
       user:getItem(TOKEN_KETY)  //封装写法
    //初始化时，把数据存到state里面去，但是这时拿过来的是字符串要转换成对象JSON.parse
  },
  // mutation用来操作state里面的数据，就是相当于计算属性computed
  mutations: {
    //这里定义一个函数，然后来操作state数据，即把data获取过来的token赋值给state里面的user
    setUser(state,data){
      state.user=data

      // 为了刷新丢失，所以把存的token值存储到本地存储
      // 本地存储只能存储字符串，不能存储对象，所以要利用JSON.stringify转换成字符串
      // window.localStorage.setItem(TOKEN_KETY,JSON.stringify(state.user)) //不封装
          setItem(TOKEN_KETY,state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
