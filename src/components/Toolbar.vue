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
    <v-btn
      flat
      :disabled="disabledReload"
      @click.stop="fetchAll"
    >
      <v-icon>mdi-rotate-left</v-icon>
    </v-btn>
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
    fetchAll () {
      this.disabledReload = true
      setTimeout(() => this.disabledReload = false, 1000);
      Store.dispatch('App/fetchAll')
    }
  },
}
</script>
