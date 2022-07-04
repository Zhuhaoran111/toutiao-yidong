import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'login',
    component:()=>import('@/views/login') // 自动加载index.vue
  },
  {
    path:'/',
    // name:'layout',  //如果父路由有默认子路由，这个就没有用了
    component:()=>import('@/views/layout'),// 自动加载index.vue
    children:[
      {
        path:'',  // 这里是空，就是默认是子路由只能有一个
        name:'home',
        component:()=>import('@/views/home') 
      },
      {
        path:'/qa',
        name:'qa',
        component:()=>import('@/views/qa') // 自动加载index.vue
      },
      {
        path:'/video',
        name:'video',
        component:()=>import('@/views/video') // 自动加载index.vue
      },
      {
        path:'/my',
        name:'my',
        component:()=>import('@/views/my') // 自动加载index.vue
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
