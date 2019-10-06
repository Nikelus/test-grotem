<template lang="pug">
div
  v-row(justify="space-around")
    v-checkbox(v-for="group in groups" :key="group.id" @change="selectGroup(false)" v-model="group.isActive" :label="group.name")

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FilterSection',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      groups: 'getGroup'
    })
  },
  methods: {
    selectGroup (clear) {
      let selected = []
      if (clear) {
        this.groups.forEach(e => {
          e.isActive = false
        })
      } else {
        selected = this.groups.filter(group => group.isActive)
      }
      this.$store.commit('setSelectedGroup', selected)
      this.$root.$emit('updateSelectList')
    }
  },
  created () {
    this.$root.$on('clearCheckbox', this.selectGroup)
  }
}
</script>
