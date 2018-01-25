<template>
  <div class="ion-title" :class="[modeClass, colorClass]">
    <div class="toolbar-title" :class="['toolbar-title-'+mode]" v-html="titleInner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ModeMixins from '../../themes/theme.mixins'
export default {
  name: 'vm-title',
  mixins: [ModeMixins],
  inject: {
    appComponent: {
      from: 'appComponent',
      default: null
    },
    headerComponent: {
      from: 'headerComponent',
      default: null
    },
    navbarComponent: {
      from: 'navbarComponent',
      default: null
    }
  },
  props: {
    title: String
  },
  data () {
    return {
      titleInner: this.title
    }
  },
  computed: {
    isTitleInNavbar () {
      return !!this.navbarComponent
    }
  },
  watch: {
    title () {
      this.titleInner = this.getTitle()
      if (this.isTitleInNavbar) {
        this.setTitle(this.titleInner)
      }
    }
  },
  mounted () {
    this.titleInner = this.getTitle()
    if (this.isTitleInNavbar) {
      this.setTitle(this.titleInner)
    }
  },
  activated () {
    // BugFix: #15, keep-alive模式下不更新title的问题
    if (this.isTitleInNavbar) {
      this.setTitle(this.titleInner)
    }
  },
  methods: {
    /**
     * @function getTitle
     * @description
     * 获取Title组件中的title
     * @return {String}
     */
    getTitle () {
      let _title = ''
      if (this.title) {
        // prop传入title值
        // eg: <Title title="Toolbar"></Title>
        _title = this.title.trim()
      } else if (this.$slots.default && this.$slots.default[0] && this.$slots.default[0].text) {
        // 如果是直接写在ion-title中的值
        // eg: <Title>Toolbar</Title>
        _title = this.$slots.default[0].text.trim()
      }
      return _title
    },

    /**
     * @function setTitle
     * @description
     * 修改Header的title, 目前可用平台: H5/Alipay/Dingtalk
     * @param {String|Object} title - title
     * @param {String|Object} title.title - title
     * @param {String|Object} title.image - image
     * @param {boolean} [changeDocTitle=true] - 是否设置doc的title, 默认是同步设置的
     */
    setTitle (title, changeDocTitle = true) {
      let _title = {}
      if (typeof title === 'string') {
        _title.title = title
        this.titleInner = title
      } else if (typeof title === 'object' && title.image) {
        _title.title = null
        _title.image = title.image
        this.titleInner = `<img src="${title.image}">`
      }
      if (changeDocTitle) {
        // 设置document的title, 这部分由$app处理
        this.$app && this.$app.setDocTitle(_title)
      }
    },

    /**
     * @function reset
     * @description
     * 重置Title文字的颜色, 目前可用平台: Alipay
     */
    reset () {
      this.$platform && this.$platform.resetNavbarOptionButton && this.$platform.resetNavbarOptionButton()
    }

  }

}
</script>
