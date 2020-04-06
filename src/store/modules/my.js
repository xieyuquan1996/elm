// import { createNamespacedHelpers } from 'vuex'
// const { mapState, mapActions } = createNamespacedHelpers('my')
import API from '@/serve/api'

const state = {
  userName: '',
  token: '',
  avatar: ''
}

const mutations = {
  setToken(state, token){
    state.token = token
  },
  setUserName(state, userName){
    state.userName = userName
  },
  setAvatar(state, avatar){
    state.avatar = avatar
  }
}

const actions = {
  getUserInfo({ commit  }){
    API.getters().then(data => {
      if(data.data.data){
        commit('setUserName', data.data.data.userName)
        commit('setAvatar', data.data.data.avatar)
      }
    })
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}