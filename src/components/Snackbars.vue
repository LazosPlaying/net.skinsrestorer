<template>
    <v-snackbar
    v-if="typeof snack === 'object'"
    v-model="snack.show"
    :bottom="snack.bottom"
    :left="snack.left"
    :multi-line="snack.multiline"
    :right="snack.right"
    :timeout="snack.timeout"
    :top="snack.top"
    :vertical="snack.vertical"
    :color="snack.color"
  >
    <span
      :class="`${snack.textcolor}--text`"
      v-html="snack.msg"
    ></span>
    <v-btn
      v-if="snack.btn"
      :color="snack.btncolor"
      :flat="snack.btnflat"
      :outline="snack.outline"
      @click="hideSnack"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>
<script>
import Store from '@/store'

export default {
  name: 'componentSnackBar',
  data () {return {
    timer: null,
    timerIsRunning: false,
    snack: {}
  }},
  computed: {
    firstSnack: () => Store.getters['Snacks/getFirstSnack'], 
    allSnacks: () => Store.getters['Snacks/getAllSnacks']
  },
  watch: {
    firstSnack () { this.runTimer() }
  },
  methods: {
    clearInterval: interval => clearInterval(interval),
    runTimer () {
      this.snack = this.firstSnack
      if ( !this.timerIsRunning && this.snack.show!==undefined) {
        this.timerIsRunning = true
        this.snack.show = true 
        this.timer = setTimeout(() => { 
          this.hideSnack()
        }, this.snack.timeout);
      }
    },
    hideSnack () {
      this.snack.show = false
      setTimeout(()=>{
        this.clearInterval(this.timer)
        Store.dispatch('Snacks/hideSnack')
        this.timerIsRunning = false
      }, 250)
    }
  },
  mounted () {
    if (this.allSnacks.length > 0) this.runTimer()
  }
}
</script>
