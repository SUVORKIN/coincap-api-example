<template>
  <div id="chartdiv"></div>
</template>
<script>

export default {
  name: 'Chart',
  data: function () {
    return {
    }
  },
  created () {
    this.fetchCandles()
  },
  props: {
    baseId: String,
    quoteId: String
  },
  methods: {
    // example of async fetch function
    async fetchCandles () {
      const url = `https://api.coincap.io/v2/candles?exchange=${this.$route.query.exchangeId}&interval=h8&baseId=${this.$route.query.baseId}&quoteId=${this.$route.query.quoteId}`
      let response = await fetch(url, {
        method: 'GET'
      })
      if (response.ok) {
        // let json = await response.json()
      } else {
        this.$store.dispatch('message', response.status)
      }
    }
  }
}
</script>
