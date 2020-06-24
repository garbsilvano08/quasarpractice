import axios from 'axios';

export default
{
    data: () =>
    ({

    }),
    computed:
    {
        token()
        {
            return this.$store.state.user.token;
        },
        user_info()
        {
            return this.$store.state.user.user_info;
        },
    },
    mounted()
    {
        if(localStorage.getItem("auth"))
        {
            this.$store.commit('user/updateUser', JSON.parse(localStorage.getItem("auth")));
        }
    },
    methods:
    {
    }
}