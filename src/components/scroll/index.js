/**
 * @component Scroll
 * @description
 *
 * ## 滚动组件 / Scroll滚动组件
 *
 * ### 来源
 *
 * Content组件也具有滚动属性, 但是Content组件的定位是页面基础布局的中间层, 也就是内容层, 这个内容层也支持jsScroll, 但是不支持滚动事件, 移除也是为了考虑性能的问题. 当然也有特殊情况, 如果内容层希望能有一个支持jsScroll的子组件这里就需要Scroll组件了.
 *
 * 比如:
 *
 * - 订单App, 左侧的菜单类别, 右侧类别详情(菜单详情).
 * - 滑动可切换的tab组件, 能更具我外接触发滚动祖选择等.
 * - 横向的跑马灯, 根据指令切换到某个位置.
 * - 对Content组件的拓展, 是的浏览内容支持jsScroll
 *
 * ### 传参及事件
 *
 * Scroll组件是对 `better-scroll` 组件的封装, 组件书写完毕也是初始化完毕的时候, props就是传入的参数, 如果需要监听事件, 则通过@绑定即可, 例如:
 *
 * ```
 * <Scroll @scroll="scrollHandler" ref="scroll">内容</Scroll>
 * ```
 *
 * 虽然事件的命名不符合Vimo既有规范, 但这部分是封装了better-scroll, 因此不改变原基础为好, `better-scroll`的文档参看下方链接.
 *
 * 通过ref获取组件实例进行操作, 因此使用逻辑完全一致. 其余详情请参考下方链接.
 *
 *
 * ### 获取jsScroll的实例
 * ```
 * <Scroll ref="scroll">内容</Scroll>
 *
 * computed: {
 *    scrollComponent () {
 *        return this.$refs.scroll.jsScrollInstance
 *    }
 * }
 * ```
 *
 * ### 关于销毁
 *
 * 组件关闭自动销毁, 因此不存在持续占用内存的问题
 *
 * ### 如何引入
 * ```
 * // 引入
 * import { Scroll } from 'vimo'
 * // 安装
 * Vue.component(Scroll.name, Scroll)
 * // 或者
 * export default{
 *   components: {
 *     Scroll
 *  }
 * }
 * ```
 *

 */
/**
 * @component Scroll
 * @description
 *
 * 滚动列表，提供了优质的原生滚动体验，便捷的配置项和事件，是一个基于`better-scroll`进行封装的组件。
 *
 * ### 示例
 *
 * - 基本使用
 *
 * 通过设置 `data` 属性为一个数组，即可生成能够在容器内优雅滚动的列表。
 *
 * ```html
 *  <div class="scroll-wrapper">
 *   <vm-scroll>
 *     <vm-list>
         <vm-item v-for="item in datas">{{item.text}}</vm-item>
       </vm-list>
 *   </vm-scroll>
 * </div>
 * ```

- 配置 better-scroll 选项

  通过 options 属性可以配置 better-scroll 的选项，包括滚动条、下拉刷新、上拉加载等，具体可查看 better-scroll 的[官方文档](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/options.html)，这里仅对几个常用的配置项进行介绍说明。

  1）滚动条

  默认无滚动条，还可设为淡入淡出滚动条或一直显示滚动条。

  ```html
  <vm-scroll :options="options">
    <vm-list>
      <vm-item v-for="item in datas">{{item.text}}</vm-item>
    </vm-list>
  </vm-scroll>
  ```
  ```javascript
  export default {
    data() {
      return {
        datas: [1, 2, 3, 4, 5],
        options: {
          scrollbar: {
            fade: false
          }
        }
      }
    }
  }
  ```

  2）下拉刷新

  默认无下拉刷新功能，可通过配置项`pullDownRefresh`开启`pulling-down`事件派发和下拉动画，你可以监听`pulling-down`事件更新数据。

  ```html
  <vm-scroll
    ref="scroll"
    :options="options"
    @pulling-down="onPullingDown">
<vm-list>
         <vm-item v-for="item in datas">{{item.text}}</vm-item>
       </vm-list>
  </vm-scroll>
  ```
  ```javascript
  export default {
    data() {
      return {
        items: [1, 2, 3, 4, 5],
        options: {
          pullDownRefresh: {
            threshold: 90,
            stop: 40,
            txt: 'Refresh success'
          }
        }
      }
    },
    methods: {
      onPullingDown() {
        // 模拟更新数据
        setTimeout(() => {
          if (Math.random() > 0.5) {
            // 如果有新数据
            this.items.unshift('I am new data: ' + +new Date())
          } else {
            // 如果没有新数据
            this.$refs.scroll.forceUpdate()
          }
        }, 1000)
      }
    }
  }
  ```

  3）上拉加载

  默认无上拉加载功能，可通过配置项`pullUpLoad`开启`pulling-up`事件派发和上拉动画，你可以监听`pulling-up`事件更新数据。

  ```html
  <vm-scroll
    ref="scroll"
    :options="options"
    @pulling-up="onPullingUp">
<vm-list>
         <vm-item v-for="item in datas">{{item.text}}</vm-item>
       </vm-list>
    </vm-scroll>
  ```
  ```javascript
  export default {
    data() {
      return {
        items: [1, 2, 3, 4, 5],
        itemIndex: 5,
        options: {
          pullUpLoad: {
            threshold: 0,
            txt: {
              more: 'Load more',
              noMore: 'No more data'
            }
          }
        }
      }
    },
    methods: {
      onPullingUp() {
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
      }
    }
  }
  ```

- 自定义下拉刷新和上拉加载动画

  如果你不喜欢内置的下载刷新插槽和上拉加载，还可以用[作用域插槽](https://cn.vuejs.org/v2/guide/components.html#作用域插槽)做自定义动画。下面这个示例，就是用作用域插槽对下拉刷新做了自定义动画，而上拉加载则保留了缺省的内置动画。

  ```html
  <vm-scroll
    ref="scroll"
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <template slot="pulldown" slot-scope="props">
      <div
        v-if="props.pullDownRefresh"
        class="cube-pulldown-wrapper"
        :style="props.pullDownStyle">
        <div
          v-if="props.beforePullDown"
          class="before-trigger"
          :style="{paddingTop: props.bubbleY + 'px'}">
          <span :class="{rotate: props.bubbleY > 40}">↓</span>
        </div>
        <div class="after-trigger" v-else>
          <div v-if="props.isPullingDown" class="loading">
            <cube-loading></cube-loading>
          </div>
          <div v-else><span>Refresh success</span></div>
        </div>
      </div>
    </template>
<vm-list>
         <vm-item v-for="item in datas">{{item.text}}</vm-item>
       </vm-list>
  </vm-scroll>
  ```

  通过作用域插槽提供的作用域参数，你可以根据各个状态的变化来控制动画流程。具体的作用域参数及其含义详见下面的插槽。

### Props 配置

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| - | - | - | - | - |
| data | 用于列表渲染的数据 | Array | - | [] |
| options | better-scroll 配置项 | Object | - | {<br>  observeDOM: true,<br>  click: true,<br>  probeType: 1,<br>  scrollbar: false,<br>  pullDownRefresh: false,<br>  pullUpLoad: false<br>} |
| direction | 滚动方向 | String | 'vertical', 'horizontal' | 'vertical' |
| listenScroll | 是否派发 scroll 事件 | Boolean | true/false | false |
| listenBeforeScroll | 是否派发 before-scroll-start 事件 | Boolean | true/false | false |
| refreshDelay | data属性的数据更新后，scroll 的刷新延时 | Number | - | 20 |

- `scrollbar` 子配置项

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| - | - | - | - | - |
| fade | 是否淡入淡出 | Boolean | true/false | false |

- `pullDownRefresh` 子配置项

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| - | - | - | - | - |
| threshold | 下拉刷新动作的下拉距离阈值 | Number | - | 90 |
| stop | 回弹停留的位置 | Number | - | 40 |
| txt | 刷新成功的文案 | String | - | 'Refresh success' |

- `pullUpLoad` 子配置项

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| - | - | - | - | - |
| threshold | 上拉刷新动作的上拉距离阈值 | Number | - | 0 |
| txt | 上拉加载的相关文案 | Object | - | { more: 'Load more', noMore: 'No more data' } |

### 插槽

| 名字 | 说明 | 作用域参数 |
| - | - | - |
| default | 基于`data`属性渲染的列表 | - |
| pulldown | 位于列表上方，会在下拉刷新时显示 | pullDownRefresh: 是否开启了下拉刷新功能 <br> pullDownStyle: 移入移出的样式 <br> beforePullDown: 是否正在做下拉操作 <br> isPullingDown: 是否正在拉取数据 <br> bubbleY: 当前下拉的距离 - 50|
| pullup | 位于列表下方，会在上拉加载时显示 | pullUpLoad: 是否开启了上拉加载功能 <br> isPullUpLoad: 是否正在加载数据 |

### 事件

| 事件名 | 说明 | 参数 |
| - | - | - |
| click | 点击列表项时触发 | item - 该列表项的数据 |
| scroll | 当 listenScroll 为 true 时，根据 probeType 的值决定派发时机 | Object {x, y} - 滚动的实时坐标 |
| before-scroll-start | 当 listenBeforeScroll 属性为 true 时，在滚动开始之前触发 | - |
| pulling-down | 当 pullDownRefresh 属性为 true 时，在下拉超过阈值时触发 | - |
| pulling-up | 当 pullUpLoad 属性为 true 时，在上拉超过阈值时触发 | - |

 * @see https://www.npmjs.com/package/better-scroll
 * @see https://github.com/ustbhuangyi/better-scroll
 * @demo #/scroll
 */
export { default } from './scroll.vue'
