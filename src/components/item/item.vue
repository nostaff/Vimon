<script>
import ItemMixin from './item-mixin.vue'
import { isPresent, isTrueProperty } from '../../util/util'

export default {
  name: 'vm-item',
  mixins: [ItemMixin],
  inject: {
    itemGroupComponent: {
      from: 'itemGroupComponent',
      default: null
    },
    itemSlidingComponent: {
      from: 'itemSlidingComponent',
      default: null
    }
  },
  data () {
    return {
      isDisabled: isTrueProperty(this.disabled),
      isReplace: isTrueProperty(this.replace),
      isInMenu: this.wait // 判断是否在menu组件中, 如果在menu中, 则
    }
  },
  props: {
    /**
     * 可以是 字符串path，url， 也可以是路由对象
     */
    link: [String, Object],

    /** 是否禁用 */
    disabled: [Boolean, String],

    /** 是否替换路由 */
    replace: [Boolean, String],

    /**
     * 如果是在menus中, 可以设置这个值, 当menus完全关闭时再出发跳转动作
     **/
    wait: Boolean
  },
  created () {
    this.hasReorder = this.itemGroupComponent && this.itemGroupComponent.allowReorder
  },
  mounted () {
    this.link && this.setElementAttribute('detail-push')
  },
  methods: {
    clickHandler (ev) {
      const go = (url, router, replace = false) => {
        const useRouter = typeof url === 'object' || (router && typeof url === 'string' && !/http/.test(url))
        if (useRouter) {
          if (replace === true) {
            router.replace(url)
          } else {
            router.push(url)
          }
        } else {
          window.location.href = url
        }
      }

      if (this.isDisabled) return

      if (isPresent(this.$router) && isPresent(this.link)) {
        // 如果在menu跳转, 则需要等待menu关闭后再跳转
        if (this.isInMenu) {
          this.$menu.close()
        }
        go(this.link, this.$router, this.isReplaces)
      } else {
        this.$emit('click', ev)
      }
    },
    /**
     * 获取组件类Label的文本
     */
    getLabelText () {
      let list = []
      if (this.$slots['default'] && this.$slots['default'].length > 0) {
        list = this.$slots['default']
      }
      for (let i = 0, len = list.length; len > i; i++) {
        let item = list[i]
        let hasValue = !!item.tag || (!!item.text && !!item.text.trim())
        if (hasValue && item.elm && item.elm.textContent) {
          return item.elm.textContent.toString().trim()
        }
      }
      return ''
    }
  }
}
</script>
