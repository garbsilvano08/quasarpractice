<template>
    <div class="frontdesk">
        <div class="frontdesk__header">
            <div class="header__title">EDIT STAFF</div>
            <div class="frontdesk__header-btn">
                <q-btn  @click="submit('discard')" class="btn-outline btn-discard" flat dense no-caps label="Discard"></q-btn>
                <q-btn @click="submit()" class="btn-save btn-primary" flat dense no-caps label="Update"></q-btn>
                <!-- <q-btn @click="test()" class="btn-save btn-primary" flat dense no-caps label='Test'></q-btn> -->
            </div>
        </div>
        <div class="frontdesk__container content__grid">
            <div class="content__grid">
                <div class="frontdesk__content content__box">
                    <!-- PERSONAL INFORMATION -->
                    <div class="frontdesk__content">
                        <div class="frontdesk__content-info">
                            <div class="content__title">Employment Information</div>
                            <div class="frontdesk__content-grid">
                                <div class="content__select">
                                    <div class="content__select-label">Tag a Company</div>
                                    <com-picker :user="staff_details.company" @select=getCompanyData class="btn-choose"></com-picker>
                                    <!-- <q-select outlined dense></q-select> -->
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">Position</div>
                                    <q-input v-model="staff.position" outlined dense></q-input>
                                </div>
                            </div>
                        </div>
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
                                <div class="content__input-label">First Name *</div>
                                <q-input v-model="staff.given_name" outlined dense></q-input>
                            </div>
                            <!-- Lastname -->
                            <div class="content__input">
                                <div class="content__input-label">Last Name *</div>
                                <q-input v-model="staff.last_name" outlined dense></q-input>
                            </div>
                            <!-- Middlename -->
                            <div class="content__input">
                                <div class="content__input-label">Middle Name *</div>
                                <q-input v-model="staff.middle_name" outlined dense></q-input>
                            </div>
                            <div class="content__input">
                                <div class="content__input-label">Email Address *</div>
                                <q-input v-model="staff.email" outlined dense></q-input>
                            </div>
                            <!-- Gender and Birthdate -->
                            <div class="frontdesk__content-grid">
                                <div class="content__select">
                                    <div class="content__select-label">Gender *</div>
                                    <q-select v-model="staff.gender" :options="options_gender" outlined dense></q-select>
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">Birth Date *</div>
                                    <q-input v-model="staff.birthday" type="date" outlined dense></q-input>
                                </div>
                            </div>
                            <!-- Nationality -->
                            <div class="content__input">
                                <div class="content__input-label">Nationality *</div>
                                <q-input v-model="staff.nationality" outlined dense></q-input>
                            </div>
                            <!-- Home Address -->
                            <div class="content__input">
                                <div class="content__input-label">Home Address *</div>
                                <q-input v-model="staff.home_address" outlined dense></q-input>
                            </div>
                            <!-- Contact -->
                            <div class="frontdesk__content-grid">
                                <div class="content__input">
                                    <div class="content__input-label">Contact Number *</div>
                                    <q-input v-model="staff.contact_number" type="number" outlined dense></q-input>
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">Emergency Contact Number *</div>
                                    <q-input v-model="staff.emergency_contact" type="number" outlined dense></q-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Notify } from 'quasar';
import "./Frontdesk.scss";

// Refferences
import position_reference from '../../../references/position';
import  ComPicker from "../../../components/companyPicker/ComPicker"

import LoginVue from '../../Front/Login.vue';
import {base64StringToBlob} from 'blob-util';
import { log } from 'util';
import position from '../../../references/position';

export default {
    components: { ComPicker },
    props:
    {
        staff: Object
    },
    data:() =>
    ({
        options_gender: [
            'Male' , 'Female'
        ],
        staff_details: {
            last_name:   '',
            middle_name: '',
            given_name:  '',
            company_name: '',
            company_id: '',
            position: '',
            email: '',
            gender: '',
            birthday: new Date().toISOString().split('T')[0],
            nationality: '',
            contact_number: '',
            emergency_contact: '',
            home_address: '',
            company: {}
        }
    }),
    watch:
    {
       staff(val)
       {
           console.log(val);
           this.staff_details = val
       }

    },

    methods:
    {
        getCompanyData(value)
        {
            this.staff_details.company = value
        },
        submit(discard = '')
        {
            if (discard) this.$emit('update', '')
            else this.$emit('update', this.staff_details)
        }
    },
    async mounted()
    {
        this.staff_details = this.staff
    }

}
</script>
