<template>
<div class="login-container" v-if="!showLoginContainer">
		<!-- 微信授权登录 -->
		<customLogin v-if="showAuth && custom" @onCancel="onCancel" @login="login"></customLogin>
    <!-- 授权后的功能引导 -->
		<div class="login-dialog" v-if="showAuth && !custom">
      <img :src="close" class="close-img" @click="closePage" v-if="!custom">
      <div class="title" v-if="!custom">
        <div class="wrapper">
          <div class="back-line"></div>
        </div>
        <div class="title-content">登录后可享受以下服务</div>
      </div>
      <div class="content">
        <div class="item">
          <div class="number">1</div>
          <div class="content-text">线上便捷购物</div>
        </div>
        <div class="item">
          <div class="number">2</div>
          <div class="content-text">参与新人活动</div>
        </div>
        <div class="item">
          <div class="number">3</div>
          <div class="content-text">可领券、享受各种福利</div>
        </div>
        <div class="item">
          <div class="number">4</div>
          <div class="content-text">消费可获积分</div>
        </div>
        <div class="item">
          <div class="number">5</div>
          <div class="content-text">门店互动及服务</div>
        </div>
      </div>
      <button class="login-page-login-button" open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo" v-if="!custom">微信授权登录</button>
    </div>

		<div class="login-mask" v-if="showAuth">
			<div class="top">
				<div class="title flex-space flex-m">
					<div></div>
					<div>登录</div>
					<div></div>
				</div>
				<div class="btns">
					<button class="confirm" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">微信授权登录</button>
				</div>
				<div class="policy">
					登录即代表您已同意以下协议:<span v-for="(i, index) in rigisterRules" :key="index" @click="goRegister(i.link)">{{i.name}}</span>
				</div>
			</div>
		</div>
		<!-- 微信手机号登录 -->
		<div class="login-mask" v-else-if="showPhoneLogin">
			<div class="top">
				<div class="title flex-space flex-m">
					<div></div>
					<div>登录</div>
					<div></div>
				</div>
				<div class="btns">
					<button class="confirm" v-bind:class="{btnmove:!showAuth}" @getphonenumber="getPhoneNumber" open-type="getPhoneNumber">获取微信绑定手机号登录</button>
				</div>
				<div class="policy">
					登录即代表您已同意以下协议:<span v-for="(i, index) in rigisterRules" :key="index" @click="goRegister(i.link)">{{i.name}}</span>
				</div>
			</div>
		</div>
		<!-- 注册登陆 -->
		<div class="login-mask" v-else-if="showLogin">
			<div class="top">
				<div class="title flex-space flex-m">
					<div></div>
					<div>输入手机号码</div>
					<div></div>
				</div>
				<div class="input flex-space flex-c-m">
					<input type="number" maxlength="13" v-model="phone" cursor-spacing="150" placeholder="请输入您的手机号码">
					<div class="close-box flex-m" @click="phone = ''">
						<img :src="del">
					</div>
				</div>
				<div class="btns" @click="LoginAndVaildTrans">
					<button class="confirm">下一步</button>
				</div>
				<div class="policy">登录即代表您已同意<span @click="$router.push('/BLMPLogin/registerRule.vue')">《百联会员注册协议》</span></div>
			</div>
		</div>
		<!-- 输入验证码 -->
		<div class="login-mask" v-else-if="showVaild">
			<div class="top">
				<div class="title flex-space flex-m">
					<div class="flex-m" @click="LoginAndVaildTrans">
						<img :src="arrow">
					</div>
					<div>输入验证码</div>
					<div></div>
				</div>
				<div class="vertify-code flex-c">
					<div class="has-num flex" v-if="valueArr && valueArr.length" :class="{ 'isab': valueArr && valueArr.length }">
						<input v-for="(item, idx) in valueArr" type="number" maxlength="1" :value="item" :key="idx" disabled />
					</div>
					<div class="no-num flex">
						<input v-for="(n, i) in 6" type="number" maxlength="1" :key="i" disabled />
					</div>
				</div>
				<div class="flex-space counts" v-show="msg">
					<div></div>
					<div v-if="codeDisabled && phoneNum">{{msg}}</div>
					<div @click="getMassageCode(phoneNum)" v-else class="red">{{msg}}</div>
				</div>
				<div class="btns">
					<button class="confirm" @click="confirm">确定</button>
				</div>
			</div>
			<!-- 自定义键盘 -->
      <mp-keyboard></mp-keyboard>
		</div>
	</div>
</template>

<script>
import keyboard from '../components/keyboard/keyboard'
import constants from '../constant/config'
import api from './api/api'
  export default {
    name: 'mpLogin',
    props: {
      custom: {
        type: Boolean,
        value: false
      }
    },
    data() {
      return {
        showLoginContainer: false,
        showAuth: true, // 微信授权登录
        showPhoneLogin: true, // 手机号登录
        showLogin: true, // 展示登录
        showVaild: false, // 展示验证码
        isShow: true, // 是否显示弹框
        isCheck: false, // 是否正在进行校验
        phone: '', // 手机号
        phoneNum: '',
        msg: '', // 倒计时
        actId: '', // 获取actId
        timer: '', // 定时器
        time: 60, // 1min倒计时
      }
    },
    onLoad(options) {
      console.log("showLoginContainer", this.showLoginContainer)
      console.log("showPhoneLogin", this.showPhoneLogin)
      console.log("showAuth", this.showAuth)
      console.log("custom", this.custom)
      console.log("showLogin", this.showLogin)
      console.log("")
      console.log("")
      console.log("")
      console.log("")
      console.log("")
      console.log("")
    },
    methods: {
      bindGetUserInfo(e) {
        wx.setStorageSync("wxInfo", e.target)
        var that = this
        wx.login({
          success: res => {
            console.log("用户登录结果：", res)
            if (res.code) {
              let params = {
                js_code: res.code,
                appid: constants.$APP_ID,
                secret: constants.$SECRET,
                grant_type: constants.$GRANT_TYPE
              }
              api.queryMPOpenId(params).then(res => {
                console.log("获取openid结果：", res)
              })
            }
          },
          fail: () => {},
          complete: () => {}
        })
      },
      // 跳转web-view
      goRegister(link) {
        this.$router.push({
          path: '/pages/web/web',
          query: {
            url: link
          }
        })
      },
    },
    components: {
      'mp-keyboard': keyboard
    }
  }
</script>

<style lang="scss" src="./css/mpLogin.scss" scoped></style>