<template>
    <q-layout class="main" view="hHh Lpr lFf">
        <q-header v-if="$route.name == 'member_mobile_dashboard'" >
            <q-toolbar>
                <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" />

                <q-img src="../assets/vcop-logo-white.svg"></q-img>
                
            </q-toolbar>
        </q-header>
        <!-- <q-header v-if="$route.name == 'member_mobile_filter_fever'">
            <q-toolbar>
                <q-btn flat dense round icon="fas fa-times" aria-label="Close" @click="goToDashboard()"/>
                <div class="header_title">Filter</div>
            <q-btn flat dense round icon="fas fa-check" aria-label="Generate" @click="goToDashboard()"/>
            </q-toolbar>
        </q-header> -->
        <q-header v-if="$route.name == 'member_mobile_add_fever'">
            <q-toolbar>
                <q-btn flat dense round icon="fas fa-times" aria-label="Close" @click="goToDashboard()"/>
                <div class="header_title">Add Fever Logs</div>
                <!-- <q-btn flat dense round icon="fas fa-check" aria-label="Save" @click="dialogSaveUserLogs()"/> -->
            </q-toolbar>
        </q-header>
        <q-header v-if="$route.name == 'member_mobile_user_logs'">
            <q-toolbar>
                <q-btn flat dense round icon="fas fa-arrow-left" aria-label="Close" @click="goToDashboard()"/>
                <div class="header_title">
                    <div class="title">User Logs</div>
                </div>
            </q-toolbar>
        </q-header>
        <q-header v-if="$route.name == 'member_mobile_sync_to_cloud'">
            <q-toolbar>
                <q-btn flat dense round icon="fas fa-arrow-left" aria-label="Close" @click="goToDashboard()"/>
                <div class="header_title">
                    <div class="title">Sync to Cloud</div>
                </div>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen"  behavior="mobile" show-if-above bordered overlay content-class="bg-primary">
            <div class="nav-profile">
                <q-img class="nav-profile__img" :src="this.$user_info.user_picture"></q-img>
                <div class="nav-profile__info">
                    <div class="nav-profile__name">{{this.$user_info.full_name}}</div>
                    <div class="nav-profile__position">{{this.$user_info.user_type}}</div>
                </div>
            </div>
			<q-list class="nav-list">
					<q-item class="nav" clickable v-ripple>
						<q-item-section avatar>
							<q-icon name="fas fa-home" />
						</q-item-section>
						<q-item-section>Dashboard</q-item-section>
					</q-item>
                    <q-item class="nav" clickable v-ripple @click="goToUserLogs">
						<q-item-section avatar>
							<q-icon name="fas fa-clock"/>
						</q-item-section>
						<q-item-section>User Logs</q-item-section>
					</q-item>
                    <q-item class="nav" clickable v-ripple @click="goToSync">
						<q-item-section avatar>
							<q-icon name="fas fa-sync-alt">
                                 <q-badge
                                    v-if="this.keys.length"
                                    class="badge-oval small"
                                    align="middle"
                                    style="right: -16px; z-index: 2; width: auto;"
                                    color="red" text-color="white" label="2"
                                    floating
                                >
                                </q-badge>
							</q-icon>
						</q-item-section>
						<q-item-section>Sync to Cloud</q-item-section>
					</q-item>
                    <q-item class="nav" clickable v-ripple>
						<q-item-section avatar>
							<q-icon name="fas fa-question-circle" />
						</q-item-section>
						<q-item-section>About</q-item-section>
					</q-item>
                    <q-item class="nav absolute-bottom" clickable v-ripple @click="logout">
						<q-item-section avatar>
							<q-icon name="fas fa-sign-out-alt" />
						</q-item-section>
						<q-item-section>Logout</q-item-section>
					</q-item>
					<!-- <q-expansion-item group="sidenav" v-if="nav.hasOwnProperty('sub') && userAccess(nav.key)" expand-separator class="nav" :icon="nav.icon" :label="nav.label">
						<q-card class="nav-sub">
							<div v-for="sub in nav.sub" class="nav-item" :class="$route.name == sub.route ? 'active' : ''" @click="$router.push({ name: sub.route, params: sub.params }).catch(err => {})">{{ sub.label }}</div>
						</q-card>
					</q-expansion-item> -->
			</q-list>

            <!-- <div class="nav-footer">
                <q-img class="nav-profile__img" :src="this.$user_info.user_picture"></q-img>
                <div class="nav-profile__info">
                    <div class="nav-profile__name">{{this.$user_info.full_name}}</div>
                    <div class="nav-profile__position">{{this.$user_info.user_type}}</div>
                </div>
            </div> -->
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
                <!-- <q-btn @click="getDevices" flat label="OK" color="primary" v-close-popup /> -->
                </q-card-actions>
            </q-card>
        </q-dialog>


        <q-dialog v-model="dialog" position="bottom">
            <div class="fever-detected__alert">
                <div class="fever-detected__alert-header">
                <div class="alert-header__title">VCOP ALERT</div>
                <q-btn flat dense rounded icon="mdi-close" size="10px" color="white" class="alert-header__close" @click="logCheck()"></q-btn>
                </div>
                <div class="fever-detected__alert-body">
                <div class="fever-detected__alert-temp">
                    <div class="alert-temp__status">
                        <q-icon name="mdi-alert-circle-outline" size="20px"></q-icon> Fever Detected
                    </div>
                    <div class="alert-temp__temperature">{{log_alert.temperature}} °C</div>
                    <div class="alert-temp__label">Body Temperature</div>
                </div>
                <div class="fever-detected__alert-people">
                    <q-img :src="log_alert.person_img" class="alert-people__img"></q-img>
                    <div class="alert-people__name">{{log_alert.full_name == 'Stranger' ? "" : log_alert.full_name}}</div>
                    <div class="alert-people__position">{{log_alert.category}}</div>
                    <div class="alert-people__note">
                        Please bring the person to your staff to get<br>
                        further information.
                    </div>
                </div>
                </div>
            </div>
        </q-dialog>

        <!-- <q-dialog v-model="dialog" :position="position" persistent>
            <q-card class="bg-red text-white" style="width: 300px">
                <q-card-section>
                    <div class="text-h6">VCOP ALLERT</div>
                </q-card-section>
                <q-card-section align="center" class="q-pt-none">
                    <div>
                        Fever Detected
                    </div>
                    <div>
                        {{log_alert.temperature}} °C
                    </div>
                </q-card-section>

                <q-card-section align="center" class="bg-white text-black">
                    <div>
                        <q-img :src="log_alert.person_img"></q-img>
                    </div>
                    <div style="font-weight: 700 !important; font-size: 16px;"> 
                        {{log_alert.full_name == 'Stranger' ? "" : log_alert.full_name}}
                    </div>
                    <div> {{log_alert.category}} </div>
                    <div style="font-size: 10px;"> Please bring the person to your station to get further information. </div>
                </q-card-section>
                <q-card-actions align="right" class="bg-white text-teal">
                    <q-btn @click="logCheck()" flat label="OK" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog> -->
    </q-layout>
</template>
<script>

import EssentialLink    from 'components/EssentialLink.vue'
import Layout           from './MobileMemberLayout.scss'
import navigation       from '../references/nav'
import { postAddPerson , postSavePerson , postGetDevice, postGetLogsSettings, postVisionSky, postPersonByCateg, postGetCompany }                        from '../references/url';
import Model from "../models/Model";
import MobileModel from "../models/MobileModel";
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
    name: 'MobileMemberLayout',
    components:
    {
        EssentialLink
    },
	data: () =>
	({
        dialog: false,
        position: "bottom",
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
        log_alert: {},
        company_list: [],
        mobile_db: new MobileModel(),
        keys: []
        
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
        
        if (this.$user_info)
        {
            await this.checkQueueSync();
        }
        // setInterval(this.getLog, 60000);
    },
    methods:
    {   
        async getLocation()
        {
            let coordinates = {}
            let location_desc = ''
            try
            {
                let location = await this.$_current_position()
                coordinates = {
                    lat: location.coords.latitude,
                    lon: location.coords.longitude
                }
                let loc_details = await this.$_nearby_places(coordinates)
                for (let x = 0; x < loc_details.length; x++) {
                    if (location_desc) location_desc = location_desc + ', '
                    location_desc = location_desc + loc_details[x];  
                }
                return {location: location_desc, coords: coordinates}
            }
            catch(e){
                return {}
            }
        },
        async checkQueueSync()
        {
            this.keys = await this.mobile_db.keys()
            for (let i = 0; i < this.keys.length; i++) {
                if(navigator.onLine)
                {
                    let person_details = await this.mobile_db.get(this.keys[i])
                    person_details = JSON.parse(person_details)
                    let id_src = await this.savePicsLocal(person_details.id_image, 'person' + Date.now().toString() + '.png')
                    let person_src = await this.savePicsLocal(person_details.person_img, 'person' + Date.now().toString() + '.png')
                    if (person_details.location) 
                    {
                        let location = await this.getLocation()
                        person_details.location_coordinates = location.coords ? location.coords : {}
                        person_details.location = location.location ? location.location : ''
                    }
                    let data = {
                        temperature: person_details.temperature,
                        id_img: id_src,
                        id_num: person_details.id_number,
                        id_type: person_details.id_type,
    
                        person_img: person_src,
                        last_name: person_details.last_name,
                        middle_name: person_details.middle_name,
                        given_name: person_details.given_name,
                        gender: person_details.gender,
                        birthday: person_details.birthday,
                        nationality: person_details.nationality,
                        home_address: person_details.home_address,
                        contact_number: person_details.contact_number,
                        emergency_contact: person_details.emergency_contact,
                        date_created: new Date(),
                        company_name: person_details.company_name == 'none' ? this.$user_info.company.company_name :person_details.company_name,
                        company_id: person_details.company_id == 'none' ? this.$user_info.company._id : person_details.company_id,
                        frontdesk_person_id: person_details.frontdesk_person_id,
                        frontdesk_person_date: person_details.frontdesk_person_date,
                        location: person_details.location,
                        location_coordinates: person_details.location_coordinates ? person_details.location_coordinates : await this.$_current_position(),
                        is_active: true,
                        email: person_details.email,
                        device_id: this.$user_info.device,
    
                        saved_from: person_details.company_id ? person_details.company_id : '',
    
                        category: person_details.category
                    }
                
                    let save = await this.$_post(postSavePerson, {person_info: data} );
                    await this.$_post('member/add/pass_log', { data: data });
                    this.mobile_db.delete(this.keys[i])
                }
            }
            setTimeout(() => this.checkQueueSync(), 1000);
        },
        async savePicsLocal(image_url, imageName)
        {
           const contentType = 'image/png';
            const blobb = base64StringToBlob(image_url, contentType)
            blobb.lastModifiedDate = new Date()
            let formData = new FormData();
            formData.append('image', blobb, imageName);
            let res = ''
            try
            {
                res =  await this.$_post_file(formData);
            }
            catch(e){}

            return res;
        },
        goToSync()
        {
            this.$router.push({
                    name: "member_mobile_sync_to_cloud"
                })
        },
        dialogSaveUserLogs() {
            this.$q.dialog({
                title: 'Add User Logs',
                message: 'Confirm Message, Please edit',
                ok: {
                    push: true
                },
                cancel:{
                    push:  true,
                    color: 'negative'
                },
                persistent: true
            }).onOk(() => {
                this.$router.push({
                    name: "member_mobile_dashboard"
                })
            }).onOk(() => {
                // console.log('>>>> second OK catcher')
            }).onCancel(() => {
                // console.log('>>>> Cancel')
            }).onDismiss(() => {
                // console.log('I am triggered on both OK and Cancel')
            })
        },
        goToDashboard()
        {
            this.$router.push({
                    name: "member_mobile_dashboard"
                })   
        },
        goToUserLogs(){
            this.$router.push({
                name: "member_mobile_user_logs"
            })
        },
        async getCompany(company_id)
        {
            let data = await this.$_post(postGetCompany, {id: company_id})
            return data.data
        },
        logCheck()
        {
            this.dialog = false
        },
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

        logout()
        {
            this.$_logout();
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
        // async savePicsLocal(respImage, imageName)
        // {
        //     let blob = "";
        //     var formDatatoBackend = new FormData();
        //     let contentType = 'image/png';
        //     blob = "";
        //     blob = base64StringToBlob(respImage.data, contentType);
        //     blob.lastModifiedDate = new Date();
        //     formDatatoBackend.append('image', blob, imageName);
        //     let res
        //     try
        //     {
        //         res = await this.$_post_file(formDatatoBackend);
        //     }
        //     catch(e){}

        //     return res;
        // },

    }
}
</script>
