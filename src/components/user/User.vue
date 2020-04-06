<template>
  <div class="user">
    <div class="user-content">
      <div class="img-wrapper" :style="avatarBackground">
      </div>
      <div class="user-name">
        {{userName?userName:'请登录'}}
      </div>
    </div>
    <div class="info-wrapper">
      <p class="common" @click="loginOrLogout">{{loginTittle}}</p>
    </div>
    
  </div>
</template>

<script>
import { deleteLocalStorage } from "@/serve/localstorage";
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('my')
const { mapActions } = createNamespacedHelpers('home')
export default {
  data(){
    return {
      //userName: '123456',
      //avatar: 'url("//p1.meituan.net/codeman/e32b47a07b818bf9a1d4086a882c18a62282.png")',
      loginStatus: true
    }
  },
  computed: {
    userName(){
      return this.$store.state.my.userName
    },
    avatar(){
      return this.$store.state.my.avatar
    },
    loginTittle(){
      if(this.userName){
        return '退出登录'
      }
      return '登录'
    },
    avatarBackground(){
      if(this.avatar){
        return {
          background: 'url("'+ this.avatar.split(':')[1] +'")',
          'background-size': '100% 100%'
        }
      }
      return {}
    }
  },
  created(){
    if(!this.userName || this.userName.length < 1){
      const that = this
      this.$API.getUser().then(data =>{
        if(data.data.data){
          that.setUserName(data.data.data.userName)
          that.setAvatar(data.data.data.avatar)
        }else{
          that.setShowData(data.data.message);
        }
      })
    }
  },
  methods: {
    ...mapActions(['setShowData']),
    ...mapMutations(['setUserName', 'setAvatar']),
    loginOrLogout(){
      if(this.userName){
        this.loginOut()
      } else {
        this.login()
      }
    },
    login(){
      this.$router.push({'name': 'login'})
    },
    loginOut(){
      const that = this
      that.$API.logout().then(data => {
        if(data.data.data){
          deleteLocalStorage('token')
          that.setUserName('')
          that.setAvatar('')
          that.setShowData('退出登录成功')
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './user.styl'
</style>