<template>
  <div class="ion-address" :class="[modeClass, disabled?'address-disabled':'']" @click.prevent="btnClick">
    <div v-if="!text" class="datetime-text datetime-placeholder">{{placeholder}}</div>
    <div v-if="text" class="datetime-text">{{text}}</div>
    <ion-button role="item-cover" :aria-disabled="disabled"></ion-button>
  </div>
</template>
<script>
  import objectAssign from 'object-assign'
  import ModeMixins from '../../themes/theme.mixins'
  import IonButton from '../button'
  import IonPicker from '../picker'
  import ChinaAddressData from './china_address.json'

  export default {
    name: 'ion-address',
    mixins: [ModeMixins],
    components: {
      IonButton,
      IonPicker
    },
    data () {
      return {
        defaultOptions: {
          buttons: [
            {
              text: this.cancelText,
              role: 'cancel',
              handler: () => {
                console.debug('Cancel clicked')
              }
            },
            {
              text: this.doneText,
              role: 'done',
              handler: (data) => {
                this.currentValue = this.convertToArray(data)
              }
            }
          ],
          columns: []
        },
        addressData: ChinaAddressData,
        currentValue: [],
        text: ''
      }
    },

    props: {
      value: Array,
      placeholder: String,
      cancelText: {
        type: String,
        default: 'Cancel'
      },
      doneText: {
        type: String,
        default: 'Done'
      },
      level: {
        type: Number,
        default: 3
      },
      disabled: Boolean
    },

    mounted () {
      this.currentValue = this.nameValue(this.value)
    },

    watch: {
      currentValue (val) {
        this.$emit('input', val)
        this.updateText()
      },
      value (val) {
        this.currentValue = this.nameValue(val)
        this.updateText()
      }
    },

    methods: {
      btnClick () {
        if (this.disabled) {
          return
        }

        let pickerOptions = objectAssign({}, this.defaultOptions, this.pickerOptions)
        pickerOptions.columns = this.addressData
        pickerOptions.level = this.level
        pickerOptions.isChain = true
        pickerOptions.chainValue = this.currentValue

        this.$picker.present(pickerOptions)
      },

      updateText () {
        // create the text of the formatted data
        this.text = this.value2name(this.currentValue).join(' ')
      },

      nameValue (val) {
        if (val.length && !/\d+/.test(val[0])) {
          return this.name2value(val)
        }
        return val
      },

      value2name (values) {
        const list = this.addressData

        if (!values || !list) {
          return ''
        }

        let rs = values.map((one, index) => {
          return list.find(item => {
            return item.value === one
          })
        })

        return rs.map(one => {
          return one ? one.text : ''
        })
      },

      name2value (names) {
        let list = this.addressData

        if (!names || !list) {
          return ''
        }
        let current
        let rs = names.map((one, index) => {
          if (index === 0) {
            current = list.find(item => {
              return item.text === one && typeof item.parent === 'undefined'
            })
          } else {
            current = list.find(item => {
              return item.text === one && item.parent === current.value
            })
          }
          return current
        })

        return rs.map(one => {
          return one ? one.value : '__'
        })
      },

      convertToArray (data) {
        let rtn = []

        for (var i = 0; i < this.level; i++) {
          if (typeof data['level_' + i] !== 'undefined') {
            rtn[i] = data['level_' + i].value
          }
        }
        return rtn
      }

    }
  }
</script>
