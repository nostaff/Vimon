/**
 * @component Sheet
 * @description
 *
 * ## 弹出表单组件 / Sheet
 *
 * ### 介绍
 *
 * Sheet组件是一个模板组件, 自身只提供弹出载体, 其余业务部分通过slot传入, 且组件本身不对slot内容不作处理, 样式也由业务自己确定
 *
 * 组件开闭通过ref获取组件实例并通过下面两个方法操作:
 * - present() 开启
 * - dismiss() 关闭
 *
 *
 * ### 如何引入
 * ```
 * // 引入
 * import {Sheet} from 'vimon'
 * // 安装
 * Vue.component(Sheet.name, Sheet)
 * // 或者
 * export default{
 *   src: {
 *     Sheet
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
 *    paySheetCompoonent () {
 *      return this.$refs.paySheet
 *    }
 *  }
 * methods: {
 *    openPaySheet () {
 *      return this.paySheetCompoonent.present()
 *    },
 *    closePaySheet () {
 *      return this.paySheetCompoonent.dismiss()
 *    },
 *    choose (type) {
 *      this.closePaySheet().then(() => {
 *        this.type = type
 *      })
 *    }
 *  }
 * ...
 * ```
 *
 * @props {String} [mode='ios'] - 模式
 * @props {String} [direction='bottom'] - 表单出现位置, 只能是: 'bottom', 'top' 两个方向
 * @props {Boolean} [enableBackdropDismiss=true] - 点击背景关闭组件
 * @props {Boolean} [dismissOnPageChange=true] - 页面切换关闭组件
 * @props {boolean} [showBackdrop=true] - 是否显示黑色背景
 *
 * @demo #/sheet
 * @usage
 * <vm-sheet ref="paySheet" slot="fixed" direction="bottom">
 *    <section class="pay-sheet">
 *    <div class="pay-sheet-title">选择支付方式</div>
 *    <div class="pay-sheet-container">
 *        <div class="pay-sheet-content" @click="choose('alipay')">
 *            <vm-icon class="pay-sheet-icon" name="icon-alipay">Icon</vm-icon>
 *            <p class="pay-sheet-name">支付宝</p>
 *        </div>
 *        <div class="pay-sheet-content" @click="choose('wechat')">
 *            <vm-icon class="pay-sheet-icon" name="icon-weichat">Icon</vm-icon>
 *            <p class="pay-sheet-name">微信</p>
 *        </div>
 *        <div class="pay-sheet-content" @click="choose('unipay')">
 *            <vm-icon class="pay-sheet-icon" name="icon-unipay">Icon</vm-icon>
 *            <p class="pay-sheet-name">银联</p>
 *        </div>
 *    </div>
 *    <div class="pay-sheet-buttons">
 *        <vm-button full clear class="pay-sheet-button" @click="closePaySheet">取消</vm-button>
 *    </div>
 *    </section>
 * </vm-sheet>
 *
 */

export { default } from './sheet.vue'
