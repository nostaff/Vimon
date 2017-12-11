<template>
    <ion-page v-nav="{title: '模态窗', showMoreButton: true}">
        <ion-content class="page-content padding">

            <div padding>
                <ion-button block @click.native="openBasicModal()">Open Basic Modal</ion-button>
            </div>

            <ion-list no-margin>
                <ion-list-header>
                    Enter Parameters to Pass to the Modal
                </ion-list-header>
                <ion-item>
                    <ion-label slot="item-label">Parameters</ion-label>
                    <ion-select slot="item-content" v-model="myParam" multiple="true">
                        <ion-option value="nes">NES</ion-option>
                        <ion-option value="n64">Nintendo64</ion-option>
                        <ion-option value="ps">PlayStation</ion-option>
                        <ion-option value="genesis">Sega Genesis</ion-option>
                        <ion-option value="saturn">Sega Saturn</ion-option>
                        <ion-option value="snes">SNES</ion-option>
                    </ion-select>
                </ion-item>
            </ion-list>

            <div padding>
                <ion-button block color="danger" @click.native="openModalWithParams()">Open with Parameters</ion-button>
            </div>

        </ion-content>
    </ion-page>
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
