import Vue from 'vue'
import Vuex from 'vuex'
import LOCATIONS from '@/MOCK_DATA'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mapInstance: null,
    locations: [],
    fetchingLocations: null
  },
  getters: {
    mapInstance: state => state.mapInstance,
    locations: state => state.locations
  },
  mutations: {
    setMapInstance(state, mapInstance) {
      state.mapInstance = mapInstance
    },
    setFetchingLocations(state, fetchingLocations) {
      state.fetchingLocations = fetchingLocations
    },
    setLocations(state, locations) {
      state.locations = locations
    }
  },
  actions: {
    fethcLocations({commit, state}) {
      if(state.fetchingLocations) {
        return state.fetchingLocations
      }
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          // console.log('LOCATIONS', LOCATIONS);

          commit('setLocations', LOCATIONS)
          commit('setFetchingLocations', null)
          resolve()
        }, 2000)
      })
      commit('setFetchingLocations', promise)
      return promise
    },
    getAddress(context, payload) {
      fetch(`https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${payload.lat}&lon=${payload.lng}`)
        .then(resp => console.log('resp', resp))
    }
  }
})
