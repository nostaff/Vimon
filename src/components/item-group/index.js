/**
 * @component Item/ItemGroup
 * @description
 *
 * ## 列表组件 / ItemGroup元素组
 *
 * 被ItemGroup包裹的Item的第一个元素没有上面框, 最后一个元素没下边框.
 *
 *
 * ### 如何引入
 *
 * ```
 * // 引入
 * import { List, ListHeader, ItemGroup, Item } from 'vimon'
 * // 安装
 * Vue.component(List.name, List)
 * Vue.component(ListHeader.name, ListHeader)
 * Vue.component(ItemGroup.name, ItemGroup)
 * Vue.component(Item.name, Item)
 * // 或者
 * export default{
 *   components: {
 *    List, ListHeader, ItemGroup, Item
 *  }
 * }
 * ```
 *
 * @props {Boolean} [reorder='true'] -是否排序
 *
 * @usage
 * <ion-list>
 *    <ion-list-header>Header</ion-list-header>
 *    <ion-item-group reorder="true" @onItemReorder="reorderItems($event)">
 *      <ion-item :key="index" v-for="(item, index) in items">{{item.raw}}</ion-item>
 *    </ion-item-group>
 *  </ion-list>
 *
 *
 *   reorderItems(indexes) {
 *     let element = this.items[indexes.from];
 *     this.items.splice(indexes.from, 1);
 *     this.items.splice(indexes.to, 0, element);
 *   }
 *
 * @demo #/list
 * @see component:Item
 */
export { default } from './item-group.vue'
