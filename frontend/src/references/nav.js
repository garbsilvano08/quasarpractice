module.exports =
[
    {
        key: 'dashboard',
        label: 'Dashboard',
        icon: 'fa fa-house-user',
        route: 'dashboard',
    },
    {
        key: 'daily',
        label: 'Daily Logs',
        icon: 'fa fa-calendar-day',
        route: 'daily',
    },
    {
        key: 'landing',
        label: 'Company Management',
        icon: 'fa fa-building',
        sub:
        [
            { label: 'Add New Company', route: 'landing_login' },
            { label: 'Active Companies', route: 'landing_login' },
            { label: 'Inactive Companies', route: 'landing_login' },
        ]
    },
    {
        key: 'users',
        label: 'User Management',
        icon: 'fa fa-users',
        sub:
        [
            { label: 'Add New User', route: 'landing_login' },
            { label: 'Active Users', route: 'landing_login' },
            { label: 'Archived Users', route: 'landing_login' },
        ]
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
        ]
    },
    {
        key: 'logout',
        label: 'Logout',
        icon: 'logout',
        route: 'logout',
    },
]