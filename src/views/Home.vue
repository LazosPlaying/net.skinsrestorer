<template>
  <div>
    <v-card 
      class="my-4"
      v-for="(i, j) in releases"
      :key="j"

    >
      <v-card-title>
        <span class="mr-1">
          <v-img
          :src="i.author.avatar_url"
          :lazy-src="'/img/transparent.svg'"
          aspect-ratio="1"
          style="height:43px;width:43px;"
        >
          <template v-slot:placeholder>
            <v-layout
              fill-height
              align-center
              justify-center
              ma-0
            >
              <v-progress-circular indeterminate color="grey lighten-2"></v-progress-circular>
            </v-layout>
          </template>
        </v-img>
        </span>
        <span>
          <span
            style="font-weight:bold;font-size:large;"
          >{{ i.name }}</span>
          <br>
          <span style="font-weight:500;font-size:small;">
            <a :href="i.author.html_url">{{ i.author.login }}</a> published <timeago :datetime="i.published_at"></timeago>
          </span>
        </span>
        <v-spacer></v-spacer>
        <div
          v-for="(k, l) in i.assets"
          :key="l"
        >
          <v-btn
            v-if="!k.browser_download_url ? false : k.browser_download_url.endsWith('.jar')"
            :href="i.assets[0].browser_download_url"
            flat
            small
            outline
            exact
            color="info"
          ><v-icon class="mr-1">mdi-cloud-download</v-icon>{{ k.name }}</v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          flat
          outline
          exact
          :to="{name:'release',params:{node_id: i.node_id}}"
          color="success"
        >READ MORE</v-btn>
      </v-card-actions>
    </v-card>
    <v-card>
      <code style="width:100%;padding:1em;">{{ JSON.stringify(releases, null, 2) }}</code>
    </v-card>
  </div>
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
<style>
a {
  text-decoration: unset;
}
</style>
