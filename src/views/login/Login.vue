<template>
  <div class="login">
    <div class="login-header">
      <div class="parent">
        <img :src="img" class="img" />
        <div>{{title}}</div>
      </div>
    </div>
    <div class="login-footer">
      <div class="border-wrapper">
        <input type="tel" class="account" placeholder="请输入手机号" maxlength="11" v-model="account" />
        <div class="yanzhengma" :class="{'lihight': isSengVerify&&isTimeRun}" @click="getVerify">
          <span>{{verify}}</span>
        </div>
      </div>
      <div class="border-wrapper pwd">
        <input type="number" maxlength="6" placeholder="请输入短信验证码" class="account" v-model="pwd" />
      </div>
      <button class="login-buttom" :class="{'lihight': isSengVerify&&isLogin}" @click="login">登录</button>
    </div>
  </div>
</template>

<script>
const PHONE_REG = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
const VERIFY = "发送验证码";
const TIME_COUNT = 60;
import { setLocalStorage } from "@/serve/localstorage.js";
export default {
  data() {
    return {
      img:
        "http://s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:9096d347/7a5ff05b334e0debdd10954a7f5d4789.png",
      title: "美团外卖",
      account: "",
      verify: VERIFY,
      pwd: "",
      timerVariable: null,
      timeCount: TIME_COUNT
    };
  },
  created() {},
  computed: {
    isSengVerify() {
      return PHONE_REG.test(this.account);
    },
    isTimeRun() {
      return this.verify === VERIFY;
    },
    isLogin() {
      return this.pwd.length === 4;
    }
  },
  methods: {
    getVerify() {
      if (this.isSengVerify && this.isTimeRun) {
        const that = this;
        this.$API.getVerityCode(this.account).then(data => {
          if (data.data.data) {
            that.timerVariable = setInterval(() => {
              that.verify = that.timeCount + "s";
              that.timeCount--;
            }, 1000);
            that.$store.dispatch("setShowData", "验证码发送成功");
          } else{
            that.$store.dispatch("setShowData", "验证码发送失败");
          }
        });
      }
    },
    login() {
      if (this.isLogin && this.isSengVerify) {
        const that = this;
        this.$API
          .login(this.account, this.pwd)
          .then(data => {
            const token = data.data.data.token;
            if (token) {
              setLocalStorage("token", token);
              that.$store.commit("setToken", token);
              // 是不是由其他的页面跳转到登录页，不是登录后跳转到首页
              const router = { name: "index" };
              that.$router.push(router);
              that.$store.dispatch("setShowData", "登录成功");
            } else {
              that.$store.dispatch("setShowData", "登录失败");
            }
          })
          .catch(() => {
            that.$store.dispatch("setShowData", "登录失败");
          });
        // 清除定时器
        this.timeCount = -1;
      }
    }
  },
  watch: {
    timeCount(newValue) {
      if (newValue === -1) {
        clearInterval(this.timerVariable);
        this.timeCount = TIME_COUNT;
        this.verify = VERIFY;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './login.styl';
</style>