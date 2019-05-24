import Vue from 'vue'
import Vuex from 'vuex'

import func from './functions'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

const Snacks = {
  namespaced: true,
  state: {
    snackbars: []
  },
  mutations: {
    ADD_SNACKBAR: (state, snackbar) => state.snackbars.push(snackbar),
    REMOVE_FIRSTSNACK: state => state.snackbars.splice(0,1),
    HIDE_FIRSTSNACK: state => state.snackbars[0].show = false
  },
  actions: {
    addSnack ({commit, rootGetters}, options) {

      let opt = {}

      opt.show        = false
      opt.right       = options.posx==='right'
      opt.left        = options.posx==='left'
      opt.bottom      = options.posy==='bottom'
      opt.top         = options.posy==='top'
      opt.multiline   = options.mode==='multiline' || options.mode==='multi-line' || options.msg.length > 50
      opt.vertical    = options.mode==='vertical'
      opt.color       = options.color || ( rootGetters['App/darkMode']===true ? 'dark' : 'white' )
      opt.textcolor   = options.textcolor || ( rootGetters['App/darkMode']===true ? 'white' : 'text--darken-3 grey' )
      opt.msg         = options.msg || '/!\\ MESSAGE NOT DEFINED'
      opt.timeout     = options.timeout || 6000
      opt.btn         = options.btn || true
      opt.btnflat     = options.btnflat || true
      opt.outline     = options.outline || false
      opt.btncolor    = options.btncolor || options.color || 'info'

      commit('ADD_SNACKBAR', opt)
    },
    removeFirst: ({commit}) => commit('REMOVE_FIRSTSNACK'),
    hideSnack: ({commit}) => {
      commit('HIDE_FIRSTSNACK')
      setTimeout(() => commit('REMOVE_FIRSTSNACK'), 250)
    }
  },
  getters: {
    getAllSnacks: state => state.snackbars,
    getFirstSnack: state => state.snackbars[0] || {}
  }
}

const App = {
  namespaced: true,
  state: {
    releases: [],
    contributors: [],
    darkmode: false,
  },
  mutations: {
    SET_RELEASES: (state, releases) => state.releases = releases,
    SET_CONTRIBUTORS: (state, contributors) => state.contributors = contributors,
    SET_DARKMODE: (state, mode) => state.darkmode = mode,
  },
  actions: {
    fetchAll: ({ dispatch }) => {
      dispatch('fetchReleases')
      dispatch('fetchContributors')
    },
    fetchReleases: async ({ commit }) => {
      const data = await func.httpGet({url: 'https://api.github.com/repos/SkinsRestorer/SkinsRestorerX/releases'})
      commit('SET_RELEASES', data.data)
    },
    fetchContributors: async ({ commit }) => {
      const data = await func.httpGet({url: 'https://api.github.com/repos/SkinsRestorer/SkinsRestorerX/contributors'})
      commit('SET_CONTRIBUTORS', data.data)
    },
    setDarkMode: ( { commit }, mode ) => {
      commit('SET_DARKMODE', mode)
    },
  },
  getters: {
    allReleases: state => state.releases,
    latestRelease: state => state.releases[0] || null,
    darkMode: state => state.darkmode,
  }
}



export default new Vuex.Store({
  modules: {
    App, Snacks
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  plugins: [createPersistedState()],
})
