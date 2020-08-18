import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'

class Ad {
  constructor(
    title,
    description,
    ownerId,
    imageSrc = '',
    promo = false,
    id = null
  ) {
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.imageSrc = imageSrc
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    ads: []
  },
  mutations: {
    createAd(state, payload) {
      state.ads.push(payload)
    },
    loadAds(state, payload) {
      // Загрузка объявлений с сервера
      state.ads = payload
    },
    updateAd(state, { title, description, id }) {
      const ad = state.ads.find(a => {
        return a.id === id
      })

      ad.title = title
      ad.description = description
    }
  },

  actions: {
    async createAd({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)

      const image = payload.image

      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          getters.user,
          '',
          payload.promo
        )

        const ad = await firebase
          .database()
          .ref('ads')
          .push(newAd)
        const imageExt = await image.name.slice(image.name.lastIndexOf('.')) // Расширение картинки

        const fileData = await firebase
          .storage()
          .ref(`ads/${ad.key}.${imageExt}`)
          .put(image) // Грузим в storage

        const imageSrc = await fileData.ref.getDownloadURL() // Берем URL картинки из storage

        await firebase
          .database()
          .ref('ads')
          .child(ad.key)
          .update({
            imageSrc: imageSrc
          })

        commit('setLoading', false)
        commit('createAd', {
          ...newAd,
          id: ad.key,
          imageSrc
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchAds({ commit }) {
      commit('clearError')
      commit('setLoading', true)

      const resultAds = []

      try {
        const fbVal = await firebase
          .database()
          .ref('ads')
          .once('value')
        const ads = fbVal.val()
        console.log(ads)

        Object.keys(ads).forEach(key => {
          const ad = ads[key]
          resultAds.push(
            new Ad(
              ad.title,
              ad.description,
              ad.ownerId,
              ad.imageSrc,
              ad.promo,
              key
            )
          )
        })
        commit('loadAds', resultAds)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async updateAd({ commit }, { title, description, id }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        await firebase
          .database()
          .ref('ads')
          .child(id)
          .update({
            title,
            description
          })
        commit('updateAd', {
          title,
          description,
          id
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async deleteAd({ commit, dispatch }, id) {
      commit('clearError')
      commit('setLoading', true)

      try {
        await firebase
          .database()
          .ref('ads')
          .child(id)
          .remove()

        dispatch('fetchAds')
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },

  getters: {
    ads(state) {
      return state.ads
    },
    promoAds(state) {
      return state.ads.filter(ad => {
        return ad.promo
      })
    },

    myAds(state, getters) {
      return state.ads.filter(Ad => {
        return Ad.ownerId === getters.user
      })
    },
    adById(state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId)
      }
    }
  }
}
