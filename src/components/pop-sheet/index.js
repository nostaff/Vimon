/**
 * @component PopSheet
 * @description
 *
 * ## 弹出窗组件 / PopSheet
 *
 * ### 介绍
 *
 * PopSheet组件是一个模板组件, 自身只提供弹出载体, 其余业务部分通过slot传入, 且组件本身不对slot内容不作处理, 样式也由业务自己确定, 组件中的内容将自动在页面居中.
 *
 * 组件开闭通过ref获取组件实例并通过下面两个方法操作:
 * - present() 开启
 * - dismiss() 关闭
 *
 * ### 如何引入
 * ```
 * // 引入
 * import {PopSheet} from 'vimon'
 * // 安装
 * Vue.component(PopSheet.name, PopSheet)
 * // 或者
 * export default{
 *   components: {
 *     PopSheet
 *  }
 * }
 * ```
 *
 * ### 关于slot
 *
 * 组件必须具有slot="fixed"属性, 表示固定在页面上. 如果没有的话, 页面滚动样式会产生错误.
 *
 * ### 如何开启
 *
 * 通过ref获取组件实例, 之后调用present方法开启, 调用dismiss方法关闭.
 *
 * ```
 * ...
 * computed: {
 *    popSheetComponent () {
 *      return this.$refs.popSheet
 *    }
 *  }
 * methods: {
 *    openPopSheet () {
 *      return this.popSheetComponent.present()
 *    },
 *    closePopSheet () {
 *      return this.popSheetComponent.dismiss()
 *    }
 *  }
 * ...
 * ```
 *
 * @props {Boolean} [enableBackdropDismiss=true] - 点击背景关闭组件
 * @props {String} [mode='ios'] - 模式
 * @props {Boolean} [dismissOnPageChange=true] - 页面切换关闭组件
 * @props {boolean} [showBackdrop=true] - 是否显示黑色背景
 *
 * @demo #/pop-sheet
 * @usage
 * <vm-pop-sheet ref="popSheet" slot="fixed">
 *    <section class="popSheet">
 *        <h2>TITLE</h2>
 *        <h5>这是内容, 宽度高度自定义</h5>
 *        <p>
 *            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, eaque earum eum
 *            ex expedita facere fugit ipsa ipsum minima nemo nostrum, pariatur placeat qui quis quod
 *            quos repellendus tempora unde.</p>
 *        <vm-list>
 *            <vm-item>
 *                <vm-label>名称</vm-label>
 *                <vm-input v-model="name" type="text" placeholder="请输入用户名" clear-input></vm-input>
 *            </vm-item>
 *            <vm-item>
 *                <vm-label>密码</vm-label>
 *                <vm-input v-model="password" type="password" placeholder="请输入密码" clear-input></vm-input>
 *            </vm-item>
 *        </vm-list>
 *        <vm-button block @click="closePopSheet">确认</vm-button>
 *    </section>
 * </vm-pop-sheet>
 *
 */

export { default } from './pop-sheet.vue'
