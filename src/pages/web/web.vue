<template>
  <div>
    <web-view v-if='url' :src="url" @message="onMessageReceive"></web-view>
  </div>
</template>

<script>
  export default {
    name: 'webview',
    data () {
      return {
        url: '',
        uuid: '',
        tempUrl: '',
        endParam: '',
      }
    },
    methods: {
      // 接收H5推送的分享信息
      onMessageReceive(e) {
        console.log('====收到消息===', JSON.stringify(e));
        if (e && e.mp.detail && e.mp.detail.data) {
          if (e.mp.detail.data.length > 0) {
            shareParams = e.mp.detail.data.length > 1 ? e.mp.detail.data[1] : e.mp.detail.data[0]
            console.log(shareParams);
          }
        }
      },
      onLoad(options) {
        Object.assign(this.$data, this.$options.data());
      },
      onShow() {},
      onShareAppMessage: (res) => {
        wx.showShareMenu({
          withShareTicket: true
        })
        return {
          title: 'web-view分享标题',
          path: '/pages/web/web?url=xxxx',
          success: (res) => {
            console.log("转发成功", res);
          },
          fail: (res) => {
            console.log("转发失败", res);
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>