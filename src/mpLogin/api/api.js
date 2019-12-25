import request from './request'
import constant from '../../constant/config'

const platform = window ? 'h5' : 'mp'
const baseUrlApi = constant.netType === 'prd' ? 'https://mh5.bl.com/h5_gateway' : 'http://localhost:9090/h5_gateway'
const api = {
  // new 第三方账号标识查询用户信息接口(三方登录接口)-字段加密新接口
  queryMPOpenId: (r) => request.post('/wechat/queryMPOpenId', r, {
    baseURL: baseUrlApi
  }),
}

export default api