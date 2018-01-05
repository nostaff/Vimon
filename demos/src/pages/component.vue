<template>
  <vm-page v-nav="{title: 'Components', showMoreButton: true, onMoreButtonClick: moreButtonClick}">

    <vm-content class="outer-content">
      <!-- Basic -->
      <vm-list>
        <vm-list-header>组件</vm-list-header>
        <vm-item detail-push link="/button">
          按钮
          <vm-note slot="item-end">Button</vm-note>
        </vm-item>
        <vm-item detail-push link="/chip">
          Chip
          <vm-note slot="item-end">Chip</vm-note>
        </vm-item>
        <vm-item detail-push link="/badge">
          徽章
          <vm-note slot="item-end">Badge</vm-note>
        </vm-item>
        <vm-item detail-push link="/icon">
          图标
          <vm-note slot="item-end">Icons</vm-note>
        </vm-item>
        <vm-item detail-push link="/fabs">
          浮动按钮
          <vm-note slot="item-end">FABs</vm-note>
        </vm-item>
        <vm-item detail-push link="/spinner">
          加载提示
          <vm-note slot="item-end">Spinner</vm-note>
        </vm-item>
        <vm-item detail-push link="/datetime">
          日期时间
          <vm-note slot="item-end">Datetime</vm-note>
        </vm-item>
      </vm-list>

      <vm-list>
        <vm-list-header>Form表单</vm-list-header>
        <vm-item detail-push link="/input">
          输入框
          <vm-note slot="item-end">Input</vm-note>
        </vm-item>
        <vm-item detail-push link="/textarea">
          多行输入
          <vm-note slot="item-end">Textarea</vm-note>
        </vm-item>
        <vm-item detail-push link="/search">
          搜索框
          <vm-note slot="item-end">SearchBar</vm-note>
        </vm-item>
        <vm-item detail-push link="/select">
          选择框
          <vm-note slot="item-end">Select</vm-note>
        </vm-item>
        <vm-item detail-push link="/radio">
          单选框
          <vm-note slot="item-end">Radio</vm-note>
        </vm-item>
        <vm-item detail-push link="/checkbox">
          复选框
          <vm-note slot="item-end">Checkbox</vm-note>
        </vm-item>
        <vm-item detail-push link="/toggle">
          开关
          <vm-note slot="item-end">Toggle</vm-note>
        </vm-item>
        <vm-item detail-push link="/range">
          滑块
          <vm-note slot="item-end">Range</vm-note>
        </vm-item>
      </vm-list>

      <vm-list title="布局">
        <vm-item detail-push link="/page">
          页面
          <vm-note slot="item-end">Page</vm-note>
        </vm-item>
        <vm-item detail-push link="/list">
          列表
          <vm-note slot="item-end">List</vm-note>
        </vm-item>
        <vm-item detail-push link="/toolbar">
          工具条
          <vm-note slot="item-end">Toolbar</vm-note>
        </vm-item>
        <vm-item detail-push link="/grid">
          栅格
          <vm-note slot="item-end">Grid</vm-note>
        </vm-item>
        <vm-item detail-push link="/tabs">
          Tabs选项卡
          <vm-note slot="item-end">Tabs</vm-note>
        </vm-item>
        <vm-item detail-push link="/tabbar">
          Tabbar
          <vm-note slot="item-end">Tabbar</vm-note>
        </vm-item>
        <vm-item detail-push link="/segment">
          分段选项卡
          <vm-note slot="item-end">Segment</vm-note>
        </vm-item>
        <vm-item detail-push link="/menu">
          侧边栏/菜单
          <vm-note slot="item-end">Menu</vm-note>
        </vm-item>
      </vm-list>

      <vm-list title="数据加载">
        <vm-item detail-push link="/refresher">
          下拉刷新
          <vm-note slot="item-end">Refresher</vm-note>
        </vm-item>
        <vm-item detail-push link="/infinite-scroll">
          无限加载
          <vm-note slot="item-end">InfiniteScroll</vm-note>
        </vm-item>
        <vm-item detail-push link="/scroll">
          滚动
          <vm-note slot="item-end">Scroll</vm-note>
        </vm-item>
      </vm-list>

      <!-- advanced -->
      <vm-list title="插件">
        <vm-item detail-push link="/action-sheet">
          操作列表
          <vm-note slot="item-end">ActionSheet</vm-note>
        </vm-item>
        <vm-item detail-push link="/dialog">
          对话框
          <vm-note slot="item-end">Dialog</vm-note>
        </vm-item>
        <vm-item detail-push link="/toast">
          文字提示
          <vm-note slot="item-end">Toast</vm-note>
        </vm-item>
        <vm-item detail-push link="/spinner">
          加载提示
          <vm-note slot="item-end">Spinner</vm-note>
        </vm-item>
        <vm-item detail-push link="/swiper">
          轮播
          <vm-note slot="item-end">Swiper</vm-note>
        </vm-item>
        <vm-item detail-push link="/popover">
          弹出框
          <vm-note slot="item-end">Popover</vm-note>
        </vm-item>
        <vm-item detail-push link="/modal">
          模态窗
          <vm-note slot="item-end">Modal</vm-note>
        </vm-item>
      </vm-list>

      <!-- advanced -->
      <vm-list title="业务组件">
        <vm-item detail-push link="/city-picker">
          城市联动
          <vm-note slot="item-end">City Picker</vm-note>
        </vm-item>
        <vm-item detail-push link="/sheet">
          弹出层
          <vm-note slot="item-end">Sheet</vm-note>
        </vm-item>
        <vm-item detail-push link="/pop-sheet">
          弹出窗口
          <vm-note slot="item-end">Pop Sheet</vm-note>
        </vm-item>
      </vm-list>

    </vm-content>
  </vm-page>
</template>

<script>
  export default {
    name: 'DemoHome',
    mounted () {
      this.$events.$emit('selectedItem', 4)
    },
    methods: {
      onClicked (urlPath) {
        this.$router.push({'path': urlPath})
      },
      moreButtonClick (urlPath) {
        console.log('moreButtonClick')
      }

    }
  }
</script>
