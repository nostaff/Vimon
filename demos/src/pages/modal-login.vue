<template>
    <vm-page>
        <vm-header>
            <vm-toolbar>
                <vm-title>Login</vm-title>
                <vm-buttons right slot="buttons">
                    <vm-button role="bar-button" type="solid" @click="closeModal()">
                        关闭
                    </vm-button>
                </vm-buttons>
            </vm-toolbar>
        </vm-header>
        <vm-content padding>
            <vm-list>
                <vm-list-header>请输入</vm-list-header>
                <vm-item>
                    <vm-icon name="person" slot="item-start"></vm-icon>
                    <vm-label>用户名</vm-label>
                    <vm-input type="text" v-model="username" clearInput></vm-input>
                </vm-item>
                <vm-item>
                    <vm-icon name="key" slot="item-start"></vm-icon>
                    <vm-label>密码</vm-label>
                    <vm-input type="password" v-model="password" clearInput></vm-input>
                </vm-item>
            </vm-list>
            <vm-grid>
                <vm-row justify-content-center>
                    <vm-col col-6>
                        <vm-button block @click="login">登录</vm-button>
                    </vm-col>
                </vm-row>
                <vm-row>
                    <vm-col>
                        <p text-center>点击查看 <span class="secret" @click="secret">隐私政策</span></p>
                    </vm-col>
                </vm-row>
            </vm-grid>
        </vm-content>
    </vm-page>
</template>
<style lang="scss">
    .login {
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 30px 10px;
    }

    .secret {
        text-decoration: underline;
        color: #387ef5;
    }
</style>
<script type="text/javascript">
import modalSecretComponent from './modal-secret.vue'
import {Button, Toolbar, Title, Buttons, List, ListHeader, Item, Icon, Input, Label, Grid, Column, Row, Modal} from 'vimon'
export default {
  components: {
    'vm-button': Button,
    'vm-toolbar': Toolbar,
    'vm-title': Title,
    'vm-buttons': Buttons,
    'vm-list': List,
    'vm-list-header': ListHeader,
    'vm-item': Item,
    'vm-icon': Icon,
    'vm-input': Input,
    'vm-label': Label,
    'vm-grid': Grid,
    'vm-col': Column,
    'vm-row': Row
  },
  name: 'LoginModalDemo',
  data () {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    secret () {
      Modal.present({
        name: 'SecretModalDemo',
        component: modalSecretComponent,
        showBackdrop: true,
        enableBackdropDismiss: false
      })
    },
    login () {
      Modal.dismiss({
        username: this.username,
        password: this.password
      })
    },
    closeModal () {
      Modal.dismiss(false)
    }
  }
}
</script>
