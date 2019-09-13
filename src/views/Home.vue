<template>
  <div>
    <v-card 
      class="my-4"
      v-for="(i, j) in releases"
      :key="j"

    >
      <v-card-title>
        <v-layout row wrap>
          <v-flex xs10 sm9 md7 lg8>
            <v-img
              :src="i.author.avatar_url"
              :lazy-src="'/img/transparent.svg'"
              aspect-ratio="1"
              class="elevation-4 circle mr-2"
              style="height:50px;width:50px;float:left;"
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
            <span>
              <span
                style="font-weight:bold;font-size:large;word-break:break-all;"
              >{{ i.name }}</span>
              <br>
              <span style="font-weight:500;font-size:small;">
                <a :href="i.author.html_url" target="_blank">{{ i.author.login }}</a> published <timeago :datetime="i.published_at"></timeago>
              </span>
            </span>
          </v-flex>
          <v-flex xs12 text-xs-right sm3 md5 lg4>
            <v-btn
              v-for="(k, l) in i.assets"
              :key="l"
              :href="k.browser_download_url"
              flat
              outline
              exact
              color="info"
              class="elevation-3"
            ><v-icon class="mr-2">mdi-cloud-download</v-icon>{{ $vuetify.breakpoint.mdAndUp ? k.name + ' - ' : '' }}{{ String(k.download_count).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }}</v-btn>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-card-text 
        v-html="markdown2html(i.body, 200).html"
      ></v-card-text>
      <v-card-actions class="pa-3">
        <v-spacer></v-spacer>
        <v-btn
          flat
          outline
          exact
          :to="{name:'release',params:{node_id: i.node_id}}"
          color="success"
          class="elevation-3 ma-2"
        >READ MORE<v-icon class="ml-1">mdi-arrow-right</v-icon></v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import showdown from 'showdown'
import trimhtml from '../plugins/trimhtml'
import Store from '../store'

export default {
  name: 'HomeRoute',
  data: () => {return {

  }},
  computed: {
    releases: () => Store.getters['App/allReleases'],
  },
  methods: {
    getReleases () {
      return this.releases.map(el => {
        return {
          ...el,
          assets: assets.filter(a => !a.browser_download_url ? false : a.browser_download_url.endsWith('.jar'))
        }
      })
    },
    markdown2html: (md, limit = 200) => {
      const converter = new showdown.Converter()
      const html = converter.makeHtml(md)
      const trimmedHtml = trimhtml(html, { limit: limit })
      return trimmedHtml
    }
  }
}
</script>
<style>
a {
  text-decoration: unset;
}
</style>
