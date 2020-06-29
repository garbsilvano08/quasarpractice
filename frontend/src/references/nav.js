module.exports =
[
    {
        key: 'member_dashboard',
        label: 'Dashboard',
        icon: 'fa fa-house-user',
        route: 'member_dashboard',
    },
    {
        key: 'frontdesk',
        label: 'Front Desk',
        icon: 'mdi-monitor-cellphone',
        sub:
        [
            { label: 'Add Visitor', route: 'member_frontdesk_visitor' },
            { label: 'Add New Staff', route: 'member_frontdesk_staff' },
            { label: 'Add Fever Logs', route: 'member_frontdesk_feverlogs' },
            { label: 'Blacklist Management', route: 'member_frontdesk_blacklist' },
        ]
    },
    {
        key: 'daily',
        label: 'Daily Logs',
        icon: 'mdi-face-recognition',
        route: 'daily',
    },
    {
        key: 'all-users',
        label: 'All Users',
        icon: 'mdi-account-group',
        route: '',
    },
    {
        key: 'account',
        label: 'Account',
        icon: 'mdi-cog',
        route: '',
    },
    {
        key: 'daily',
        label: 'Device Management',
        icon: 'fa fa-tablet-alt',
        route: 'daily',
    },
    {
        key: 'daily',
        label: 'Blacklist Management',
        icon: 'fa fa-user-shield',
        route: 'daily',
    },
    {
        key: 'reports',
        label: 'Reports',
        icon: 'fa fa-chart-line',
        sub:
        [
            { label: 'Foot Traffic', route: 'landing_login' },
            { label: 'Visitor Purpose', route: 'landing_login' },
            { label: 'Employee/Visitor Overview', route: 'landing_login' },
            { label: 'Fever Monitoring', route: 'landing_login' },
        ]
    },
    {
        key: 'member_logout',
        label: 'Logout',
        icon: 'logout',
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
