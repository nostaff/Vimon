
/**
 * @component Item/ItemSliding
 * @description
 *
 * ## 列表组件 / ItemSliding滑动选择组件
 *
 * 这个组件是对Item组件的拓展, 当左右滑动时出现可选择的按钮, 这个组件在部分安卓机上卡顿明显, 使用起来效果不太好, 但是在IOS上很流畅.
 *
 *
 * ### 子组件ItemOptions
 *
 * ItemOptions只能在ItemSliding组件中使用
 *
 * ### 如何使用
 *
 * ```
 * // 引入
 * import { ItemOptions, ItemSliding } from 'vimon'
 * // 安装
 * export default{
 *   components: { ItemOptions, ItemSliding }
 * }
 * ```
 *
 *
 * @props {Boolean} disabled - 是否禁用
 *
 * @fires component:ItemSliding#onDrag
 * @fires component:ItemSliding#onSwipe
 * @fires component:ItemSliding#onSwipeRight
 * @fires component:ItemSliding#onSwipeLeft
 *
 * @demo #/list
 * @see component:ItemOptions
 *
 * @usage
 *
 * <vm-item-sliding>
 *    <vm-item>
 *        <vm-avatar slot="item-start">
 *            <img src="./img/avatar-ts-woody.png">
 *        </vm-avatar>
 *        <vm-label>
 *            <h2>两边都有按钮</h2>
 *            <p>试试 ↔️️ 都滑动</p>
 *        </vm-label>
 *    </vm-item>
 *    <vm-item-options side="left">
 *        <vm-button color="primary" @click="clickText">
 *            <vm-icon name="text"></vm-icon>
 *            <span>Text</span>
 *        </vm-button>
 *        <vm-button color="secondary" @click="clickCall">
 *            <vm-icon name="call"></vm-icon>
 *            <span>Call</span>
 *        </vm-button>
 *     </vm-item-options>
 *     <vm-item-options side="right">
 *        <vm-button color="primary" @click="clickEmail">
 *            <vm-icon name="mail"></vm-icon>
 *            <span>Email</span>
 *        </vm-button>
 *    </vm-item-options>
 * </vm-item-sliding>
 */
export { default } from './item-sliding.vue'
