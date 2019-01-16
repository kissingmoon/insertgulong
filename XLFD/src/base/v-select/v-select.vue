<template>
    <div class="selection-component">
      <div class="selection-show flex flex-align-center" :class="{ isActive: isDrop }" @click="toggleDrop">
        <span class="input flex-3 flex flex-center">{{ selections[nowIndex].label }}</span>
        <div class="arrow flex-1"><i data-v-feb862c8="" :class="[isDrop?'icon-arrows-up':'icon-arrows-below']"></i></div>
      </div>
      <div class="selection-list" v-if="isDrop">
        <ul>
          <li class="flex flex-align-center" v-for="(item, index) in selections" @click="chooseSelection(index)" :key="index">
            <span class="flex-3 flex flex-center">{{ item.label }}</span>
            <span class="flex-1"></span>
            </li>
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
    position:relative;
    .selection-list{
      position:absolute;
      height: 5rem;
      width: 2rem;
      overflow: auto;
      background: #ffffff;
      // border: 1px solid #dcdee2;
      box-shadow: 0 1px 6px rgba(0,0,0,.2);
      top:0.85rem;
      border-radius: 4px;
      li{
        height: 0.5rem;
      }
    }
    .selection-show{
      border: 1px solid #dcdee2;
      border-radius: 4px;
      width: 2rem;
      height: 0.7rem;
      .input{
        
      }
    }
    .isActive{
      border: 1px solid #DA1C36;
      box-shadow: 0 0 0 1px rgba(241, 38, 38, 0.2);
    }
}
</style>