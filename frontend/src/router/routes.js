
const routes = [

    {
        path: '/',
        component: () => import('layouts/FrontLayout.vue'),
        children:
        [
            { name: 'login', path: '', component: () => import('pages/Front/Login.vue') },
        ]
    },
    {
        path: '/member',
        component: () => import('layouts/MemberLayout.vue'),
        children:
        [
            { name: 'dashboard', path: '', component: () => import('pages/Member/Dashboard.vue') },
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '*',
        component: () => import('pages/Error404.vue')
    }
]

export default routes
