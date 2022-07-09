/**
 * 文章请求模块
 */
 import request from '@/utils/request'

 /**
  * 获取文章列表
  */
 export const getArticles = params => {
   return request({
     method: 'GET',
     url: '/v1_0/articles',
     // params 选项用来配置 Query 参数
     params
   })
 }

  /**
  * 获取文章详情
  */
 export const getArticleById = article_id => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${article_id}`,
    // params 选项用来配置 Query 参数,这里用es6方式携带参数
  
  })
}

 