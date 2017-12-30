<template>
  <vm-page v-nav="{title: 'Components', showMoreButton: true, onMoreButtonClick: moreButtonClick}">

    <vm-content class="outer-content">
      <!-- Basic -->
      <vm-list>
        <vm-list-header>组件</vm-list-header>
        <vm-item detail-push @click="onClicked('/button')">
          按钮
          <vm-note slot="item-end">Button</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/chip')">
          Chip
          <vm-note slot="item-end">Chip</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/badge')">
          徽章
          <vm-note slot="item-end">Badge</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/icon')">
          图标
          <vm-note slot="item-end">Icons</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/fabs')">
          浮动按钮
          <vm-note slot="item-end">FABs</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/spinner')">
          加载提示
          <vm-note slot="item-end">Spinner</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/datetime')">
          日期时间
          <vm-note slot="item-end">Datetime</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/address')">
          地址联动
          <vm-note slot="item-end">Address</vm-note>
        </vm-item>
      </vm-list>

      <vm-list>
        <vm-list-header>Form表单</vm-list-header>
        <vm-item detail-push @click="onClicked('/input')">
          输入框
          <vm-note slot="item-end">Input</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/textarea')">
          多行输入
          <vm-note slot="item-end">Textarea</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/search')">
          搜索框
          <vm-note slot="item-end">SearchBar</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/select')">
          选择框
          <vm-note slot="item-end">Select</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/radio')">
          单选框
          <vm-note slot="item-end">Radio</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/checkbox')">
          复选框
          <vm-note slot="item-end">Checkbox</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/toggle')">
          开关
          <vm-note slot="item-end">Toggle</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/range')">
          滑块
          <vm-note slot="item-end">Range</vm-note>
        </vm-item>
      </vm-list>

      <vm-list title="布局">
        <vm-item detail-push @click="onClicked('/page')">
          页面
          <vm-note slot="item-end">Page</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/list')">
          列表
          <vm-note slot="item-end">List</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/toolbar')">
          工具条
          <vm-note slot="item-end">Toolbar</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/grid')">
          栅格
          <vm-note slot="item-end">Grid</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/tabs')">
          Tab选项卡
          <vm-note slot="item-end">Tabs</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/segment')">
          分段选项卡
          <vm-note slot="item-end">Segment</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/menu')">
          侧边栏/菜单
          <vm-note slot="item-end">Menu</vm-note>
        </vm-item>
      </vm-list>

      <vm-list title="数据加载">
        <vm-item detail-push @click="onClicked('/refresher')">
          下拉刷新
          <vm-note slot="item-end">Refresher</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/infinite-scroll')">
          无限加载
          <vm-note slot="item-end">InfiniteScroll</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/scroll')">
          滚动
          <vm-note slot="item-end">Scroll</vm-note>
        </vm-item>
      </vm-list>

      <!-- advanced -->
      <vm-list title="插件">
        <vm-item detail-push @click="onClicked('/action-sheet')">
          操作列表
          <vm-note slot="item-end">ActionSheet</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/dialog')">
          对话框
          <vm-note slot="item-end">Dialog</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/toast')">
          文字提示
          <vm-note slot="item-end">Toast</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/spinner')">
          加载提示
          <vm-note slot="item-end">Spinner</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/swiper')">
          轮播
          <vm-note slot="item-end">Swiper</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/popup')">
          弹层
          <vm-note slot="item-end">Popup</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/picker')">
          选择器
          <vm-note slot="item-end">Picker</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/popover')">
          弹出框
          <vm-note slot="item-end">Popover</vm-note>
        </vm-item>
        <vm-item detail-push @click="onClicked('/modal')">
          模态窗
          <vm-note slot="item-end">Modal</vm-note>
        </vm-item>
      </vm-list>

    </vm-content>
  </vm-page>
</template>

<script>
  export default {
    name: 'DemoHome',
    data () {
      return {
        sidebar: undefined,
        sidebarRight: undefined
      }
    },

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
