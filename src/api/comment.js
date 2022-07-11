import request from '@/utils/request'

/* 获取文章评论列表 */
//传的是query参数，所以用params携带参数的方式
export const getComments =params => {
    return request({
      method: 'GET',
      url: '/v1_0/comments',
      params
      
  })
}

/* 发布文章或评论或评论的回复 */
export const addComment =data => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data  
})
}