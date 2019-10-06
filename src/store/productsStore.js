
export default {
  state: {
    productsList: [],
    productGroup: [],
    selectProducts: []
  },
  getters: {
    getProducts (state) {
      return state.productsList
    },
    getGroup (state) {
      return state.productGroup
    },
    getSelectedProducts (state) {
      return state.selectProducts
    }
  },
  mutations: {
    setProducts (state, productsList) {
      if (!state.productsList.length) {
        let _list = []
        let _group = []
        productsList.forEach(product => {
          product.skus.forEach(item => {
            _list.push(Object.assign(item, { groupName: product.group.name, groupId: product.group.id }))
          })
          _group.push(Object.assign(product.group, { isActive: false }))
        })
        state.productGroup = _group
        state.productsList = _list
      }
    },
    setNewProductList (state, buyProducts) {
      let products = state.productsList
      let _list = []
      _list = products.filter(product => {
        return !(buyProducts.find(buyProd => product.id === buyProd.id))
      })
      state.productsList = _list
    },
    setSelectedGroup (state, selectedGroups) {
      let products = []
      let newProducts = []
      products = state.productsList
      selectedGroups.forEach(group => {
        products.forEach(product => {
          if (group.id === product.groupId) newProducts.push(product)
        })
      })
      state.selectProducts = newProducts
    }
  },
  actions: {
    requestGetProducts ({ commit }) {
      return new Promise((resolve, reject) => {
        fetch('https://ssdev.superagent.ru/TestApp/Values/GetWithParent').then((response) => {
          return response.json()
        }).then((resultData) => {
          commit('setProducts', resultData)
          resolve()
        }).catch((error) => {
          commit('setProducts', [])
          reject(error)
        })
      })
    }
  }
}
