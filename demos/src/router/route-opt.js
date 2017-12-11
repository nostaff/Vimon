/**
 * 路由配置表
 **/
const routes = [

  { path: '/', name: 'demo.index', component: resolve => require(['@/pages/component.vue'], resolve) },

  // Components
  { path: '/demo/button', name: 'demo.button', component: resolve => require(['@/pages/button.vue'], resolve) },
  { path: '/demo/chip', component: resolve => require(['@/pages/chip.vue'], resolve) },
  { path: '/demo/badge', component: resolve => require(['@/pages/badge.vue'], resolve) },
  { path: '/demo/fabs', component: resolve => require(['@/pages/fabs.vue'], resolve) },
  { path: '/demo/icons', component: resolve => require(['@/pages/icon.vue'], resolve) },
  { path: '/demo/spinner', component: resolve => require(['@/pages/spinner.vue'], resolve) },
  { path: '/demo/datetime', component: resolve => require(['@/pages/datetime.vue'], resolve) },

  // Form
  { path: '/demo/input', component: resolve => require(['@/pages/input.vue'], resolve) },
  { path: '/demo/textarea', component: resolve => require(['@/pages/textarea.vue'], resolve) },
  { path: '/demo/search', component: resolve => require(['@/pages/search.vue'], resolve) },
  { path: '/demo/select', component: resolve => require(['@/pages/select.vue'], resolve) },
  { path: '/demo/radio', component: resolve => require(['@/pages/radio.vue'], resolve) },
  { path: '/demo/checkbox', component: resolve => require(['@/pages/checkbox.vue'], resolve) },
  { path: '/demo/toggle', component: resolve => require(['@/pages/toggle.vue'], resolve) },
  { path: '/demo/range', component: resolve => require(['@/pages/range.vue'], resolve) },

  // Layout
  { path: '/demo/toolbar', component: resolve => require(['@/pages/toolbar.vue'], resolve) },
  { path: '/demo/page', component: resolve => require(['@/pages/page.vue'], resolve) },
  { path: '/demo/list', component: resolve => require(['@/pages/list.vue'], resolve) },
  { path: '/demo/grid', component: resolve => require(['@/pages/grid.vue'], resolve) },
  { path: '/demo/tabs', component: resolve => require(['@/pages/tabs.vue'], resolve) },
  { path: '/demo/segment', component: resolve => require(['@/pages/segment.vue'], resolve) },
  { path: '/demo/menu', component: resolve => require(['@/pages/menu.vue'], resolve) },

  // Data
  { path: '/demo/refresher', component: resolve => require(['@/pages/refresher.vue'], resolve) },
  { path: '/demo/infinite-scroll', component: resolve => require(['@/pages/infinite-scroll.vue'], resolve) },

  // Advanced
  { path: '/demo/action-sheet', component: resolve => require(['@/pages/action-sheet.vue'], resolve) },
  { path: '/demo/dialog', component: resolve => require(['@/pages/dialog.vue'], resolve) },
  { path: '/demo/toast', component: resolve => require(['@/pages/toast.vue'], resolve) },
  { path: '/demo/swiper', component: resolve => require(['@/pages/swiper.vue'], resolve) },
  { path: '/demo/popup', component: resolve => require(['@/pages/popup.vue'], resolve) },
  { path: '/demo/popover', component: resolve => require(['@/pages/popover.vue'], resolve) },
  { path: '/demo/modal', component: resolve => require(['@/pages/modal.vue'], resolve) },
  { path: '/demo/picker', component: resolve => require(['@/pages/picker.vue'], resolve) },

  { path: '*', component: resolve => require(['@/pages/not-found.vue'], resolve) }

]

export default routes
