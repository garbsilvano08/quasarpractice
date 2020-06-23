
const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children:
        [
            { name: 'landing', path: '', component: () => import('pages/Front/Landing.vue') },
            { name: 'authentication', path: 'auth', component: () => import('pages/Front/Authentication.vue') },
            { name: 'landing_login', path: 'login', component: () => import('pages/Front/Login.vue') },
            { name: 'landing_registration', path: 'registration', component: () => import('pages/Front/Registration.vue') },
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
