<template>
    <vm-page>
        <vm-header ref="header">
            <vm-navbar>
                <vm-title>隐藏头尾</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content padding class="outer-content" ref="content" @onScroll="onScrollHandler">

            <h1>Section</h1>
            <p>ps: 如果在微信/支付宝/钉钉模式下, 可能看不到Header的效果.</p>

            <vm-grid no-padding>
                <vm-row justify-content-around align-items-center no-padding>
                    <vm-button outline small @click="hideHeader">显/隐 Header</vm-button>
                    <vm-button outline small @click="hideFooter">显/隐 Footer</vm-button>
                    <vm-button outline small @click="hideBoth">同时 显/隐</vm-button>
                </vm-row>
            </vm-grid>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur deleniti doloribus dolorum, est eum facilis ipsa magnam neque nesciunt non perferendis quae quaerat rerum saepe. Eveniet magnam quo sapiente.</p>

        </vm-content>
        <vm-footer ref="footer">
            <vm-toolbar>
                <vm-title>Footer</vm-title>
            </vm-toolbar>
        </vm-footer>
    </vm-page>
</template>

<script type="text/javascript">
  import {Button, Grid, Column, Row} from 'vimon'
export default {
    components: {
      'vm-button': Button,
      'vm-grid': Grid,
      'vm-col': Column,
      'vm-row': Row
    },
    data () {
      return {}
    },
    props: {},
    watch: {},
    computed: {
      headerComponent () {
        return this.$refs.header
      },
      footerComponent () {
        return this.$refs.footer
      },
      contentComponent () {
        return this.$refs.content
      }
    },
    methods: {
      hideHeader () {
        this.headerComponent.toggle()
      },
      hideFooter () {
        this.footerComponent.toggle()
      },
      hideBoth () {
        this.footerComponent.toggle()
        this.headerComponent.toggle()
      },
      onScrollHandler (ev) {
        if (ev.directionY === 'down' && ev.scrollTop > 0) {
          this.footerComponent.hide()
          this.headerComponent.hide()
          this.contentComponent.resize()
        } else {
          this.footerComponent.show()
          this.headerComponent.show()
          this.contentComponent.resize()
        }
      }
    }
  }
</script>
