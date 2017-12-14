<template>
    <div class="cells">
        <div class="row" :key="index" v-for="(r, index) in rows">
            <div v-if="(index != 0 && (innerBorder == true || innerBorder == 'true')) || outerBorder == true || outerBorder == 'true'" class="hairline-top"></div>
            <div class="col" :key="c" v-for="c in cols" @click="cellClicked(r*cols.length + c)">
                <div class="hairline-left" v-if="(innerBorder == true || innerBorder == 'true') && c > 0"></div>
                <div class="col-inner" v-html="items[r*cols.length + c]"></div>
            </div>
        </div>
        <div v-if="outerBorder == true || outerBorder == 'true'" class="hairline-bottom"></div>
    </div>
</template>

<script>
    const range = (n) => {
      let l = []
      for (let i = 0; i < n; i++) l.push(i)
      return l
    }

    export default {
      name: 'ion-cells',

      props: {
        row: {
          type: [Number, String],
          default: 3
        },
        col: {
          type: [Number, String],
          default: 3
        },
        items: {
          type: Array,
          required: true
        },
        onCellClick: Function,
        outerBorder: {
          type: [Boolean, String],
          default: true
        },
        innerBorder: {
          type: [Boolean, String],
          default: true
        }
      },

      data () {
        return {
          rows: range(parseInt(this.row)),
          cols: range(parseInt(this.col))
        }
      },

      methods: {
        cellClicked (cellIndex) {
          if (this.onCellClick) this.onCellClick(cellIndex)
        }
      }
    }
</script>

<style lang="scss">
    @import "cells";
</style>
