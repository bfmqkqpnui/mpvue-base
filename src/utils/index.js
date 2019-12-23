let WECHAT_USERINFO = "wechat-userInfo"

const wxToast = (msg) => {
  wx.showToast({
    title: msg || "网络异常,请稍后再试",
    icon: 'none',
    duration: 2000
  })
}

// 加载按钮
const Loading = (flag = true) => {
  wx.showLoading({
    title: flag ? '请稍等哦~' : '',
    mask: true
  })
}

// 判断当前值是否存在
const isExist = opt => {
  let flag = false
  if (opt !== null && opt !== "" && typeof opt !== "undefined") {
    flag = true
  }
  return flag
}

// 获取微信用户信息
const getWechatUserInfo = () => {
  return wx.getStorageSync(WECHAT_USERINFO)
}

// 移除微信用户信息
const removeWechatUserInfo = () => {
  wx.removeStorageSync(WECHAT_USERINFO)
}

export default {
  formatNumber,
  formatTime,
  wxToast,
  isExist,
  getWechatUserInfo,
  removeWechatUserInfo,
}

