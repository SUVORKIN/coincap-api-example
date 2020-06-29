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
      const url = `https://api.coincap.io/v2/candles?exchange=${this.$route.query.exchangeId || 'binance'}&interval=h8&baseId=${this.$route.query.baseId || 'bitcoin'}&quoteId=${this.$route.query.quoteId || 'tether'}`
      let response = await fetch(url, {
        method: 'GET'
      })
      if (response.ok) {
        let json = await response.json()
        if (!json.data.length) {
          this.$store.dispatch('message', 'No Data')
        }
      } else {
        this.$store.dispatch('message', response.status)
      }
    }
  }
}
</script>
