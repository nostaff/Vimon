<template>
  <vm-page v-nav="{title: 'Input'}">
    <vm-content class="outer-content">

      <vm-list title="有标签-定宽">
        <vm-item>
          <vm-label fixed>Username</vm-label>
          <vm-input v-model="username" type="text"></vm-input>
        </vm-item>
        <vm-item>
          <vm-label fixed>Password</vm-label>
          <vm-input v-model="password" type="password"></vm-input>
        </vm-item>
      </vm-list>

      <vm-list title="有标签-不定宽">
        <vm-item>
          <vm-label>用户名：</vm-label>
          <vm-input v-model="username" type="text"></vm-input>
        </vm-item>
        <vm-item>
          <vm-label>密码：</vm-label>
          <vm-input v-model="password" type="password"></vm-input>
        </vm-item>
        <vm-item>
          <vm-label>确认密码：</vm-label>
          <vm-input v-model="password" type="password"></vm-input>
        </vm-item>
      </vm-list>

      <vm-list title="无标签">
        <vm-item>
          <vm-input placeholder="Username" v-model="username"></vm-input>
        </vm-item>
        <vm-item>
          <vm-input v-model="password" type="password" placeholder="Password"></vm-input>
        </vm-item>
      </vm-list>

      <vm-list title="Input Floating">
        <vm-item>
          <vm-label floating>Username</vm-label>
          <vm-input v-model="username"></vm-input>
        </vm-item>
        <vm-item>
          <vm-label floating>Password</vm-label>
          <vm-input v-model="password" type="password"></vm-input>
        </vm-item>
        <vm-item>
          <vm-label floating>Date</vm-label>
          <vm-input v-model="date" type="password"></vm-input>
        </vm-item>
      </vm-list>

      <vm-list title="Input Stacked">
        <vm-item>
          <vm-label stacked>Username</vm-label>
          <vm-input stacked v-model="username"></vm-input>
        </vm-item>
        <vm-item>
          <vm-label stacked>Password</vm-label>
          <vm-input v-model="password" type="password"></vm-input>
        </vm-item>
      </vm-list>

      <vm-list title="clear input">
        <vm-item>
          <vm-label fixed>Username</vm-label>
          <vm-input stacked clearInput v-model="username"></vm-input>
        </vm-item>
        <vm-item>
          <vm-label fixed>Password</vm-label>
          <vm-input clearInput v-model="password" type="password"></vm-input>
        </vm-item>
      </vm-list>

    </vm-content>
  </vm-page>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      date: '',
      tel: '',
      phone: '',
      email: ''
    }
  },
  computed: {
    // a computed getter
    hasLabel: function () {
      return '有标签: ' + this.username
    },

    noLabel: function () {
      return '无标签: ' + this.tel
    }
  }
}
</script>
