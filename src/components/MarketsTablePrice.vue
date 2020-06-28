<template>
  <div :class="change" class="market-price">${{ formattedPrice }}</div>
</template>

<script>
export default {
  name: 'MarketsTablePrice',
  data () {
    return {
      highlightTimeout: null,
      change: ''
    }
  },
  props: {
    price: Number
  },
  watch: {
    formattedPrice (newPrice, oldPrice) {
      clearTimeout(this.highlightTimeout)
      let change = ''
      if (oldPrice && oldPrice > newPrice) {
        change = 'down'
      } else if (oldPrice < newPrice) {
        change = 'up'
      } else if (oldPrice === newPrice) {
        change = ''
      }
      this.highlightPrice(change)
    }
  },
  computed: {
    formattedPrice () {
      return this.formatPrice(this.price)
    }
  },
  methods: {
    formatPrice (value) {
      return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    highlightPrice (change = '') {
      this.change = change
      this.highlightTimeout = setTimeout(() => {
        this.change = ''
      }, (400))
    }
  }
}
</script>

<style>
.market-price {
  transition: all 0.3s ease-out;
}
.market-price.up {
  color: green;
}
.market-price.down {
  color: red;
}
</style>
