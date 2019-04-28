import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Releases ={
  state: {
    releases: []
  },
  mutations: {

  },
  actions: {
  },
  getters: {
    allReleases: state => state.releases,
    latestRelease: state => state.releases[0]
  }
}

export default new Vuex.Store({
  modules: {
    Releases
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
})
