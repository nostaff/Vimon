/**
  * @component Backdrop
  * @description
  *
  * ## 其他 / Backdrop背景暗化组件
  *
  * 一般是用来进行背景遮罩的. 比如Alert/Actionsheet组件等用到.
  *
  * @props {Boolean} [enableBackdropDismiss=true] - 是否能点击背景关闭操作, 设置`backdrop-no-tappable` 样式(不重要)
  * @props {Boolean} [isActive=false] - 组件是否激活
  *
  * @fires component:Backdrop#onShown
  * @fires component:Backdrop#onHidden
  *
  * @demo #/backdrop
  *
  * @usage
  * <vm-backdrop @click="bdClick" :enableBackdropDismiss="enableBackdropDismiss" :isActive="isActive"></vm-backdrop>
  */

export { default } from './backdrop.vue'
