import { createRouter, createWebHistory } from 'vue-router'
import TheLayout from '@/layout/TheLayout.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TheLayout,
    redirect: '/new-dashboard',
    meta: { breadcrumb: 'Home' },
    children: [
      // {
      //   path: '/dashboard',
      //   name: 'Dashboard',
      //   component: () => import('@/views/dashboard/LiveDashboard.vue'),
      //   meta: {
      //     requiresAuth: true,
      //     roles: ['admin', 'staff', 'viewer'],
      //     breadcrumb: 'Live Dashboard',
      //   },
      // },
      {
        path: '/new-dashboard',
        name: 'New Dashboard',
        component: () => import('@/views/dashboard/newDashboard.vue'),
        meta: {
          requiresAuth: true,
          roles: ['admin', 'staff', 'viewer'],
          breadcrumb: 'New Dashboard',
        },
      },
      // {
      //   path: '/dashboard/shot-monitor',
      //   name: 'Kanagata Shot Monitor',
      //   component: () => import('@/views/dashboard/LiveShoot.vue'),
      //   meta: {
      //     requiresAuth: true,
      //     roles: ['admin', 'staff', 'viewer'],
      //     breadcrumb: 'Live Parameter',
      //   },
      // },
      {
        path: '/new-shot-monitor',
        name: 'New Kanagata Shot Monitor',
        component: () => import('@/views/dashboard/newLiveShoot.vue'),
        meta: {
          requiresAuth: true,
          roles: ['admin', 'staff', 'viewer'],
          breadcrumb: 'New Live Parameter',
        },
      },
      {
        path: '/plan',
        name: 'Production Plan',
        meta: {
          requiresAuth: true,
          roles: ['admin', 'staff'],
          breadcrumb: 'Production Plan',
        },
        component: () => import('@/views/plan/ProductionPlan.vue'),
      },
      {
        path: '/report',
        name: 'Report',
        redirect: '/daily-weekly-report',
        meta: { breadcrumb: 'Report' },
        children: [
          {
            path: '/daily-weekly-report',
            name: 'Daily & Weekly',
            component: () => import('@/views/report/DailyWeekly.vue'),
            meta: {
              requiresAuth: true,
              roles: ['admin', 'staff', 'viewer'],
              breadcrumb: 'Daily & Weekly',
            },
          },
          {
            path: '/monthly-report',
            name: 'Monthly',
            component: () => import('@/views/report/MonthlyReport.vue'),
            meta: {
              requiresAuth: true,
              roles: ['admin', 'staff', 'viewer'],
              breadcrumb: 'Monthly',
            },
          },
          {
            path: '/yearly-report',
            name: 'Yearly',
            component: () => import('@/views/report/YearlyReport.vue'),
            meta: {
              requiresAuth: true,
              roles: ['admin', 'staff', 'viewer'],
              breadcrumb: 'Yearly',
            },
          },
          {
            path: '/fiscal-report',
            name: 'Summary',
            component: () => import('@/views/report/SummaryFiscal.vue'),
            meta: {
              requiresAuth: true,
              roles: ['admin', 'staff', 'viewer'],
              breadcrumb: 'Summary',
            },
          },
          {
            path: '/detail-production',
            name: 'Detail Production',
            component: () => import('@/views/report/DetailProduction.vue'),
            meta: {
              requiresAuth: true,
              roles: ['admin', 'staff', 'viewer'],
              breadcrumb: 'Detail Production',
            },
          },
        ],
      },
      {
        path: '/master',
        name: 'Master',
        redirect: '/master-production',
        meta: { breadcrumb: 'Master' },
        children: [
          {
            path: '/master-production',
            name: 'Master Production',
            component: () => import('@/views/master/ProductionLayout.vue'),
            meta: {
              requiresAuth: true,
              roles: ['admin', 'staff'],
              breadcrumb: 'Production',
            },
          },
        ],
      },
      {
        path: '/admin',
        name: 'Admin',
        redirect: '/account-control',
        meta: { breadcrumb: 'Admin' },
        children: [
          {
            path: '/account-control',
            name: 'Account Control',
            component: () => import('@/views/admin/accountControl.vue'),
            meta: {
              requiresAuth: true,
              roles: ['admin'],
              breadcrumb: 'Account Control',
            },
          },
          {
            path: '/under-construction',
            name: 'Under Construction',
            component: () => import('@/views/pages/MaintenancePage.vue'),
            meta: {
              requiresAuth: true,
              roles: ['admin', 'staff', 'user'],
              breadcrumb: 'Under Construction',
            },
          },
        ],
      },
      {
        path: '/unauthorized',
        name: 'Unauthorized',
        component: () => import('@/views/pages/PageUnauthorized.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/pages/NotFound.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/pages/RegisterPage.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/pages/LoginPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Pastikan status autentikasi diperiksa ulang setelah refresh
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      return next({ name: 'Login' })
    }

    if (to.meta.roles && !to.meta.roles.includes(authStore.user?.role)) {
      return next({ name: 'Unauthorized' })
    }
  }
  next()
})

export default router
