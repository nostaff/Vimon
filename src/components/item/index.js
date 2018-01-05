/**
 * @component Item
 * @description
 *
 * ## 列表组件 / Item
 *
 * Item组件是List组件的子组件, 两者配合使用.
 *
 * ### 关于其余组件
 *
 * 列表组件中的每一个Item将在这里定义, 其中包括**Item/ListHeader/ItemGroup/ItemDivider**等, 他们的使用方式基本一样, 这里统一说明.
 *
 *
 * ### ItemDivider组件
 *
 * 加 `[sticky]` 属性可实现吸顶效果
 *
 * ### 如何使用
 *
 * ### Item组件
 *
 * - 加 `[no-lines]` 属性可去除边框
 * - 在item中的Icon上加属性`[large],[small]`可控制大小
 *
 * ### 关于跳转
 *
 * item组件将使用v-router的router-link组件中的部分同名方法, 并执行对应的跳转
 *
 * ### 如何引入
 *
 * ```
 * // 引入
 * import { List, ListHeader, ItemGroup, Item, ItemDivider } from 'vimon'
 * // 安装
 * Vue.component(List.name, List)
 * Vue.component(ListHeader.name, ListHeader)
 * Vue.component(ItemGroup.name, ItemGroup)
 * Vue.component(Item.name, Item)
 * Vue.component(ItemDivider.name, ItemDivider)
 * // 或者
 * export default{
 *   components: {
 *    List, ListHeader, ItemGroup, Item, ItemDivider
 *  }
 * }
 * ```
 *
 * @props {String} [mode='ios'] - 模式
 * @props {String} [color] - 颜色
 * @props {any} [to] - 路由, 这部分用法请参开vue-router, 这里是对其移植
 * @props {Boolean} [append] - 路由是否append
 * @props {Boolean} [replace] - 路由进行方式, 默认为push
 *
 *
 * @slot 空 - 放置在中间, 默认位置
 * @slot item-start - 放置在左边
 * @slot item-end - 放置在左边
 *
 * @demo #/list
 * @see component:List
 *
 * @usage
 *
 * <vm-list>
 *    <vm-list-header>
 *            setting
 *        <vm-button slot="item-end" clear>
 *            <vm-icon name="cog"></vm-icon>
 *        </vm-button>
 *    </vm-list-header>
 *    <vm-item-group>
 *        <vm-item>
 *            <vm-icon slot="item-start" color="danger" name="plane"></vm-icon>
 *            <span>Airplane Mode</span>
 *            <vm-toggle slot="item-end" @ionChange="toggleChange" :checked="toggleValue"></vm-toggle>
 *        </vm-item>
 *        <vm-item button>
 *            <vm-icon slot="item-start" color="primary" name="wifi"></vm-icon>
 *                Wi-Fi
 *            <vm-note slot="item-end">The Interwebz</vm-note>
 *        </vm-item>
 *        <vm-item button>
 *            <vm-icon slot="item-start" color="primary" name="bluetooth"></vm-icon>
 *                Bluetooth
 *            <vm-note slot="item-end">Off</vm-note>
 *        </vm-item>
 *    </vm-item-group>
 *    <vm-item-divider color="primary">
 *        Other Setting
 *        <vm-button slot="item-end" outline color="light">Clear</vm-button>
 *    </vm-item-divider>
 *    <vm-item button>
 *            <vm-icon slot="item-start" color="secondary" name="call"></vm-icon>
 *            Cellular
 *    </vm-item>
 *    <vm-item button>
 *         <vm-icon slot="item-start" color="secondary" name="link"></vm-icon>
 *            Personal Hotspot
 *        <vm-note slot="item-end">Off</vm-note>
 *    </vm-item>
 * </vm-list>
 *
 */
export { default } from './item.vue'
