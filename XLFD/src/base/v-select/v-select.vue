<template>
    <div class="selection-component">
      <div class="selection-show" @click="toggleDrop">
        <span>{{ selections[nowIndex].label }}</span>
        <div class="arrow"></div>
      </div>
      <div class="selection-list" v-if="isDrop">
        <ul>
          <li v-for="(item, index) in selections" @click="chooseSelection(index)" :key="index">{{ item.label }}</li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    selections: {
      type: Array,
      default: function () {
          return [{
          label: 'test',
          value: 0
        },{
          label: 'test1',
          value: 1
        }]
      } 
    }
  },
  data () {
    return {
      isDrop: false,
      nowIndex: 0
    }
  },
  methods: {
    toggleDrop () {
      this.isDrop = !this.isDrop
    },
    chooseSelection (index) {
      this.nowIndex = index
      this.isDrop = false
      this.$emit('change', this.selections[this.nowIndex])
    }
  }
}
</script>

<style lang="scss" scoped>
.selection-component{
  
    .selection-list{
      position:absolute;
      height: 5rem;
      overflow: auto;
      background: #ffffff;
    }
}
</style>