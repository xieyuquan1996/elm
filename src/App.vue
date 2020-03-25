<template>
  <div class="app">
    <router-view class="contain" />
  </div>
</template>

<script>
import {getLocalStorage} from '@/serve/localstorage'
export default {
  created(){
    if(!this.$store.token){
      const token = getLocalStorage('token')
      if(token){
        this.$store.commit('setToken',token)
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.app
  height: 100%
  .foot
    position: fixed
    width: 100%
    z-index: 10
    height 1.28rem
    bottom: 0
    background-color: #141d27
</style>
