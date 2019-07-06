const getUserInfoFromToken = () => {
  const user = JSON.parse(localStorage.getItem('user-info'))
  return user ? user : false
}

const ifAuthenticated = (to, from, next) => {
  const user = getUserInfoFromToken()
  if (!user) next('/login')
  next()
}

const ifNotAuthenticated = (to, from, next) => {
  const user = getUserInfoFromToken();
  if (!user) {
    next()
    return
  }
}

export default [
  /**
   * Public routes
   *
   * Accessible to all clients
   */
  {
    path: '*',
    meta: { public: true },
    redirect: { path: '/404' }
  },
  {
    path: '/404',
    meta: { public: true },
    name: 'not-found',
    component: () => import(`@/views/NotFound`)
  },
  {
    path: '/403',
    meta: { public: true },
    name: 'access-denied',
    component: () => import(`@/views/Deny`)
  },
  {
    path: '/login',
    meta: { public: true },
    name: 'login',
    beforeEnter: ifNotAuthenticated,
    component: () => import(`@/views/Login`)
  },
  /**
   * Authenticated routes
   *
   * Accessible only to authenticated clients
   */
  {
    path: '/',
    name: 'home',
    beforeEnter: ifAuthenticated,
    component: () => import(`@/views/Home`)
  },
  {
    path: '/categories',
    name: 'categories',
    beforeEnter: ifAuthenticated,
    component: () => import(`@/views/Categories`)
  },
  {
    path: '/companies',
    name: 'companies',
    beforeEnter: ifAuthenticated,
    component: () => import(`@/views/Companies`)
  }
]