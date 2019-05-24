<template>
  <v-toolbar app>
    <v-btn 
      flat
      exact
      :to="{name: 'home'}"
    >
      <span>SkisnRestorer.net</span>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn
      flat
      exact
      :to="latestHref"
    >
      <span class="mr-2">Latest Release</span>
    </v-btn>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          flat
          :disabled="disabledReload"
          @click.stop="fetchAll"
          v-on="on"
        >
          <v-icon>mdi-rotate-left</v-icon>
        </v-btn>
      </template>
      <span>Update data</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          flat
          @click.stop="toggleDarkMode"
          v-on="on"
        >
          <v-icon v-if="appDark">mdi-weather-night</v-icon>
          <v-icon v-else>mdi-weather-sunny</v-icon>
        </v-btn>
      </template>
      <span>Toggle dark mode</span>
    </v-tooltip>
  </v-toolbar>
</template>
<script>
import Store from '@/store'
export default {
  name: 'Toolbar',
  data: ()=>{return {
    disabledReload: false
  }},
  computed: {
    appDark: () => Store.getters['App/darkMode'],
    latestHref () {
      return {
        name: 'release',
        params: {
          node_id: Store.getters['App/latestRelease'] ? Store.getters['App/latestRelease'].node_id : ''
        }
      }
    }
  },
  methods: {
    toggleDarkMode () {
      Store.dispatch('App/setDarkMode', !this.appDark)
    },
    fetchAll () {
      this.disabledReload = true
      setTimeout(() => this.disabledReload = false, 1000);
      Store.dispatch('App/fetchAll')
    }
  },
}
</script>
