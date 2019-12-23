import request from './request'
import constant from './constant/config'

const baseUrlApi = constant.$NET_TYPE === 'prd' ? 'https://mh5.bl.com/h5_gateway' : 'https://mh5.st.bl.com/h5_gateway'

const api = {
  // 查询按钮信息
  btnKey: r => request.post('/dict/list.htm', r, {
    baseURL: baseUrlApi
  }),
}

export default api
