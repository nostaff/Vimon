<template>
  <ion-page v-nav="{title: 'Dialog'}">
    <ion-content padding>

      <ion-button block @click.native="doAlert()">Basic Alert</ion-button>
      <ion-button block @click.native="doAlert2()">Basic Alert with Buttons</ion-button>
      <ion-button color="light" block @click.native="doConfirm()">Confirm Alert</ion-button>
      <ion-button color="secondary" block @click.native="doPrompt()">Prompt Alert</ion-button>
      <ion-button color="danger" block @click.native="doRadio()">Radio Alert</ion-button>
      <ion-button color="dark" block @click.native="doCheckbox()">Checkbox Alert</ion-button>

    </ion-content>
  </ion-page>
</template>
<script>
  export default {
    name: 'DemoDialog',
    methods: {
      doAlert () {
        this.$dialog.alert({
          title: 'New Friend!',
          message: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                console.log('OK clicked')
              }
            }
          ]
        }).then((res) => {
          console.log('alert hide.', res)
        })
      },

      doAlert2 () {
        this.$dialog.alert({
          title: 'New Friend!',
          message: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                console.log('OK clicked')
              }
            },
            {text: 'OK2'},
            {text: 'OK3'}
          ]
        }).then((res) => {
          console.log('alert hide.', res)
        })
      },

      doConfirm () {
        this.$dialog.confirm({
          title: '在"微信"中打开链接吗?',
          message: '即将启动"微信",并在微信中打开连接',
          buttons: [
            {text: '取消'},
            {
              text: '打开',
              handler: () => {
                console.log('OK clicked')
              }
            }

          ]
        }).then((res) => {
          console.log('confirm result: ', res)
        })
      },

      doPrompt () {
        this.$dialog.prompt({
          title: 'Login',
          message: "Enter a name for this new album you're so keen on adding",
          inputs: [
            {
              name: 'title',
              placeholder: 'Title',
              value: 'valjue1'
            },
            {
              name: 'title1',
              placeholder: 'Title'
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
                console.log('Cancel clicked')
              }
            },
            {
              text: 'Save',
              handler: data => {
                console.log('Saved clicked', data)
              }
            }
          ]
        }).then((data) => {
          console.log('alert hide.', data)
        })
      },

      doRadio () {
        this.$dialog.radio({
          title: 'Login',
          inputs: [
            {
              label: 'Blue',
              value: 'blue'
            },
            {
              label: 'Green',
              value: 'greed'
            },
            {
              label: 'Red',
              value: 'ref',
              checked: 'false'
            },
            {
              label: 'Yellow',
              value: 'yellow'
            },
            {
              label: 'Purple',
              value: 'purple'
            },
            {
              label: 'White',
              value: 'white'
            },
            {
              label: 'Black',
              value: 'black'
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
                console.log('Cancel clicked')
              }
            },
            {
              text: 'Save',
              handler: data => {
                console.log('Saved clicked', data)
              }
            }
          ]
        }).then((data) => {
          console.log('alert hide.', data)
        })
      },

      doCheckbox () {
        this.$dialog.checkbox({
          title: 'Login',
          inputs: [
            {
              label: 'Alderaan',
              value: 'value1',
              checked: true
            },
            {
              label: 'Bespin',
              value: 'value2'
            },
            {
              label: 'Coruscant',
              value: 'value3',
              checked: 'true'
            },
            {
              label: 'Endor',
              value: 'value4'
            },
            {
              label: 'Hoth',
              value: 'value5'
            },
            {
              label: 'Jakku',
              value: 'value6'
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
                console.log('Cancel clicked')
              }
            },
            {
              text: 'Save',
              handler: data => {
                console.log('Saved clicked', data)
              }
            }
          ]
        }).then((data) => {
          console.log('alert hide.', data)
        })
      }
    }
  }
</script>
