<script type="text/javascript">
  import ItemMixin from '../item/item-mixin.vue'

  export default {
    mixins: [ItemMixin],
    name: 'vm-list-header',
    data () {
      return {
        itemTypeName: 'list-header'
      }
    },
    computed: {
      // 颜色
      colorClass () {
        return this.color ? (`${this.itemTypeName}-${this.mode}-${this.color}`) : ''
      },
      itemTypeClass () {
        return `ion-${this.itemTypeName} ${this.itemTypeName} ${this.itemTypeName}-${this.mode}`
      }
    }
  }
</script>
