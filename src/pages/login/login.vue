<template>
  <div class="login-container">
    <mpLogin v-if="showLogin"></mpLogin>
  </div>
</template>

<script>
import mpLogin from '../../mpLogin/mpLogin'
  export default {
    name: 'login',
    data() {
      return {
        showLogin: true,
        UUID: undefined,
        prePageUrl: undefined
      }
    },
    onLoad(options) {
      console.log("登录")
    },
    methods: {
      
    },
    components: {
      mpLogin
    }
  }
</script>

<style lang="scss" src="./css/login.scss" scoped></style>
