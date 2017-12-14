/**
 * 主题通用 mixins
 */
export default {
  data () {
    return {
      roleName: this.$options.name.replace('vm-', '')
    }
  },
  props: {
    mode: {
      type: String,
      default () {
        return this.$config && this.$config.get('mode') || 'ios'
      }
    },
    color: String
  },
  computed: {
    modeClass () {
      return `${this.roleName} ${this.roleName}-${this.mode}`
    },
    colorClass () {
      return this.color ? (`${this.roleName}-${this.mode}-${this.color}`) : ''
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
