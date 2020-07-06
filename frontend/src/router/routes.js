
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
            // DASHBOARD ROUTES
            { name: 'member_dashboard', path: '', component: () => import('pages/Member/Dashboard/Dashboard.vue') },
            { name: 'member_testing', path: 'testing', component: () => import('pages/Member/Dashboard.vue') },
            // FRONTDESK ROUTES & PERSONNEL MANAGEMENT
            { name: 'member_frontdesk_visitor', path: '/frontdesk/add-visitor', component: () => import('pages/Member/Frontdesk/AddVisitor.vue') },
            { name: 'member_frontdesk_staff', path: '/frontdesk/add-staff', component: () => import('pages/Member/Frontdesk/AddStaff.vue') },
            { name: 'member_frontdesk_feverlogs', path: '/frontdesk/add-fever-logs', component: () => import('pages/Member/Frontdesk/AddFeverLogs.vue') },
            { name: 'member_frontdesk_blacklist', path: '/frontdesk/blacklist', component: () => import('pages/Member/Frontdesk/BlackList.vue') },
            // DAILY LOGS ROUTES
            { name: 'member_dailylogs_staff', path: '/dailylogs/staff', component: () => import('pages/Member/DailyLogs/StaffDailyLogs.vue') },
            { name: 'member_dailylogs_visitor', path: '/dailylogs/visitor', component: () => import('pages/Member/DailyLogs/VisitorDailyLogs.vue') },
            { name: 'member_dailylogs_feverdetected', path: '/dailylogs/fever-detected', component: () => import('pages/Member/DailyLogs/FeverDetectedDailyLogs.vue') },
            { name: 'member_dailylogs_blacklist', path: '/dailylogs/black-list', component: () => import('pages/Member/DailyLogs/BlackListDailyLogs.vue') },
            { name: 'member_dailylogs_bodytemperature', path: '/dailylogs/body-temperature', component: () => import('pages/Member/DailyLogs/BodyTemperatureDailyLogs.vue') },
            // ACCOUNT DIRECTORY ROUTES
            { name: 'member_accountdirectory_staff', path: '/accountdirectory/staff', component: () => import('pages/Member/AccountDirectory/StaffAccountDirectory.vue') },
            { name: 'member_accountdirectory_visitor', path: '/accountdirectory/visitor', component: () => import('pages/Member/AccountDirectory/VisitorAccountDirectory.vue') },
            { name: 'member_accountdirectory_feverdetected', path: '/accountdirectory/feverdetected', component: () => import('pages/Member/AccountDirectory/FeverDetectedAccountDirectory.vue') },
            { name: 'member_accountdirectory_blacklist', path: '/accountdirectory/blacklist', component: () => import('pages/Member/AccountDirectory/BlacklistAccountDirectory.vue') },
            { name: 'member_accountdirectory_personalinfo', path: '/accountdirectory/personal-information', component: () => import('pages/Member/AccountDirectory/PersonalInformation/PersonalInformation.vue') },
            // SYCHNIZATION ROUTES
            { name: 'member_synchronization', path: '/synchronization', component: () => import('pages/Member/Synchronization/Synchronization.vue') },
            { name: 'member_synctocloud', path: '/synchronization/sync-to-cloud', component: () => import('pages/Member/Synchronization/SyncToCloud.vue') },
            { name: 'member_syncfromcloud', path: '/synchronization/sync-from-cloud', component: () => import('pages/Member/Synchronization/SyncFromCloud.vue') },
            // COMPANY MANAGEMENT ROUTES
            { name: 'member_allcompany', path: '/companymanagement/all-company', component: () => import('pages/Member/CompanyManagement/AllCompany.vue') },
            { name: 'member_addcompany', path: '/companymanagement/add-company', component: () => import('pages/Member/CompanyManagement/AddCompany.vue') },
            // HEATMAP
            { name: 'member_heatmap', path: '/heatmap', component: () => import('pages/Member/Heatmap/Heatmap.vue') },
            { name: 'member_logout', path: 'logout', component: () => import('pages/Member/Logout.vue') },
            // PERSONAL INFORMATION
            { name: 'member_personal-information', path: '/accountdirectory/personal_information', component: () => import('pages/Member/AccountDirectory/PersonalInformation/PersonalInformation.vue') },
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
