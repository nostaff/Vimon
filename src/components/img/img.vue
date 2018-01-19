<template>
  <div class="ion-img img"
      :class="{'img-loaded':isLoaded,'img-unloaded':!isLoaded}"
      :src="src"
      :style="{'width':w,'height':h}">
    <transition name="fade">
      <img v-show="isLoaded" ref="img"
          :alt="alt"
          :src="srcValue"
          :width="w"
          :height="h">
    </transition>
  </div>
</template>

<script type="text/javascript">
import { getUnitValue } from '../../util/util'
import { registerListener } from '../../util/dom'

export default {
  name: 'vm-img',
  inject: {
    contentComponent: {
      from: 'contentComponent',
      default: null
    }
  },
  props: {
    src: String,
    alt: {
      type: String,
      default: ''
    },
    width: {
      type: [Number, String],
      default: 0
    },
    height: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {
      isLoaded: false, // 判断DOM是否显示img
      srcValue: null, // 内部使用的src值
      w: this.wQ, // 当前渲染的尺寸值
      h: this.hQ, // 当前渲染的尺寸值

      canRequest: false, // 这个值是由content组件控制的!
      canRender: false, // 这个值是由content组件控制的!

      hasLoaded: false, // 判断图片是否真正下载完毕
      requestingSrc: null, // 当前正在请求的src
      renderedSrc: null, // 已经下载完毕渲染完毕的src
      rect: null, // 当前组件与页面的位置关系
      imgElement: null, // img标签元素
      wQ: getUnitValue(this.width) || 0, // 记录最新的尺寸值
      hQ: getUnitValue(this.height) || 0, // 记录最新的尺寸值

      unreg: null // {function} 解除当前的注册事件
    }
  },
  watch: {
    width () {
      this._setDims()
    },
    height () {
      this._setDims()
    },
    src (val) {
      this._updateSrcValue(val)
    }
  },
  created () {
    if (!this.contentComponent) {
      console.warn('Img组件必须在Content组件中才能正常工作!')
    } else {
      this.contentComponent && this.contentComponent.addImg(this)
    }
  },
  mounted () {
    this.imgElement = this.$refs.img

    this._setDims()
    this._updateSrcValue(this.src)

    this.unreg = registerListener(this.imgElement, 'load', () => {
      this.hasLoaded = true
      this.update()
    }, {passive: true})
  },
  destroyed () {
    this.unreg && this.unreg()
    this.unreg = null
    this.reset()
  },
  methods: {
    reset () {
      // if (this.requestingSrc) {
      if (this.requestingSrc && !this.renderedSrc && !this.hasLoaded) {
      // abort any active requests
        // console.debug(`abortRequest ${this.requestingSrc} ${Date.now()}`)
        this._srcAttr('')
        this.requestingSrc = null
      }
      if (this.renderedSrc) {
      // clear out the currently rendered img
        // console.debug(`clearRender ${this.renderedSrc} ${Date.now()}`)
        this.renderedSrc = null
        this._isLoaded(false)
      }
    },

    update () {
    // only attempt an update if there is an active src
    // and the content containing the image considers it updatable
      if (this.src && this.contentComponent && this.contentComponent.isImgsUpdatable()) {
        if (this.canRequest && (this.src !== this.renderedSrc && this.src !== this.requestingSrc) && !this.hasLoaded
        ) {
          // only begin the request if we "can" request
          // begin the image request if the src is different from the rendered src
          // and if we don't already has a tmpDataUri
          // console.debug(`request ${this.src} ${Date.now()}`)
          this.requestingSrc = this.src

          this._isLoaded(false)
          this._srcAttr(this.src)

          // set the dimensions of the image if we do have different data
          this._setDims()
        }

        if (this.canRender && this.hasLoaded) {
          if (this.src !== this.renderedSrc) {
            // we can render and we have a datauri to render
            this.renderedSrc = this.src
            this._setDims()
            this._srcAttr(this.src)
            this._isLoaded(true)
          } else {
            this._isLoaded(true)
          }
        }
      }
    },

    _isLoaded (isLoaded) {
      this.isLoaded = isLoaded
    },

    _srcAttr (srcAttr) {
      this.srcValue = srcAttr
    },

    _setDims () {
      this.wQ = getUnitValue(this.width) || 0
      this.hQ = getUnitValue(this.height) || 0

      // only set the dimensions if we can render
      // and only if the dimensions have changed from when we last set it
      if ((this.w !== this.wQ || this.h !== this.hQ)) {
        if (this.w !== this.wQ) {
          this.w = this.wQ
        }
        if (this.h !== this.hQ) {
          this.h = this.hQ
        }
      }
    },

    /**
     * Update the source of the image
     * @private
     */
    _updateSrcValue (newSrc) {
      // if the source hasn't changed, then um, let's not change it
      if (newSrc !== this.src) {
        // we're changing the source
        // so abort any active http requests
        // and render the image empty
        this.reset()

        // Are they using an actual datauri already,
        // or reset any existing datauri we might be holding onto
        this.hasLoaded = newSrc.indexOf('data:') === 0

        // run update to kick off requests or render if everything is good
        this.update()
      }
    },

    getTop () {
      const bounds = this._getBounds()
      return bounds && bounds.top || 0
    },

    getBottom () {
      const bounds = this._getBounds()
      return bounds && bounds.bottom || 0
    },

    _getBounds () {
      if (!this.rect) {
        // do the raw DOM lookup w/ getBoundingClientRect
        this.rect = this.$el.getBoundingClientRect()
        // console.debug(`img, ${this.src}, read, ${this.rect.top} - ${this.rect.bottom}`)
      }
      return this.rect
    }

  }
}
</script>

