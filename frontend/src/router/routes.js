
const routes = [

    {
        path: '/',
        component: () => import('layouts/FrontLayout.vue'),
        children:
        [
            { name: 'front_login', path: '', component: () => import('pages/Front/Login.vue') },
        ]
    },
    {
        path: '/member',
        component: () => import('layouts/MemberLayout.vue'),
        children:
        [
            { name: 'member_dashboard', path: '', component: () => import('pages/Member/Dashboard/Dashboard.vue') },
            { name: 'member_testing', path: 'testing', component: () => import('pages/Member/Dashboard.vue') },
            { name: 'member_frontdesk_visitor', path: '/frontdesk/add-visitor', component: () => import('pages/Member/Frontdesk/AddVisitor.vue') },
            { name: 'member_frontdesk_staff', path: '/frontdesk/add-staff', component: () => import('pages/Member/Frontdesk/AddStaff.vue') },
            { name: 'member_frontdesk_feverlogs', path: '/frontdesk/add-fever-logs', component: () => import('pages/Member/Frontdesk/AddFeverLogs.vue') },
            { name: 'member_frontdesk_blacklist', path: '/frontdesk/blacklist', component: () => import('pages/Member/Frontdesk/Blacklist.vue') },
            { name: 'member_logout', path: 'logout', component: () => import('pages/Member/Logout.vue') },
        ]
    },
    {
        name: 'front_desk', path: '/front_desk', component: () => import('pages/Member/FrontDesk.vue')
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '*',
        component: () => import('pages/Error404.vue')
    }
]

export default routes
