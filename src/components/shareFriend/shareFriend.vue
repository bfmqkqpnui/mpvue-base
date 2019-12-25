<template>
  <canvas :canvas-id="canvasid" class="shareBody"></canvas>
</template>

<script>
  export default {
    name: 'poster',
    props: {
      poster: {
        type: Object,
        defalut: {}
      }
    },
    data() {
      return {
        defaultWidthPx: '',
        defaultHeightPx: '',
        canvasid: 'shareCanvas',
        // 选择的图片地址
        chooseImgUrl: 'https://Img.iblimg.com/resh5-1/weChatImg/iBaiLianMP/product/icon-choose.png',
        noGoodsImg: 'https://Img.iblimg.com/resh5-1/weChatImg/iBaiLianMP/product/no_picture.png'
      }
    },
    onLoad() {
      this.getScreen()
      this.canvasDrawImg()
      console.log("9999==============", this.poster)
    },
    methods: {
      close() {
        // const ctx = wx.createCanvasContext('shareCanvas')
        // ctx.clearRect(0, 0, ctx.width, ctx.height)
        this.$emit("close")
      },
      getScreen() {
        let that = this
        wx.getSystemInfo({
          success: function(res) {
            that.defaultWidthPx = res.screenWidth / 375 / 2
            that.defaultHeightPx = res.screenHeight
          },
        })
      },
      // 画图
      canvasDrawImg() {
        //  && this.poster.activityImg
        if (this.poster != {} && this.poster.url) {
          wx.showLoading({
            title: '加载中',
          })
          // let that = this
          // utils.base64src(weChatImg)
          // let weChatImg = 'data:image/jpeg;base64,' + this.poster.weChatShareImg
          Promise.all([this.downWeChatFile(this.chooseImgUrl), this.downWeChatFile(this.poster.url[0]), this.downWeChatFile(this.poster.url[1] ? this.poster.url[1] : this.noGoodsImg)]).then(res => {
            console.log('9999==============下载图片', res);
            if (res) {
              console.log(888, res, this.defaultWidthPx)
              // 创建画布
              let ctx = wx.createCanvasContext(this.canvasid, this)
              // 白色背景
              ctx.setFillStyle('#fff')
              ctx.fillRect(0, 0, 420 * this.defaultWidthPx, 348 * this.defaultWidthPx)

              // 商品活动
              let leafValue = 0;
              if (this.poster.goodsMsg) {
                ctx.setFillStyle('#FF4A4A')
                ctx.fillRect(leafValue, 210 * this.defaultWidthPx, this.poster.goodsMsg.length * 24 * this.defaultWidthPx, 34 * this.defaultWidthPx)
                ctx.setFontSize(20 * this.defaultWidthPx)
                ctx.setFillStyle('#FFFFFF')
                leafValue = 10 * this.defaultWidthPx
                ctx.fillText(this.poster.goodsMsg, leafValue, 232 * this.defaultWidthPx)
              }

              // if (this.poster.ruleInfos && this.poster.ruleInfos.length) {
              //   for (let i = 0; i < this.poster.ruleInfos.length; i++) {
              //     ctx.setStrokeStyle('#FF4A4A')
              //     ctx.setFontSize(22 * this.defaultWidthPx)
              //     ctx.setFillStyle('#FF4A4A')
              //     let reg = new RegExp("\\d", "g");
              //     let count = 0;
              //     while (reg.test(this.poster.ruleInfos[i])) {
              //       count++;
              //     }
              //     if (i == 0) {
              //       leafValue += this.poster.goodsMsg.length * 30 * this.defaultWidthPx
              //       ctx.strokeRect(leafValue, 680 * this.defaultWidthPx, this.poster.ruleInfos[i].length > 2 ? (this.poster.ruleInfos[i].length - count) * 30 * this.defaultWidthPx + count * 13.5 * this.defaultWidthPx : 74 * this.defaultWidthPx, 34 * this.defaultWidthPx)
              //       console.log("value1=", leafValue)
              //       ctx.fillText(this.poster.ruleInfos[i], leafValue + 15 * this.defaultWidthPx, 705 * this.defaultWidthPx)
              //     } else {
              //       let count = 0;
              //       while (reg.test("满2件8折")) {
              //         count++;
              //       }
              //       leafValue += this.poster.ruleInfos[i].length * 30 * this.defaultWidthPx + 15 * this.defaultWidthPx + 10 * this.defaultWidthPx
              //       console.log("value2=", leafValue)
              //       ctx.strokeRect(leafValue, 680 * this.defaultWidthPx, this.poster.ruleInfos[i].length > 2 ? (this.poster.ruleInfos[i].length - count) * 30 * this.defaultWidthPx + count * 13.5 * this.defaultWidthPx : 74 * this.defaultWidthPx, 34 * this.defaultWidthPx)
              //       console.log("value=", leafValue)
              //       ctx.fillText(this.poster.ruleInfos[i], leafValue + 15 * this.defaultWidthPx, 705 * this.defaultWidthPx)
              //     }
              //   }
              // }
                // let reg = new RegExp("\\d", "g");
                // for (let i = 0; i < 2; i++) {
                //   ctx.setStrokeStyle('#FF4A4A')
                //   ctx.setFontSize(22 * this.defaultWidthPx)
                //   ctx.setFillStyle('#FF4A4A')
                //   if (i == 0) {
                //     let count = 0;
                //     while (reg.test("满2件8折")) {
                //       count++;
                //     }
                //     leafValue += this.poster.goodsMsg.length * 30 * this.defaultWidthPx
                //     ctx.strokeRect(leafValue, 680 * this.defaultWidthPx, "满减".length > 2 ? ("满减".length - count) * 30 * this.defaultWidthPx + count * 13.5 * this.defaultWidthPx : 74 * this.defaultWidthPx, 34 * this.defaultWidthPx)
                //     console.log("value1=", leafValue)
                //     ctx.fillText(this.poster.ruleInfos[i], leafValue + 15 * this.defaultWidthPx, 705 * this.defaultWidthPx)
                //   } else {
                //     let count = 0;
                //     while (reg.test("满2件8折")) {
                //       count++;
                //     }
                //     leafValue += this.poster.ruleInfos[i].length * 30 * this.defaultWidthPx + 15 * this.defaultWidthPx + 10 * this.defaultWidthPx
                //     console.log("value2=", leafValue)
                //     ctx.strokeRect(leafValue, 680 * this.defaultWidthPx, "满2件8折".length > 2 ? ("满2件8折".length - count) * 30 * this.defaultWidthPx + count * 13.5 * this.defaultWidthPx : 74 * this.defaultWidthPx, 34 * this.defaultWidthPx)
                //     console.log("value=", leafValue)
                //     ctx.fillText("满2件8折", leafValue + 15 * this.defaultWidthPx, 705 * this.defaultWidthPx)
                //   }
                // }

              // 价格
              if (this.poster.promotionPrice) {
                ctx.setFontSize(24 * this.defaultWidthPx)
                ctx.setFillStyle('#FF4A4A')
                ctx.fillText('￥', 0, 280 * this.defaultWidthPx)
                ctx.setFontSize(28 * this.defaultWidthPx)
                ctx.setFillStyle('#FF4A4A')
                ctx.fillText(this.poster.promotionPrice, 20 * this.defaultWidthPx, 280 * this.defaultWidthPx)
                // ctx.fillText("717777.00", 20 * this.defaultWidthPx, 280 * this.defaultWidthPx)
              }

              if (this.poster.price) {
                ctx.setFontSize(20 * this.defaultWidthPx)
                ctx.setFillStyle('#999999')
                // ctx.fillText(this.poster.price, 135 * this.defaultWidthPx, 655 * this.defaultWidthPx)
                // ctx.fillText("参考价:￥10000.00", "717777.00".length * 16.4 * this.defaultWidthPx + 20 * this.defaultWidthPx, 280 * this.defaultWidthPx)
                ctx.fillText(this.poster.price, this.poster.promotionPrice.length * 16.4 * this.defaultWidthPx + 20 * this.defaultWidthPx, 280 * this.defaultWidthPx)
              }
              ctx.save()
              // 活动图片
              ctx.drawImage(res[1], 0, 0, 194 * this.defaultWidthPx, 194 * this.defaultWidthPx)

              ctx.drawImage(res[2], 194 * this.defaultWidthPx + 20 * this.defaultWidthPx, 0, 194 * this.defaultWidthPx, 194 * this.defaultWidthPx)
              ctx.restore()
              if (this.poster.buttonMsg && this.poster.buttonMsg.length) {
                var distance = 0
                for (var i = 0; i < 2; i++) {
                  ctx.setFontSize(20 * this.defaultWidthPx)
                  ctx.setFillStyle('#666666')
                  if (i == 0) {
                    ctx.save()
                    ctx.drawImage(res[0], distance, 305 * this.defaultWidthPx, 20 * this.defaultWidthPx, 20 * this.defaultWidthPx)
                    ctx.restore()
                    distance += 24 * this.defaultWidthPx
                    ctx.fillText(this.poster.buttonMsg[0], distance, 320 * this.defaultWidthPx)
                  } else if (i == 1) {
                    let msg = '满68元免运费'
                    distance += this.poster.buttonMsg[0].length * 20 * this.defaultWidthPx + i * 5
                    ctx.save()
                    ctx.drawImage(res[0], distance, 305 * this.defaultWidthPx, 20 * this.defaultWidthPx, 20 * this.defaultWidthPx)
                    ctx.restore()
                    distance += 24 * this.defaultWidthPx
                    // ctx.fillText(this.poster.buttonMsg[1], distance, 765 * this.defaultWidthPx)
                    ctx.fillText(msg, distance, 320 * this.defaultWidthPx)
                  } else if (i == 2) {
                    let msg = '满68元免运费'
                    // distance += this.poster.buttonMsg[1].length * 20 * this.defaultWidthPx + i * 5
                    distance += '运费5元'.length * 20 * this.defaultWidthPx + i * 5
                    ctx.save()
                    ctx.drawImage(res[0], distance, 305 * this.defaultWidthPx, 20 * this.defaultWidthPx, 20 * this.defaultWidthPx)
                    ctx.restore()
                    distance += 24 * this.defaultWidthPx
                    // ctx.fillText(this.poster.buttonMsg[2], distance, 765 * this.defaultWidthPx)
                    ctx.fillText(msg, distance, 320 * this.defaultWidthPx)
                  }
                }
              }
              ctx.draw(true, () => {
                setTimeout(() => {
                  this.saveImage();
                }, 300);
              });
              // ctx.restore()
            }
          })
          wx.hideLoading()
        }
      },
      downWeChatFile(imgUrl) {
        return new Promise((resolve, reject) => {
          wx.downloadFile({
            url: imgUrl,
            success: res => {
              console.log("下载图片：", res)
              resolve(res.tempFilePath)
            }
          })
        })
      },
      // 保存图片到本地相册(微信)
      saveImage() {
//        wx.showToast({
//          title: '保存图片到本地相册成功',
//          duration: 2000
//        })
        let that = this
        console.log("图片宽度：", that.defaultWidthPx, that.defaultHeightPx, that.canvasid)
        // this.$emit("imgSensor")
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          // width: that.defaultWidthPx * 2 * 375,
          // height: that.defaultHeightPx,
          // destWidth: that.defaultWidthPx * 2 * 375,
          // destHeight: that.defaultHeightPx,
          canvasId: that.canvasid,
          success(res) {
            let filePath = res.tempFilePath
            console.log(123, filePath)
            console.log('9999==============保存图片成功', filePath);
            that.$emit("shareFriendImg", filePath)
            // wx.saveImageToPhotosAlbum({
            //   filePath: filePath,
            //   success: res => {
            //     wx.showToast({
            //       title: '保存成功',
            //       icon: 'success',
            //       duration: 2000
            //     })
            //   },
            //   fail(err) {
            //     if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied") {
            //       console.log("用户拒绝，再次发起授权")
            //       wx.showModal({
            //         title: '保存图片',
            //         content: '保存图片需要您授权，请确认授权，否则保存图片功能将无法使用',
            //         success: tip => {
            //           if (tip.confirm) {
            //             wx.openSetting({
            //               success(settingdata) {
            //                 console.log(settingdata)
            //                 if (settingdata.authSetting['scope.writePhotosAlbum']) {
            //                   console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
            //                 } else {
            //                   console.log('获取权限失败，给出不给权限就无法正常使用的提示')
            //                 }
            //               },
            //               fail(res) {
            //                 console.log("再次授权失败", res)
            //               }
            //             })
            //           }
            //         }
            //       })
            //     }
            //   }
            // })
          },
          fail(res) {
            wx.showToast({
              title: '失败' + res.errMsg,
              icon: 'success',
              duration: 2000
            })
          }
        }, this)
        // let startIdx = this.shareImg.indexOf('base64,') + 7
        // let timestamp = new Date().getTime()
        // const fsm = wx.getFileSystemManager()
        // let filePath = `${wx.env.USER_DATA_PATH}/qrcode_${timestamp}.png`
        // fsm.writeFile({
        //   filePath: filePath,
        //   data: this.shareImg.slice(startIdx),
        //   encoding: 'base64',
        //   success: res => {
        //     console.log('res: \n:', res)
        //         // 图片保存到本地
        //     wx.saveImageToPhotosAlbum({
        //       filePath: filePath,
        //       success: data => {
        //           wx.showToast({
        //           title: '保存成功',
        //           icon: 'success',
        //           duration: 2000
        //           })
        //       },
        //       fail: err => {
        //         console.log(err);
        //         if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied") {
        //           console.log("当初用户拒绝，再次发起授权")
        //           wx.showModal({
        //             title: '保存图片',
        //             content: '保存图片需要您授权，请确认授权，否则保存图片功能将无法使用',
        //             success: tip => {
        //               if (tip.confirm) {
        //                 wx.openSetting({
        //                   success(settingdata) {
        //                     console.log(settingdata)
        //                     if (settingdata.authSetting['scope.writePhotosAlbum']) {
        //                       console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
        //                     } else {
        //                       console.log('获取权限失败，给出不给权限就无法正常使用的提示')
        //                     }
        //                   },
        //                   fail(res) {
        //                     console.log("再次授权失败", res)
        //                   }
        //                 })
        //               }
        //             }
        //           })
        //         }
        //       },
        //       complete(res) {
        //           console.log(res);
        //       }
        //     })
        //   }
        // })
      },
    },
    computed: {
      assetsPath() {
        return this.$assetsPath
      },
    },
  }
</script>

<style lang="scss" src="./css/shareFriend.scss" scoped></style>
