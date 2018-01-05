/**
 * @component ChooseCity
 * @description
 *
 * ## 全国城市选择器 / ChooseCity组件
 *
 * ### 简述
 *
 * 选择城市的组件，如果开启定位则可定位当前的城市，这个组件只选择城市，如果需要三级城市联动的话，请参考`city-picker`组件。
 *
 * ### 来源
 *
 * 因为这个组件在Alipay和天猫淘宝都出现过，因此，对于 ```ALipay``` 将调用原生组件，如果是在其余平台将调用H5组件，且传参功能点完全相同。因此, 如果是在支付宝模式, 且设置了Bridge, 则自动开自支付宝的UI控件, 具体参考Demo.
 *
 * @demo #/choose-city
 *
 * @usage
 * import ChooseCity from 'vimon'
 *
 * function openCitySelector () {
 *    let _this = this
 *    ChooseCity.present({
 *      showLocatedCity: true,
 *      onDismiss (data) {
 *        console.log(data)
 *      }
 *    })
 *  }
 */
export { default } from './chose-city.js'
