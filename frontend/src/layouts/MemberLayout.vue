<template>
    <q-layout class="main" view="hHh Lpr lFf">
        <q-header>
            <q-toolbar>
                <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" />

                <q-img @click="showToggle" src="../assets/vcop-logo-white.svg"></q-img>
                <div class="header__content">
                    <!-- <label>{{person_uploads}}</label> -->
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
        <q-dialog v-model="alert">
            <q-card>
                <q-card-section>
                <div class="text-h6">Alert</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    A scanner device with DEVICE ID {{device_id}} has reached {{count}} logs. Please delete images from the device gallery to get. 
                </q-card-section>

                <q-card-actions align="right">
                <q-btn @click="getDevices" flat label="OK" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-layout>
</template>
<script>

import EssentialLink    from 'components/EssentialLink.vue'
import Layout           from './MemberLayout.scss'
import navigation       from '../references/nav'
import { postAddPerson , postSavePerson , postGetDevice, postGetLogsSettings, postVisionSky }                        from '../references/url';
import Model from "../models/Model";
import { base64StringToBlob } from 'blob-util';
import { log } from 'util';

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
        is_app: true,
        device_list: [],
        alert: false,
        device_id: null,
        count: 0,
        person_uploads: 50000,
        total: 60000,
        image: null,
        
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
        await this.getDevices()

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
        async getDevices()
        {
            if (this.$user_info && this.$user_info.company)
            {
                let devices = await this.$_post(postGetDevice, {find_device: {company_id: this.$user_info.company._id}});
                this.device_list = devices.data

                this.checkDevice()
                // console.log(this.device_list);
            }
        },
        
        async checkDevice()
        {
            for (let device of this.device_list)
            {
                if (device.count_logs >= 20000)
                {
                    this.alert = true
                    this.device_id = device.device_id
                    this.count = device.count_logs
                }
            }
        },

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
            // console.log(this.visitors);
            // if (this.$user_info.user_type != 'Super Admin')
                let image_data = await this.$_post(postGetDevice, {find_device: {_id: '5f3a246175f6c4915ed24083'}});

                // let image = new FormData();
                // image.append('pass', 'abc123');
                // image.append("personId", "20010" );
                // image.append("faceId", "" );
                // image.append("imgBase64", image_data.data[0].image );
                // let img = await this.$axios.post("http://192.168.1.119:8090/face/create", image).then(res => res.data);
                // console.log(img);
            if (this.$user_info.user_type)
            {
                // console.log('kjkjkj');
                if (this.person_uploads >= this.total)
                {
                    this.person_uploads = this.person_uploads + 1
                    let data = new FormData();
                    // let b64 = myBase64.replace(/^data:image\/[a-z]+;base64,/, "");
                    data.append('pass', 'abc123');
                    data.append("person", "{'id': '"+this.person_uploads+"', 'name': 'Jeric Laderas', 'idcardNum': '1', 'departmentId': '1'}" );
    
                    let upload = await this.$axios.post("http://192.168.1.119:8090/person/create", data).then(res => res.data);
                    console.log(upload);

                    let image = new FormData();
                    image.append('pass', 'abc123');
                    image.append("personId", this.person_uploads );
                    image.append("faceId", "" );
                    image.append("imgBase64", image_data.data[0].image );
                    let img = await this.$axios.post("http://192.168.1.119:8090/face/create", image).then(res => res.data);
                    console.log(img);

                    this.person_uploads = this.person_uploads + 1
                    let data2 = new FormData();
                    // let b64 = myBase64.replace(/^data:image\/[a-z]+;base64,/, "");
                    data2.append('pass', 'abc123');
                    data2.append("person", "{'id': '"+this.person_uploads+"', 'name': 'Jeric Laderas', 'idcardNum': '1', 'departmentId': '1'}" );
    
                    let upload2 = await this.$axios.post("http://192.168.1.119:8090/person/create", data2).then(res => res.data);
                    console.log(upload2);

                     let image2 = new FormData();
                    image2.append('pass', 'abc123');
                    image2.append("personId", this.person_uploads );
                    image2.append("faceId", "" );
                    image2.append("imgBase64", image_data.data[0].image );
                    let img2 = await this.$axios.post("http://192.168.1.119:8090/face/create", image2).then(res => res.data);
                    console.log(img2);

                    this.person_uploads = this.person_uploads + 1
                    let data3 = new FormData();
                    // let b64 = myBase64.replace(/^data:image\/[a-z]+;base64,/, "");
                    data3.append('pass', 'abc123');
                    data3.append("person", "{'id': '"+this.person_uploads+"', 'name': 'Jeric Laderas', 'idcardNum': '1', 'departmentId': '1'}" );
    
                    let upload3 = await this.$axios.post("http://192.168.1.119:8090/person/create", data3).then(res => res.data);
                    console.log(upload3);

                     let image3 = new FormData();
                    image3.append('pass', 'abc123');
                    image3.append("personId", this.person_uploads );
                    image3.append("faceId", "" );
                    image3.append("imgBase64", image_data.data[0].image );
                    let img3 = await this.$axios.post("http://192.168.1.119:8090/face/create", image3).then(res => res.data);
                    console.log(img3);

                    this.person_uploads = this.person_uploads + 1
                    let data4 = new FormData();
                    // let b64 = myBase64.replace(/^data:image\/[a-z]+;base64,/, "");
                    data4.append('pass', 'abc123');
                    data4.append("person", "{'id': '"+this.person_uploads+"', 'name': 'Jeric Laderas', 'idcardNum': '1', 'departmentId': '1'}" );
    
                    let upload4 = await this.$axios.post("http://192.168.1.119:8090/person/create", data4).then(res => res.data);
                    console.log(upload4);

                     let image4 = new FormData();
                    image4.append('pass', 'abc123');
                    image4.append("personId", this.person_uploads );
                    image4.append("faceId", "" );
                    image4.append("imgBase64", image_data.data[0].image );
                    let img4 = await this.$axios.post("http://192.168.1.119:8090/face/create", image4).then(res => res.data);
                    console.log(img4);

                    this.person_uploads = this.person_uploads + 1
                    let data5 = new FormData();
                    // let b64 = myBase64.replace(/^data:image\/[a-z]+;base64,/, "");
                    data5.append('pass', 'abc123');
                    data5.append("person", "{'id': '"+this.person_uploads+"', 'name': 'Jeric Laderas', 'idcardNum': '1', 'departmentId': '1'}" );
    
                    let upload5 = await this.$axios.post("http://192.168.1.119:8090/person/create", data5).then(res => res.data);
                    console.log(upload5);

                     let image5 = new FormData();
                    image5.append('pass', 'abc123');
                    image5.append("personId", this.person_uploads );
                    image5.append("faceId", "" );
                    image5.append("imgBase64", image_data.data[0].image );
                    let img5 = await this.$axios.post("http://192.168.1.119:8090/face/create", image5).then(res => res.data);
                    console.log(img5);

                    this.person_uploads = this.person_uploads + 1
                    let data6 = new FormData();
                    // let b64 = myBase64.replace(/^data:image\/[a-z]+;base64,/, "");
                    data6.append('pass', 'abc123');
                    data6.append("person", "{'id': '"+this.person_uploads+"', 'name': 'Jeric Laderas', 'idcardNum': '1', 'departmentId': '1'}" );
    
                    let upload6 = await this.$axios.post("http://192.168.1.119:8090/person/create", data6).then(res => res.data);
                    console.log(upload6);

                     let image6 = new FormData();
                    image6.append('pass', 'abc123');
                    image6.append("personId", this.person_uploads );
                    image6.append("faceId", "" );
                    image6.append("imgBase64", image_data.data[0].image );
                    let img6 = await this.$axios.post("http://192.168.1.119:8090/face/create", image6).then(res => res.data);
                    console.log(img6);

                    this.person_uploads = this.person_uploads + 1
                    let data7 = new FormData();
                    // let b64 = myBase64.replace(/^data:image\/[a-z]+;base64,/, "");
                    data7.append('pass', 'abc123');
                    data7.append("person", "{'id': '"+this.person_uploads+"', 'name': 'Jeric Laderas', 'idcardNum': '1', 'departmentId': '1'}" );
    
                    let upload7 = await this.$axios.post("http://192.168.1.119:8090/person/create", data7).then(res => res.data);
                    console.log(upload7);

                     let image7 = new FormData();
                    image7.append('pass', 'abc123');
                    image7.append("personId", this.person_uploads );
                    image7.append("faceId", "" );
                    image7.append("imgBase64", image_data.data[0].image );
                    let img7 = await this.$axios.post("http://192.168.1.119:8090/face/create", image7).then(res => res.data);
                    console.log(img7);

                    this.person_uploads = this.person_uploads + 1
                    let data8 = new FormData();
                    // let b64 = myBase64.replace(/^data:image\/[a-z]+;base64,/, "");
                    data8.append('pass', 'abc123');
                    data8.append("person", "{'id': '"+this.person_uploads+"', 'name': 'Jeric Laderas', 'idcardNum': '1', 'departmentId': '1'}" );
    
                    let upload8 = await this.$axios.post("http://192.168.1.119:8090/person/create", data8).then(res => res.data);
                    console.log(upload8);

                     let image8 = new FormData();
                    image8.append('pass', 'abc123');
                    image8.append("personId", this.person_uploads );
                    image8.append("faceId", "" );
                    image8.append("imgBase64", image_data.data[0].image );
                    let img8 = await this.$axios.post("http://192.168.1.119:8090/face/create", image8).then(res => res.data);
                    console.log(img8);

                    this.person_uploads = this.person_uploads + 1
                    let data9 = new FormData();
                    // let b64 = myBase64.replace(/^data:image\/[a-z]+;base64,/, "");
                    data9.append('pass', 'abc123');
                    data9.append("person", "{'id': '"+this.person_uploads+"', 'name': 'Jeric Laderas', 'idcardNum': '1', 'departmentId': '1'}" );
    
                    let upload9 = await this.$axios.post("http://192.168.1.119:8090/person/create", data9).then(res => res.data);
                    console.log(upload9);

                     let image9 = new FormData();
                    image9.append('pass', 'abc123');
                    image9.append("personId", this.person_uploads );
                    image9.append("faceId", "" );
                    image9.append("imgBase64", image_data.data[0].image );
                    let img9 = await this.$axios.post("http://192.168.1.119:8090/face/create", image9).then(res => res.data);
                    console.log(img9);

                    this.person_uploads = this.person_uploads + 1
                    let data10 = new FormData();
                    // let b64 = myBase64.replace(/^data:image\/[a-z]+;base64,/, "");
                    data10.append('pass', 'abc123');
                    data10.append("person", "{'id': '"+this.person_uploads+"', 'name': 'Jeric Laderas', 'idcardNum': '1', 'departmentId': '1'}" );
    
                    let upload10 = await this.$axios.post("http://192.168.1.119:8090/person/create", data10).then(res => res.data);
                    console.log(upload10);

                     let image10 = new FormData();
                    image10.append('pass', 'abc123');
                    image10.append("personId", this.person_uploads );
                    image10.append("faceId", "" );
                    image10.append("imgBase64", image_data.data[0].image );
                    let img10 = await this.$axios.post("http://192.168.1.119:8090/face/create", image10).then(res => res.data);
                    console.log(img10);

                    this.person_uploads = this.person_uploads + 1
                    let data11 = new FormData();
                    // let b64 = myBase64.replace(/^data:image\/[a-z]+;base64,/, "");
                    data11.append('pass', 'abc123');
                    data11.append("person", "{'id': '"+this.person_uploads+"', 'name': 'Jeric Laderas', 'idcardNum': '1', 'departmentId': '1'}" );
    
                    let upload11 = await this.$axios.post("http://192.168.1.119:8090/person/create", data11).then(res => res.data);
                    console.log(upload11);

                     let image11 = new FormData();
                    image11.append('pass', 'abc123');
                    image11.append("personId", this.person_uploads );
                    image11.append("faceId", "" );
                    image11.append("imgBase64", image_data.data[0].image );
                    let img11 = await this.$axios.post("http://192.168.1.119:8090/face/create", image11).then(res => res.data);
                    console.log(img11);

                    this.person_uploads = this.person_uploads + 1
                    let data12 = new FormData();
                    // let b64 = myBase64.replace(/^data:image\/[a-z]+;base64,/, "");
                    data12.append('pass', 'abc123');
                    data12.append("person", "{'id': '"+this.person_uploads+"', 'name': 'Jeric Laderas', 'idcardNum': '1', 'departmentId': '1'}" );
    
                    let upload12 = await this.$axios.post("http://192.168.1.119:8090/person/create", data12).then(res => res.data);
                    console.log(upload12);

                     let image12 = new FormData();
                    image12.append('pass', 'abc123');
                    image12.append("personId", this.person_uploads );
                    image12.append("faceId", "" );
                    image12.append("imgBase64", image_data.data[0].image );
                    let img12 = await this.$axios.post("http://192.168.1.119:8090/face/create", image12).then(res => res.data);
                    console.log(img12);

                    this.person_uploads = this.person_uploads + 1
                    let data13 = new FormData();
                    // let b64 = myBase64.replace(/^data:image\/[a-z]+;base64,/, "");
                    data13.append('pass', 'abc123');
                    data13.append("person", "{'id': '"+this.person_uploads+"', 'name': 'Jeric Laderas', 'idcardNum': '1', 'departmentId': '1'}" );
    
                    let upload13 = await this.$axios.post("http://192.168.1.119:8090/person/create", data13).then(res => res.data);
                    console.log(upload13);

                     let image13 = new FormData();
                    image13.append('pass', 'abc123');
                    image13.append("personId", this.person_uploads );
                    image13.append("faceId", "" );
                    image13.append("imgBase64", image_data.data[0].image );
                    let img13 = await this.$axios.post("http://192.168.1.119:8090/face/create", image13).then(res => res.data);
                    console.log(img13);

                    this.person_uploads = this.person_uploads + 1
                    let data14 = new FormData();
                    // let b64 = myBase64.replace(/^data:image\/[a-z]+;base64,/, "");
                    data14.append('pass', 'abc123');
                    data14.append("person", "{'id': '"+this.person_uploads+"', 'name': 'Jeric Laderas', 'idcardNum': '1', 'departmentId': '1'}" );
    
                    let upload14 = await this.$axios.post("http://192.168.1.119:8090/person/create", data14).then(res => res.data);
                    console.log(upload14);

                     let image14 = new FormData();
                    image14.append('pass', 'abc123');
                    image14.append("personId", this.person_uploads );
                    image14.append("faceId", "" );
                    image14.append("imgBase64", image_data.data[0].image );
                    let img14 = await this.$axios.post("http://192.168.1.119:8090/face/create", image14).then(res => res.data);
                    console.log(img14);

                    this.person_uploads = this.person_uploads + 1
                    let data15 = new FormData();
                    // let b64 = myBase64.replace(/^data:image\/[a-z]+;base64,/, "");
                    data15.append('pass', 'abc123');
                    data15.append("person", "{'id': '"+this.person_uploads+"', 'name': 'Jeric Laderas', 'idcardNum': '1', 'departmentId': '1'}" );
    
                    let upload15 = await this.$axios.post("http://192.168.1.119:8090/person/create", data15).then(res => res.data);
                    console.log(upload15);

                     let image15 = new FormData();
                    image15.append('pass', 'abc123');
                    image15.append("personId", this.person_uploads );
                    image15.append("faceId", "" );
                    image15.append("imgBase64", image_data.data[0].image );
                    let img15 = await this.$axios.post("http://192.168.1.119:8090/face/create", image15).then(res => res.data);
                    console.log(img15);

                    this.person_uploads = this.person_uploads + 1
                    let data16 = new FormData();
                    // let b64 = myBase64.replace(/^data:image\/[a-z]+;base64,/, "");
                    data16.append('pass', 'abc123');
                    data16.append("person", "{'id': '"+this.person_uploads+"', 'name': 'Jeric Laderas', 'idcardNum': '1', 'departmentId': '1'}" );
    
                    let upload16 = await this.$axios.post("http://192.168.1.119:8090/person/create", data16).then(res => res.data);
                    console.log(upload16);

                     let image16 = new FormData();
                    image16.append('pass', 'abc123');
                    image16.append("personId", this.person_uploads );
                    image16.append("faceId", "" );
                    image16.append("imgBase64", image_data.data[0].image );
                    let img16 = await this.$axios.post("http://192.168.1.119:8090/face/create", image16).then(res => res.data);
                    console.log(img16);

                    this.person_uploads = this.person_uploads + 1
                    let data17 = new FormData();
                    // let b64 = myBase64.replace(/^data:image\/[a-z]+;base64,/, "");
                    data17.append('pass', 'abc123');
                    data17.append("person", "{'id': '"+this.person_uploads+"', 'name': 'Jeric Laderas', 'idcardNum': '1', 'departmentId': '1'}" );
    
                    let upload17 = await this.$axios.post("http://192.168.1.119:8090/person/create", data17).then(res => res.data);
                    console.log(upload17)

                     let image17 = new FormData();
                    image17.append('pass', 'abc123');
                    image17.append("personId", this.person_uploads );
                    image17.append("faceId", "" );
                    image17.append("imgBase64", image_data.data[0].image );
                    let img17 = await this.$axios.post("http://192.168.1.119:8090/face/create", image17).then(res => res.data);
                    console.log(img17);

                    this.person_uploads = this.person_uploads + 1
                    let data18 = new FormData();
                    // let b64 = myBase64.replace(/^data:image\/[a-z]+;base64,/, "");
                    data18.append('pass', 'abc123');
                    data18.append("person", "{'id': '"+this.person_uploads+"', 'name': 'Jeric Laderas', 'idcardNum': '1', 'departmentId': '1'}" );
    
                    let upload18 = await this.$axios.post("http://192.168.1.119:8090/person/create", data18).then(res => res.data);
                    console.log(upload18);

                     let image18 = new FormData();
                    image18.append('pass', 'abc123');
                    image18.append("personId", this.person_uploads );
                    image18.append("faceId", "" );
                    image18.append("imgBase64", image_data.data[0].image );
                    let img18 = await this.$axios.post("http://192.168.1.119:8090/face/create", image18).then(res => res.data);
                    console.log(img18);

                    this.person_uploads = this.person_uploads + 1
                    let data19 = new FormData();
                    // let b64 = myBase64.replace(/^data:image\/[a-z]+;base64,/, "");
                    data19.append('pass', 'abc123');
                    data19.append("person", "{'id': '"+this.person_uploads+"', 'name': 'Jeric Laderas', 'idcardNum': '1', 'departmentId': '1'}" );
    
                    let upload19 = await this.$axios.post("http://192.168.1.119:8090/person/create", data19).then(res => res.data);
                    console.log(upload19);

                     let image19 = new FormData();
                    image19.append('pass', 'abc123');
                    image19.append("personId", this.person_uploads );
                    image19.append("faceId", "" );
                    image19.append("imgBase64", image_data.data[0].image );
                    let img19 = await this.$axios.post("http://192.168.1.119:8090/face/create", image19).then(res => res.data);
                    console.log(img19);

                    this.person_uploads = this.person_uploads + 1
                    let data20 = new FormData();
                    // let b64 = myBase64.replace(/^data:image\/[a-z]+;base64,/, "");
                    data20.append('pass', 'abc123');
                    data20.append("person", "{'id': '"+this.person_uploads+"', 'name': 'Jeric Laderas', 'idcardNum': '1', 'departmentId': '1'}" );
    
                    let upload20 = await this.$axios.post("http://192.168.1.119:8090/person/create", data20).then(res => res.data);
                    console.log(upload20);

                     let image20 = new FormData();
                    image20.append('pass', 'abc123');
                    image20.append("personId", this.person_uploads );
                    image20.append("faceId", "" );
                    image20.append("imgBase64", image_data.data[0].image );
                    let img20 = await this.$axios.post("http://192.168.1.119:8090/face/create", image20).then(res => res.data);
                    console.log(img20);

                }
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
                    
    
                    this.device_list.forEach(async (device) => {
                        if (device.device_type == 'vision_sky')
                        {
                            let date = new Date().getFullYear() + "-" + (new Date(visitor.personal_information.frontdesk_person_date).getMonth() + 1).toString().padStart(2, "0") + "-" + new Date(visitor.personal_information.frontdesk_person_date).getDate().toString().padStart(2, "0") + " 23:59:59"
                            // console.log(date);
                            let image = new FormData();
                            image.append('pass', 'abc123');
                            image.append("personId", visitor.personal_information.frontdesk_person_id );
                            image.append("idcardNum", 1 );
                            image.append("name",  visitor.personal_information.first_name+" "+ visitor.personal_information.middle_name +" "+ visitor.personal_information.last_name );
                            image.append("imgBase64", b64 );
                            image.append("passTime", '01:00:00, 23:59:59' );
                            image.append("permissionTime", date);
                            image.append("type", 1 );
                            let img = await this.$axios.post("http://"+ device.device_ip +":8090/person/quickCreate", image).then(res => res.data);
                            console.log(img);
                        }
                        else
                        {
                            tabletFormData.append("pass", "123456");
                            tabletFormData.append("person", "{'imgBase64': '"+b64+"', 'name' : '"+ visitor.personal_information.first_name+" "+ visitor.personal_information.middle_name +" "+ visitor.personal_information.last_name +"', 'person_id' : '"+ visitor.personal_information.id_number +"', 'sex' : "+ sex +", 'group_id' : 20, 'phone' : "+visitor.personal_information.contact_number+", 'email' : '', 'ic_card' : '', 'nation' : '', 'native_place' : '', 'birth_day' : '"+ visitor.personal_information.birth_day +"', 'address' : '"+ visitor.personal_information.home_address +"', 'vipId': '"+visitor.personal_information.frontdesk_person_id+"', 'remarks' : '', 'att_flag' : 0 , 'banci_id' : '', 'device_group_id' : '', 'device_group' : 1, 'type' : 1.1, 'reg_type' : 0, 'prescription' : '"+ expStartTime+","+expEndTime +"'}" );
                            let rsp = await this.$axios.post("http://"+device.device_ip+":8080/person/create", tabletFormData).then(res => res.data);
                        }
                    })
    
                    });
    //*********************************************************************************************************************************
                    if (this.visitors.length) 
                    {
                        await this.$_post(postSavePerson, {person_info: data} );
                    }
    
                    await this.db.delete(visitor.id, "visitors");
                    this.$store.commit('sync/storeVisitors', await this.db.get("visitors"));
                }
    
                // Logs
                for (let log of this.passLogs)
                {
                    console.log(log, this.$user_info.company);
                    log.company_id = this.$user_info.company ? this.$user_info.company._id : '';
    
                    await this.$_post('member/add/pass_log', { data: log });
                    await this.db.delete(log.id, "passLogs");
                    this.$store.commit('sync/storePassLogs', await this.db.get("passLogs"));

                    for (let index = 0; index < this.device_list.length; index++) {
                        if (log.device_id == this.device_list[index].device_id)
                        {
                            this.device_list[index].count_logs = this.device_list[index].count_logs + 1
                            
                        }
                    }
                    this.checkDevice()
                }

                // await this.$_post('member/count/logs');
                setTimeout(() => this.checkQueueSync(), 1000);
            }
        },
        async getLog()
        {
            if ((this.device_list.length==0) || (this.getLogsSwitch == "off" || !this.$user_info.company))
            {
                
            }
            else
            {
                await this.getAllDevice(this.$user_info.company._id);
                let today= new Date()
                let timeToday= (today.getFullYear())+ '-' +(today.getMonth()+1).toString().padStart(2, "0")+'-'+today.getDate().toString().padStart(2, "0")+ " "+ today.getHours().toString().padStart(2, "0")+":"+today.getMinutes().toString().padStart(2, "0")+":"+today.getSeconds().toString().padStart(2, "0");
                let startTime= "";
                if(this.$store.state.sync.lastRequestTime.length<=0){
                    startTime = (today.getFullYear()-1)+ '-' +(today.getMonth()+1).toString().padStart(2, "0")+'-'+today.getDate().toString().padStart(2, "0")+ " "+ today.getHours().toString().padStart(2, "0")+":"+today.getMinutes().toString().padStart(2, "0")+":"+today.getSeconds().toString().padStart(2, "0");
                }
                else {
                    startTime = this.lastRequestTime[this.lastRequestTime.length-1].lastRequestTime;
                }
                
                let logs= [];
                var request = new XMLHttpRequest();
                this.device_list.forEach(async (device) => {
                    var request = new XMLHttpRequest();
                    if ( device.device_type == 'vision_sky' )
                    {

                    }
                    else
                    {
                        var formData = new FormData();
                        formData.append("startTime", startTime)// number 123456 is immediately converted to a string "123456"
                        formData.append("endTime", timeToday); // number 123456 is immediately converted to a string "123456"
                        formData.append("pass", "123456");
                        request.open("POST", "http://"+device.device_ip+":8080/newFindRecords");
                        request.onreadystatechange = () => {
                            if (request.readyState === 4) {
                                if (request.status === 200) {
                                    let resp = request.responseText;
                                    this.saveLogsIndexDb(JSON.parse(JSON.parse(resp).data), device);
                                } else {
                                    console.log("Error", request.statusText);
                                }
                            }
                        }
                        request.send(formData);
                    }
                    await this.db.add(
                    {
                        lastRequestTime: timeToday
                    },
                    'lastRequestTime');
                    this.$store.commit('sync/storeLastRequestTime', await this.db.get("lastRequestTime"));
                })

            }
        },

        async saveLogsIndexDb(dat, device)
        {
            console.log(dat);
            let response="";

            for (let data of dat)
            {
                var formData = new FormData();
                formData.append("pass", "123456");
                formData.append("imgName", data.imageName);

                let getImgRes = await this.$axios.post("http://"+ device.device_ip +":8080/getRecordImg", formData).then(res => res.data);
                let imgPath= await this.savePicsLocal(getImgRes, data.imageName)
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
            let res
            try
            {
                res = await this.$_post_file(formDatatoBackend);
            }
            catch(e){}

            return res;
        },

    }
}
</script>
