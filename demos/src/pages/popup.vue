<template>
    <ion-page v-nav="{title: '弹层'}">
        <ion-content>

            <ion-item  is-link @click.native="showCustomPopup()">
                Custom Popup
            </ion-item>
            <ion-item is-link @click.native="showCustomPopup2()">
                Custom Popup 2
            </ion-item>

        </ion-content>
    </ion-page>
</template>
<script>
    export default {

      methods: {
        showCustomPopup () {
          let options = {
            effect: 'scale',
            title: '',
            buttons: [
              {text: '确定'},
              {text: '取消'}
            ]
          }

          let popup = this.$popup.fromTemplate('<p style="margin-bottom: 0; text-align: center;">自定义内容</p>', options)

          popup.present().then((buttonIndex) => {
            console.log(buttonIndex)
          })
        },

        showCustomPopup2 () {
          let options = {
            effect: 'scale',
            title: '',
            buttons: [
              {text: '确定', theme: 'assertive'}
            ],
            showClose: true
          }

          let template = `
                      <p style="margin-bottom: 10px; text-align: center; font-size: 16px;">带有关闭按钮</p>
                      <p style="margin-bottom: 0; text-align: center;">自定义内容</p>
                    `

          let popup = this.$popup.fromTemplate(template, options)

          popup.present().then((buttonIndex) => {
            console.log(buttonIndex)
          })

          /* fromTemplateUrl sample */

          // let path_to_template = ''
          // $popup
          //   .fromTemplateUrl(path_to_template, options)
          //   .then((popup) => {
          //     popup.present()
          //   })
        }
      }
    }
</script>