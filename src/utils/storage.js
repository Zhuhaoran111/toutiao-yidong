// 封装本地存储模块

// 存储数据
export const setItem=(key,value)=>{
    //存储到本地存储时一定是字符串，所以这里要判断如果是对象或者是数组一定要转换成字符串
    if(typeof value==='object'){
        value=JSON.stringify(value)
    }
    window.localStorage.setItem(key,value)
}

//获取数据数据
export const getItem=key=>{
    const data=window.localStorage.getItem(key)
    //前端拿到数据时一定要是对象，所以这里把字符串转换成对象
    return data;
    try{
        // 如果是有效的字符串就可以转换成对象，如果不是则原样返回
      return JSON.parse(data)
    }catch{
       return data
    }
}

//删除数据
export const removeItem=(key)=>{
    window.localStorage.removeItem(key)
}