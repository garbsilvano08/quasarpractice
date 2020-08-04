<template>
    <q-layout class="main" view="hHh Lpr lFf">
        <q-header>
            <q-toolbar>
                <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" />

                <q-img @click="showToggle" src="../assets/vcop-logo-white.svg"></q-img>

                <div class="header__content">

                    <q-btn-toggle v-show="show_toggle" color="red" dense @input="getTabletLogsSwitch" v-model="getLogsSwitch" :options="[{label: 'On', value: 'on'},{label: 'Off', value: 'off'},]"/>

                    <q-btn v-show="checkUser()" class="btn-sync" @click="$router.push('/synchronization/sync-to-cloud')" flat dense rounded icon="mdi-cloud-upload" size="13px" :ripple="false">
                        <div class="notification-indicator" v-if="visitors.length">{{ visitors.length + passLogs.length }}</div>
                        <!-- <div class="notification-indicator">100</div> -->
                    </q-btn>
                    <q-btn v-show="checkUser()" class="btn-sync" @click="$router.push('/synchronization/sync-from-cloud')" flat dense rounded icon="mdi-cloud-download" size="13px" :ripple="false"></q-btn>
                </div>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen"  behavior="mobile" show-if-above bordered overlay content-class="bg-grey-1">
            <div class="nav-profile">
                <q-img class="nav-profile__img" :src="this.$user_info.user_picture"></q-img>
                <div class="nav-profile__info">
                    <div class="nav-profile__name">{{this.$user_info.full_name}}</div>
                    <div class="nav-profile__position">{{this.$user_info.user_type}}</div>
                </div>
            </div>
			<div class="nav-title">MY ACCOUNT</div>
			<q-list class="nav-list">
				<template v-for="nav of navigation">
					<q-item class="nav" v-if="!nav.hasOwnProperty('sub') && userAccess(nav.key)" @click="$router.push({ name: nav.route })" clickable v-ripple :active="$route.name == nav.route">
						<q-item-section avatar>
							<q-icon :name="nav.icon" />
						</q-item-section>
						<q-item-section>{{ nav.label }}</q-item-section>
					</q-item>
					<q-expansion-item group="sidenav" v-if="nav.hasOwnProperty('sub') && userAccess(nav.key)" expand-separator class="nav" :icon="nav.icon" :label="nav.label">
						<q-card class="nav-sub">
							<div v-for="sub in nav.sub" class="nav-item" :class="$route.name == sub.route ? 'active' : ''" @click="$router.push({ name: sub.route })">{{ sub.label }}</div>
						</q-card>
					</q-expansion-item>
				</template>
			</q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>
<script>
import EssentialLink    from 'components/EssentialLink.vue'
import Layout           from './MemberLayout.scss'
import navigation       from '../references/nav'
import { postAddPerson , postSavePerson ,postGetDevice,postGetLogsSettings}                        from '../references/url';
import Model from "../models/Model";
import { base64StringToBlob } from 'blob-util';

function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

export default
{
    name: 'MemberLayout',
    components:
    {
        EssentialLink
    },
	data: () =>
	({
        getLogsSwitch: "",
		package_data: { version: '0.0.0' },
		leftDrawerOpen: false,
        navigation: [],
        db: new Model(),
        device_list: [],
        user_info: {},
        show_toggle: false,
        is_app: true
    }),
    computed:
    {
        visitors()
        {
            return this.$store.state.sync.visitors;
        },
        lastRequestTime()
        {
            return this.$store.state.sync.lastRequestTime;
        },
        passLogs()
        {
            return this.$store.state.sync.passLogs;
        },
    },
    async mounted()
    {
        if(!this.$user_info)
        {
            this.$router.push({ name: 'front_login' });
        }

        this.navigation = navigation;

    },
    async created()
    {
        this.is_app = this.$user_info.user_type == 'Officer' ? false : true
        // Edward
        await this.db.initialize();
        await this.$store.commit('sync/storeVisitors', await this.db.get("visitors"));
        await this.$store.commit('sync/storeLastRequestTime', await this.db.get("lastRequestTime"));
        await this.checkQueueSync();

        // Irish
        this.getGetTabletLogsSettings();
        if (!this.$user_info.user_type == 'Super Admin') await this.getAllDevice(this.$user_info.company._id);
        // await this.getLog();
        setInterval(this.getLog, 60000);
    },
    methods:
    {
        checkUser()
        {
            if (this.$user_info && this.$user_info.user_type == 'Super Admin' || this.$user_info.user_type == 'Officer') return false

            else return true
        },

        userAccess(key)
        {
            if (this.$user_info.user_type == 'Super Admin')
            {
                return true
            }
            else if (this.$user_info.user_type == 'Officer')
            {
                if ( key == 'member_logout')
                {
                    return true
                }
                else return false
            }
            else if (this.$user_info.user_type == 'Admin')
            {
                if ( key == 'user_management' )
                {
                    return false
                }
                else return true
            }
            else
            {
                if ( key == 'member_logout' || key == 'dashboard' || key == 'frontdesk_visitor' || key == 'personnel_management' || key == 'daily')
                {
                    return true
                }
                else return false
            }
        },

        showToggle()
        {
            this.show_toggle = !this.show_toggle
        },
        //settings get logs irish**********************
        async getGetTabletLogsSettings()
        {
            this.$store.commit('sync/storeGetLogsSwitch', await this.db.get("getLogsSwitch"));
            let logsSwitch =this.$store.state.sync.getLogsSwitch
            if (logsSwitch.length==0)
            {
                await this.db.update(

                "on"
                ,
                'getLogsSwitch', "settings");
                this.$store.commit('sync/storeGetLogsSwitch', await this.db.get("getLogsSwitch"));
                // console.log(this.$store.state.sync.getLogsSwitch)
                let settings =  this.$store.state.sync.getLogsSwitch;
                this.getLogsSwitch = settings[0].data;
            }
            else
            {
                // console.log(logsSwitch[0].data);
                this.getLogsSwitch = logsSwitch[0].data;

            }
        },
        //switching get logs irish**********************
        async getTabletLogsSwitch()
        {
            // console.log(this.getLogsSwitch);
            await this.db.update(

            this.getLogsSwitch
            ,
            'getLogsSwitch', "settings");
            this.$store.commit('sync/storeGetLogsSwitch', await this.db.get("getLogsSwitch"));
            let settings =  this.$store.state.sync.getLogsSwitch;
            this.getLogsSwitch = settings[0].data;
        },
        async getAllDevice(id)
        {
           this.device_list = await this.$_post(postGetDevice, {find_device: {company_id: id}});
           this.device_list = this.device_list.data;
        },
        async checkQueueSync()
        {
            if (this.$user_info.user_type != 'Super Admin')
            {
                this.$store.commit('sync/storeVisitors', await this.db.get("visitors"));
                // Info
    
                for (let visitor of this.visitors)
                {
                    let data = {
                        visit_purpose:      visitor.visitor_purpose.purpose_visit,
                        contact_person:     visitor.visitor_purpose.contact_person,
                        destination:        visitor.visitor_purpose.destination,
    
                        id_img: visitor.personal_information.id_image,
                        id_num: visitor.personal_information.id_number,
                        id_type: visitor.personal_information.id_type,
    
                        person_img: visitor.personal_information.account_img,
                        last_name: visitor.personal_information.last_name,
                        middle_name: visitor.personal_information.middle_name,
                        given_name: visitor.personal_information.first_name,
                        gender: visitor.personal_information.gender,
                        birthday: new Date(visitor.personal_information.birth_day),
                        nationality: visitor.personal_information.nationality,
                        home_address: visitor.personal_information.home_address,
                        contact_number: visitor.personal_information.contact_number,
                        emergency_contact: visitor.personal_information.emergency_contact_number,
                        date_created: new Date(),
                        company_name: visitor.personal_information.company_name,
                        frontdesk_person_id: visitor.personal_information.frontdesk_person_id,
                        frontdesk_person_date: visitor.personal_information.frontdesk_person_date,
                        frontdesk_person_date: visitor.personal_information.frontdesk_person_date,
                        location: visitor.personal_information.location,
                        location_coordinates: visitor.personal_information.location_coordinates,
                        is_active: true,
    
                        saved_from: this.$user_info.company._id ? this.$user_info.company._id : '',
    
                        category: 'Visitors'
                    }
    
    //***************************SENDING DATA TO TABLET HTML POST REQUEST************************************************************
                    toDataUrl(visitor.personal_information.account_img, async (myBase64)=> {
                    let result           = '';
                    let characters       = '0123456789';
                    let charactersLength = characters.length;
                    for ( let i = 0; i < 9; i++ ) {
                        result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    }
    
                    let sex="";
                    if (visitor.personal_information.gender=="Female")
                    {
                        sex=0;
                    }
                    else if (visitor.personal_information.gender=="Male")
                    {
                        sex=1;
                    }
                    let today= new Date()
                    let expStartTime= (today.getFullYear())+ '-' +(today.getMonth()+1).toString().padStart(2, "0")+'-'+today.getDate().toString().padStart(2, "0")+ " "+ today.getHours().toString().padStart(2, "0")+":"+today.getMinutes().toString().padStart(2, "0");
                    let expEndTime= (today.getFullYear())+ '-' +(today.getMonth()+1).toString().padStart(2, "0")+'-'+(today.getDate()+1).toString().padStart(2, "0")+ " "+ today.getHours().toString().padStart(2, "0")+":"+today.getMinutes().toString().padStart(2, "0");
    
                    let tabletFormData = new FormData();
                    let b64 = myBase64.replace(/^data:image\/[a-z]+;base64,/, "");
                    tabletFormData.append("pass", "123456");
                    tabletFormData.append("person", "{'imgBase64': '"+b64+"', 'name' : '"+ visitor.personal_information.first_name+" "+ visitor.personal_information.middle_name +" "+ visitor.personal_information.last_name +"', 'person_id' : '"+ visitor.personal_information.id_number +"', 'sex' : "+ sex +", 'group_id' : 20, 'phone' : "+visitor.personal_information.contact_number+", 'email' : '', 'ic_card' : '', 'nation' : '', 'native_place' : '', 'birth_day' : '"+ visitor.personal_information.birth_day +"', 'address' : '"+ visitor.personal_information.home_address +"', 'vipId': '"+visitor.personal_information.frontdesk_person_id+"', 'remarks' : '', 'att_flag' : 0 , 'banci_id' : '', 'device_group_id' : '', 'device_group' : 1, 'type' : 1.1, 'reg_type' : 0, 'prescription' : '"+ expStartTime+","+expEndTime +"'}" );
    
                    this.device_list.forEach(async (device) => {
    
                    let rsp = await this.$axios.post("http://"+device.device_ip+":8080/person/create", tabletFormData).then(res => res.data);
                    })
    
                    });
    //*********************************************************************************************************************************
                    await this.$_post(postSavePerson, {person_info: data} );
    
                    await this.db.delete(visitor.id, "visitors");
                    this.$store.commit('sync/storeVisitors', await this.db.get("visitors"));
                }
    
                // Logs
                for (let log of this.passLogs)
                {
                    console.log(log);
                    log.company_id = this.$user_info.company ? this.$user_info.company._id : '';
    
                    await this.$_post('member/add/pass_log', { data: log });
                    await this.db.delete(log.id, "passLogs");
                    this.$store.commit('sync/storePassLogs', await this.db.get("passLogs"));
                }
                // await this.$_post('member/count/logs');
                setTimeout(() => this.checkQueueSync(), 1000);
            }
        },
        async getLog()
        {
            await this.getAllDevice(this.$user_info.company._id);
            if ((this.device_list.length==0) || (this.getLogsSwitch == "off"))
            {

            }
            else
            {
                let today= new Date()
                let timeToday= (today.getFullYear())+ '-' +(today.getMonth()+1).toString().padStart(2, "0")+'-'+today.getDate().toString().padStart(2, "0")+ " "+ today.getHours().toString().padStart(2, "0")+":"+today.getMinutes().toString().padStart(2, "0");
                let startTime= "";
                var formData = new FormData();
                if(this.$store.state.sync.lastRequestTime.length<=0){
                    startTime = (today.getFullYear()-1)+ '-' +(today.getMonth()+1).toString().padStart(2, "0")+'-'+today.getDate().toString().padStart(2, "0")+ " "+ today.getHours().toString().padStart(2, "0")+":"+today.getMinutes().toString().padStart(2, "0");
                }
                else {
                    startTime = this.lastRequestTime[this.lastRequestTime.length-1].lastRequestTime;
                }

                formData.append("pass", "123456");
                formData.append("startTime", startTime)// number 123456 is immediately converted to a string "123456"
                formData.append("endTime", timeToday); // number 123456 is immediately converted to a string "123456"
                let logs= [];
                var request = new XMLHttpRequest();

                this.device_list.forEach(async (device) => {
                    var request = new XMLHttpRequest();
                    request.open("POST", "http://"+device.device_ip+":8080/newFindRecords");
                    request.onreadystatechange = () => {
                        if (request.readyState == XMLHttpRequest.DONE) {
                            let resp = request.responseText;
                            this.saveLogsIndexDb(JSON.parse(JSON.parse(resp).data), device);
                        }
                    }
                    request.send(formData);
                    await this.db.add(
                    {
                        lastRequestTime: timeToday
                    },
                    'lastRequestTime');
                })
                try
                {
                    this.$store.commit('sync/storeLastRequestTime', await this.db.get("lastRequestTime"));
                }
                catch(e)
                {
                }
            }
        },
        async saveLogsIndexDb(dat, device)
        {
            let response="";

            for (let data of dat)
            {
                var formData = new FormData();
                formData.append("pass", "123456");
                formData.append("imgName", data.imageName);

                let getImgRes = await this.$axios.post("http://"+device.device_ip+":8080/getRecordImg", formData).then(res => res.data);
               let imgPath= await this.savePicsLocal(getImgRes, data.imageName).then( rest => rest);
                data.image_path = imgPath;
                data.device_id = device.device_id;
                await this.db.add(data, "passLogs");
            }

            this.$store.commit('sync/storePassLogs', await this.db.get("passLogs"));
        },
        async savePicsLocal(respImage, imageName)
        {
            let blob = "";
            var formDatatoBackend = new FormData();
            let contentType = 'image/png';
            blob = "";
            blob = base64StringToBlob(respImage.data, contentType);
            blob.lastModifiedDate = new Date();
            formDatatoBackend.append('image', blob, imageName);
            let res = await this.$_post_file(formDatatoBackend);
            return res;
        },

    }
}
</script>
