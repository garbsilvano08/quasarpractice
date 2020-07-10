<template>
    <div class="frontdesk">
        <div class="frontdesk__header">
            <div v-if="this.$route.params.is_edit" class="header__title">UPDATE STAFF</div>
            <div v-else class="header__title">ADD STAFF</div>
            <div class="frontdesk__header-btn">
                <q-btn class="btn-outline btn-discard" flat dense no-caps label="Discard"></q-btn>
                <q-btn @click="submit()" class="btn-save btn-primary" flat dense no-caps :label="this.$route.params.is_edit ? 'Update' : 'Save'"></q-btn>
                <q-btn @click="test()" class="btn-save btn-primary" flat dense no-caps label='Test'></q-btn>
            </div>
        </div>
        <div class="frontdesk__container content__grid-2x2">
            <div class="content__grid-left">
                <div class="frontdesk__content content__box">
                    <!-- FACIAL RECOGNITION -->
                    <div class="frontdesk__content-info">
                        <div class="content__title">Facial Recognition</div>
                        <div class="content__img-holder">
                            <q-img class="content__img" :src="staff_class.account_img ? staff_class.account_img : '../../../assets/Member/placeholder-img.jpg'"></q-img>
                            <input style="display:none" id="uploadImage" accept="image/*" @change="uploadImage()" ref="uploader" type="file">
                            <q-btn class="btn-upload btn-primary" flat dense no-caps label="Take a Photo" @click="openFilemanager()"></q-btn>
                        </div>
                    </div>
                     <!-- EMPLOYMENT INFORMATION -->
                    <div class="frontdesk__content content__box" style="margin-top: 30px;">
                        <div class="frontdesk__content">
                            <div class="frontdesk__content-info">
                                <div class="content__title">Employment Information</div>
                                <div class="content__select">
                                    <div class="content__select-label">Tag a Company</div>
                                    <q-select v-model="staff_class.company_name" :options="options_company" outlined dense></q-select>
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">Position</div>
                                    <q-select v-model="staff_class.position" :options="options_position" outlined dense></q-select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- CHOOSE ID -->
                    <!-- <div class="frontdesk__content-info">
                        <div class="content__title">Choose ID</div>
                        <div class="content__select">
                            <div class="content__select-label">Identification Card Type</div>
                            <q-select v-model="staff_class.id_type" :options="options_id" outlined dense></q-select>
                        </div>
                        <div class="content__img-holder img-holder__sm">
                            <q-img class="content__img" :src="staff_class.id_img ? staff_class.id_img : '../../../assets/Member/placeholder-img.jpg'"></q-img>
                            <input style="display:none" id="uploadIDImage" accept="image/*" @change="checkImage()" ref="idUploader" type="file">
                            <q-btn class="btn-upload btn-primary" flat dense no-caps label="Capture ID" @click="openFilemanager('id')"></q-btn>
                        </div>
                    </div> -->
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
                                    <q-input v-model="staff_class.id_num" outlined dense></q-input>
                                </div>
                            </div> -->
                            <!-- Firstname -->
                            <div class="content__input">
                                <div class="content__input-label">First Name</div>
                                <q-input v-model="staff_class.given_name" outlined dense></q-input>
                            </div>
                            <!-- Lastname -->
                            <div class="content__input">
                                <div class="content__input-label">Last Name</div>
                                <q-input v-model="staff_class.last_name" outlined dense></q-input>
                            </div>
                            <!-- Middlename -->
                            <div class="content__input">
                                <div class="content__input-label">Middle Name</div>
                                <q-input v-model="staff_class.middle_name" outlined dense></q-input>
                            </div>
                            <!-- Gender and Birthdate -->
                            <div class="frontdesk__content-grid">
                                <div class="content__select">
                                    <div class="content__select-label">Gender</div>
                                    <q-select v-model="staff_class.gender" :options="options_gender" outlined dense></q-select>
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">Birth Date</div>
                                    <q-input type="date" v-model="staff_class.birthday" outlined dense></q-input>
                                </div>
                            </div>
                            <!-- Nationality -->
                            <div class="content__input">
                                <div class="content__input-label">Nationality</div>
                                <q-input v-model="staff_class.nationality" outlined dense></q-input>
                            </div>
                            <!-- Home Address -->
                            <div class="content__input">
                                <div class="content__input-label">Home Address</div>
                                <q-input  v-model="staff_class.home_address" outlined dense></q-input>
                            </div>
                            <!-- Contact -->
                            <div class="frontdesk__content-grid">
                                <div class="content__input">
                                    <div class="content__input-label">Contact Number</div>
                                    <q-input type="number" v-model="staff_class.contact_number" outlined dense></q-input>
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">Emergency Contact Number</div>
                                    <q-input type="number" v-model="staff_class.emergency_contact" outlined dense></q-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- EMPLOYMENT INFORMATION -->
                <!-- <div class="frontdesk__content content__box" style="margin-top: 30px;">
                    <div class="frontdesk__content">
                        <div class="frontdesk__content-info">
                            <div class="content__title">Employment Information</div>
                            <div class="content__select">
                                <div class="content__select-label">Tag a Company</div>
                                <q-select v-model="staff_class.company_name" :options="options_company" outlined dense></q-select>
                            </div>
                            <div class="content__input">
                                <div class="content__input-label">Position</div>
                                <q-select v-model="staff_class.position" :options="options_position" outlined dense></q-select>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>

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

// Refferences
import position_reference from '../../../references/position';

import { postGetCompanies, postAddPerson, postUpdateStaff, postSavePerson} from '../../../references/url';
import LoginVue from '../../Front/Login.vue';

export default {
    data:() =>
    ({
        position_input: '',
        id_url : 'https://fleek.geer.solutions/storage/photos/Z3zuI9NN61eJoh5yDHJEaNOGGDC2z9o2NWzEpbwc.jpeg',
        img: '',
        profile_img_dialog: false,
        select__id_type: 'Drivers License',
        select__gender: '',
        select__visit_purpose: '',
        select__company: '',
        options_id: [
            'Drivers License' , 'PIC'
        ],
        options_position: position_reference,
        options_gender: [
            'Male' , 'Female'
        ],
        options_visit_purpose: [
            'Official Business' , 'Collection and Pickup', 'Delivery', 'Corporate Meeting', 'Client/Customer', 'Guest'
        ],
        options_company: [],
        staff_class: new OpticalReadClass(),
        is_done: false,
        company_list: [],
    }),
    watch:
    {
        is_done(val)
        {
            if (val)
            {
                // console.log(val);

            }
        },
        
    },

    methods:
    {
        test()
        {
            this.staff_class =
            {
                // id_img: 'http://157.245.55.109/uploader/uploads/optimize_images/lebron.jpg',
                // id_num: '123423123',
                // id_type: 'Drivers License',

                account_img: 'http://157.245.55.109/uploader/uploads/optimize_images/lebron.jpg',
                given_name: 'Joe',
                middle_name: 'Jonas',
                last_name: 'Brown',
                gender: 'Male',
                birthday: '2020-07-02',
                nationality: 'Filipino',
                home_address: 'Balagtas',
                contact_number: '09556741079',
                emergency_contact: '09556741079',
                company_name: 'Mang Inasal Balagtas',
                position : 'Sub Company'
            }
        },
        getCompany(company)
        {
            for (let comp of this.company_list.data) {
                if (comp.company_name == company)
                {
                    return comp._id
                }
            }
        },

        async uploadImage()
        {  
            this.staff_class.account_img = await this.getImageURL()
        },

        async getImageURL(type)
        {
            let oFReader = new FileReader();
            const formData = new FormData();
            if (type == 'id') formData.append('image',document.getElementById("uploadIDImage").files[0]); 
            else formData.append('image',document.getElementById("uploadImage").files[0]); 

            return await this.$_post_file(formData);
        },
        openFilemanager(type)
        {
            if (type) this.$refs.idUploader.click();
            else this.$refs.uploader.click();

        },

        async checkImage(image)
        {
            this.$q.loading.show();
            let img = await this.getImageURL('id')
            // this.$q.loading.show();
            if (img) await this.staff_class.ocrUnirest(this.select__id_type, img)
            this.staff_class.id_img = img
            this.$q.loading.hide();
        },

        async submit()
        {
            let result           = '';
            let characters       = '0123456789';
            let charactersLength = characters.length;
            for ( let i = 0; i < 9; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }

            let data = {
                // id_img: this.staff_class.id_img,
                // id_num: this.staff_class.id_num,
                // id_type: this.staff_class.id_type,
                
                // company_details: this.getCompany( this.staff_class.company_name),
                person_img: this.staff_class.account_img,
                last_name: this.staff_class.last_name,
                middle_name: this.staff_class.middle_name,
                given_name: this.staff_class.given_name,
                gender: this.staff_class.gender,
                birthday: this.staff_class.birthday,
                nationality: this.staff_class.nationality,
                home_address: this.staff_class.home_address,
                contact_number: this.staff_class.contact_number,
                emergency_contact: this.staff_class.emergency_contact,
                date_created: new Date(),
                company_name: this.staff_class.company_name,
                company_id: this.getCompany( this.staff_class.company_name),
                is_active: true,

                position: this.staff_class.position,
                category: 'Staff',
                frontdesk_person_id: result,
                frontdesk_person_date: new Date()
            }
            
            
            this.$q.loading.show();
            try
            {
                if (this.$route.params.is_edit)
                {
                    await this.$_post(postSavePerson, {id: this.$route.params.account_info._id, update_staff: data});
                    // await this.$_post(postUpdateStaff, {id: this.$route.params.account_info._id, update_staff: data});
                    Notify.create({
                        color: 'green',
                        message: 'Successfully updated Staff'
                    }); 
                    data.type = 'Staff'
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
                    // await this.$_post(postAddStaff, data);
                    // this.staff_class.eraseAll()
                    Notify.create({
                        color: 'green',
                        message: 'Successfully added Staff'
                    }); 
                }
            }
            catch(e)
            {
                Notify.create({
                    color: 'red',
                    message: 'Try again' + e.message
                }); 
            }
            this.$q.loading.hide();
        }
    },
    async mounted()
    {
        if (this.$route.params.is_edit) 
        {
            this.staff_class = new OpticalReadClass(this.$route.params.account_info)
        }
        
        this.company_list = await this.$_post(postGetCompanies);
        for (let company of this.company_list.data) {
            this.options_company.push(company.company_name) 
        }
        
    }
}
</script>
