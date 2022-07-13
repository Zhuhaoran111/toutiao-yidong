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
        path:'/home',  // 这里是空，就是默认是子路由只能有一个
        name:'home',
        component:()=>import('@/views/home'),
      },
      {
        path:'/qa',
        name:'qa',
        component:()=>import('@/views/qa'), // 自动加载index.vue
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
  },
    {
        path:'/search',
        name:'search',
        component:()=>import('@/views/search') // 自动加载index.vue
    },
    {
      path:'/article/:articleId',
      name:'article',
      component:()=>import('@/views/article'), // 自动加载index.vue
      props:true   //开启props传参,说白了就是把路由参数映射到组件的props中
        //利用props解耦路由参数
  },

  {
    path:'/user/profile',
    name:'user-profile',
    component:()=>import('@/views/user-profile'), // 自动加载index.vue
    
}
]

const router = new VueRouter({
  routes
})

export default router
