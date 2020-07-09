<template>
    <div class="frontdesk">
        <div class="frontdesk__header">
            <div class="header__title">BLACKLIST MANAGEMENT</div>
            <div class="frontdesk__header-btn">
                <q-btn class="btn-outline btn-discard" flat dense no-caps label="Discard"></q-btn>
                <q-btn @click="submit()" class="btn-save btn-primary" flat dense no-caps label="Save"></q-btn>
            </div>
        </div>
        <div class="frontdesk__container content__grid-2x2">
            <div class="content__grid-left">
                <div class="frontdesk__content content__box">
                    <!-- FACIAL RECOGNITION -->
                    <div class="frontdesk__content-info">
                        <div class="content__title">Facial Recognition</div>
                        <div class="content__img-holder">
                            <q-img class="content__img" :src="blacklist_class.account_img ? blacklist_class.account_img : '../../../assets/Member/placeholder-img.jpg'"></q-img>
                            <input style="display:none" id="uploadImage" accept="image/*" @change="uploadImage()" ref="uploader" type="file">
                            <q-btn class="btn-upload btn-primary" flat dense no-caps label="Browse Face Detection" @click="openFilemanager()"></q-btn>
                            <!-- <q-btn class="btn-upload btn-primary" flat dense no-caps label="Browse Face Detection" @click="profile_img_dialog = true"></q-btn> -->
                        </div>
                    </div>
                    <!-- REASON TO BLACKLIST -->
                    <div class="frontdesk__content-info">
                        <div class="content__title">Blacklist Information</div>
                        <div class="content__input">
                            <div class="content__input-label">Reason for Blacklisting</div>
                            <q-input v-model="blacklist_class.reason_blacklist" outlined dense type="textarea"></q-input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content__grid-right">
                <div class="frontdesk__content content__box">
                    <!-- PERSONAL INFORMATION -->
                    <div class="frontdesk__content">
                        <div class="frontdesk__content-info">
                            <div class="content__title">Personal Information</div>
                            <!-- ID Information -->
                            <!-- <div class="frontdesk__content-grid">
                                <div class="content__select">
                                    <div class="content__select-label">Identification Card Type</div>
                                    <q-select v-model="select__id_type" :options="options_id" outlined dense></q-select>
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">ID Type</div>
                                    <q-input outlined dense></q-input>
                                </div>
                            </div> -->
                            <!-- Firstname -->
                            <div class="content__input">
                                <div class="content__input-label">First Name</div>
                                <q-input v-model="blacklist_class.given_name" outlined dense></q-input>
                            </div>
                            <!-- Lastname -->
                            <div class="content__input">
                                <div class="content__input-label">Last Name</div>
                                <q-input v-model="blacklist_class.last_name" outlined dense></q-input>
                            </div>
                            <!-- Middlename -->
                            <div class="content__input">
                                <div class="content__input-label">Middle Name</div>
                                <q-input v-model="blacklist_class.middle_name" outlined dense></q-input>
                            </div>
                            <!-- Gender and Birthdate -->
                            <div class="frontdesk__content-grid">
                                <div class="content__select">
                                    <div class="content__select-label">Gender</div>
                                    <q-select v-model="blacklist_class.gender" :options="options_gender" outlined dense></q-select>
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">Birth Date</div>
                                    <q-input type="date" v-model="blacklist_class.birthday" outlined dense></q-input>
                                </div>
                            </div>
                            <!-- Nationality -->
                            <div class="content__input">
                                <div class="content__input-label">Nationality</div>
                                <q-input v-model="blacklist_class.nationality" outlined dense></q-input>
                            </div>
                            <!-- Home Address -->
                            <div class="content__input">
                                <div class="content__input-label">Home Address</div>
                                <q-input v-model="blacklist_class.home_address" outlined dense></q-input>
                            </div>
                            <!-- Contact Information -->
                            <div class="frontdesk__content-grid">
                                <div class="content__input">
                                    <div class="content__input-label">Contact Number</div>
                                    <q-input type="number" v-model="blacklist_class.contact_number" outlined dense></q-input>
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">Emergency Contact Number</div>
                                    <q-input type="number" v-model="blacklist_class.emergency_contact" outlined dense></q-input>
                                </div>
                            </div>
                            <!-- Choose Type -->
                            <div class="content__select">
                                <div class="content__select-label">Tag a Company</div>
                                <q-select v-model="blacklist_class.company_name" :options="options_company" outlined dense></q-select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <q-dialog v-model="open_camera">
            <q-card>
                <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Capture Image</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>

                <q-card-section>
                    <div class="text-center">
                        <video id="video" width="500" height="500" autoplay></video>
                        <q-btn icon="camera"  id="snap"></q-btn>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>


        <!-- UNUSUAL BODY TEMPERATURE -->
        <q-dialog v-model="profile_img_dialog">
            <q-card style="width: 700px; max-width: 80vw;">
                <div class="profile">
                    <div class="profile__header">
                        <div class="profile__header-title">Unusual Body Temperature</div>
                        <q-btn flat dense round icon="mdi-close" size="13px" @click="profile_img_dialog = false"></q-btn>
                    </div>
                    <div class="profile__body">
                        <div class="profile__info">
                            <q-img class="profile__info-img img-active" src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"></q-img>
                            <div class="profile__info-details">38.1°C Body Temp.</div>
                        </div>
                        <div class="profile__info">
                            <q-img class="profile__info-img" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"></q-img>
                            <div class="profile__info-details">38.2°C Body Temp.</div>
                        </div>
                        <div class="profile__info">
                            <q-img class="profile__info-img" src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80"></q-img>
                            <div class="profile__info-details">38.3°C Body Temp.</div>
                        </div>
                        <div class="profile__info">
                            <q-img class="profile__info-img" src="https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"></q-img>
                            <div class="profile__info-details">38.4°C Body Temp.</div>
                        </div>
                        <div class="profile__info">
                            <q-img class="profile__info-img" src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=402&q=80"></q-img>
                            <div class="profile__info-details">38.5°C Body Temp.</div>
                        </div>
                    </div>
                </div>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import { Notify } from 'quasar';
import "./Frontdesk.scss";

// Classes
import OpticalReadClass from '../../../classes/OpticalReadClass';

import { postAddBlacklist, postUpdateBlacklist, postGetCompanies, postSavePerson } from '../../../references/url';

export default {
    data:() =>
    ({
        open_camera: false,
        reason_blacklist: '',
        profile_img_dialog: false,
        select__id_type: '',
        select__gender: '',
        select__visit_purpose: '',
        select__company: '',
        options_id: [
            'Drivers License', 'UMID' , 'PhilHealth'
        ],
        options_gender: [
            'Male' , 'Female'
        ],
        options_visit_purpose: [
            'Official Business' , 'Collection and Pickup', 'Delivery', 'Corporate Meeting', 'Client/Customer', 'Guest'
        ],
        options_company: [],
        blacklist_class: new OpticalReadClass()
    }),

    methods:
    {
        openFilemanager(type)
        {
            this.$refs.uploader.click();
        },

        async uploadImage()
        {  
            this.blacklist_class.account_img = await this.getImageURL()
        },

         async getImageURL(type)
        {
            let oFReader = new FileReader();
            const formData = new FormData();
            formData.append('image',document.getElementById("uploadImage").files[0]); 

            return await this.$_post_file(formData);
        },

        async submit()
        {
            let data = {

                person_img: this.blacklist_class.account_img,
                last_name: this.blacklist_class.last_name,
                middle_name: this.blacklist_class.middle_name,
                given_name: this.blacklist_class.given_name,
                gender: this.blacklist_class.gender,
                birthday: this.blacklist_class.birthday,
                nationality: this.blacklist_class.nationality,
                home_address: this.blacklist_class.home_address,
                contact_number: this.blacklist_class.contact_number,
                emergency_contact: this.blacklist_class.emergency_contact,
                date_created: new Date(),
                company_name: this.blacklist_class.company_name,
                is_active: true,
                
                reason_blacklist: this.blacklist_class.reason_blacklist,
                category: 'Blacklist'
            }
            
            this.$q.loading.show();
            try
            {
                if (this.$route.params.is_edit)
                {
                    await this.$_post(postSavePerson, {id: this.$route.params.account_info._id, update_blacklist: data});
                    // await this.$_post(postUpdateBlacklist, {id: this.$route.params.account_info._id, update_blacklist: data});
                    Notify.create({
                        color: 'green',
                        message: 'Successfully updated Blacklist'
                    }); 
                    data.type = 'Blacklist'
                    this.$router.push({
                        name: 'member_personal-information',
                        params: {
                            account_info: data,
                        }
                    })
                }
                else
                {
                    await this.$_post(postSavePerson, {person_info: data});
                    this.blacklist_class.eraseAll()
                    Notify.create({
                        color: 'green',
                        message: 'Successfully added blacklist'
                    }); 
                }
            }
            catch(e)
            {
                Notify.create({
                    color: 'red',
                    message: 'Try again'
                }); 
            }
            this.$q.loading.hide();
        }
    },
   async mounted()
    {
        if (this.$route.params.is_edit) 
        {
            this.blacklist_class = new OpticalReadClass(this.$route.params.account_info)
        }
        let company_list = await this.$_post(postGetCompanies);
        for (let company of company_list.data) {
            this.options_company.push(company.company_name)
        }
    }
}
</script>
