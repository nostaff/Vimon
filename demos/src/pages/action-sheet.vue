<template>
    <ion-page v-nav="{title: '操作列表'}">
        <ion-content padding>
            <div class="action-sheets-basic-page">
                <ion-button block @click.native="normal()">点击背景关闭</ion-button>
                <p></p>
                <ion-button block color="secondary" @click.native="disableBackdrop()">背景不可点击</ion-button>

                <span>根据浏览器自动变换样式</span>
            </div>
        </ion-content>
    </ion-page>
</template>
<script>
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
  methods: {
    normal () {
      this.$actionSheet.present({
        title: '这是标题',
        subTitle: '这是副标题',
        cssClass: 'a b',
        buttons: buttonItems
      }).then(res => {
        console.log('button clicked: ', res)
      })
    },
    disableBackdrop () {
      this.$actionSheet.present({
        title: '标题2',
        subTitle: '这是副标题',
        buttons: buttonItems,
        enableBackdropDismiss: false
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
