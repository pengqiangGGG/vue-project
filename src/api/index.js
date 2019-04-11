import instance from "../until/axios"


//请求自己写的json数据
export function getData() {
  return new Promise((resolve,reject)=>{
    instance({
      url:"static/data/data.json",
      method:"get"
    }).then(response=>{
      resolve(response.data);
    }).catch(err=>{
      reject(err)
    })
  })
}

//请求mock的数据
export function getMockList() {
    return new Promise((resolve,reject)=>{
        instance({
            url: "/news/index",
            method: "post"
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
}

export function login(data) {
    return new Promise((resolve,reject)=>{
        instance({
            url: "/user/login",
            method: "post",
            data:data
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
}

//热门搜索的列表
export function searchHot() {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/search/hot",
            method: "get"
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
}
//运动商场专场列表
export function getSportList() {
    return new Promise((resolve,reject)=>{
        instance({
            url:"/goods/sport",
            method:'get'
        }).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
}
