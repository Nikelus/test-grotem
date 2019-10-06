<template lang="pug">
.myTable
  v-data-table(
    v-model="selected"
    :headers="headers"
    :items="productList"
    :single-select="singleSelect"
    show-select
    class="elevation-1")
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProductsTable',
  data () {
    return {
      singleSelect: false,
      selected: [],
      headers: [
        { text: 'Товар', value: 'name' },
        { text: 'Категория', value: 'groupName', sortable: false },
        { text: 'Цена', value: 'price' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      productList: 'getProducts',
      selectedProducts: 'getSelectedProducts'
    })
  },
  methods: {
    getSelected () {
      this.selected = this.selectedProducts
    },
    addCart () {
      this.$store.commit('setNewProductList', this.selected)
      this.selected = []
    }
  },
  created () {
    this.$root.$on('updateSelectList', this.getSelected)
    this.$root.$on('buyProducts', this.addCart)
  }
}
</script>
