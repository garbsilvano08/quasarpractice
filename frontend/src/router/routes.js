
const routes = [
    {
        path: '/',
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
