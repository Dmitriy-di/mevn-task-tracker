const routes = [
  {
    path: '/',
    component: () => import('layouts/AuthorizationLayout.vue'),
    children: [
      {
        path: 'Enter',
        component: () => import('components/EnterPage.vue'),
      },
      {
        path: '',
        component: () => import('components/RegisterPage.vue'),
      },
    ],
  },
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/Team', component: () => import('pages/Team.vue') },
      {
        path: '/Executors',
        component: () => import('components/Executors.vue'),
      },
      {
        path: '/Responsible',
        component: () => import('components/Responsible.vue'),
      },
      { path: '/Excluded', component: () => import('components/Excluded.vue') },
      { path: '/Modules', component: () => import('pages/Modules.vue') },
      { path: '/AllTasks', component: () => import('pages/Tasks.vue') },
      { path: '/Chat', component: () => import('pages/Chat.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
