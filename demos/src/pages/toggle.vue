<template>
  <ion-page v-nav="{title: 'Toggle'}">

    <ion-content>
      <ion-toggle v-model="pushNotification"></ion-toggle>
      <div class="item item-divider">开关状态:
        <span>{{ pushNotification ? '开启' : '关闭' }}</span>
      </div>

      <div class="padding">
        <div class="button button-block" @click="triggerToggle()">手动切换</div>
      </div>

      <div class="item item-divider">其他主题色</div>
      <ion-toggle color="primary" v-model="values[0]"></ion-toggle>
      <ion-toggle color="secondary" v-model="values[1]"></ion-toggle>
      <ion-toggle color="danger" v-model="values[2]"></ion-toggle>
      <ion-toggle color="light" v-model="values[3]"></ion-toggle>
      <ion-toggle color="dark" v-model="values[4]"></ion-toggle>

      <ion-list title="开关按钮">
        <ion-item class="item-toggle">
          Frodo Baggins
          <ion-toggle slot="item-end" color="primary"></ion-toggle>
        </ion-item>
        <ion-item class="item-toggle">
          Sam
          <ion-toggle slot="item-end" :value="true" color="secondary"></ion-toggle>
        </ion-item>
        <ion-item class="item-toggle">
          Éowyn
          <ion-toggle slot="item-end" :value="true" color="danger" :disabled="true"></ion-toggle>
        </ion-item>
        <ion-item class="item-toggle">
          Legolas
          <ion-toggle slot="item-end" color="light"></ion-toggle>
        </ion-item>
        <ion-item class="item-toggle">
          Gimli
          <ion-toggle slot="item-end" :value="true" color="dark"></ion-toggle>
        </ion-item>
        <ion-item class="item-toggle">
          Saruman
          <ion-toggle slot="item-end" color="primary"></ion-toggle>
        </ion-item>
        <ion-item class="item-toggle">
          Gandalf
          <ion-toggle slot="item-end" :value="true" color="secondary"></ion-toggle>
        </ion-item>
        <ion-item class="item-toggle">
          Arwen
          <ion-toggle slot="item-end" color="danger"></ion-toggle>
        </ion-item>
        <ion-item class="item-toggle">
          Treebeard
          <ion-toggle slot="item-end" :value="true" color="light"></ion-toggle>
        </ion-item>

      </ion-list>
    </ion-content>

  </ion-page>
</template>
<script>
export default {
  data () {
    return {
      toggleText: '是否开启推送',
      pushNotification: true,

      values: [true, true, true, true, true, true]
    }
  },

  methods: {
    triggerToggle () {
      this.pushNotification = !this.pushNotification
    }
  },

  watch: {
    values: newVal => {
      console.log(newVal)
    }
  }
}
</script>
