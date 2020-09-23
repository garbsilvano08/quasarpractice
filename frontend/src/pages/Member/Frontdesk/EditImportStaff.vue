<template>
    <div class="frontdesk">
        <div class="frontdesk__header">
            <div class="header__title">EDIT STAFF</div>
            <div class="frontdesk__header-btn">
                <q-btn class="btn-outline btn-discard" flat dense no-caps label="Discard"></q-btn>
                <q-btn class="btn-save btn-primary" flat dense no-caps label="Edit"></q-btn>
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
                            <div class="content__select">
                                <div class="content__select-label">Tag a Company</div>
                                <q-select outlined dense></q-select>
                            </div>
                            <div class="content__input">
                                <div class="content__input-label">Position</div>
                                <q-input outlined dense></q-input>
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
                                <q-input outlined dense></q-input>
                            </div>
                            <!-- Lastname -->
                            <div class="content__input">
                                <div class="content__input-label">Last Name *</div>
                                <q-input outlined dense></q-input>
                            </div>
                            <!-- Middlename -->
                            <div class="content__input">
                                <div class="content__input-label">Middle Name *</div>
                                <q-input outlined dense></q-input>
                            </div>
                            <div class="content__input">
                                <div class="content__input-label">Email Address *</div>
                                <q-input outlined dense></q-input>
                            </div>
                            <!-- Gender and Birthdate -->
                            <div class="frontdesk__content-grid">
                                <div class="content__select">
                                    <div class="content__select-label">Gender *</div>
                                    <q-select :options="options_gender" outlined dense></q-select>
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">Birth Date *</div>
                                    <q-input type="date" outlined dense></q-input>
                                </div>
                            </div>
                            <!-- Nationality -->
                            <div class="content__input">
                                <div class="content__input-label">Nationality *</div>
                                <q-input outlined dense></q-input>
                            </div>
                            <!-- Home Address -->
                            <div class="content__input">
                                <div class="content__input-label">Home Address *</div>
                                <q-input outlined dense></q-input>
                            </div>
                            <!-- Contact -->
                            <div class="frontdesk__content-grid">
                                <div class="content__input">
                                    <div class="content__input-label">Contact Number *</div>
                                    <q-input type="number" outlined dense></q-input>
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">Emergency Contact Number *</div>
                                    <q-input type="number" outlined dense></q-input>
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

import LoginVue from '../../Front/Login.vue';
import {base64StringToBlob} from 'blob-util';
import { log } from 'util';

export default {
    data:() =>
    ({
        options_gender: [
            'Male' , 'Female'
        ],
    }),
    watch:
    {
       

    },

    methods:
    {
    },
    async mounted()
    {

    }

}
</script>
