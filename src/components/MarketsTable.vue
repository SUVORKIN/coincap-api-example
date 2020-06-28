<template>
  <div>
    <v-data-table
      hide-actions
      disable-initial-sort
      :headers="headers"
      :items="markets"
      class="elevation-1"
      v-if="markets.length"
    >
      <template v-slot:items="props">
        <tr class="market-table-item" :class="props.item.change">
          <td>{{ props.item.baseSymbol + '/' + props.item.quoteSymbol }}</td>
          <td class="text-xs-left">{{ Number(props.item.priceQuote).toFixed(2) }}</td>
          <td class="text-xs-left">
            <MarketsTablePrice :price="Number(props.item.priceUsd)" />
          </td>
          <td class="text-xs-left">{{ getVolume(props.item.volumeUsd24Hr) }}</td>
          <td class="text-xs-left">{{ Number(props.item.percentExchangeVolume).toFixed(2) + '%' }}</td>
          <td class="text-xs-left">{{ props.item.tradesCount24Hr }}</td>
          <td class="text-xs-left">
            <v-btn
              @click="$router.push({ name: 'chart', query: { exchangeId: props.item.exchangeId, baseId: props.item.baseId, quoteId: props.item.quoteId } })"
              icon
              small
            >
              <v-icon>launch</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import MarketsTablePrice from '@/components/MarketsTablePrice'
export default {
  name: 'ExchangesTable',
  data () {
    return {
      tradesWs: null,
      updateDelay: 2,
      headers: [
        { text: 'Pair', align: 'start', sortable: true, value: 'baseSymbol' },
        { text: 'Rate', value: 'priceQuote' },
        { text: 'Price', value: 'priceUsd' },
        { text: 'Volume (24Hr)', value: 'volumeUsd24Hr' },
        { text: 'Volume (%)', value: 'percentExchangeVolume' },
        { text: 'Trades (24Hr)', value: 'tradesCount24Hr' },
        { text: 'Charts', sortable: false }
      ]
    }
  },
  props: {
    markets: Array
  },
  created () {
    if (this.markets.length) {
      this.connectWebSocket()
    }
  },
  watch: {
    markets (markets) {
      if (!this.tradesWs) {
        this.connectWebSocket()
      }
    }
  },
  methods: {
    getVolume (value) {
      let volumeNumber = Number(value)
      if (volumeNumber > 1000000000) {
        volumeNumber = '$' + (volumeNumber / 1000000000).toFixed(2) + 'b'
      } else if (volumeNumber > 1000000) {
        volumeNumber = '$' + (volumeNumber / 1000000).toFixed(2) + 'm'
      } else if (volumeNumber > 1000) {
        volumeNumber = '$' + (volumeNumber / 1000).toFixed(2) + 'k'
      }
      return volumeNumber
    },
    getPrice (value) {
      let priceNumber = Number(value).toFixed(2)
      return '$' + priceNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    connectWebSocket () {
      const exchangeId = this.$route.params.id
      this.tradesWs = new WebSocket(`wss://ws.coincap.io/trades/${exchangeId}`)
      this.tradesWs.onmessage = msg => {
        this.updateMarkets(JSON.parse(msg.data))
      }
    },
    updateMarkets (newData) {
      let markets = this.markets
      let indexOfMarketToUpdate = markets.findIndex(item =>
        item.baseId === newData.base && item.quoteId === newData.quote
      )
      let marketToUpdate = markets[indexOfMarketToUpdate]
      if (indexOfMarketToUpdate > -1 && newData.timestamp - marketToUpdate.updated > this.updateDelay * 1000) {
        marketToUpdate.updated = newData.timestamp
        marketToUpdate.priceUsd = newData.priceUsd
        marketToUpdate.priceQuote = newData.price
        this.markets.splice(indexOfMarketToUpdate, 1, marketToUpdate)
      }
    }
  },
  beforeDestroy () {
    if (this.tradesWs) {
      this.tradesWs.close()
    }
  },
  components: {
    MarketsTablePrice
  }
}
</script>
