<template>
  <vm-page v-nav="{title: 'Scroll'}">
    <vm-content class="outer-content">
      <div padding>
        <h4>Options</h4>
        <vm-list>
          <vm-item>
            <vm-label>Frodo Baggins</vm-label>
            <vm-toggle slot="item-end" :value="scrollbar" @onChange="updateScrollbar"></vm-toggle>
          </vm-item>
          <vm-item v-if="scrollbar">
            <vm-label>fade</vm-label>
            <vm-toggle slot="item-end" :value="scrollbarFade" @onChange="updateScrollbarFade"></vm-toggle>
          </vm-item>
        </vm-list>

        <vm-list>
          <vm-item>
            <vm-label>Pull Down Refresh</vm-label>
            <vm-toggle slot="item-end" :value="pullDownRefresh" @onChange="updatePullDownRefresh"></vm-toggle>
          </vm-item>
          <vm-item v-if="pullDownRefresh">
            <vm-label fixed>threshold (≥ 40)</vm-label>
            <vm-input :value="pullDownRefreshThreshold" @onChange="updatePullDownRefreshThreshold"></vm-input>
          </vm-item>
          <vm-item v-if="pullDownRefresh">
            <vm-label fixed>stop (≥ 40)</vm-label>
            <vm-input :value="pullDownRefreshStop" @onChange="updatePullDownRefreshStop"></vm-input>
          </vm-item>
          <vm-item v-if="pullDownRefresh">
            <vm-label fixed>txt</vm-label>
            <vm-input :value="pullDownRefreshTxt" @onChange="updatePullDownRefreshTxt"></vm-input>
          </vm-item>
          <vm-item v-if="pullDownRefresh">
            <vm-label>Custom Animation</vm-label>
            <vm-toggle slot="item-end" :value="customPullDown" @onChange="updateCustomPullDown"></vm-toggle>
          </vm-item>
        </vm-list>

        <vm-list>
          <vm-item>
            <vm-label>Pull Up Load</vm-label>
            <vm-toggle slot="item-end" :value="pullUpLoad" @onChange="updatePullUpLoad"></vm-toggle>
          </vm-item>
          <vm-item v-if="pullUpLoad">
            <vm-label fixed>threshold</vm-label>
            <vm-input :value="pullUpLoadThreshold" @onChange="updatePullUpLoadThreshold"></vm-input>
          </vm-item>
          <vm-item v-if="pullUpLoad">
            <vm-label fixed>moreTxt</vm-label>
            <vm-input :value="pullUpLoadMoreTxt" @onChange="updatePullUpLoadMoreTxt"></vm-input>
          </vm-item>
          <vm-item v-if="pullUpLoad">
            <vm-label fixed>noMoreTxt</vm-label>
            <vm-input :value="pullUpLoadNoMoreTxt" @onChange="updatePullUpLoadNoMoreTxt"></vm-input>
          </vm-item>
        </vm-list>
      </div>
      <div padding class="demo">
        <h4>Demo</h4>
        <div class="scroll-list-wrap">
          <vm-scroll ref="scroll" :options="scrollOptions" @pulling-down="onPullingDown" @pulling-up="onPullingUp">
            <vm-list>
              <vm-item v-for="(item, idx) in items" :key="idx">{{item}}</vm-item>
            </vm-list>
            <template v-if="customPullDown" slot="pulldown" slot-scope="props">
              <div v-if="props.pullDownRefresh" class="vm-pulldown-wrapper" :style="props.pullDownStyle">
                <div v-if="props.beforePullDown" class="before-trigger" :style="{paddingTop: props.bubbleY + 'px'}">
                  <span :class="{rotate: props.bubbleY > 40}">↓</span>
                </div>
                <div class="after-trigger" v-else>
                  <div v-if="props.isPullingDown" class="loading">
                    <vm-loading></vm-loading>
                  </div>
                  <div v-else>
                    <span>Refresh success</span>
                  </div>
                </div>
              </div>
            </template>
          </vm-scroll>
        </div>
      </div>
      <div padding class="methods">
        <h4>Methods</h4>
        <vm-list>
          <vm-item>
            <vm-label fixed>x</vm-label>
            <vm-input :value="scrollToX" @onChange="updateScrollToX"></vm-input>
          </vm-item>
          <vm-item>
            <vm-label fixed>y</vm-label>
            <vm-input :value="scrollToY" @onChange="updateScrollToY"></vm-input>
          </vm-item>
          <vm-item>
            <vm-label fixed>time</vm-label>
            <vm-input :value="scrollToTime" @onChange="updateScrollToTime"></vm-input>
          </vm-item>
          <vm-item>
            <vm-label fixed>easing</vm-label>
            <vm-select :value="scrollToEasing" @onChange="updateScrollToEasing" interface="popover">
              <vm-option v-for="(option, index) in scrollToEasingOptions" :key="index" :value="option.value">{{option.text}}</vm-option>
            </vm-select>
          </vm-item>
        </vm-list>
        <vm-button @click="scrollTo" block>scrollTo</vm-button>
      </div>
      <div padding></div>
    </vm-content>
  </vm-page>
</template>

<script type="text/javascript">
import {Button, Icon, List, Item, Label, Input, Toggle, Scroll, Select, Option, Loading} from 'vimon'

const _data = [
  'I am line 1',
  'I am line 2',
  'I am line 3',
  'I am line 4',
  'I am line 5',
  'I am line 6',
  'I am line 7',
  'I am line 8',
  'I am line 9',
  'I am line 10',
  'I am line 11',
  'I am line 12',
  'I am line 13',
  'I am line 14',
  'I am line 15'
]

export default {
  components: {
    'vm-button': Button,
    'vm-icon': Icon,
    'vm-list': List,
    'vm-item': Item,
    'vm-label': Label,
    'vm-input': Input,
    'vm-toggle': Toggle,
    'vm-scroll': Scroll,
    'vm-select': Select,
    'vm-option': Option,
    'vm-loading': Loading
  },
  data () {
    return {
      items: _data,
      itemIndex: _data.length,
      scrollbar: true,
      scrollbarFade: true,
      pullDownRefresh: true,
      pullDownRefreshThreshold: 90,
      pullDownRefreshStop: 40,
      pullDownRefreshTxt: 'Refresh success',
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: 'Load more',
      pullUpLoadNoMoreTxt: 'No more data',
      scrollToX: 0,
      scrollToY: -200,
      scrollToTime: 700,
      scrollToEasing: 'bounce',
      scrollToEasingOptions: [
        {
          text: 'bounce',
          value: 'bounce'
        },
        {
          text: 'swipe',
          value: 'swipe'
        },
        {
          text: 'swipeBounce',
          value: 'swipeBounce'
        }
      ],
      customPullDown: false
    }
  },
  watch: {
    scrollbarObj: {
      handler () {
        this.rebuildScroll()
      },
      deep: true
    },
    pullDownRefreshObj: {
      handler () {
        this.rebuildScroll()
      },
      deep: true
    },
    pullUpLoadObj: {
      handler () {
        this.rebuildScroll()
      },
      deep: true
    }
  },
  computed: {
    scrollOptions () {
      return {
        pullDownRefresh: this.pullDownRefreshObj,
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: this.scrollbarObj
      }
    },
    scrollbarObj: function () {
      return this.scrollbar ? { fade: this.scrollbarFade } : false
    },
    pullDownRefreshObj: function () {
      return this.pullDownRefresh
        ? {
          threshold: parseInt(this.pullDownRefreshThreshold),
          stop: parseInt(this.pullDownRefreshStop),
          txt: this.pullDownRefreshTxt
        }
        : false
    },
    pullUpLoadObj: function () {
      return this.pullUpLoad
        ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {
            more: this.pullUpLoadMoreTxt,
            noMore: this.pullUpLoadNoMoreTxt
          }
        }
        : false
    }
  },
  methods: {
    onPullingDown () {
      // 模拟更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          this.items.unshift(`I am new data: ${+new Date()}`)
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      }, 1000)
    },
    onPullingUp () {
      // 更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          let newPage = [
            'I am line ' + ++this.itemIndex,
            'I am line ' + ++this.itemIndex,
            'I am line ' + ++this.itemIndex,
            'I am line ' + ++this.itemIndex,
            'I am line ' + ++this.itemIndex
          ]

          this.items = this.items.concat(newPage)
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      }, 1000)
    },
    scrollTo () {
      this.$refs.scroll.scrollTo(
        this.scrollToX,
        this.scrollToY,
        this.scrollToTime,
        this.scrollToEasing
      )
    },
    updateScrollbar (val) {
      this.scrollbar = val
    },
    updateScrollbarFade (val) {
      this.scrollbarFade = val
    },
    updatePullDownRefresh (val) {
      this.pullDownRefresh = val
    },
    updatePullDownRefreshThreshold (val) {
      this.pullDownRefreshThreshold = val
    },
    updatePullDownRefreshStop (val) {
      this.pullDownRefreshStop = val
    },
    updatePullDownRefreshTxt (val) {
      this.pullDownRefreshTxt = val
    },
    updatePullUpLoad (val) {
      this.pullUpLoad = val
    },
    updatePullUpLoadThreshold (val) {
      this.pullUpLoadThreshold = val
    },
    updatePullUpLoadMoreTxt (val) {
      this.pullUpLoadMoreTxt = val
    },
    updatePullUpLoadNoMoreTxt (val) {
      this.pullUpLoadNoMoreTxt = val
    },
    updateCustomPullDown (val) {
      this.customPullDown = val
    },
    updateScrollToX (val) {
      this.scrollToX = val
    },
    updateScrollToY (val) {
      this.scrollToY = val
    },
    updateScrollToTime (val) {
      this.scrollToTime = val
    },
    updateScrollToEasing (val) {
      this.scrollToEasing = val
    },
    rebuildScroll () {
      this.$nextTick(() => {
        this.$refs.scroll.destroy()
        this.$refs.scroll.initScroll()
      })
    }
  }
}
</script>

<style lang="scss">
.scroll-wrapper {
  .vm-pulldown-wrapper {
    .before-trigger {
      font-size: 30px;
      align-self: flex-end;

      span {
        display: inline-block;
        transition: all 0.3s;
        color: #666;

        &.rotate {
          transform: rotate(180deg);
        }
      }
    }
  }
}

.scroll-list-wrap {
  height: 480px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
  overflow: hidden;
}

.foods-wrapper {
  .food-item {
    display: flex;
    padding: 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);

    &:last-child {
      // border-none();
      border: 0;
      margin-bottom: 0;
    }

    .icon {
      flex: 0 0 57px;
      margin-right: 10px;
    }

    .food-content {
      flex: 1;

      .name {
        margin: 2px 0 8px 0;
        height: 14px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }

      .description, .extra {
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }

      .description {
        line-height: 12px;
        margin-bottom: 8px;
      }

      .extra {
        .count {
          margin-right: 12px;
        }
      }

      .price {
        font-weight: 700;
        line-height: 24px;

        .now {
          margin-right: 8px;
          font-size: 14px;
          color: rgb(240, 20, 20);
        }

        .old {
          text-decoration: line-through;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }

      .cartcontrol-wrapper {
        position: absolute;
        right: 0;
        bottom: 12px;
      }
    }
  }
}
</style>
