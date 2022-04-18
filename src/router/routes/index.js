import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Utility Admin Panel'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/Home'))
  },
  {
    path: '/register-admin',
    component: lazy(() => import('../../views/admin/add/Register.js')),
    meta: {
      accessTo: 'spradmin'
    }
  },
  {
    path: '/admins',
    component: lazy(() => import('../../views/admin/adminsList')),
    exact: true
  },
  {
    path: '/admins/update/:id',
    component: lazy(() => import('../../views/admin/update/UpdateAdmin')),
    meta: {
      accessTo: 'spradmin'
    }
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/auth')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/profile/update',
    component: lazy(() => import('../../views/admin/update/UpdateProfile')),
    layout: 'BlankLayout'
  },
  {
    path: '/password/update',
    component: lazy(() => import('../../views/admin/update/UpdatePassword')),
    layout: 'BlankLayout'
  },
  {
    path: '/register-app',
    component: lazy(() => import('../../views/App/RegisterApp'))
  },
  {
    path: '/list-apps',
    component: lazy(() => import('../../views/App/AppsList'))
  },
  {
    path: '/update-app/:id',
    component: lazy(() => import('../../views/App/UpdateApp'))
  },
  {
    path: '/add-promotion/:id',
    component: lazy(() => import('../../views/Promotions/AddPromotion'))
  },
  {
    path: '/list-promotions',
    component: lazy(() => import('../../views/Promotions/ListPromotion'))
  },
  {
    path: '/update-promotion/:id',
    component: lazy(() => import('../../views/Promotions/UpdatePromotion'))
  },
  {
    path: '/update-ad/:id',
    component: lazy(() => import('../../views/appSettings/updateAd'))
  },
  {
    path: '/in-app-update-setting/:id',
    component: lazy(() => import('../../views/appSettings/updateInApp'))
  },
  {
    path: '/send-push-notification/:id',
    component: lazy(() => import('../../views/pushNotifications/sendPushNotification'))
  },
  {
    path: '/list-notifications',
    component: lazy(() => import('../../views/pushNotifications/listNotifications'))
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }
