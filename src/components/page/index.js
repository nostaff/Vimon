/**
 * @component Base/Page
 * @description
 *
 * ## 基础组件 / Page组件
 *
 * Page组件是业务的根组件, 用于包裹业务层, 仅此而已. 切记, template标签内有且只有一个标签, 且必须为Page, 例如这样:
 *
 * @props {Boolean} [box=false] - 是否为盒子模型(固定高度宽度布局)
 *
 * @usage
 * <template>
 *    <vm-age>
 *        <vm-header>
 *            <vm-navbar>
 *                <vm-title>Demo</vm-title>
 *            </vm-navbar>
 *        </vm-header>
 *        <vm-content>
 *            <h1>这里是内容</h1>
 *        </vm-content>
 *    </vm-page>
 * </template>
 *
 */
export { default } from './page.vue'
