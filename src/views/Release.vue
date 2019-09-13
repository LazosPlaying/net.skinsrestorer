<template>
  <div>
    <v-card v-if="!release">
      <v-card-text class="text-xs-center">
        Loading . . .
      </v-card-text>
    </v-card>
    <v-card v-if="!!release">
      <v-card-title>
        <v-layout row wrap>
          <v-flex xs10 sm9 md7 lg8>
            <v-img
              :src="release.author.avatar_url"
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
              >{{ release.name }}</span>
              <br>
              <span style="font-weight:500;font-size:small;">
                <a :href="release.author.html_url" target="_blank">{{ release.author.login }}</a> published <timeago :datetime="release.published_at"></timeago>
              </span>
            </span>
          </v-flex>
          <v-flex xs12 text-xs-right sm3 md5 lg4>
            <v-btn
              v-for="(k, l) in release.assets"
              :key="l"
              :href="k.browser_download_url"
              flat
              small
              outline
              exact
              color="info"
              class="elevation-3"
            ><v-icon class="mr-2">mdi-cloud-download</v-icon>{{ $vuetify.breakpoint.mdAndUp ? k.name + ' - ' : '' }}{{ String(k.download_count).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }}</v-btn>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-card-text v-html="markdown2html(release.body)"></v-card-text>
      <v-card-actions class="pa-3">
        <v-btn
          flat
          outline
          exact
          :to="{name:'home'}"
          color="success"
          class="elevation-3 ma-2"
        ><v-icon class="mr-1">mdi-arrow-left</v-icon>{{ $vuetify.breakpoint.smAndUp ? 'BACK HOME' : '' }}</v-btn>
        <v-btn
          flat
          outline
          exact
          color="grey lighten-1"
          class="elevation-3 ma-2 square"
          :href="release.html_url"
          target="_blank"
        ><v-icon>mdi-github-circle</v-icon>{{ $vuetify.breakpoint.smAndUp ? '&nbsp;VIEW ON GITHUB' : '' }}</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import showdown from 'showdown'
import Store from '@/store'

export default {
  name: 'Release',
  data: ()=>{return {

  }},
  computed: {
    release () {
      return Store.getters['App/allReleases'].find(el => {return el.node_id === this.$route.params.node_id }) || false
    }
  },
  methods: {
    markdown2html: (md) => {
      const converter = new showdown.Converter()
      return converter.makeHtml(md)
    }
  }
}
</script>
<style scoped>
.v-btn.square {
  padding: 0 8px;
  min-width: unset;
}
a {
  text-decoration: unset;
}
</style>
