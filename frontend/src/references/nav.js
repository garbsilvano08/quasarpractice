module.exports =
[
    {
        key: 'what',
        label: 'Introduction',
        icon: 'fa fa-question',
        route: 'landing',
    },
    {
        key: 'authenticator',
        label: 'Authenticator',
        icon: 'fa fa-key',
        route: 'authentication',
    },
    {
        key: 'landing',
        label: 'Landing Page',
        icon: 'fa fa-home',
        sub:
        [
            { label: 'Login & Logout', route: 'landing_login' },
            { label: 'Registration', route: 'landing_registration'  },
            { label: 'Forgot Password', route: 'landing_forgot_password'  },
            { label: 'Contact Us Form', route: 'landing_contact_us'  },
        ]
    },
    {
        key: 'sample',
        label: 'Sample Another',
        icon: 'fa fa-heart',
        sub:
        [
            { label: 'Login & Logout', route: 'landing_login' },
            { label: 'Registration', route: 'landing_registration'  },
            { label: 'Forgot Password', route: 'landing_forgot_password'  },
            { label: 'Contact Us Form', route: 'landing_contact_us'  },
        ]
    },
]