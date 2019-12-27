<template>
  <div>
    <!-- 图片翻转 -->
    <div class="content" @click.stop="flipped" :class="{disappear: hasFlipping}">
      <div class="frame back" v-if="!isFront">
        <!-- 背面 -->
        <img src="https://img.iblimg.com/resh5-1/weChatImg/iShare/luckyBag/cover.png" />
      </div>
      <div class="frame front" v-if="isFront">
        <!-- 正面 -->
        <img src="https://img.iblimg.com/resh5-1/weChatImg/iShare/luckyBag/redBag-coupon.png" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'flipped',
    data () {
      return {
        isFront: false,
        hasFlipping: false
      }
    },
    methods: {
      flipped() {
        console.log("开始翻转")
        this.isFront = !this.isFront
        this.isFront ? this.hasFlipping = true : this.hasFlipping = false
      }
    },
  }
</script>

<style lang="scss" src="./css/flipped.scss" scoped></style>