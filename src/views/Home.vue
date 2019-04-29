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
          class="elevation-4 circle"
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
            class="elevation-3"
          ><v-icon class="mr-1">mdi-cloud-download</v-icon>{{ k.name }} - {{ k.download_count }}</v-btn>
        </div>
      </v-card-title>
      <v-card-text v-html="
        i.body.length > 500 ? 
          i.body.replace(/^\\r\\n|\\r|\\n|[\n\r]$/gm, `<br>`).slice(0, 500)+' ...' :
          i.body.replace(/^\\r\\n|\\r|\\n|[\n\r]$/gm, `<br>`)
      "></v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          flat
          outline
          exact
          :to="{name:'release',params:{node_id: i.node_id}}"
          color="success"
          class="elevation-3"
        >READ MORE<v-icon class="ml-1">mdi-arrow-right</v-icon></v-btn>
      </v-card-actions>
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

  }
}
</script>
<style>
a {
  text-decoration: unset;
}
</style>
