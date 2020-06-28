<template>
  <div>
    <v-data-table
      disable-initial-sort
      :headers="headers"
      :items="exchanges"
      :rows-per-page-items="[20, 40]"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.rank }}</td>
        <td class="text-xs-left">
          <router-link :to="`exchanges/${props.item.exchangeId}`">{{ props.item.name }}</router-link>
        </td>
        <td class="text-xs-left">{{ props.item.tradingPairs }}</td>
        <td class="text-xs-left">{{ getVolume(props.item.volumeUsd) }}</td>
        <td class="text-xs-left">{{ Number(props.item.percentTotalVolume).toFixed(2) }}%</td>
        <td class="text-xs-left">
          <v-btn
            @click="$router.push({ name: 'exchange', params: { id: props.item.exchangeId } })"
            icon
            small
          >
            <v-icon>launch</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'ExchangesTable',
  data () {
    return {
      headers: [
        {
          text: 'Rank',
          align: 'start',
          sortable: true,
          value: 'rank'
        },
        { text: 'Name', value: 'name' },
        { text: 'Traiding Pairs', value: 'tradingPairs' },
        { text: 'Volume (24Hr)', value: 'volumeUsd' },
        { text: 'Total (%)', value: 'percentTotalVolume' },
        { text: 'Markets', sortable: false }
      ]
    }
  },
  props: {
    exchanges: Array
  },
  methods: {
    getVolume (val) {
      let volumeNumber = Number(val)
      if (volumeNumber > 1000000000) {
        volumeNumber = '$' + (volumeNumber / 1000000000).toFixed(2) + 'b'
      } else if (volumeNumber > 1000000) {
        volumeNumber = '$' + (volumeNumber / 1000000).toFixed(2) + 'm'
      } else if (volumeNumber > 1000) {
        volumeNumber = '$' + (volumeNumber / 1000).toFixed(2) + 'k'
      }
      return volumeNumber
    }
  }
}
</script>
