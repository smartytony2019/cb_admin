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

  // 注单管理
  {
    path: '/hash',
    component: Layout,
    redirect: '/hash/bet',
    name: 'bet',
    meta: { title: '注单管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'bet',
        name: 'Bet',
        component: () => import('@/views/hash/bet'),
        // meta: { title: 'bet.lottery.menu', icon: 'table' },
        meta: { title: '注单列表', icon: 'table' }
      },
      {
        path: 'draw',
        name: 'Draw',
        component: () => import('@/views/bet/draw'),
        meta: { title: '离线注单', icon: 'tree' }
      }
    ]
  },

  // 会员管理
  {
    path: '/member',
    component: Layout,
    redirect: '/member/index',
    name: 'member',
    meta: { title: 'member.menu', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
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

  // 代理管理
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

  // 财务管理
  {
    path: '/finance',
    component: Layout,
    redirect: '/finance/recharge',
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

  // 彩票管理
  {
    path: '/lottery',
    component: Layout,
    redirect: '/lottery/lottery',
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

  // 内容管理
  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/index',
    name: 'activity',
    meta: { title: 'content.menu', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'Activity',
        component: () => import('@/views/activity/index'),
        meta: { title: 'content.activity.menu', icon: 'table' }
      },
      {
        path: 'rule',
        name: 'Rule',
        component: () => import('@/views/activity/index/rule'),
        meta: { title: 'content.activity.menu', icon: 'table' },
        hidden: true
      },
      {
        path: 'operate',
        name: 'Operate',
        component: () => import('@/views/activity/index/operation'),
        meta: { title: 'content.activity.menu', icon: 'table' },
        hidden: true
      },
      {
        path: 'record',
        name: 'Record',
        component: () => import('@/views/activity/record'),
        meta: { title: 'content.record.menu', icon: 'table' }
      }
    ]
  },

  // 系统管理
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    name: 'system',
    meta: { title: 'system.menu', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user'),
        meta: { title: 'system.user.menu', icon: 'table' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role'),
        meta: { title: 'system.role.menu', icon: 'table' }
      },
      {
        path: 'permission',
        name: 'Permission',
        component: () => import('@/views/system/permission'),
        meta: { title: 'system.permission.menu', icon: 'table' }
      },
      {
        path: 'setting',
        name: 'Setting',
        component: () => import('@/views/system/setting'),
        meta: { title: 'system.setting.menu', icon: 'table' }
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
