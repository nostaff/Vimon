<template>
  <ion-page v-nav="{title: '组件', showBackButton: false}">

    <ion-content class="outer-content">
      <!-- Basic -->
      <ion-list>
        <ion-list-header>组件</ion-list-header>
        <ion-item detail-push @click.native="onClicked('/demo/button')">
          按钮
          <ion-note slot="item-end">Button</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/chip')">
          Chip
          <ion-note slot="item-end">Chip</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/badge')">
          徽章
          <ion-note slot="item-end">Badge</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/icons')">
          图标
          <ion-note slot="item-end">Icons</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/fabs')">
          浮动按钮
          <ion-note slot="item-end">FABs</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/spinner')">
          加载提示
          <ion-note slot="item-end">Spinner</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/datetime')">
          日期时间
          <ion-note slot="item-end">Datetime</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/address')">
          地址联动
          <ion-note slot="item-end">Address</ion-note>
        </ion-item>
      </ion-list>

      <ion-list>
        <ion-list-header>Form表单</ion-list-header>
        <ion-item detail-push @click.native="onClicked('/demo/input')">
          输入框
          <ion-note slot="item-end">Input</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/textarea')">
          多行输入
          <ion-note slot="item-end">Textarea</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/search')">
          搜索框
          <ion-note slot="item-end">SearchBar</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/select')">
          选择框
          <ion-note slot="item-end">Select</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/radio')">
          单选框
          <ion-note slot="item-end">Radio</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/checkbox')">
          复选框
          <ion-note slot="item-end">Checkbox</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/toggle')">
          开关
          <ion-note slot="item-end">Toggle</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/range')">
          滑块
          <ion-note slot="item-end">Range</ion-note>
        </ion-item>
      </ion-list>

      <ion-list title="布局">
        <ion-item detail-push @click.native="onClicked('/demo/page')">
          页面
          <ion-note slot="item-end">Page</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/list')">
          列表
          <ion-note slot="item-end">List</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/toolbar')">
          工具条
          <ion-note slot="item-end">Toolbar</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/grid')">
          栅格
          <ion-note slot="item-end">Grid</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/tabs')">
          Tab选项卡
          <ion-note slot="item-end">Tabs</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/segment')">
          分段选项卡
          <ion-note slot="item-end">Segment</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/menu')">
          侧边栏/菜单
          <ion-note slot="item-end">Menu</ion-note>
        </ion-item>
      </ion-list>

      <ion-list title="数据加载">
        <ion-item detail-push @click.native="onClicked('/demo/refresher')">
          下拉刷新
          <ion-note slot="item-end">Refresher</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/infinite-scroll')">
          无限加载
          <ion-note slot="item-end">InfiniteScroll</ion-note>
        </ion-item>
      </ion-list>

      <!-- advanced -->
      <ion-list title="插件">
        <ion-item detail-push @click.native="onClicked('/demo/action-sheet')">
          操作列表
          <ion-note slot="item-end">ActionSheet</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/dialog')">
          对话框
          <ion-note slot="item-end">Dialog</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/toast')">
          文字提示
          <ion-note slot="item-end">Toast</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/spinner')">
          加载提示
          <ion-note slot="item-end">Spinner</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/swiper')">
          轮播
          <ion-note slot="item-end">Swiper</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/popup')">
          弹层
          <ion-note slot="item-end">Popup</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/picker')">
          选择器
          <ion-note slot="item-end">Picker</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/popover')">
          弹出框
          <ion-note slot="item-end">Popover</ion-note>
        </ion-item>
        <ion-item detail-push @click.native="onClicked('/demo/modal')">
          模态窗
          <ion-note slot="item-end">Modal</ion-note>
        </ion-item>
      </ion-list>

    </ion-content>
  </ion-page>
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
        console.log(urlPath)
        this.$router.push({'path': urlPath})
      }
    }
  }
</script>
