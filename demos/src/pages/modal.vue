<template>
    <vm-page v-nav="{title: 'Modal'}">
        <vm-content class="page-content padding">

            <div padding>
                <vm-button block @click.native="openBasicModal()">Open Basic Modal</vm-button>
            </div>

            <vm-list no-margin>
                <vm-list-header>
                    Enter Parameters to Pass to the Modal
                </vm-list-header>
                <vm-item>
                    <vm-label>Parameters</vm-label>
                    <vm-select v-model="myParam" multiple="true">
                        <vm-option value="nes">NES</vm-option>
                        <vm-option value="n64">Nintendo64</vm-option>
                        <vm-option value="ps">PlayStation</vm-option>
                        <vm-option value="genesis">Sega Genesis</vm-option>
                        <vm-option value="saturn">Sega Saturn</vm-option>
                        <vm-option value="snes">SNES</vm-option>
                    </vm-select>
                </vm-item>
            </vm-list>

            <div padding>
                <vm-button block color="danger" @click.native="openModalWithParams()">Open with Parameters</vm-button>
            </div>

        </vm-content>
    </vm-page>
</template>
<script type="text/javascript">
import ModalPage from './modal-page.vue'

import {List, Item, ListHeader, Label, Select, Option, Button, Modal} from 'vimon'
export default {
  components: {
    'vm-list': List,
    'vm-list-header': ListHeader,
    'vm-item': Item,
    'vm-label': Label,
    'vm-select': Select,
    'vm-option': Option,
    'vm-button': Button
  },
  data () {
    return {
      myParam: []
    }
  },

  methods: {
    openBasicModal () {
      Modal.present({
        component: ModalPage,
        onDismiss (data) {
          console.log(data)
        }
      })
    },
    openModalWithParams () {
      Modal.present({
        component: ModalPage,
        data: {
          myParam: this.myParam // 将myParam数据传递给子组件，通过this.$attrs.myParam 获取
        },
        onDismiss (data) {
          console.log(data)
        }
      })
    }
  }
}
</script>
