<template>
    <q-layout class="main" view="hHh Lpr lFf">
        <q-header v-if="$route.name == 'member_mobile_dashboard'">
            <q-toolbar>
                <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" />

                <q-img @click="showToggle" src="../assets/vcop-logo-white.svg"></q-img>
                
            </q-toolbar>
        </q-header>
        <q-header v-if="$route.name == 'member_mobile_filter_fever'">
            <q-toolbar>
                <q-btn flat dense round icon="fas fa-times" aria-label="Close" @click="goToDashboard()"/>
                <div class="header_title">Filter</div>
            <q-btn flat dense round icon="fas fa-check" aria-label="Generate" @click="goToDashboard()"/>
            </q-toolbar>
        </q-header>
        <q-header v-if="$route.name == 'member_mobile_add_fever'">
            <q-toolbar>
                <q-btn flat dense round icon="fas fa-times" aria-label="Close" @click="goToDashboard()"/>
                <div class="header_title">Add Fever Logs</div>
                <!-- <q-btn flat dense round icon="fas fa-check" aria-label="Save" @click="dialogSaveUserLogs()"/> -->
            </q-toolbar>
        </q-header>
        <q-header v-if="$route.name == 'member_mobile_user_logs'">
            <q-toolbar>
                <q-btn flat dense round icon="fas fa-times" aria-label="Close" @click="goToDashboard()"/>
                <div class="header_title">
                    <div class="title">User Logs</div>
                </div>
            </q-toolbar>
        </q-header>
        <q-header v-if="$route.name == 'member_mobile_sync_to_cloud'">
            <q-toolbar>
                <q-btn flat dense round icon="fas fa-times" aria-label="Close" @click="goToDashboard()"/>
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
							<q-icon name="fas fa-clock" />
						</q-item-section>
						<q-item-section>User Logs</q-item-section>
					</q-item>
                    <q-item class="nav" clickable v-ripple>
						<q-item-section avatar>
							<q-icon name="fas fa-question-circle" />
						</q-item-section>
						<q-item-section>About</q-item-section>
					</q-item>
                    <q-item class="nav absolute-bottom" clickable v-ripple>
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
        mobile_db: new MobileModel()
        
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
        async checkQueueSync()
        {
            // await this.mobile_db.clear()
            console.log('kjhjkhjkh');
            let keys = await this.mobile_db.keys()
            for (let i = 0; i < keys.length; i++) {
                let visitor = await this.mobile_db.get(keys[i])
                visitor = JSON.parse(visitor)
                console.log(visitor);
                let id_src = await this.savePicsLocal(visitor.id_image, 'person' + Date.now().toString() + '.png')
                let person_src = await this.savePicsLocal(visitor.person_img, 'person' + Date.now().toString() + '.png')
                let data = {
                    // visit_purpose:      visitor.visitor_purpose.purpose_visit,
                    // contact_person:     visitor.visitor_purpose.contact_person,
                    // destination:        visitor.visitor_purpose.destination,
                    // delivery_name:      visitor.visitor_purpose.delivery_name,
                    
                    id_img: id_src,
                    id_num: visitor.id_number,
                    id_type: visitor.id_type,

                    person_img: person_src,
                    last_name: visitor.last_name,
                    middle_name: visitor.middle_name,
                    given_name: visitor.given_name,
                    gender: visitor.gender,
                    birthday: visitor.birthday,
                    nationality: visitor.nationality,
                    home_address: visitor.home_address,
                    contact_number: visitor.contact_number,
                    emergency_contact: visitor.emergency_contact,
                    date_created: new Date(),
                    company_name: visitor.company_name,
                    company_id: visitor.company_id,
                    frontdesk_person_id: visitor.frontdesk_person_id,
                    frontdesk_person_date: visitor.frontdesk_person_date,
                    location: visitor.location,
                    location_coordinates: visitor.location_coordinates ? visitor.location_coordinates : await this.$_current_position(),
                    is_active: true,
                    email: visitor.email,

                    saved_from: visitor.company_id ? visitor.company_id : '',

                    category: visitor.category
                
                }
            
                console.log(data, 'data');
                let save = await this.$_post(postSavePerson, {person_info: data} );
                console.log(save);
                await this.mobile_db.delete(keys[i])

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
            console.log(res, 'image');

            return res;
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
                // console.log('>>>> OK')
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

    }
}
</script>
