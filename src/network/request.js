import axios from 'axios'
// config参数是拼接到baseURL后面的地址,有了BaseURL，传入的url会默认拼接进去
export function request(config) {
  // 1.创建axios的实例，用axios.create自定义配置，会返回一个axios给instance
  // 所以
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求,axios是支持promise,返回的是一个Promise
  return instance(config)
}

/* 创建instance的好处是
有多个服务器时可以再创建一个instance2进行网络请求；
 */
