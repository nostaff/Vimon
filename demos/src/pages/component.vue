<template>
  <vm-page v-nav="{title: 'Components', color: 'danger', showMoreButton: true, onMoreButtonClick: moreButtonClick}">

    <vm-content class="outer-content">
      <!-- Basic -->
      <vm-list>
        <vm-list-header>组件</vm-list-header>
        <vm-item link="/button">
          按钮
          <vm-note slot="item-end">Button</vm-note>
        </vm-item>
        <vm-item link="/chip">
          Chip
          <vm-note slot="item-end">Chip</vm-note>
        </vm-item>
        <vm-item link="/badge">
          徽章
          <vm-note slot="item-end">Badge</vm-note>
        </vm-item>
        <vm-item link="/icon">
          图标
          <vm-note slot="item-end">Icons</vm-note>
        </vm-item>
        <vm-item link="/img">
          图片
          <vm-note slot="item-end">Img</vm-note>
        </vm-item>
        <vm-item link="/fabs">
          浮动按钮
          <vm-note slot="item-end">FABs</vm-note>
        </vm-item>
        <vm-item link="/spinner">
          加载提示
          <vm-note slot="item-end">Spinner</vm-note>
        </vm-item>
        <vm-item link="/datetime">
          日期时间
          <vm-note slot="item-end">Datetime</vm-note>
        </vm-item>
      </vm-list>

      <vm-list>
        <vm-list-header>Form表单</vm-list-header>
        <vm-item link="/input">
          输入框
          <vm-note slot="item-end">Input</vm-note>
        </vm-item>
        <vm-item link="/textarea">
          多行输入
          <vm-note slot="item-end">Textarea</vm-note>
        </vm-item>
        <vm-item link="/search">
          搜索框
          <vm-note slot="item-end">SearchBar</vm-note>
        </vm-item>
        <vm-item link="/select">
          选择框
          <vm-note slot="item-end">Select</vm-note>
        </vm-item>
        <vm-item link="/radio">
          单选框
          <vm-note slot="item-end">Radio</vm-note>
        </vm-item>
        <vm-item link="/checkbox">
          复选框
          <vm-note slot="item-end">Checkbox</vm-note>
        </vm-item>
        <vm-item link="/toggle">
          开关
          <vm-note slot="item-end">Toggle</vm-note>
        </vm-item>
        <vm-item link="/range">
          滑块
          <vm-note slot="item-end">Range</vm-note>
        </vm-item>
      </vm-list>

      <vm-list title="布局">
        <vm-item link="/page">
          页面
          <vm-note slot="item-end">Page</vm-note>
        </vm-item>
        <vm-item link="/list">
          列表
          <vm-note slot="item-end">List</vm-note>
        </vm-item>
        <vm-item link="/card">
          卡片
          <vm-note slot="item-end">Card</vm-note>
        </vm-item>
        <vm-item link="/toolbar">
          工具条
          <vm-note slot="item-end">Toolbar</vm-note>
        </vm-item>
        <vm-item link="/grid">
          栅格
          <vm-note slot="item-end">Grid</vm-note>
        </vm-item>
        <vm-item link="/tabs">
          Tabs选项卡
          <vm-note slot="item-end">Tabs</vm-note>
        </vm-item>
        <vm-item link="/tabbar">
          Tabbar
          <vm-note slot="item-end">Tabbar</vm-note>
        </vm-item>
        <vm-item link="/segment">
          分段选项卡
          <vm-note slot="item-end">Segment</vm-note>
        </vm-item>
        <vm-item link="/menu">
          侧边栏/菜单
          <vm-note slot="item-end">Menu</vm-note>
        </vm-item>
      </vm-list>

      <vm-list title="数据加载">
        <vm-item link="/refresher">
          下拉刷新
          <vm-note slot="item-end">Refresher</vm-note>
        </vm-item>
        <vm-item link="/infinite-scroll">
          无限加载
          <vm-note slot="item-end">InfiniteScroll</vm-note>
        </vm-item>
        <vm-item link="/scroll">
          滚动
          <vm-note slot="item-end">Scroll</vm-note>
        </vm-item>
      </vm-list>

      <!-- advanced -->
      <vm-list title="插件">
        <vm-item link="/action-sheet">
          操作列表
          <vm-note slot="item-end">ActionSheet</vm-note>
        </vm-item>
        <vm-item link="/dialog">
          对话框
          <vm-note slot="item-end">Dialog</vm-note>
        </vm-item>
        <vm-item link="/toast">
          文字提示
          <vm-note slot="item-end">Toast</vm-note>
        </vm-item>
        <vm-item link="/spinner">
          加载提示
          <vm-note slot="item-end">Spinner</vm-note>
        </vm-item>
        <vm-item link="/swiper">
          轮播
          <vm-note slot="item-end">Swiper</vm-note>
        </vm-item>
        <vm-item link="/popover">
          弹出框
          <vm-note slot="item-end">Popover</vm-note>
        </vm-item>
        <vm-item link="/modal">
          模态窗
          <vm-note slot="item-end">Modal</vm-note>
        </vm-item>
      </vm-list>

      <!-- advanced -->
      <vm-list title="业务组件">
        <vm-item link="/city-picker">
          城市联动
          <vm-note slot="item-end">City Picker</vm-note>
        </vm-item>
        <vm-item link="/sheet">
          弹出层
          <vm-note slot="item-end">Sheet</vm-note>
        </vm-item>
        <vm-item link="/pop-sheet">
          弹出窗口
          <vm-note slot="item-end">Pop Sheet</vm-note>
        </vm-item>
      </vm-list>

    </vm-content>
  </vm-page>
</template>

<script type="text/javascript">
import {List, ListHeader, Item, Note} from 'vimon'
export default {
  name: 'DemoComponent',
  components: {
    'vm-list': List,
    'vm-list-header': ListHeader,
    'vm-item': Item,
    'vm-note': Note
  },
  mounted () {
    this.$events.$emit('selectedItem', 4)
  },
  methods: {
    onClicked (urlPath) {
      this.$router.push({'path': urlPath})
    },
    moreButtonClick (urlPath) {
      console.log('moreButtonClick' + urlPath)
    }

  }
}
</script>
