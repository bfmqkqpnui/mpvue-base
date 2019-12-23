import Fly from 'flyio'
import utils from '../utils'
const fly = new Fly

// 请求按需添加头部信息
fly.interceptors.request.use((request) => {
  request.headers = {
    'content-type': 'application/json',
    'chnflg': 'h5'
  }
  console.log('request.url', request.url)
  // request.headers.membertoken = utils.getMemberToken()
  return request
})

// 拦截返回
fly.interceptors.response.use(
  function (response) {
    // 发券入参 和v2接口 userToken失效兼容
    if (response.data.resCode === '002') {
      console.log("token失效，跳转登录页========")
      let userInfo = utils.getWechatUserInfo()
      // console.log('token失效', request);
      if (userInfo) {
        // if (request.needLogin != false) {
        //   jumpUtil.jump2Login();
        // }
        utils.removeWechatUserInfo()
      }
    } else {
      // 添加返回时间
      if (response.headers && response.headers.date) {
        response.data.date = response.headers.date
      }
      return response.data
    }
  },
  function (err) {
    console.log("error-interceptor", err)
  }
)

export default fly
