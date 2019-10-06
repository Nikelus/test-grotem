import Vue from 'vue'
import Vuex from 'vuex'
import productsStore from '@/store/productsStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    productsStore
  }
})
