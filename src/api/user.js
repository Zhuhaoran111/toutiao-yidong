// 用户相关请求模块封装
import request from '@/utils/request'


export const login=data=>{
    return request({
        method:'POST',
        url:'/v1_0/authorizations',
        data
    })
}

//发送验证码
export const sendSms=mobile=>{
    return request({
        method:'POST',
        url:`/v1_0/sms/codes/${mobile}`,
    })
}
 //获取用户自己的信息
export const getUserinfo=()=>{
    return request({
        method: 'GET',
        url: '/v1_0/user'
        // 发送请求头数据
        // headers: {
        // //   // 注意：该接口需要授权才能访问
        // //   //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
        //   Authorization: `Bearer ${store.state.user.token}`
        // }
      })
}

//获取用户频道频道
export const getUserChannels=()=>{
    return request({
        method: 'GET',
        url: '/v1_0/user/channels'
     
      })
}

////关注用户
export const addFollow=target=>{
    return request({
        method: 'POST',
        url: '/v1_0/user/followings',
        data:{
           target
        }
     
      })
}

//取消关注用户
export const deleteFollow=target=>{
    return request({
        method: 'DELETE',
        url: `/v1_0/user/followings/${target}`,    
      })
}


//获取当前登陆用户的个人资料
export const getUserProfile=()=>{
    return request({
        method: 'GET',
        url: '/v1_0/user/profile',    
      })
}

//更新用户资料
export const updateUserProfile=data=>{
    return request({
        method: 'PATCH',
        url: '/v1_0/user/profile',    
        data
      })
}

//编辑用户头像
export const updateUserPhoto=data=>{
    return request({
        method: 'PATCH',
        url: '/v1_0/user/photo',    
        data
      })
}


