<template>
  <div>
    <div class="poster-bg">
      <div class="poster-sign">生成您的专属海报</div>
      <div class="poster-main">
        <!-- <canvas :canvas-id="canvasid" class="shareBody"></!-->
        <img src="https://Img.iblimg.com/resh5-1/weChatImg/iBaiLianMP/product/icon_close.png" class="poster-close" @click.stop="close"/>
        <div class="poster-body">
          <div class="poster-title">
            <!-- <img :src="poster.activityImg"> -->
             <img src="https://Img.iblimg.com/resh5-1/weChatImg/iBaiLianMP/product/icon@2x.png">
          </div>
           <canvas :canvas-id="canvasid" class="shareBody"></canvas>
          <!-- <div class="poster-img">
            <img src="https://Img.iblimg.com/resh5-1/weChatImg/iBaiLianMP/product/demoImg.png">
          </div>
          <div class="poster-content">
            <div class="poster-left">
              <div class="poster-left-title">晋龙 鲜鸡蛋 六无安全蛋 30枚</div>
              <div class="poster-left-price">
                <span class="salePrice"><span>￥</span><span class="num">31.90</span></span><span class="price">参考价:<span>￥</span><span>40.80</span></span>
              </div>
              <div class="poster-left-promition">
                <span class="promition red"><span>自营</span></span>
                <span class="promition"><span>满减</span></span>
                <span class="promition"><span>满2件8折</span></span>
              </div>
            </div>
            <div class="poster-right">
              <div class="poster-wecharQr"></div>
              <div class="poster-label">扫码长按识别</div>
            </div>
          </div>
          <div class="poster-bottom">
            <span class="poster-pledge">
              <img src="https://Img.iblimg.com/resh5-1/weChatImg/iBaiLianMP/product/icon-choose.png" />
              <span>7天无理由退换</span>
            </span>
            <span class="poster-pledge">
              <img src="https://Img.iblimg.com/resh5-1/weChatImg/iBaiLianMP/product/icon-choose.png" />
              <span>免运费</span>
            </span>
            <span class="poster-pledge">
              <img src="https://Img.iblimg.com/resh5-1/weChatImg/iBaiLianMP/product/icon-choose.png" />
              <span>店铺发货&售后</span>
            </span>
          </div>
        </div>
        <div class="poster-btn" @click.stop="saveImage"><div>保存海报</div></div>
        <div class="poster-saveInfo"><span>保存海报到手机相册手，将图片分享到您的朋友圈</span></div> -->
        <!-- <div class="poster-close" @click.stop="close"><img v-if="assetsPath" src="https://Img.iblimg.com/resh5-1/weChatImg/iShare/poster/poster-close@2x.png"></div> -->
        <div class="poster-btn" @click.stop="saveImage">
          <div>保存海报</div>
        </div>
        <div class="poster-saveInfo">
          <span>保存海报到手机相册，将图片分享到您的朋友圈</span>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '@/utils'
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
        canvasid: 'shareCanvas' + new Date().getTime(),
        // 选择的图片地址
        chooseImgUrl: 'https://Img.iblimg.com/resh5-1/weChatImg/iBaiLianMP/product/icon-choose.png',
        productShareImgUrl: 'https://Img.iblimg.com/resh5-1/weChatImg/iBaiLianMP/product/demoImg.png'
      }
    },
    onLoad() {
      this.getScreen()
      this.canvasDrawImg()
      console.log("9999", this.poster)
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
        if (this.poster != {} && this.poster.url && this.poster.weChatShareImg) {
          wx.showLoading({
            title: '加载中',
          })
          console.log("开始画图", 510 * this.defaultWidthPx, this.defaultHeightPx)
          // let that = this
          // utils.base64src(weChatImg)
          let weChatImg = 'data:image/jpeg;base64,' + this.poster.weChatShareImg
          Promise.all([this.downWeChatFile(this.chooseImgUrl), this.downWeChatFile(this.poster.url[0]), utils.base64src(weChatImg)]).then(res => {
            if (res) {
              console.log(888, res, this.defaultWidthPx)
              // 创建画布
              let ctx = wx.createCanvasContext(this.canvasid)
              // 白色背景
              ctx.setFillStyle('#fff')
              ctx.fillRect(0, 0, 570 * this.defaultWidthPx, 800 * this.defaultWidthPx)
              // 加载文描
              ctx.setFontSize(32 * this.defaultWidthPx)
              ctx.setFillStyle('#1E1E1E')
              // ctx.fillText('晋龙 鲜鸡蛋 六无安全蛋 30枚', 0, 560 * this.defaultWidthPx)
              // 方法文描
              // 将一个字符串分割成字符串数组
              let methodContent = this.poster.goodsSalesName || ""
              let row = []
              let temp = ''
              for (let i = 0; i < methodContent.length; i++) {
                if (ctx.measureText(temp).width < (350 * this.defaultWidthPx)) {
                  temp += methodContent[i]
                } else {
                  // 防止字符丢失
                  i--
                  row.push(temp)
                  temp = ''
                }
              }
              row.push(temp)
              // 如果数组长度大于2 则截取前两个
              if (row.length > 2) {
                let rowCut = row.slice(0, 2);
                let rowPart = rowCut[1];
                let test = "";
                let empty = [];
                for (let i = 0; i < rowPart.length; i++) {
                  if (ctx.measureText(test).width < (350 * this.defaultWidthPx)) {
                    test += rowPart[i];
                  } else {
                    break;
                  }
                }
                empty.push(test)
                // 这里只显示两行，超出的用...表示
                let group = empty[0] + "..."
                rowCut.splice(1, 1, group);
                row = rowCut;
              }
              for (let i = 0; i < row.length; i++) {
                ctx.fillText(row[i], 30 * this.defaultWidthPx, 560 * this.defaultWidthPx + i * (40 * this.defaultWidthPx), 350 * this.defaultWidthPx);
              }
              // 价格
              if (this.poster.promotionPrice) {
                ctx.setFontSize(24 * this.defaultWidthPx)
                ctx.setFillStyle('#FF4A4A')
                ctx.fillText('￥', 30 * this.defaultWidthPx, 655 * this.defaultWidthPx)
                ctx.setFontSize(36 * this.defaultWidthPx)
                ctx.setFillStyle('#FF4A4A')
                ctx.fillText(this.poster.promotionPrice, 50 * this.defaultWidthPx, 655 * this.defaultWidthPx)
              }

              if (this.poster.price) {
                ctx.setFontSize(20 * this.defaultWidthPx)
                ctx.setFillStyle('#999999')
                ctx.fillText(this.poster.price, this.poster.promotionPrice.length * 21 * this.defaultWidthPx + 50 * this.defaultWidthPx, 655 * this.defaultWidthPx)
                // ctx.fillText("参考价:￥10000.00", this.poster.promotionPrice.length * 21 * this.defaultWidthPx + 20 * this.defaultWidthPx, 655 * this.defaultWidthPx)
              }

              // 商品活动
              let leafValue = 30 * this.defaultWidthPx;
              if (this.poster.goodsMsg) {
                ctx.setFillStyle('#FF4A4A')
                ctx.fillRect(leafValue, 680 * this.defaultWidthPx, this.poster.goodsMsg.length * 30 * this.defaultWidthPx, 34 * this.defaultWidthPx)
                ctx.setFontSize(22 * this.defaultWidthPx)
                ctx.setFillStyle('#FFFFFF')
                leafValue += 15 * this.defaultWidthPx
                ctx.fillText(this.poster.goodsMsg, leafValue, 705 * this.defaultWidthPx)
              }

              if (this.poster.ruleInfos && this.poster.ruleInfos.length) {
                for (let i = 0; i < this.poster.ruleInfos.length; i++) {
                  ctx.setStrokeStyle('#FF4A4A')
                  ctx.setFontSize(22 * this.defaultWidthPx)
                  ctx.setFillStyle('#FF4A4A')
                  let reg = new RegExp("\\d", "g");
                  let count = 0;
                  while (reg.test(this.poster.ruleInfos[i])) {
                    count++;
                  }
                  if (i == 0) {
                    leafValue += this.poster.goodsMsg.length * 30 * this.defaultWidthPx
                    ctx.strokeRect(leafValue, 680 * this.defaultWidthPx, this.poster.ruleInfos[i].length > 2 ? (this.poster.ruleInfos[i].length - count) * 30 * this.defaultWidthPx + count * 13.5 * this.defaultWidthPx : 74 * this.defaultWidthPx, 34 * this.defaultWidthPx)
                    console.log("value1=", leafValue)
                    ctx.fillText(this.poster.ruleInfos[i], leafValue + 15 * this.defaultWidthPx, 705 * this.defaultWidthPx)
                  } else {
                    let count = 0;
                    while (reg.test("满2件8折")) {
                      count++;
                    }
                    leafValue += this.poster.ruleInfos[i].length * 30 * this.defaultWidthPx + 15 * this.defaultWidthPx + 10 * this.defaultWidthPx
                    console.log("value2=", leafValue)
                    ctx.strokeRect(leafValue, 680 * this.defaultWidthPx, this.poster.ruleInfos[i].length > 2 ? (this.poster.ruleInfos[i].length - count) * 30 * this.defaultWidthPx + count * 13.5 * this.defaultWidthPx : 74 * this.defaultWidthPx, 34 * this.defaultWidthPx)
                    console.log("value=", leafValue)
                    ctx.fillText(this.poster.ruleInfos[i], leafValue + 15 * this.defaultWidthPx, 705 * this.defaultWidthPx)
                  }
                }
              }

              // ctx.setStrokeStyle('#FF4A4A')
              // ctx.strokeRect(this.poster.goodsMsg.length * 30 * this.defaultWidthPx + 10 * this.defaultWidthPx, 680 * this.defaultWidthPx, 74 * this.defaultWidthPx, 34 * this.defaultWidthPx)
              // ctx.setFontSize(22 * this.defaultWidthPx)
              // ctx.setFillStyle('#FF4A4A')
              // ctx.fillText('满减', 100 * this.defaultWidthPx, 705 * this.defaultWidthPx)

              // ctx.setStrokeStyle('#FF4A4A')
              // ctx.strokeRect(170 * this.defaultWidthPx, 680 * this.defaultWidthPx, '满2件8折'.length * 30 * this.defaultWidthPx, 34 * this.defaultWidthPx)
              // ctx.setFontSize(22 * this.defaultWidthPx)
              // ctx.setFillStyle('#FF4A4A')
              // ctx.fillText('满2件8折', 185 * this.defaultWidthPx, 705 * this.defaultWidthPx)
              // 识别码
              ctx.setFontSize(20 * this.defaultWidthPx)
              ctx.setFillStyle('#999999')
              ctx.fillText('扫码长按识别', 405 * this.defaultWidthPx, 700 * this.defaultWidthPx)
              // 活动图片
              ctx.save()
              ctx.drawImage(res[1], 30 * this.defaultWidthPx, 0, 510 * this.defaultWidthPx, 510 * this.defaultWidthPx)
              ctx.restore()
              // 画小程序码
              ctx.drawImage(res[2], 400 * this.defaultWidthPx, 530 * this.defaultWidthPx, 140 * this.defaultWidthPx, 140 * this.defaultWidthPx)
              // ctx.setFillStyle('#FF4A4A')
              // ctx.fillRect(370 * this.defaultWidthPx, 530 * this.defaultWidthPx, 140 * this.defaultWidthPx, 140 * this.defaultWidthPx)
              // 画选中图
              if (this.poster.buttonMsg && this.poster.buttonMsg.length) {
                var distance = 30 * this.defaultWidthPx
                for (var i = 0; i < this.poster.buttonMsg.length; i++) {
                  ctx.setFontSize(22 * this.defaultWidthPx)
                  ctx.setFillStyle('#999999')
                  if (i == 0) {
                    ctx.save()
                    ctx.drawImage(res[0], distance, 745 * this.defaultWidthPx, 20 * this.defaultWidthPx, 20 * this.defaultWidthPx)
                    ctx.restore()
                    distance += 28 * this.defaultWidthPx
                    ctx.fillText(this.poster.buttonMsg[0], distance, 765 * this.defaultWidthPx)
                  } else if (i == 1) {
                    distance += this.poster.buttonMsg[0].length * 22 * this.defaultWidthPx + i * 5
                    ctx.save()
                    ctx.drawImage(res[0], distance, 745 * this.defaultWidthPx, 20 * this.defaultWidthPx, 20 * this.defaultWidthPx)
                    ctx.restore()
                    distance += 28 * this.defaultWidthPx
                    ctx.fillText(this.poster.buttonMsg[1], distance, 765 * this.defaultWidthPx)
                  } else if (i == 2) {
                    distance += this.poster.buttonMsg[1].length * 22 * this.defaultWidthPx + i * 5
                    ctx.save()
                    ctx.drawImage(res[0], distance, 745 * this.defaultWidthPx, 20 * this.defaultWidthPx, 20 * this.defaultWidthPx)
                    ctx.restore()
                    distance += 28 * this.defaultWidthPx
                    ctx.fillText(this.poster.buttonMsg[2], distance, 765 * this.defaultWidthPx)
                  }
                }
              }
              ctx.draw(true)
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
        let that = this
        console.log("图片宽度：", that.defaultWidthPx, that.defaultHeightPx)
        this.$emit("imgSensor")
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
            wx.saveImageToPhotosAlbum({
              filePath: filePath,
              success: res => {
                wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 2000
                })
              },
              fail(err) {
                if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied") {
                  console.log("用户拒绝，再次发起授权")
                  wx.showModal({
                    title: '保存图片',
                    content: '保存图片需要您授权，请确认授权，否则保存图片功能将无法使用',
                    success: tip => {
                      if (tip.confirm) {
                        wx.openSetting({
                          success(settingdata) {
                            console.log(settingdata)
                            if (settingdata.authSetting['scope.writePhotosAlbum']) {
                              console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                            } else {
                              console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                            }
                          },
                          fail(res) {
                            console.log("再次授权失败", res)
                          }
                        })
                      }
                    }
                  })
                }
              }
            })
          },
          fail(res) {
            console.log("保存图片到本地相册失败：", res)
          }
        })
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

<style lang="scss" src='./css/poster.scss' scoped></style>
