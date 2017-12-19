<template>
  <vm-page v-nav="{title: 'Dialog'}">
    <vm-content padding>

      <vm-button block @click.native="doAlert()">Basic Alert</vm-button>
      <vm-button block @click.native="doAlert2()">Basic Alert with Buttons</vm-button>
      <vm-button color="light" block @click.native="doConfirm()">Confirm Alert</vm-button>
      <vm-button color="secondary" block @click.native="doPrompt()">Prompt Alert</vm-button>
      <vm-button color="danger" block @click.native="doRadio()">Radio Alert</vm-button>
      <vm-button color="dark" block @click.native="doCheckbox()">Checkbox Alert</vm-button>

    </vm-content>
  </vm-page>
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
        }).then(() => {
          console.log('alert preset.')
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
            {
              text: 'OK2',
              handler: () => {
                console.log('OK2 clicked')
              }},
            {
              text: 'OK3',
              handler: () => {
                console.log('OK3 clicked')
              }}
          ]
        }).then((res) => {
          console.log('alert with 3 buttons preset.')
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
        }).then(() => {
          console.log('confirm preset')
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
              role: 'cancel',
              handler: (data) => {
                console.log('Cancel clicked', data)
              }
            },
            {
              text: 'Save',
              handler: (data) => {
                console.log('Saved clicked', data)
              }
            }
          ]
        }).then(() => {
          console.log('prompt present.')
        })
      },

      doRadio () {
        this.$dialog.radio({
          title: 'Select One',
          inputs: [
            {
              label: 'Blue',
              value: 'blue',
              handler: (data) => {
                console.log('Blue', data)
              }
            },
            {
              label: 'Green',
              value: 'greed',
              handler: (data) => {
                console.log('Red', data)
              }
            },
            {
              label: 'Red',
              value: 'red',
              checked: true,
              handler: (data) => {
                console.log('Red', data)
              }
            },
            {
              label: 'Yellow',
              value: 'yellow',
              handler: (data) => {
                console.log('Yellow', data)
              }
            },
            {
              label: 'Purple',
              value: 'purple',
              handler: (data) => {
                console.log('Purple', data)
              }
            },
            {
              label: 'White',
              value: 'white',
              handler: (data) => {
                console.log('White', data)
              }
            },
            {
              label: 'Black',
              value: 'black',
              handler: (data) => {
                console.log('Black', data)
              }
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: (data) => {
                console.log('Cancel clicked', data)
              }
            },
            {
              text: 'Save',
              handler: (data) => {
                console.log('Saved clicked', data)
              }
            }
          ]
        }).then(() => {
          console.log('alert preset.')
        })
      },

      doCheckbox () {
        this.$dialog.checkbox({
          title: 'Select Some',
          inputs: [
            {
              label: 'Alderaan',
              value: 'value1',
              checked: true,
              handler: (data) => {
                console.log('Black', data)
              }
            },
            {
              label: 'Bespin',
              value: 'value2',
              handler: (data) => {
                console.log('Black', data)
              }
            },
            {
              label: 'Coruscant',
              value: 'value3',
              checked: 'true',
              handler: (data) => {
                console.log('Black', data)
              }
            },
            {
              label: 'Endor',
              value: 'value4',
              handler: (data) => {
                console.log('Black', data)
              }
            },
            {
              label: 'Hoth',
              value: 'value5',
              handler: (data) => {
                console.log('Black', data)
              }
            },
            {
              label: 'Jakku',
              value: 'value6',
              handler: (data) => {
                console.log('Black', data)
              }
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: data => {
                console.log('Cancel clicked', data)
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
