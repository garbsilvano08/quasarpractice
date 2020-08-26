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
        $_timeAgo(sec)
        {
            let timeDef = new Date() - new Date(sec * 1000);
            let seconds = timeDef / 1000;
            let minutes = seconds / 60;
            let hours = minutes / 60;
            let secondsAgo = null;
            let minutesAgo = null;
            let daysAgo = null;
            let monthsAgo = null;
            let yearsAgo = null;
            let timeAgo = null;
            timeAgo = "Just now";
            if (seconds >= 60) {
                minutesAgo = seconds / 60;
                timeAgo =
                    Math.floor(minutesAgo) +
                    (Math.floor(minutesAgo) == 1
                        ? " min"
                        : " mins");
            }
            if (minutesAgo >= 60) {
                hours = minutesAgo / 60;
                timeAgo =
                    Math.floor(hours) +
                    (Math.floor(hours) == 1 ? " hr" : " hrs");
            }
            if (hours >= 24) {
                daysAgo = hours / 24;
                timeAgo =
                    Math.floor(daysAgo) +
                    (Math.floor(daysAgo) == 1 ? " day" : " days");
            }
            if (daysAgo >= 30) {
                monthsAgo = daysAgo / 30;
                timeAgo =
                    Math.floor(monthsAgo) +
                    (Math.floor(monthsAgo) == 1 ? " month" : " months");
            }
            if (monthsAgo >= 12) {
                yearsAgo = monthsAgo / 12;
                timeAgo =
                    Math.floor(yearsAgo) +
                    (Math.floor(yearsAgo) == 1 ? " yr" : " yrs");
            }

            return timeAgo;
        },
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
            
            // Server
            // https://vcop-image.geer.solutions/

            // http://128.199.130.24:81/
            // http://157.245.55.109:4000/
            let resp = await axios.post('https://vcop-image.geer.solutions/', data,{
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
                    return
                    // this.$q.dialog({ title: `Something's not quite right`, message: e.response.data.message });
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