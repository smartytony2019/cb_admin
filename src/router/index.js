import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'dashboard.menu', icon: 'dashboard' }
    }]
  },

  {
    path: '/bet',
    component: Layout,
    redirect: '/bet/index',
    name: 'bet',
    meta: { title: 'bet.menu', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'bet',
        name: 'Bet',
        component: () => import('@/views/bet/lottery'),
        meta: { title: 'bet.lottery.menu', icon: 'table' }
      },
      {
        path: 'draw',
        name: 'Draw',
        component: () => import('@/views/bet/draw'),
        meta: { title: 'bet.draw.menu', icon: 'tree' }
      }
    ]
  },

  {
    path: '/member',
    component: Layout,
    redirect: '/member/index',
    name: 'member',
    meta: { title: 'member.menu', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'member',
        name: 'Member',
        component: () => import('@/views/member/index'),
        meta: { title: 'member.list.menu', icon: 'table' }
      },
      {
        path: 'flow',
        name: 'Flow',
        component: () => import('@/views/member/flow'),
        meta: { title: 'member.flow.menu', icon: 'tree' }
      }
    ]
  },

  {
    path: '/agent',
    component: Layout,
    redirect: '/agent/index',
    name: 'agent',
    meta: { title: 'agent.menu', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/agent/index'),
        meta: { title: 'agent.index.menu', icon: 'table' }
      },
      {
        path: 'commission',
        name: 'Commission',
        component: () => import('@/views/agent/commission'),
        meta: { title: 'agent.commission.menu', icon: 'tree' }
      }
    ]
  },

  {
    path: '/finance',
    component: Layout,
    redirect: '/finance/index',
    name: 'finance',
    meta: { title: 'finance.menu', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'recharge',
        name: 'Recharge',
        component: () => import('@/views/finance/recharge'),
        meta: { title: 'finance.recharge.menu', icon: 'table' }
      },
      {
        path: 'withdraw',
        name: 'Withdraw',
        component: () => import('@/views/finance/withdraw'),
        meta: { title: 'finance.withdraw.menu', icon: 'tree' }
      }
    ]
  },

  {
    path: '/lottery',
    component: Layout,
    redirect: '/lottery/category',
    name: 'lottery',
    meta: { title: 'lottery.menu', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'lottery',
        name: 'Lottery',
        component: () => import('@/views/lottery/category'),
        meta: { title: 'lottery.category.menu', icon: 'table' }
      },
      {
        path: 'game',
        name: 'Game',
        component: () => import('@/views/lottery/game'),
        meta: { title: 'lottery.game.menu', icon: 'tree' }
      },
      {
        path: 'play',
        name: 'Play',
        component: () => import('@/views/lottery/play'),
        meta: { title: 'lottery.play.menu', icon: 'tree' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
