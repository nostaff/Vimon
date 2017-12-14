<template>
    <vm-content>
        <vm-list radio-group v-model="fontFamily" @onChange="changeFontFamily()">
            <vm-row>
                <vm-col>
                    <vm-item isLink @click.native="changeFontSize('smaller')" detail-none class="popover-text-button popover-text-smaller">A</vm-item>
                </vm-col>
                <vm-col>
                    <vm-item isLink @click.native="changeFontSize('larger')" detail-none class="popover-text-button popover-text-larger">A</vm-item>
                </vm-col>
            </vm-row>
            <vm-row class="popover-row-dots">
                <vm-col>
                    <vm-button @click.native="changeBackground('white')" role="popover-dot" class="popover-dot-white" :class="{selected: background == 'white'}"></vm-button>
                </vm-col>
                <vm-col>
                    <vm-button @click.native="changeBackground('tan')" role="popover-dot" class="popover-dot-tan" :class="{selected: background == 'tan'}"></vm-button>
                </vm-col>
                <vm-col>
                    <vm-button @click.native="changeBackground('grey')" role="popover-dot" class="popover-dot-grey" :class="{selected: background == 'grey'}"></vm-button>
                </vm-col>
                <vm-col>
                    <vm-button @click.native="changeBackground('black')" role="popover-dot" class="popover-dot-black" :class="{selected: background == 'black'}"></vm-button>
                </vm-col>
            </vm-row>
            <vm-item class="popover-text-athelas">
                <vm-label slot="item-label">Athelas</vm-label>
                <vm-radio slot="item-content" value="Athelas"></vm-radio>
            </vm-item>
            <vm-item class="popover-text-charter">
                <vm-label slot="item-label">Charter</vm-label>
                <vm-radio slot="item-content" value="Charter"></vm-radio>
            </vm-item>
            <vm-item class="popover-text-iowan">
                <vm-label slot="item-label">Iowan</vm-label>
                <vm-radio slot="item-content" value="Iowan"></vm-radio>
            </vm-item>
            <vm-item class="popover-text-palatino">
                <vm-label slot="item-label">Palatino</vm-label>
                <vm-radio slot="item-content" value="Palatino"></vm-radio>
            </vm-item>
            <vm-item class="popover-text-san-francisco">
                <vm-label slot="item-label">San Francisco</vm-label>
                <vm-radio slot="item-content" value="San Francisco"></vm-radio>
            </vm-item>
            <vm-item class="popover-text-seravek">
                <vm-label slot="item-label">Seravek</vm-label>
                <vm-radio slot="item-content" value="Seravek"></vm-radio>
            </vm-item>
            <vm-item class="popover-text-times-new-roman">
                <vm-label slot="item-label">Times New Roman</vm-label>
                <vm-radio slot="item-content" value="Times New Roman"></vm-radio>
            </vm-item>
        </vm-list>
    </vm-content>
</template>

<script>
    export default{
      name: 'comp',
      data () {
        return {
          background: '',
          contentEle: null,
          fontFamily: '',

          colors: {
            'white': {
              'bg': 'rgb(255, 255, 255)',
              'fg': 'rgb(0, 0, 0)'
            },
            'tan': {
              'bg': 'rgb(249, 241, 228)',
              'fg': 'rgb(0, 0, 0)'
            },
            'grey': {
              'bg': 'rgb(76, 75, 80)',
              'fg': 'rgb(255, 255, 255)'
            },
            'black': {
              'bg': 'rgb(0, 0, 0)',
              'fg': 'rgb(255, 255, 255)'
            }
          }
        }
      },
      created () {
        this.contentEle = this.$options.$data.contentEle

        this.background = this.getColorName(this.contentEle.style.backgroundColor)
        if (this.contentEle.style.fontFamily) {
          this.fontFamily = this.contentEle.style.fontFamily.replace(/'/g, '')
        }
      },
      methods: {

        getColorName (background) {
          let colorName = 'white'

          if (!background) return 'white'

          for (var key in this.colors) {
            if (this.colors[key].bg === background) {
              colorName = key
            }
          }

          return colorName
        },

        changeBackground (color) {
          this.background = color
          this.contentEle.style.backgroundColor = this.colors[color].bg
          this.contentEle.style.color = this.colors[color].fg
        },

        changeFontSize (fontSize) {
          this.contentEle.style.fontSize = fontSize
        },

        changeFontFamily () {
          if (this.fontFamily) this.contentEle.style.fontFamily = this.fontFamily
        }
      }

    }
</script>


<style scoped lang="scss">

    .block {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    [role="popover-dot"] {
        padding: 0;
    }

    .popover-dot-box{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    /*
      Popover
    */

    .page-api-radio-popover .ion-row,
    .page-api-radio-popover .ion-col {
        padding: 0;
    }

    .popover-text-button {
        padding-left: 0;
        text-align: center;
        min-height: 20px;
        line-height: 18px;
    }

    .popover-text-button .item-inner {
        padding-right: 0;
    }

    .popover-text-smaller {
        font-size: 12px;
    }

    .popover-text-larger {
        font-size: 16px;
    }

    .popover-row-dots {
        text-align: center;
    }

    .popover-dot {
        height: 30px;
        width: 30px;
        border-radius: 50%;
        margin: 10px auto;
        position: relative;
    }

    .popover-dot-white {
        background-color: rgb(255, 255, 255);
    }

    .popover-dot-tan {
        background-color: rgb(249, 241, 228);
    }

    .popover-dot-grey {
        background-color: rgb(76, 75, 80);
    }

    .popover-dot-black {
        background-color: rgb(0, 0, 0);
    }

    .selected .popover-dot {
        border-width: 2px !important;
        border-color: #327eff !important;
    }

    .popover-text-athelas {
        font-family: "Athelas";
    }

    .popover-text-charter {
        font-family: "Charter";
    }

    .popover-text-iowan {
        font-family: "Iowan";
    }

    .popover-text-palatino {
        font-family: "Palatino";
    }

    .popover-text-san-francisco {
        font-family: "San Francisco";
    }

    .popover-text-seravek {
        font-family: "Seravek";
    }

    .popover-text-times-new-roman {
        font-family: "Times New Roman";
    }

    /*
      iOS Popover
    */

    .ios .popover-text-smaller {
        border-right: 1px solid #c8c7cc;
    }

    .ios .popover-row-dots {
        border-bottom: 1px solid #c8c7cc;
    }

    .ios .popover-dot {
        border: 1px solid #c8c7cc;
    }

    .hairlines .popover-text-smaller,
    .hairlines .popover-row-dots,
    .hairlines .popover-dot {
        border-width: 0.55px;
    }

    /*
      Material Design Popover
    */

    .md .popover-text-smaller {
        border-right: 1px solid #dedede;
    }

    .md .popover-row-dots {
        border-bottom: 1px solid #dedede;
    }

    .md .popover-dot {
        border: 1px solid #dedede;
    }

</style>