<template>
  <code style="width:100%;padding:1em;">{{ JSON.stringify(releases, null, 2) }}</code>
</template>

<script>
import Store from '@/store'

export default {
  name: 'HomeRoute',
  data: () => {return {

  }},
  computed: {
    releases: () => Store.getters['App/allReleases'],
  },
  methods: {

  },
  mounted () { Store.dispatch('App/fetchAll') }
}
</script>
