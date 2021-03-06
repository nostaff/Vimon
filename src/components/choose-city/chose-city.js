import Modal from '../modal'
import cityComponent from './city.vue'

const ChooseCity = {
  /**
   * @function present
   * @description
   * 开启ChooseCity组件
   * @param {Boolean}   options - 传入参数
   * @param {Boolean}   [options.showLocatedCity=false]   - 是否显示当前定位城市，默认 false
   * @param {Boolean}   [options.showHotCities=true]      - 是否显示热门城市，默认 true
   * @param {Boolean}   [options.showBackdrop=true]       - modal 是否显示背景色
   * @param {Boolean}   [options.enableBackdropDismiss=true]- modal 点击背景是否关闭
   * @param {Array}     [options.cities]                  - 城市数据，默认 本地数据
   * @param {Array}     [options.cities.city]             - 城市名称
   * @param {Array}     [options.cities.adCode]           - 城市编码
   * @param {Array}     [options.cities.spell]            - 城市拼音
   * @param {Array}     [options.hotCities]               - 热门城市，默认 本地数据
   * @param {Array}     [options.hotCities.city]          - 城市名称
   * @param {Array}     [options.hotCities.adCode]        - 城市编码
   * @param {Array}     [options.hotCities.spell]         - 城市拼音
   * @param {String}    [options.mode='ios']              - 模式, 可以是如下取值: ios, md, fade, zoom, fade-right
   * @param {Boolean}   [options.isH5=false']             - 是否强制使用H5模式，默认是自动的
   * @param {String}    [options.ak='8d1b...90a2']- 如果是H5模式并且开启了'当前定位城市'，则使用高德地图定位，这个是AK
   * @param {Function}  [options.onDismiss]               - 当选择点击后的回调，传入参数是当前选择的城市
   */
  present (options) {
    let finalOptions = {}
    let defaultOptions = {
      showLocatedCity: false, // 是否显示当前定位城市，默认 false
      showHotCities: true, // 是否显示热门城市，默认 true
      cities: require('./cities.json'), // 城市数据，默认 本地数据
      hotCities: require('./hot-cities.json'), // 热门城市，默认 本地数据
      mode: 'fade-right', // 模式 可以是如下取值: ios, md, fade, zoom, fade-right
      showBackdrop: true, // modal 是否显示背景色
      enableBackdropDismiss: true, // modal 点击背景是否关闭
      isH5: false, // 是否强制使用H5模式
      ak: '8d1ba642a3a3046d1ee087e0f8b490a2', // 如果是H5模式并且开启了'当前定位城市'，则使用高德地图定位，这个是AK
      onDismiss () {}
    }
    Object.assign(finalOptions, defaultOptions, options)

    let isHandled =
      !options.isH5 &&
      window.VM &&
      window.VM.platform &&
      window.VM.platform.chooseCity &&
      window.VM.platform.chooseCity(options)
    if (!isHandled) {
      Modal.present({
        mode: finalOptions.mode,
        component: cityComponent,
        data: {
          showLocatedCity: finalOptions.showLocatedCity,
          showHotCities: finalOptions.showHotCities,
          hotCities: finalOptions.hotCities,
          cities: finalOptions.cities
        },
        showBackdrop: finalOptions.showBackdrop,
        enableBackdropDismiss: finalOptions.enableBackdropDismiss,
        onDismiss: finalOptions.onDismiss
      })
    }
  }
}

export default ChooseCity
