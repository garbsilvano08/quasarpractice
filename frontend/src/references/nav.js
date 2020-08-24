module.exports =
[
    {
        key: 'dashboard',
        label: 'Dashboard',
        icon: 'mdi-chart-bar',
        route: 'member_dashboard',
    },
    // {
    //     key: 'notification',
    //     label: 'Notification',
    //     icon: 'mdi-bell-ring',
    //     route: 'member_notification',
    // },
    {
        key: 'frontdesk_visitor',
        label: 'Frontdesk',
        icon: 'mdi-monitor-cellphone',
        route: 'member_frontdesk_visitor',
    },
    {
        key: 'personnel_management',
        label: 'Personnel Management',
        icon: 'mdi-account-cog',
        sub:
        [
            { label: '+ Add New Staff', route: 'member_frontdesk_staff' },
            { label: '+ Add Fever Logs', route: 'member_frontdesk_feverlogs' },
            { label: '+ Add Blacklist', route: 'member_frontdesk_blacklist' },
        ]
    },
    {
        key: 'daily',
        label: 'Daily Logs',
        icon: 'mdi-face-recognition',
        route: 'member_dailylogs',
    },
    // {
    //     key: 'daily',
    //     label: 'Daily Logs',
    //     icon: 'mdi-face-recognition',
    //     sub:
    //     [
    //         { label: 'Staff', route: 'member_dailylogs_staff' },
    //         { label: 'Visitors', route: 'member_dailylogs_visitor' },
    //         { label: 'Stranger', route: 'member_dailylogs_stranger' },
    //         { label: 'Body Temp. Logs', route: 'member_dailylogs_bodytemperature' },
    //         { label: 'Fever Detected', route: 'member_dailylogs_feverdetected' },
    //         { label: 'Blacklist', route: 'member_dailylogs_blacklist' },
    //     ]
    // },
    {
        key: 'account_directory',
        label: 'Account Directory',
        icon: 'mdi-account-group',
        route: 'member_accountdirectory',
        // [
        //     { label: 'Staff', route: 'member_accountdirectory_staff' },
        //     { label: 'Visitors', route: 'member_accountdirectory_visitor' },
        //     { label: 'Fever Detected', route: 'member_accountdirectory_feverdetected' },
        //     { label: 'Blacklist', route: 'member_accountdirectory_blacklist' },
        // ]
    },
    {
        key: 'company_management',
        label: 'Company Management',
        icon: 'mdi-briefcase',
        sub:
        [
            { label: 'All Companies', route: 'member_allcompany' },
            { label: '+ Add Company', route: 'member_addcompany' },
        ]
    },
    {
        key: 'user_management',
        label: 'User Management',
        icon: 'mdi-account-multiple',
        sub:
        [
            { label: 'All Users', route: 'member_alluser' },
            { label: '+ Add User', route: 'member_adduser' },
        ]
    },
    {
        key: 'device_management',
        label: 'Device Management',
        icon: 'mdi-cellphone',
        sub:
        [
            { label: 'All Devices', route: 'member_alldevice' },
            { label: '+ Add Device', route: 'member_adddevice' },
        ]
    },
    {
        key: '',
        label: 'Reports',
        icon: 'mdi-clipboard-text',
        sub:
        [
            { label: 'Fever Detected', route: 'member_feverdetected_report' },
            { label: 'Fever Monitoring', route: 'member_fevermonitoring_report' },
            { label: 'Fever Heatmap', route: 'member_heatmap' },
        ]
    },
    // {
    //     key: '',
    //     label: 'Security Access',
    //     icon: 'mdi-security',
    //     route: '',
    // },
    {
        key: 'member_logout',
        label: 'Logout',
        icon: 'mdi-logout-variant',
        route: 'member_logout',
    },
    // {
    //     key: 'landing',
    //     label: 'Company Management',
    //     icon: 'fa fa-building',
    //     sub:
    //     [
    //         { label: 'Add New Company', route: 'landing_login' },
    //         { label: 'Active Companies', route: 'landing_login' },
    //         { label: 'Inactive Companies', route: 'landing_login' },
    //     ]
    // },
    // {
    //     key: 'users',
    //     label: 'User Management',
    //     icon: 'fa fa-users',
    //     sub:
    //     [
    //         { label: 'Add New User', route: 'landing_login' },
    //         { label: 'Active Users', route: 'landing_login' },
    //         { label: 'Archived Users', route: 'landing_login' },
    //     ]
    // },
    // {
    //     key: 'daily',
    //     label: 'Device Management',
    //     icon: 'fa fa-tablet-alt',
    //     route: 'daily',
    // },
    // {
    //     key: 'daily',
    //     label: 'Blacklist Management',
    //     icon: 'fa fa-user-shield',
    //     route: 'daily',
    // },
    // {
    //     key: 'reports',
    //     label: 'Reports',
    //     icon: 'fa fa-chart-line',
    //     sub:
    //     [
    //         { label: 'Foot Traffic', route: 'landing_login' },
    //         { label: 'Visitor Purpose', route: 'landing_login' },
    //         { label: 'Employee/Visitor Overview', route: 'landing_login' },
    //     ]
    // },
    // {
    //     key: 'logout',
    //     label: 'Logout',
    //     icon: 'logout',
    //     route: 'logout',
    // },
]
