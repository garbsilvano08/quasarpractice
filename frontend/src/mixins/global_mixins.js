import axios from 'axios';

export default
{
    data: () =>
    ({

    }),
    computed:
    {
        $token()
        {
            return this.$store.state.user.token;
        },
        $user_info()
        {
            return this.$store.state.user.user_info;
        },
    },
    created()
    {
        if(localStorage.getItem("auth"))
        {
            this.$store.commit('user/updateUser', JSON.parse(localStorage.getItem("auth")));
        }
    },
    mounted()
    {

    },
    methods:
    {
        async $_post(url, data = {})
        {
            let res = null;

            if(this.$token)
            {
                data.Authorization = this.$token;
            }

            await this.$axios.post(url, data).then((r) => { res = r; }).catch((e) =>
            {
                if(e.response.status === 500)
                {
                    this.$q.dialog({ title: `You have been logged-out`, message: e.response.data.message });
                    this.$router.push({ name: 'front_login' });
                }
                else
                {
                    this.$q.dialog({ title: `Something's not quite right`, message: e.response.data.message });
                }
                
            });

            return res;
        },
        $_logout()
        {
            localStorage.removeItem("auth");
            this.$store.commit('user/updateUser', null);
        }
    }
}