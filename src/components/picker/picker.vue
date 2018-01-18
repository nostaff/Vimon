<template>
  <div class="ion-picker-cmp" :class="[modeClass,cssClass]">
    <vm-backdrop :enableBackdropDismiss="enableBackdropDismiss"
                  :isActive="isActive"
                  @click="bdClick"></vm-backdrop>
    <transition
        name="picker-fade"
        @before-enter="beforeEnter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @after-leave="afterLeave">
      <div class="picker-wrapper" v-show="isActive">
        <div class="picker-toolbar">
          <div v-for="(b,index) in buttons"
               :key="index"
               class="picker-toolbar-button"
               :class="[b.cssRole]">
            <vm-button @click="btnClick(b)" :class="b.cssClass" class="picker-button" clear>{{b.text}}</vm-button>
          </div>
        </div>
        <div class="picker-columns">
          <div class="picker-above-highlight"></div>
          <vm-picker-col v-for="(c,index) in columns"
                         :index="index"
                         :key="c.name"
                         :col="c"
                         @onChange="colChange"></vm-picker-col>
          <div class="picker-below-highlight"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/javascript">
import { isString, isPresent, isNumber, isFunction, isTrueProperty } from '../../util/util'
import { urlChange } from '../../util/dom'
import objectAssign from 'object-assign'
import ModeMixins from '../../themes/theme.mixins'
import VmBackdrop from '../backdrop'
import VmButton from '../button'
import VmPickerCol from './picker-col'

const NOOP = () => {}

export default {
  name: 'vm-picker',
  mixins: [ModeMixins],
  components: {
    VmPickerCol,
    VmButton,
    VmBackdrop
  },
  data () {
    return {
      defaultOptions: {
        enableBackdropDismiss: true,
        dismissOnPageChange: true,
        onChange: NOOP,
        onSelect: NOOP,
        onDismiss: NOOP,
        cssClass: '',
        component: null, // content component or string
        data: null // datas send to content
      },

      buttons: [],
      columns: [],

      enableBackdropDismiss: true,
      dismissOnPageChange: true,
      onChange: NOOP,
      onSelect: NOOP,
      onDismiss: NOOP,
      cssClass: '',

      isActive: false, // 控制当前组件的激活状态
      enabled: true, // 是否不在动画中(是否为可行为状态)

      dismissCallback: NOOP, // 关闭的回调
      presentCallback: NOOP, // 打开的回调

      cols: [], // 每列的数据
      timer: null, // 计时器
      unreg: null // 页面切换关闭组件的解绑函数
    }
  },
  created () {
    // dismissOnPageChange
    if (this.dismissOnPageChange) {
      this.unreg = urlChange(() => {
        this.isActive && this.dismiss()
      })
    }
  },
  beforeMount () {
    let pickerCmpElements = document.querySelectorAll('.ion-picker-cmp')
    if (pickerCmpElements.length > 0) {
      pickerCmpElements.forEach(ele => {
        ele.remove()
        console.error('beforeMount find Picker opened!')
      })
    }
  },
  methods: {
    /**
     * Component Animate Hooks
     * @private
     */
    beforeEnter () {
      this.enabled = false // 不允许过渡中途操作
      this.$app && this.$app.setEnabled(false, 400)
    },
    afterEnter () {
      this.presentCallback()
      this.enabled = true
    },
    beforeLeave () {
      this.enabled = false
      this.$app && this.$app.setEnabled(false, 400)
    },
    afterLeave () {
      this.dismissCallback()
      // 删除DOM
      this.$el.remove()
      this.enabled = true
    },

    /**
     * 背景backdrop点击
     * @private
     */
    bdClick () {
      if (this.enabled && this.enableBackdropDismiss) {
        this.dismiss()
      }
    },

    /**
     * @function present
     * @param {object} options - 传入参数
     * @param {Object} options.buttons - 组件初始化的button数据
     * @param {Array} options.columns - 组件初始化的column数据
     * @param {String} options.column.name - 组件初始化的column数据
     * @param {String} options.columns.align - 组件初始化的column数据
     * @param {String} [options.theme='ios'] - 模式
     * @param {String} [options.cssClass] - 样式
     * @param {Boolean} [options.enableBackdropDismiss=true] - 点击backdrop是否能关闭
     * @param {Function} [options.onChange=noop] - picker数据变化时触发, 某一个col变化也触发, 返回最新值
     * @param {Function} [options.onSelect=noop] - 某一列发生变化时触发
     * @description 开启
     */
    present (options) {
      let _options = objectAssign({}, this.defaultOptions, options)
      this.cssClass = _options.cssClass.trim()
      this.dismissOnPageChange = isTrueProperty(_options.dismissOnPageChange)
      this.enableBackdropDismiss = isTrueProperty(_options.enableBackdropDismiss)
      this.onDismiss = _options.onDismiss
      this.onChange = _options.onChange
      this.onSelect = _options.onSelect

      if (typeof _options.isChain === 'boolean') { this.isChain = _options.isChain }
      if (typeof _options.level === 'number') { this.level = _options.level }

      this.buttons = _options.buttons.map(button => {
        if (isString(button)) {
          button = {text: button}
        }
        if (button.role) {
          button.cssRole = `picker-toolbar-${button.role}`
        }
        return button
      })

      this.columns = _options.columns.map(column => {
        if (!isPresent(column.options)) {
          column.options = []
        }
        column.selectedIndex = Math.max(0, parseInt(column.selectedIndex))
        column.options = column.options.map(option => {
          let opt = {
            text: '',
            value: '',
            disabled: option.disabled
          }

          if (option) {
            if (isString(option) || isNumber(option)) {
              opt.text = option.toString()
              opt.value = option
            } else {
              opt.text = option.text ? option.text : option.value
              opt.value = option.value ? option.value : option.text
            }
          }
          return opt
        })
        return column
      })

      this.isActive = true
      return new Promise(resolve => {
        this.presentCallback = resolve
      })
    },

    /**
     * @function dismiss
     * @description
     * 关闭
     */
    dismiss () {
      this.isActive = false
      this.dismissOnPageChange && this.unreg && this.unreg()
      isFunction(this.onDismiss) && this.onDismiss()
      return new Promise(resolve => {
        this.dismissCallback = resolve
      })
    },

    /**
     * 标题左右的两个按钮点击(取消/确定)
     * @private
     */
    btnClick (button) {
      if (!this.enabled) {
        return
      }

      let shouldDismiss = true
      if (isFunction(button.handler)) {
        // a handler has been provided, execute it
        // pass the handler the values from the inputs
        if (button.handler(this.getSelected()) === false) {
          // if the return value of the handler is false then do not dismiss
          shouldDismiss = false
        }
      }

      if (shouldDismiss) {
        this.dismiss(button.role)
      }
    },

    /**
     * 获取当前选择的值, 有多少列返回多少列的数据
     * @return {Array} selected - selected
     * @return {String} selected.text - text
     * @return {String} selected.value - value
     * @return {String} selected.columnIndex - columnIndex
     * @private
     */
    getSelected () {
      let selected = {}
      this.columns.forEach((col, index) => {
        let selectedColumn = col.options[col.selectedIndex]
        selected[col.name] = {
          text: selectedColumn ? selectedColumn.text : null,
          value: selectedColumn ? selectedColumn.value : null,
          columnIndex: index
        }
      })

      return selected
    },

    /**
       * 当选择变化,对外发送事件
       * @private
       */
    colChange (data) {
      // col发生变化时触发onSelect事件, 传递触发col的信息
      this.$emit('onSelect', data)
      isFunction(this.onSelect) && this.onSelect(data)

      // col发生变化, 则获取当前选中的整体数据, 触发onChange事件
      let selectedData = this.getSelected()
      this.$emit('onChange', selectedData)
      isFunction(this.onChange) && this.onChange(selectedData)
    },

    /**
       * 由子组件调用, 用于记录自己
       * @private
       */
    recordChildComponent (childComponent) {
      this.cols.push(childComponent)
    },

    /**
       * 动态添加修改列数据时,对某一列数据修改并刷新显示
       */
    resetColumn (index) {
      this.cols[index].reset()
    },

    /**
       * 如果设置的选中值与显示不一致, 使用这个刷新, 他会更新滚动位置
       * @private
       */
    refresh () {
      this.cols.forEach(column => {
        column.refresh()
      })
    }
  }
}
</script>

<style lang="scss">
@import "picker";
@import "picker.ios";
@import "picker.md";
@import "../../transition/picker";
</style>
