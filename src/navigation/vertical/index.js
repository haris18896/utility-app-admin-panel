import { Home, User, Circle, Grid, BarChart, Bell, Settings } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'admins',
    title: 'Admins',
    icon: <User size={20} />,
    children: [
      {
        id: 'register',
        title: 'Add Admin',
        icon: <Circle size={20} />,
        navLink: '/register-admin',
        exact: true
      },
      {
        id: 'admins',
        title: 'View Admins',
        icon: <Circle size={12} />,
        navLink: '/admins',
        exact: true
      }
    ]
  },
  {
    id: 'apps',
    title: 'Apps',
    icon: <Grid size={20} />,
    children: [
      {
        id: 'addApp',
        title: 'Add app',
        icon: <Circle size={12} />,
        navLink: '/register-app',
        exact: true
      },
      {
        id: 'appList',
        title: 'View Apps',
        icon: <Circle size={20} />,
        navLink: '/list-apps',
        exact: true
      }
    ]
  },
  {
    id: 'promotion',
    title: 'Promotion',
    icon: <BarChart size={20} />,
    children: [
      {
        id: 'promotionsList',
        title: 'View Promotions',
        icon: <Circle size={20} />,
        navLink: '/list-promotions',
        exact: true
      }
    ]
  },
  {
    id: 'pushNotifications',
    title: 'Push Notifications',
    icon: <Bell size={20} />,
    children: [
      {
        id: 'listNotifications',
        title: 'View Notifications',
        icon: <Circle size={20} />,
        navLink: '/list-notifications',
        exact: true
      }
    ]
  }
]
