import request from '@/utils/request'

//联想记忆的接口
export const getSearchSuggestion = q => {
    return request({
      method: 'GET',
      url: '/v1_0/suggestion',
      params:{
        q
      }
    })
  }

//query参数一定要用params参数带，就这么离谱,这里直接携带一个params对象
  export const getSearchResult = params => {
    return request({
      method: 'GET',
      url: '/v1_0/search',
      params
      
  })
}