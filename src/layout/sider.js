export default [
  {
    key: '1',
    icon: 'DashboardOutlined',
    title: 'Dashboard',
    path: '/dashboard',
    role: ['admin', 'staff', 'viewer'],
    children: [
      // {
      //   key: '1-1',
      //   title: 'Production',
      //   path: '/dashboard',
      // },
      // {
      //   key: '1-2',
      //   title: 'Kanagata Shot',
      //   path: '/dashboard/shot-monitor',
      // },
      {
        key: '1-1',
        title: 'Production Line',
        path: '/new-dashboard',
      },
      {
        key: '1-2',
        title: 'Kanagata Shot',
        path: '/new-shot-monitor',
      },
    ],
  },
  {
    key: '5',
    icon: 'CalendarOutlined',
    title: 'Production Plan',
    path: '/plan',
    role: ['admin', 'staff'],
  },
  {
    key: '2',
    icon: 'FileOutlined',
    title: 'Report',
    path: '/report',
    role: ['admin', 'staff', 'viewer'],
    children: [
      {
        key: '2-1',
        title: 'Daily & Weekly',
        path: '/daily-weekly-report',
      },
      {
        key: '2-2',
        title: 'Monthly',
        path: '/monthly-report',
      },
      {
        key: '2-3',
        title: 'Yearly',
        path: '/yearly-report',
      },
      {
        key: '2-4',
        title: 'Summary',
        path: '/fiscal-report',
      },
      {
        key: '2-5',
        title: 'Detail Production',
        path: '/detail-production',
      },
    ],
  },
  {
    key: '3',
    icon: 'DatabaseOutlined',
    title: 'Master Data',
    path: '/master',
    role: ['admin', 'staff'],
    children: [
      {
        key: '3-1',
        title: 'Production',
        path: '/master-production',
      },
      {
        key: '3-3',
        title: 'Maintenance',
        path: '/under-construction',
      },
    ],
  },
  {
    key: '4',
    icon: 'UserOutlined',
    title: 'Admin',
    path: '/admin',
    role: ['admin'],
    children: [
      {
        key: '4.1',
        title: 'Account Control',
        path: '/account-control',
      },
    ],
  },
]
