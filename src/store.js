import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mapInstance: null,
  },
  getters: {
    mapInstance: state => state.mapInstance,
  },
  mutations: {
    setMapInstance(state, mapInstance) {
      state.mapInstance = mapInstance
    },
    setSelectedAddress(state, address) {
      state.selectedAddress = address
      console.log('address', state.selectedAddress)
    }
  },
  actions: {
    getAddress({ commit }, payload) {
      fetch(`https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${payload.lat}&lon=${payload.lng}`)
        .then(resp => resp.json())
        .then(data => {
          console.log('data', data)
          commit('setSelectedAddress', data.features[0].properties.address)
        })
    }
  }
})
