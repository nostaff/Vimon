<template>
  <div class="ion-reorder"
       @touchstart="onDragStart"
       @mousedown="onDragStart"
       @touchend="onDragEnd"
       @mouseup="onDragEnd"
       @touchmove="onDragMove"
       @mousemove="onDragMove"
       @click="onClick">
    <vm-icon name="reorder" role="img" aria-label="reorder"></vm-icon>
  </div>
</template>
<script type="text/javascript">
  import {pointerCoord, hasClass} from '../../util/dom'
  import VmIcon from '../icon'

  const AUTO_SCROLL_MARGIN = 60
  const SCROLL_JUMP = 10
  const ITEM_REORDER_ACTIVE = 'reorder-active'

  export default {
    name: 'vm-item-reorder',
    inject: {
      selectedItem: {
        from: 'itemComponent',
        default () {
          if (process.env.NODE_ENV !== 'production') {
            console.error('[Component] ItemReorder组件 需要与 Item组件 组合使用!')
          }
          return null
        }
      },
      reorderItemGroup: {
        from: 'itemGroupComponent',
        default () {
          if (process.env.NODE_ENV !== 'production') {
            console.error('[Component] ItemReorder组件 需要与 ItemGroup组件 组合使用!')
          }
          return null
        }
      }
    },
    components: {
      VmIcon
    },
    data () {
      return {
        selectedItemEle: null,
        selectedItemHeight: 0,
        lastYcoord: 0,
        lastToIndex: -1,
        lastScrollPosition: 0,
        offset: {x: 0, y: 0}
      }
    },
    methods: {
      onClick (ev) {
        // Stop propagation if click event reaches ion-reorder
        ev.preventDefault()
        ev.stopPropagation()
      },

      onDragStart (ev) {
        if (this.selectedItemEle) {
          return false
        }

        let reorderElement = ev.target
        if (!hasClass(reorderElement, 'ion-reorder')) {
          return false
        }

        this.reorderItemGroup.reorderPrepare()

        const item = this.selectedItem.getNativeElement()
        if (!item) {
          console.error('reorder node not found')
          return false
        }
        ev.preventDefault()

        // Preparing state
        this.selectedItemEle = item
        this.selectedItemHeight = item.offsetHeight
        this.lastYcoord = -100
        this.lastToIndex = indexForItem(item)

        this.windowHeight = document.documentElement.clientHeight - AUTO_SCROLL_MARGIN
        this.lastScrollPosition = this.reorderItemGroup.scrollContent(0)

        this.offset = pointerCoord(ev)
        this.offset.y += this.lastScrollPosition

        this.selectedItem.setElementClass(ITEM_REORDER_ACTIVE, true)
        this.reorderItemGroup.reorderStart()
        return true
      },

      onDragMove (ev) {
        const selectedItem = this.selectedItemEle
        if (!selectedItem) {
          return
        }
        ev.preventDefault()

        // Get coordinate
        const coord = pointerCoord(ev)
        const posY = coord.y

        // Scroll if we reach the scroll margins
        const scrollPosition = this.scroll(posY)

        // Only perform hit test if we moved at least 30px from previous position
        if (Math.abs(posY - this.lastYcoord) > this.selectedItemHeight / 2) {
          var overItem = this.itemForCoord(coord)
          if (overItem) {
            var toIndex = indexForItem(overItem)
            if (toIndex !== undefined && (toIndex !== this.lastToIndex || this.emptyZone)) {
              var fromIndex = indexForItem(selectedItem)
              this.lastToIndex = toIndex
              this.lastYcoord = posY
              this.emptyZone = false
              this.reorderItemGroup.reorderMove(fromIndex, toIndex, this.selectedItemHeight)
            }
          } else {
            this.emptyZone = true
          }
        }

        // Update selected item position
        const ydiff = Math.round(posY - this.offset.y + scrollPosition)
        selectedItem.style['transform'] = `translateY(${ydiff}px)`
      },

      onDragEnd (ev) {
        const selectedItem = this.selectedItemEle
        if (!selectedItem) {
          return
        }
        if (ev) {
          ev.preventDefault()
          ev.stopPropagation()
        }

        const toIndex = this.lastToIndex
        const fromIndex = indexForItem(selectedItem)
        const reorderInactive = () => {
          this.selectedItemEle.style.transition = ''
          this.selectedItemEle.classList.remove(ITEM_REORDER_ACTIVE)
          this.selectedItemEle = null
        }

        if (toIndex === fromIndex) {
          selectedItem.style.transition = 'transform 200ms ease-in-out'
          setTimeout(reorderInactive, 200)
        } else {
          reorderInactive()
        }
        this.reorderItemGroup.reorderEmit(fromIndex, toIndex)
      },

      itemForCoord (coord) {
        const sideOffset = -100
        const x = this.offset.x + sideOffset
        const y = coord.y
        const element = document.elementFromPoint(x, y)
        return findReorderItem(element, this.reorderItemGroup.$el)
      },

      scroll (posY) {
        if (posY < AUTO_SCROLL_MARGIN) {
          this.lastScrollPosition = this.reorderItemGroup.scrollContent(-SCROLL_JUMP)
        } else if (posY > this.windowHeight) {
          this.lastScrollPosition = this.reorderItemGroup.scrollContent(SCROLL_JUMP)
        }
        return this.lastScrollPosition
      }
    }
  }

  /**
   * @hidden
   */
  function indexForItem (element) {
    return element.dataset.order
  }

  /**
   * @hidden
   */
  function findReorderItem (node, listNode) {
    let nested = 0
    while (node && nested < 4) {
      if (indexForItem(node) !== undefined) {
        if (listNode && node.parentNode !== listNode) {
          return null
        }
        return node
      }
      node = node.parentNode
      nested++
    }
    return null
  }
</script>

<style lang="scss">
  @import 'item-reorder';
</style>
