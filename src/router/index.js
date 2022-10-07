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
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '面板', icon: 'dashboard' }
      }
    ]
  },

  // 注单管理
  {
    path: '/bet',
    component: Layout,
    redirect: '/bet/index',
    name: 'bet',
    meta: { title: '注单管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'hash',
        name: 'BetHash',
        component: () => import('@/views/bet/hash'),
        // meta: { title: 'bet.lottery.menu', icon: 'table' },
        meta: { title: '哈希注单', icon: 'table' }
      },
      {
        path: 'offline',
        name: 'BetHashOffline',
        component: () => import('@/views/bet/hash/offline'),
        meta: { title: '哈希注单(离线)', icon: 'tree' }
      }
    ]
  },

  // 会员管理
  {
    path: '/member',
    component: Layout,
    redirect: '',
    name: 'member',
    meta: { title: '会员管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'MemberIndex',
        component: () => import('@/views/member/index'),
        meta: { title: '会员列表', icon: 'table' }
      },
      {
        path: 'flow',
        name: 'MemberFlow',
        component: () => import('@/views/member/flow'),
        meta: { title: '会员流水', icon: 'tree' }
      },
      {
        path: 'record',
        name: 'MemberRecord',
        component: () => import('@/views/member/record'),
        meta: { title: '会员记录', icon: 'tree' }
      }
    ]
  },

  // 财务管理
  {
    path: '/finance',
    component: Layout,
    redirect: '',
    name: 'finance',
    meta: { title: '财务管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'FinanceIndex',
        component: () => import('@/views/finance/index'),
        meta: { title: '存款/提款', icon: 'table' }
      },
      {
        path: 'audit',
        name: 'FinanceAudit',
        component: () => import('@/views/finance/audit'),
        meta: { title: '打码审计', icon: 'tree' }
      }
    ]
  },

  // 代理管理
  {
    path: '/agent',
    component: Layout,
    redirect: '/agent/index',
    name: 'agent',
    meta: { title: '代理管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'AgentIndex',
        component: () => import('@/views/agent/index'),
        meta: { title: '代理列表', icon: 'table' }
      },
      {
        path: 'commission',
        name: 'Commission',
        component: () => import('@/views/agent/commission'),
        meta: { title: '佣金列表', icon: 'tree' }
      },
      {
        path: 'commission/record',
        name: 'AgentCommissionRecord',
        component: () => import('@/views/agent/commission/record'),
        meta: { title: '佣金记录', icon: 'table' }
      },
      {
        path: 'domain',
        name: 'AgentDomain',
        component: () => import('@/views/agent/domain'),
        meta: { title: '推广域名', icon: 'table' }
      },
      {
        path: 'domain/operate',
        name: 'AgentDomain',
        component: () => import('@/views/agent/domain/operate'),
        meta: { title: '推广域名操作', icon: 'table' },
        hidden: true
      },
      {
        path: 'rebate',
        name: 'AgentRebate',
        component: () => import('@/views/agent/rebate'),
        meta: { title: '返佣比', icon: 'table' }
      }
    ]
  },

  // 游戏管理
  {
    path: '/game',
    component: Layout,
    redirect: '/game/hash',
    name: 'Game',
    meta: { title: '游戏管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'category',
        name: 'GameCategory',
        component: () => import('@/views/game/category'),
        meta: { title: '游戏类目', icon: 'table' }
      },
      {
        path: 'index',
        name: 'GameIndex',
        component: () => import('@/views/game/index'),
        meta: { title: '游戏列表', icon: 'table' }
      },
      {
        path: 'play',
        name: 'GamePlay',
        component: () => import('@/views/game/play'),
        meta: { title: '玩法列表', icon: 'tree' }
      },
      {
        path: 'odds',
        name: 'GameOdds',
        component: () => import('@/views/game/odds'),
        meta: { title: '赔率列表', icon: 'tree' }
      },
      {
        path: 'result',
        name: 'GameResult',
        component: () => import('@/views/game/result'),
        meta: { title: '开奖结果', icon: 'tree' }
      }
    ]
  },

  // 内容管理
  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/index',
    name: 'activity',
    meta: { title: '内容管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'Activity',
        component: () => import('@/views/activity/index'),
        meta: { title: '活动列表', icon: 'table' }
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
        meta: { title: '活动记录', icon: 'table' }
      }
    ]
  },

  // 系统管理
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    name: 'system',
    meta: { title: '系统管理', icon: 'el-icon-s-help' },
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
        meta: { title: '系统配置', icon: 'table' }
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
