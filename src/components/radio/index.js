/**
 * @component Radio
 * @description
 *
 * ## 表单组件 / Radio单选框组件
 *
 * ### 注意
 *
 * 使用v-modal切换状态(数据控制), 不支持checked属性, value为纯string字段, 用于唯一标识;
 *
 * ### 其他
 *
 * - 组件支持异步操作实例化
 * - 目前组件的层级嵌套关系如下:  List -> Item -> Radio
 * - 动态设置了单个radio的禁用状态, 如果之前是选中的则取消选中, 手动点击和数据选中都会生效
 *
 * ### 如何引入
 * ```
 * // 引入
 * import {Radio} from 'vimon'
 * // 安装
 * Vue.component(Radio.name, Radio)
 * // 或者
 * export default{
 *   components: {
 *    Radio
 *  }
 * }
 * ```
 *
 * @props {String} [mode='ios'] - 模式
 * @props {String} [color] - 颜色
 * @props {Boolean} [disabled=false] - 单向选择, 点击且换并不对父组件传递
 *
 * @fire component:Radio#onSelect - 点按选择时触发
 * @demo #/radio
 * @usage
 * <List radio-group v-model="fruits" :disabled="isListDisabled">
 *    <ListHeader>Fruits</ListHeader>
 *    <Item>
 *        <Label>Apple</Label>
 *        <Radio value="apple" :disabled="isAppleDisabled" @onSelect="onSelectHandler"></Radio>
 *    </Item>
 *    <Item>
 *        <Label>Banana</Label>
 *        <Radio value="banana" color="danger" @onSelect="onSelectHandler"></Radio>
 *    </Item>
 *    <Item>
 *        <Label>Cherry (secondary color)</Label>
 *        <Radio value="cherry" color="secondary" @onSelect="onSelectHandler"></Radio>
 *    </Item>
 *    <Item>
 *         <Label>Disabled</Label>
 *        <Radio value="disabled" :disabled="true" @onSelect="onSelectHandler"></Radio>
 *    </Item>
 *    <Item>
 *        <Label>Default</Label>
 *        <Radio value="default" @onSelect="onSelectHandler"></Radio>
 *    </Item>
 * </List>
 *
 **/
export { default } from './radio.vue'
