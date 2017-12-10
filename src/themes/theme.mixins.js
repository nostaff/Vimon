/**
 * 主题通用 mixins
 */
export default {
  data () {
    return {
      roleName: this.$options.name.replace('ion-', '')
    }
  },
  props: {
    theme: {
      type: String,
      default () {
        return this.$config && this.$config.get('theme') || 'ios'
      }
    },
    color: String
  },
  computed: {
    themeClass () {
      return `${this.roleName} ${this.roleName}-${this.theme}`
    },
    colorClass () {
      return this.color ? (`${this.roleName}-${this.theme}-${this.color}`) : ''
    }
  },
  methods: {
    getNativeElement () {
      return this.$el
    },
    setElementClass (classname, add = true) {
      this.$el.classList[add ? 'add' : 'remove'](classname)
    },
    setElementStyle (name, value) {
      this.$el.style[name] = value
    },
    setElementAttribute (name, value) {
      this.$el.setAttribute(name, value)
    }
  }
}
