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
    },
    mounted()
    {
    },
    methods:
    {
        $_parseTabletResponse(res)
        {
            res = res.replace(`data: "`, ``);
            res = res.substring(0, res.length - 1);
            res = JSON.parse(res);
            return res;
        },
        async $_get(url, data = {})
        {
            let res = null;

            await this.$axios.get(url, data).then((r) => { res = r; }).catch((e) =>
            {
                this.$q.dialog({ title: `Something's not quite right`, message: e.response.data.message });
            });

            return res;
        },
        async $_post(url, data = {})
        {
            let res = null; 

            await this.$axios.post(url, data,{
                headers: {
                'Authorization': this.$token,
                }
            }).then((r) => { res = r; }).catch((e) =>
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
        async $_post_file(data)
        {
            let res = null;
            

            await axios.post('http://157.245.55.109:4000/', data,{
                headers: {
                'content-type': 'multipart/form-data',
                }
            }).then((r) => { res = r; }).catch((e) =>
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
            // console.log(res.data);
            return res.data;
        },
        $_logout()
        {
            localStorage.removeItem("auth");
            this.$store.commit('user/updateUser', null);
        }
    }
}