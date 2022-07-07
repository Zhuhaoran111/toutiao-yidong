import request from '@/utils/request'

export const getSearchSuggestion = q => {
    return request({
      method: 'GET',
      url: '/v1_0/suggestion',
      params:{
        q
      }
    })
  }