<template>
  <v-app :dark="appDark" class="background">
    <Toolbar />
    <Sidebar />

    <v-content class="ma-2 background-transparent" fill-height>
      <v-container grid-list-xs>
        <transition name="fade" mode="out-in" appear>
          <router-view></router-view>
        </transition>
      </v-container>
    </v-content>

    <swUpdateSnackbar />
    <Snackbars />
  </v-app>
</template>

<script>
import Store from '@/store'

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
  },
  mounted () { Store.dispatch('App/fetchAll') }
}
</script>
<style>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s }
.fade-enter, .fade-leave-active { opacity: 0 }

.background-transparent,
.application--wrap,
.background {
  background: transparent !important;
}
.background::before {
  content: ' ';
  margin-bottom: -12vh;
  width: 100vw;
  height: 112vh;

  z-index: -1;
  position: fixed;
  
  background-color: #bfafa1;

  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("/img/background.jpg"), url("/img/background-10percent.jpg");
}
</style>

