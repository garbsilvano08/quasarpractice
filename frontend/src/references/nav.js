module.exports =
[
    {
        key: 'member_dashboard',
        label: 'Dashboard',
        icon: 'mdi-chart-bar',
        route: 'member_dashboard',
    },
    {
        key: '',
        label: 'Notification',
        icon: 'mdi-bell-ring',
        route: '',
    },
    {
        key: 'member_frontdesk_visitor',
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
        sub:
        [
            { label: 'Staff', route: 'member_dailylogs_staff' },
            { label: 'Visitors', route: 'member_dailylogs_visitor' },
            { label: 'Body Temp. Logs', route: 'member_dailylogs_bodytemperature' },
            { label: 'Fever Detected', route: 'member_dailylogs_feverdetected' },
            { label: 'Blacklist', route: 'member_dailylogs_blacklist' },
        ]
    },
    {
        key: 'account-directory',
        label: 'Account Directory',
        icon: 'mdi-account-group',
        sub:
        [
            { label: 'Staff', route: 'member_accountdirectory_staff' },
            { label: 'Visitors', route: 'member_accountdirectory_visitor' },
            { label: 'Fever Detected', route: 'member_accountdirectory_feverdetected' },
            { label: 'Blacklist', route: 'member_accountdirectory_blacklist' },
        ]
    },
    {
        key: '',
        label: 'Reports',
        icon: 'mdi-clipboard-text',
        sub:
        [
            { label: 'Fever Logs', route: '' },
            { label: 'Fever Monitoring', route: '' },
            { label: 'Fever Heatmap', route: '' },
        ]
    },
    {
        key: '',
        label: 'User Management',
        icon: 'mdi-account-multiple',
        sub:
        [
            { label: 'All User', route: '' },
            { label: '+ Add User', route: '' },
        ]
    },
    {
        key: '',
        label: 'Company Management',
        icon: 'mdi-briefcase',
        sub:
        [
            { label: 'All Company', route: 'member_allcompany' },
            { label: '+ Add Company', route: '' },
        ]
    },
    {
        key: '',
        label: 'Device Management',
        icon: 'mdi-cellphone',
        sub:
        [
            { label: 'All Devices', route: '' },
            { label: '+ Add Device', route: '' },
        ]
    },
    {
        key: '',
        label: 'Security Access',
        icon: 'mdi-security',
        route: '',
    },
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
