/**
 * 路由配置表
 **/
const routes = [

  { path: '/', name: 'index', component: resolve => require(['@/pages/index.vue'], resolve) },
  { path: '/component', name: 'component', component: resolve => require(['@/pages/component.vue'], resolve) },

  // Components
  { path: '/button', name: 'button', component: resolve => require(['@/pages/button.vue'], resolve) },
  { path: '/chip', name: 'chip', component: resolve => require(['@/pages/chip.vue'], resolve) },
  { path: '/badge', name: 'badge', component: resolve => require(['@/pages/badge.vue'], resolve) },
  { path: '/fabs', name: 'fabs', component: resolve => require(['@/pages/fabs.vue'], resolve) },
  { path: '/icon', name: 'icon', component: resolve => require(['@/pages/icon.vue'], resolve) },
  { path: '/spinner', name: 'spinner', component: resolve => require(['@/pages/spinner.vue'], resolve) },
  { path: '/datetime', name: 'datetime', component: resolve => require(['@/pages/datetime.vue'], resolve) },

  // Form
  { path: '/input', name: 'input', component: resolve => require(['@/pages/input.vue'], resolve) },
  { path: '/textarea', name: 'textarea', component: resolve => require(['@/pages/textarea.vue'], resolve) },
  { path: '/search', name: 'search', component: resolve => require(['@/pages/search.vue'], resolve) },
  { path: '/select', name: 'select', component: resolve => require(['@/pages/select.vue'], resolve) },
  { path: '/radio', name: 'radio', component: resolve => require(['@/pages/radio.vue'], resolve) },
  { path: '/checkbox', name: 'checkbox', component: resolve => require(['@/pages/checkbox.vue'], resolve) },
  { path: '/toggle', name: 'toggle', component: resolve => require(['@/pages/toggle.vue'], resolve) },
  { path: '/range', name: 'range', component: resolve => require(['@/pages/range.vue'], resolve) },

  // Layout
  { path: '/toolbar', name: 'toolbar', component: resolve => require(['@/pages/toolbar.vue'], resolve) },
  { path: '/page', name: 'page', component: resolve => require(['@/pages/page.vue'], resolve) },
  { path: '/page2', name: 'page2', component: resolve => require(['@/pages/page2.vue'], resolve) },
  { path: '/list', name: 'list', component: resolve => require(['@/pages/list.vue'], resolve) },
  { path: '/grid', name: 'grid', component: resolve => require(['@/pages/grid.vue'], resolve) },
  { path: '/tabs', name: 'tabs', component: resolve => require(['@/pages/tabs.vue'], resolve) },
  { path: '/segment', name: 'segment', component: resolve => require(['@/pages/segment.vue'], resolve) },
  { path: '/scroll', name: 'scroll', component: resolve => require(['@/pages/scroll.vue'], resolve) },
  { path: '/menu', name: 'menu', component: resolve => require(['@/pages/menu.vue'], resolve) },

  // Data
  { path: '/refresher', name: 'refresher', component: resolve => require(['@/pages/refresher.vue'], resolve) },
  { path: '/infinite-scroll', name: 'infinite-scroll', component: resolve => require(['@/pages/infinite-scroll.vue'], resolve) },

  // Advanced
  { path: '/action-sheet', name: 'action-sheet', component: resolve => require(['@/pages/action-sheet.vue'], resolve) },
  { path: '/dialog', name: 'dialog', component: resolve => require(['@/pages/dialog.vue'], resolve) },
  { path: '/toast', name: 'toast', component: resolve => require(['@/pages/toast.vue'], resolve) },
  { path: '/swiper', name: 'swiper', component: resolve => require(['@/pages/swiper.vue'], resolve) },
  { path: '/popup', name: 'popup', component: resolve => require(['@/pages/popup.vue'], resolve) },
  { path: '/popover', name: 'popover', component: resolve => require(['@/pages/popover.vue'], resolve) },
  { path: '/modal', name: 'modal', component: resolve => require(['@/pages/modal.vue'], resolve) },
  { path: '/picker', name: 'picker', component: resolve => require(['@/pages/picker.vue'], resolve) },

  { path: '*', name: 'not-found', component: resolve => require(['@/pages/not-found.vue'], resolve) }

]

export default routes
