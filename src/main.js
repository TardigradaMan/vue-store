import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import vuetify from './plugins/vuetify'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

import BuyModalComponent from './components/Shared/BuyModal'

Vue.component('app-buy-modal', BuyModalComponent)

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: '',
  authDomain: 'my-project-vue-ads.firebaseapp.com',
  databaseURL: 'https://my-project-vue-ads.firebaseio.com',
  projectId: 'my-project-vue-ads',
  storageBucket: 'my-project-vue-ads.appspot.com',
  messagingSenderId: '',
  appId: '',
  measurementId: ''
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      async mounted() {
        await this.$store.dispatch('fetchAds')
      },
      render: h => h(App)
    }).$mount('#app')
  }
})
