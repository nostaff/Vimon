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
                    <vm-label slot="item-label">Parameters</vm-label>
                    <vm-select slot="item-content" v-model="myParam" multiple="true">
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
<script>
    import ModalPage from './modal-page.vue'

    export default {
      data () {
        return {
          myParam: []
        }
      },

      methods: {
        openBasicModal () {
          this.$modal.present({
            template: ModalPage,
            onDismiss (data) {
              console.log(data)
            }
          })
        },
        openModalWithParams () {
          this.$modal.present({
            template: ModalPage,
            data: {
              myParam: this.myParam
            },
            onDismiss (data) {
              console.log(data)
            }
          })
        }
      }
    }
</script>
