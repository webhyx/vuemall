import {request} from "./request"
/* 
调用request是因为request函数返回的是被创建出有baseURL实例的instance，
传入的url参数会直接拼接进去
*/
export function getHomeMultidata(){
  return request({
    url: '/home/multidata'
  })
}
// 例如：baseURL/home/data?type=pop&page=1
// es6写法省略，type=type,page=page
export function getHomeGoods(type,page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}