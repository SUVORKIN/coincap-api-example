<template>
  <div class="text-xs-left">
    <v-layout class="mb-4" justify-space-between align-center>
      <div class="title">Exchanges</div>
      <v-btn dark depressed @click="fetchExchanges()">
        <v-icon>refresh</v-icon>refresh
      </v-btn>
    </v-layout>
    <ExchangesTable v-if="exchanges" :exchanges="exchanges" />
  </div>
</template>

<script>
import ExchangesTable from '@/components/ExchangesTable'
export default {
  name: 'Exchanges',
  data () {
    return {
      timerId: null,
      exchanges: null
    }
  },
  created () {
    this.fetchExchanges()
    this.timerId = setInterval(() => this.fetchExchanges(), 20000)
  },
  methods: {
    fetchExchanges () {
      const url = 'https://api.coincap.io/v2/exchanges'
      fetch(url, {
        method: 'GET'
      }).then(response =>
        response.json())
        .then(result => {
          this.exchanges = result.data
        })
        .catch(error => {
          this.$store.dispatch('message', error)
        })
    }
  },
  beforeDestroy () {
    clearInterval(this.timerId)
  },
  components: {
    ExchangesTable
  }
}
</script>
