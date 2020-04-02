// import { createNamespacedHelpers } from 'vuex'
// const { mapState, mapActions } = createNamespacedHelpers('my')
import API from '@/serve/api'

const state = {
  showData: '',
  userName: '111',
  avatar: '111'
}

const mutations = {
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