<template lang="pug">
.products-view
  .filter
    FilterSection
  .cart(class="d-flex justify-center")
    v-btn(@click="buyProduct")
      img(src='@/assets/cart.png' width="20px" height="20px")
      | В корзину
  .table
    ProductsTable

</template>

<script>
import ProductsTable from './components/ProductsTable'
import FilterSection from './components/FilterSection'

export default {
  name: 'ProductsView',
  components: { ProductsTable, FilterSection },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    buyProduct () {
      this.$root.$emit('buyProducts')
      this.$root.$emit('clearCheckbox', true)
    }
  },
  created () {
    this.$store.dispatch('requestGetProducts').then(() => {
    })
  }
}
</script>
