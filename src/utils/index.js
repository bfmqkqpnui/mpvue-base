let WECHAT_USERINFO = "wechat-userInfo"

const wxToast = (msg) => {
  wx.showToast({
    title: msg || "网络异常,请稍后再试",
    icon: 'none',
    duration: 2000
  })
}

// 加载按钮
const Loading = (flag = false) => {
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

// 获取url后面的参数
const GetQueryString = (url, name) => {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  if (decodeURIComponent(url).split('?')[1]) {
    let r = decodeURIComponent(url).split('?')[1].match(reg);
    if (r != null) return decodeURIComponent(r[2]);
  }
  return null;
}

// 生成时间戳
const getTimeFormatToday = (today) => {
  let year = today.getFullYear() + '';
  let month = (today.getMonth() + 1) + '';
  month = (month.length === 1) ? '0' + month : month;
  let day = today.getDate() + '';
  day = (day.length === 1) ? '0' + day : day;
  let hour = today.getHours() + '';
  hour = (hour.length === 1) ? '0' + hour : hour;
  let min = today.getMinutes() + '';
  min = (min.length === 1) ? '0' + min : min;
  let sec = today.getSeconds() + '';
  sec = (sec.length === 1) ? '0' + sec : sec;
  return year + month + day + hour + min + sec;
}

// base64图片返回临时路径
const base64src = base64data => {
  const fsm = wx.getFileSystemManager()
  const FILE_BASE_NAME = 'tmp_base64src_' + new Date().getTime()
  return new Promise((resolve, reject) => {
    const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || []
    if (!format) {
      reject(new Error('ERROR_BASE64SRC_PARSE'))
    }
    const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`
    const buffer = wx.base64ToArrayBuffer(bodyData);
    fsm.writeFile({
      filePath,
      data: buffer,
      encoding: 'binary',
      success() {
        resolve(filePath)
      },
      fail() {
        reject(new Error('ERROR_BASE64SRC_WRITE'))
      }
    })
  })
}

// 页面跳转
const navigateTo = url => {
  if (url) {
    if (url.indexOf("home/home") == -1 || url.indexOf("usercenter/usercenter") == -1) {
      wx.navigateTo({
        url: url
      })
    } else {
      wx.switchTab({
        url: url
      })
    }
  } else {
    Toast("没有页面地址")
  }
}

// 后退步数
const navigateBack = step => {
  if (step) {
    wx.navigateBack({
      delta: step
    })
  } else {
    wx.navigateBack({
      delta: 1
    })
  }
}

export default {
  formatNumber,
  formatTime,
  wxToast,
  isExist,
  getWechatUserInfo,
  removeWechatUserInfo,
  getTimeFormatToday,
  GetQueryString,
  Loading,
  base64src,
  navigateTo,
  navigateBack
}

