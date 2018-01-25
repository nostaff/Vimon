/**
 * @component Select/Option
 * @description
 *
 * ## 表单组件 / Option选择组件
 *
 * Option组件是Select组组件的子组件，两者必须配合使用。
 *
 * @props {Boolean} [disabled='false'] - 是否禁用
 * @props {Boolean} [selected='false'] - 是否已选中
 * @props {Object|String|Array} [value=''] - 组件值
 *
 * @usage
 * <Item>
 *    <Label>Gender</Label>
 *    <Select item-end placeholder="Select" interface="alert"
 *            @onChange="onChange"
 *            @onSelect="onSelect"
 *            @onCancel="onCancel">
 *        <Option value="f" checked>Female</Option>
 *        <Option value="m">Male</Option>
 *    </Select>
 * </Item>
 *
 * @demo #/select
 */

export { default } from './option.vue'
