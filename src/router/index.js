// 第一次提交1



// 引入 Vue Router 相关函数
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

// 定义路由表
const routes = [
  {
    // 登录页（不需要登录）
    path: '/login',
    name: 'Login',
    // 路由懒加载：只有访问到该页面时才会去加载对应组件
    component: () => import('@/views/Login.vue'),
  },
  {
    // 嵌套路由的父路由：Layout 作为父布局（登录后所有页面的"外壳"）
    path: '/',
    component: () => import('@/components/Layout.vue'),
    // 重定向：访问根路径时默认进入图书列表
    redirect: '/books',
    children: [
      {
        // 图书列表页（嵌套子路由，路径以父路径为前缀）
        path: 'books',
        name: 'BookList',
        component: () => import('@/views/BookList.vue'),
        // meta.requiresAuth：标记该页面需要登录才能访问
        meta: { requiresAuth: true, title: '图书列表' },
      },
      {
        path: 'borrow',
        name: 'BorrowRecord',
        component: () => import('@/views/BorrowRecord.vue'),
        meta: { requiresAuth: true, title: '借阅记录' },
      },
    ],
  },
]

// 创建路由实例
const router = createRouter({
  // 使用 HTML5 的 history 模式，地址更干净（无 # 号）
  history: createWebHistory(),
  routes,
  // 滚动行为：切换路由时控制页面滚动位置
  scrollBehavior(to, from, savedPosition) {
    // 浏览器前进/后退时，恢复到离开时的滚动位置
    if (savedPosition) {
      return savedPosition
    }
    // 普通跳转时，回到页面顶部
    return { top: 0 }
  },
})

// 全局前置守卫：在每次路由跳转前执行，做登录鉴权
router.beforeEach((to, from, next) => {
  // 从 user store 读取登录状态（token 在 store 内与 localStorage 同步）
  const userStore = useUserStore()

  // to.meta.requiresAuth：目标页面是否需要登录
  // 需要登录但未登录 → 跳转到登录页
  if (to.matched.some((record) => record.meta.requiresAuth) && !userStore.isLoggedIn) {
    // 用 next 跳转登录页，并带上想去的地址，登录后可以跳回去
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    // 其余情况正常放行
    next()
  }
})

// 404 兜底路由：所有没匹配上的路径都重定向到登录页（必须是路由表的最后一条）
router.addRoute({
  path: '/:pathMatch(.*)*',
  redirect: '/login',
})

export default router