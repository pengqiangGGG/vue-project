import axios from "axios"
// import { Toast } from 'vant';

// 创建axios实例
let instance = axios .create({
  timeout:1000,
  baseURL:""
})

//添加请求拦截器
instance.interceptors.request.use(
  config=>{

    // const token = getCookie('名称');如果有用户登录信息的时候需要引入cookie方法，推荐js-cookie
      config.data = JSON.stringify(config.data);
      config.headers = {
        'Content-Type':'application/json'
      }
    // if(token){
    //   config.params = {'token':token}
    // }
      return config;
    },
  error => {
    return Promise.reject(err);
  }
)

//添加response返回 拦截器
instance.interceptors.response.use(
    response=>{
      // if (response.code ==404){
      //   // Toast("请求404")
      // }else if (response.code ==405){
      //   // Toast("请求405")
      // }
      return response;
    },
    error=>{
      return Promise.reject(error)
    }
)

export default instance
