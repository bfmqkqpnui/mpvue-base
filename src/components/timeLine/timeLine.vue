<template>
  <!-- 时间轴 -->
  <div class="listview-container">
    <div class="playlog-item" v-for="(item, i) in list" :key="i">
      <div class="dotline">
        <!-- 竖线 -->
        <div class="line" v-if="i != list.length - 1" :style="{background: backColor ? backColor : '#CFBC90'}"></div>
        <!-- 圆点 -->
        <div class="dot" :style="{background: backColor ? backColor : '#CFBC90'}"></div>
        <!-- 时间戳 -->
      </div>
      <div class="content">
        <div class="course">{{item.title}}</div>
        <div class="chapter">{{item.value}}</div>
      </div>
    </div>
</div>
</template>

<script>
  export default {
    name: 'timeline',
    props: {
      list: {
        type: Array,
        value: []
      },
      backColor: {
        type: String,
        value: ''
      }
    }
  }
</script>

<style lang="scss" src="./css/timeLine.scss" scoped></style>
