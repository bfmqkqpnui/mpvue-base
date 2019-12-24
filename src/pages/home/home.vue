<template>
  <div class="home">
    首页
    <logistics :list="list" :backColor="backColor"></logistics>
  </div>
</template>

<script>
import logistics from '../../components/timeLine/timeLine'
  export default {
    name: 'home',
    data() {
      return {
        list: [{
          index: 1,
          title: '2019-12-12 12:12:14',
          value: '就立即离开教室的附近上空的飞机久科夫斯基的付款就'
        },
        {
          index: 2,
          title: '2019-12-13 12:12:14',
          value: '就立即离开教室的附近上空的飞机久科夫斯基的付款就'
        },{
          index: 3,
          title: '2019-12-14 12:12:14',
          value: '就立即离开教室的附近上空的飞机久科夫斯基的付款就'
        },{
          index: 4,
          title: '2019-12-15 12:12:14',
          value: '就立即离开教室的附近上空的飞机久科夫斯基的付款就'
        },{
          index: 5,
          title: '2019-12-22 12:12:14',
          value: '就立即离开教室的附近上空的飞机久科夫斯基的付款就'
        }],
        backColor: ''
      }
    },
    props: {},
    onLoad() {},
    onShow() {},
    components: {
      logistics
    }
  }
</script>

<style lang="scss" src="./css/home.scss" scoped></style>
