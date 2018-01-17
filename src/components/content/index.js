/**
 * @component Content
 * @description
 *
 * ## 基础组件 / Content组件
 *
 * Vimon框架的页面基础布局分为Header/Content/Footer三个部分, 也就是"上中下三明治"结构布局, Content组件则是中间业务内容的位置.
 *
 * Content组件中书写的代码可以是滚动的内容, 也可以是固定在一面不随滚动的内容, 比如说当页的广告/刷新按钮/歌词等. 这个特性的的开启需要特殊命名slot才能激活.
 *
 * 此外需要注意的是, 一个页面(Page组件)中只能有一个Content组件, 这个是Vimo使用的规则!
 *
 * Content组件中也可以加入下拉刷新和上拉加载的功能, 具体请参考示例.
 *
 * @demo #/page
 *
 * @slot 空                 slot为空则将内容插入到scroll中
 * @slot [fixed]            浮动内容的位置
 * @slot [refresher]        refresher组件的位置
 *
 * @fires component:Content#onScrollStart
 * @fires component:Content#onScroll
 * @fires component:Content#onScrollEnd
 *
 * @usage
 * <template>
 *  <Page>
 *    <Header>
 *      <Navbar>
 *        <Title>Demo</Title>
 *      <Navbar>
 *    </Header>
 *    <Content record-position>
 *      <h1>这里是内容</h1>
 *      <p>滚动位置将会被记录</p>
 *    </Content>
 *  </Page>
 * </template>
 *
 */

export { default } from './content.vue'
