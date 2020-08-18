import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

class User {
  constructor(id) {
    this.id = id
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    async registerUser({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
        commit('setUser', new User(user.user.uid))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.code)
        throw error
      }
    },
    async loginUser({ dispatch, commit, getters }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')

        commit('setUser', uid)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.code)
        throw error
      }
    },
    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async autoLoginUser({ dispatch, commit }) {
      const uid = await dispatch('getUid')
      commit('setUser', uid)
    },
    async logoutUser({ commit }) {
      try {
        await firebase.auth().signOut()
        commit('setUser', null)
      } catch (e) {}
    }
  },
  getters: {
    user(state) {
      return state.user
    }
    // isUserLoggedIn (state) {
    //   return state.user !== null
    // }
  }
}
