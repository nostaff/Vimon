<template>
    <vm-page v-nav="{title: 'Action Sheet'}">
        <vm-content padding>
            <div class="action-sheets-basic-page">
                <vm-button block @click.native="normal()">点击背景关闭</vm-button>
                <p></p>
                <vm-button block color="secondary" @click.native="disableBackdrop()">背景不可点击</vm-button>

                 <span>根据浏览器自动变换样式</span>
            </div>
        </vm-content>
    </vm-page>
</template>
<script type="text/javascript">
import { Button, ActionSheet } from 'vimon'
const isMd = /Android/.test(navigator.userAgent)

const buttonItems = [
  {
    text: 'Delete',
    role: 'destructive',
    icon: isMd ? 'ion-trash-b' : null,
    handler: () => {
      console.log('Delete clicked')
    }
  },
  {
    text: 'Share',
    icon: isMd ? 'ion-android-share' : null,
    handler: () => {
      console.log('Share clicked')
    }
  },
  {
    text: 'Play',
    icon: isMd ? 'ion-android-arrow-dropright-circle' : null,
    handler: () => {
      console.log('Play clicked')
    }
  },
  {
    text: 'Favorite',
    icon: isMd ? 'ion-android-heart-outline' : null,
    handler: () => {
      console.log('Favorite clicked')
    }
  },
  {
    text: 'Cancel',
    role: 'cancel', // will always sort to be on the bottom
    icon: isMd ? 'ion-android-close' : null,
    handler: () => {
      console.log('Cancel clicked')
    }
  }
]

export default {
  components: {
    'vm-button': Button
  },
  methods: {
    normal () {
      ActionSheet.present({
        title: '这是标题',
        subTitle: '这是副标题',
        cssClass: 'a b',
        enableBackdropDismiss: true,
        buttons: buttonItems,
        presentCallback: () => {
          console.log('presentCallback')
        },
        dismissCallback: () => {
          console.log('dismissCallback')
        }
      }).then(function () {
        console.log('present promise')
      })
    },
    disableBackdrop () {
      ActionSheet.present({
        title: '标题2',
        subTitle: '这是副标题',
        buttons: buttonItems,
        enableBackdropDismiss: false
      }).then(function () {
        console.log('请选择操作 present promise')
      })
    }
  }
}
</script>

<style>
.action-sheets-basic-page .ion-android-share {
  color: #ed4248;
}

.action-sheets-basic-page .ion-android-arrow-dropright-circle {
  color: #508ae4;
}

.action-sheets-basic-page .ion-android-heart-outline {
  color: #31d55f;
}

.action-sheets-basic-page .action-sheet-cancel.icon,
.action-sheets-basic-page .action-sheet-destructive.icon {
  color: #757575;
}
</style>
