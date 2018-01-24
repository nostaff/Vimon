<template>
    <vm-page v-nav="{title: 'Page'}">

    <vm-content class="outer-content">
      <div padding>
        <h1>页面组件</h1>

        <p>Page组件是每个页面的根组件, 包含
          <strong>Header / Content / Footer</strong> 三个组件.</p>

        <h4>Content组件</h4>
        <p>
          Content组件是Vimon的基础布局组件, 属于三明治结构的中间层, 承接业务展示的部分. 正常情况页面面切换是不记录浏览位置的, 可以通过添加属性
          <strong>record-position</strong>
          开启. content组件使用的原生scroll, 因此对组件监听:
          <strong>onScroll / onScrollStart / onScrollEnd</strong> 这三个事件定制业务需求.
        </p>

      </div>
      <vm-list>
        <vm-item link="/page-context">文本</vm-item>
        <vm-item link="/page-fixed">浮动内容</vm-item>
        <vm-item link="/page-hide-bars">隐藏头尾Bar</vm-item>
        <vm-item link="/page-bar-style">设置Bar的样式</vm-item>
        <vm-item link="/page-scroll">滚动监听</vm-item>
      </vm-list>
    </vm-content>
  </vm-page>
</template>

<script type="text/javascript">
export default {
  name: 'page',
  watch: {}
}
</script>
