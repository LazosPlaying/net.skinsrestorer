<template>
  <v-app :dark="appDark">
    <Toolbar />
    <Sidebar />

    <v-content class="ma-2" fill-height>
        <transition name="fade" mode="out-in" appear>
          <router-view></router-view>
        </transition>
    </v-content>

    <swUpdateSnackbar />
    <Snackbars />
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
    'Toolbar': () => import('./components/Toolbar'),
    'Sidebar': () => import('./components/Sidebar'),
    'Snackbars': () => import('./components/Snackbars'),
    'swUpdateSnackbar': () => import('./components/SnackbarSwUpdated')
  },
  data () {
    return {
      appDark: false
    }
  }
}
</script>
