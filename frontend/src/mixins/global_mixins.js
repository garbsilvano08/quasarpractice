const openGeocoder = require('node-open-geocoder')
import axios from 'axios';
import { Plugins, CameraResultType, CameraSource, Capacitor } from "@capacitor/core";
const { GalleryPlugin, Filesystem, Camera, VideoBackgroundMusic, Geolocation, Storage } = Plugins;
import { postGetCompanies,
    postAddPerson,
    postUpdateStaff,
    postSavePerson,
    postGetDailyLog,
    postGetWeeklyCount,
    postLatestLog,
    postPersonByCateg,
    postGetAllLogs,
    postGetPersons,
    postGetPurposeVisit,
    postGetAlertCount,
    postGetDevice,
    postDashboard,
    postGetCompany,
    postUserLogOut
 } from '../references/url';

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
        async $_nearby_places(data)
        {
            return new Promise(resolve =>
            {
                openGeocoder().reverse(data.lon, data.lat).end(async (err,res) =>
                {
                    let location_details = [];
                    if (res.address.hasOwnProperty('village')) location_details.push(res.address.village)
                    if (res.address.hasOwnProperty('city')) location_details.push(res.address.city)
                    if (res.address.hasOwnProperty('town')) location_details.push(res.address.town)
                    if (res.address.hasOwnProperty('state')) location_details.push(res.address.state)
                    if (res.address.hasOwnProperty('country')) location_details.push(res.address.country)
                    // await this.getNearbyLocation(address);
                    resolve(location_details);
                })
            });
        },
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
            try
            {
                await axios.post('https://vcop-image.geer.solutions/', data,{
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
                    }
                }); 
                return res.data;
            }
            catch(e)
            {
                return null
            }
        },
        async $_company(params)
        {
            let company = await this.$_post(postGetCompanies, {find_company: params})
            return company.data
        },
        async $_devices(params)
        {
            let data = await this.$_post(postGetDevice, params);
            return data.data
        },
        async $_logout()
        {
            localStorage.removeItem("auth");
            this.$store.commit('user/updateUser', null);
            await this.$_post(postUserLogOut)
        },
        $_isMobile()
        {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
        async $_convertFileToBlob(file)
        {
            // Convert image to blob
            let selected = await fetch(Capacitor.convertFileSrc('file://' + file));
            let blob = await selected.blob();
            return blob;
        },
        async $_callGallery()
        {
            let res = {}
            try
            {
                try
                {
                    const image = await Camera.getPhoto(
                    {
                        quality: 100,
                        correctOrientation: true,
                        source: CameraSource.Camera,
                        allowEditing: false,
                        resultType: CameraResultType.Uri,
                        // saveToGallery: true
                    });
                    res = image.webPath
                }
                catch (error)
                {
                    return false;
                }
                return res;
            }
            catch (e)
            {
                alert(e.message);
            }
        },
        async $_current_position()
        {
            const coordinates = null
            try{

                const coordinates = await Geolocation.getCurrentPosition();
                return coordinates
            }
            catch(e) {return null}
        },
    }
}