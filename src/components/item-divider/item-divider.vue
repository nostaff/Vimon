<script>
  import ItemMixin from '../item/item-mixin.vue'

  export default {
    mixins: [ItemMixin],
    name: 'vm-item-divider',
    data () {
      return {
        itemTypeName: 'item-divider'
      }
    },
    computed: {
      // 颜色
      colorClass () {
        return this.color ? (`${this.itemTypeName}-${this.mode}-${this.color}`) : ''
      },
      itemTypeClass () {
        return `ion-item item item-${this.mode} ion-${this.itemTypeName} ${this.itemTypeName} ${this.itemTypeName}-${this.mode}`
      }
    }
  }
</script>
