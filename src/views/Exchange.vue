<template>
  <div class="text-xs-left">
    <v-layout v-if="markets" column justify-center>
      <MarketsTable :markets="markets" />
      <v-flex class="mt-3" text-xs-center>
        <v-btn :disabled="!markets.length" @click="fetchExchange()" round color="success">Load more</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import MarketsTable from '@/components/MarketsTable'
export default {
  name: 'Exchange',
  data () {
    return {
      markets: [],
      limit: 10,
      offset: 0
    }
  },
  mounted () {
    this.fetchExchange()
  },
  methods: {
    async fetchExchange () {
      const url = `https://api.coincap.io/v2/markets?exchangeId=${this.$route.params.id}&limit=${this.limit}&offset=${this.offset}`
      let response = await fetch(url, {
        method: 'GET'
      })
      // another way to fetch data
      if (response.ok) {
        let json = await response.json()
        if (json.data.length) {
          let sortedMarkets = json.data.sort((a, b) => {
            if (Number(a.volumeUsd24Hr) > Number(b.volumeUsd24Hr)) {
              return -1
            } else {
              return 1
            }
          })
          this.markets = [...this.markets, ...sortedMarkets]
          this.offset = this.markets.length
        } else {
          this.$store.dispatch('message', 'No Data')
        }
      } else {
        this.$store.dispatch('message', 'error: ' + response.status)
      }
    }
  },
  components: {
    MarketsTable
  }
}
</script>
