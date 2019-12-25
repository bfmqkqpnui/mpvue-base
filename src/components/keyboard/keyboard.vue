<template>
  <div>
    <!-- 自定义键盘 -->
    <ul class="keyboard-randon">
      <li v-for="(item, idx) in num" class="key-item" :key="idx">
        <div v-if="item < 10" @click="pwInput(String(item))">{{ item }}</div>
        <div v-else-if="item === 10" class="grey-c"></div>
        <div v-else-if="item === 11" class="grey-c" @click="deleteInput()">
          <img :src="backspace">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'keyboard',
    data() {
      return {
        backspace: require('./css/i/backspace.png'),
        // 键盘num
        num: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 11],
        // 验证码(String)
        value: '',
        // 验证码(Arr)
    	  valueArr: [],
      }
    },
    methods: {
      // 键盘事件
      pwInput(value) {
        // 键盘点击 "6位数字 "
        this.value = (this.value.length >= 6) ? this.value.substring(0, 6) : (this.value + value)
        // 存放到 [input数组]
        this.valueArr = this.value.split('')
      },
      // 删除事件
      deleteInput() {
        if (this.valueArr && this.valueArr.length) {
          // 删除最后一项
          this.valueArr.splice(this.valueArr.length - 1)
          this.value = this.value.substring(0, this.value.length - 1)
        }
      },
    },
  }
</script>

<style lang="scss" src="./css/keyboard.scss" scoped></style>
