<template>
  <div class="uesr">
    <div class="user-content" @click="loginOrOut">
      <div>
        <img :src="avatar" class="img">
      </div>
      <div>
        {{userName}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      userName: '123456',
      avatar: '',
      loginStatus: true
    }
  },
  methods: {
    loginOrOut(){
      if(this.loginStatus){
        this.loginOut()
      } else {
        this.login()
      }
    },
    login(){
      console.log('登录')
    },
    loginOut(){
      console.log('退出登录成功')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './user.styl'
</style>