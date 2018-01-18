/**
 * Created by Hsiang on 2017/3/20.
 *
 * # 应用层级的配置
 *
 * 包括domain/url/AK/ssecretID等
 *
 */
export default {
  platforms: {
    mobile: {
      recordPosition: false
    },
    ios: {
      pageTransition: 'fade-right-transition'
    },
    android: {
      pageTransition: 'fade-bottom-transition'
    }
  },
  showIndicatorWhenPageChange: true, // 转场是否提前添加动画
  domain: ''
}
