var Fly = require("flyio/dist/npm/wx")
const request = new Fly()

request.interceptors.request.use((request) => {
  request.headers = {
    'content-type': 'application/json',
    'chnflg': 'h5'
  }
  return request
})

request.interceptors.response.use((response, promise) => {
  return promise.resolve(response.data)
}, (err, promise) => {
  console.log(err)
  return promise.resolve()
})

export default request
