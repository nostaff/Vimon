<template>
  <vm-page v-nav="{title: 'Toggle'}">

    <vm-content class="outer-content">
      <vm-toggle v-model="pushNotification"></vm-toggle>
      <div class="item item-divider">开关状态:
        <span>{{ pushNotification  === true ? '开启' : '关闭' }}</span>
      </div>

      <div class="padding">
        <div class="button button-block" @click="triggerToggle()">手动切换</div>
      </div>

      <div class="item item-divider">其他主题色</div>
      <vm-toggle color="primary" v-model="values[0]"></vm-toggle>
      <vm-toggle color="secondary" v-model="values[1]"></vm-toggle>
      <vm-toggle color="danger" v-model="values[2]"></vm-toggle>
      <vm-toggle color="light" v-model="values[3]"></vm-toggle>
      <vm-toggle color="dark" v-model="values[4]"></vm-toggle>

      <vm-list title="开关按钮">
        <vm-item class="item-toggle">
          Frodo Baggins
          <vm-toggle slot="item-end" color="primary"></vm-toggle>
        </vm-item>
        <vm-item class="item-toggle">
          Sam
          <vm-toggle slot="item-end" :value="true" color="secondary"></vm-toggle>
        </vm-item>
        <vm-item class="item-toggle">
          Éowyn
          <vm-toggle slot="item-end" :value="true" color="danger" :disabled="true"></vm-toggle>
        </vm-item>
        <vm-item class="item-toggle">
          Legolas
          <vm-toggle slot="item-end" color="light"></vm-toggle>
        </vm-item>
        <vm-item class="item-toggle">
          Gimli
          <vm-toggle slot="item-end" :value="true" color="dark"></vm-toggle>
        </vm-item>
        <vm-item class="item-toggle">
          Saruman
          <vm-toggle slot="item-end" color="primary"></vm-toggle>
        </vm-item>
        <vm-item class="item-toggle">
          Gandalf
          <vm-toggle slot="item-end" :value="true" color="secondary"></vm-toggle>
        </vm-item>
        <vm-item class="item-toggle">
          Arwen
          <vm-toggle slot="item-end" color="danger"></vm-toggle>
        </vm-item>
        <vm-item class="item-toggle">
          Treebeard
          <vm-toggle slot="item-end" :value="true" color="light"></vm-toggle>
        </vm-item>

      </vm-list>
    </vm-content>

  </vm-page>
</template>

<script type="text/javascript">
import {List, Item, Toggle} from 'vimon'
export default {
  components: {
    'vm-list': List,
    'vm-item': Item,
    'vm-toggle': Toggle
  },
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
