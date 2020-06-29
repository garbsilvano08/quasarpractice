<template>
    <div class="frontdesk">
        <div class="frontdesk__header">
            <div class="frontdesk__header-title">BLACKLIST MANAGEMENT</div>
            <div class="frontdesk__header-btn">
                <q-btn class="btn-outline btn-discard" flat dense no-caps label="Discard"></q-btn>
                <q-btn class="btn-save btn-primary" flat dense no-caps label="Save"></q-btn>
            </div>
        </div>
        <div class="frontdesk__container content__grid-6x6">
            <div class="content__grid-left">
                <div class="frontdesk__content content__box">
                    <!-- FACIAL RECOGNITION -->
                    <div class="frontdesk__content-info">
                        <div class="content__title">Facial Recognition</div>
                        <div class="content__img-holder">
                            <q-img class="content__img" src="../../../assets/Member/placeholder-img.jpg"></q-img>
                            <q-btn class="btn-upload btn-primary" flat dense no-caps label="Browse Face Detection"></q-btn>
                        </div>
                    </div>
                    <!-- CHOOSE ID -->
                    <div class="frontdesk__content-info">
                        <div class="content__title">Choose ID</div>
                        <div class="content__select">
                            <div class="content__select-label">Identification Card Type</div>
                            <q-select v-model="select__id_type" :options="options_id" outlined dense></q-select>
                        </div>
                        <div class="content__img-holder img-holder__sm">
                            <q-img class="content__img img__sm" src="../../../assets/Member/placeholder-img.jpg"></q-img>
                            <q-btn class="btn-upload btn-primary" flat dense no-caps label="Capture ID"></q-btn>
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
                            <div class="frontdesk__content-grid">
                                <div class="content__select">
                                    <div class="content__select-label">Identification Card Type</div>
                                    <q-select v-model="select__id_type" :options="options_id" outlined dense></q-select>
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">ID Type</div>
                                    <q-input outlined dense></q-input>
                                </div>
                            </div>
                            <!-- Firstname -->
                            <div class="content__input">
                                <div class="content__input-label">First Name</div>
                                <q-input outlined dense></q-input>
                            </div>
                            <!-- Lastname -->
                            <div class="content__input">
                                <div class="content__input-label">Last Name</div>
                                <q-input outlined dense></q-input>
                            </div>
                            <!-- Middlename -->
                            <div class="content__input">
                                <div class="content__input-label">Middle Name</div>
                                <q-input outlined dense></q-input>
                            </div>
                            <!-- Gender and Birthdate -->
                            <div class="frontdesk__content-grid">
                                <div class="content__select">
                                    <div class="content__select-label">Gender</div>
                                    <q-select v-model="select__gender" :options="options_gender" outlined dense></q-select>
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">Birth Date</div>
                                    <q-input outlined dense></q-input>
                                </div>
                            </div>
                            <!-- Nationality -->
                            <div class="content__input">
                                <div class="content__input-label">Nationality</div>
                                <q-input outlined dense></q-input>
                            </div>
                            <!-- Home Address -->
                            <div class="content__input">
                                <div class="content__input-label">Home Address</div>
                                <q-input outlined dense></q-input>
                            </div>
                            <!-- Contact -->
                            <div class="frontdesk__content-grid">
                                <div class="content__input">
                                    <div class="content__input-label">Contact Number</div>
                                    <q-input outlined dense></q-input>
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">Emergency Contact Number</div>
                                    <q-input outlined dense></q-input>
                                </div>
                            </div>
                            <!-- Choose Type -->
                            <div class="content__select">
                                <div class="content__select-label">Choose Type</div>
                                <q-select v-model="select__type" :options="options_type" outlined dense></q-select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "./Frontdesk.scss";

export default {
    data:() =>
    ({
        select__id_type: '',
        select__gender: '',
        select__visit_purpose: '',
        options_id: [
            'Company ID' , 'Drivers License', 'UMID' , 'Passport', 'Pag-ibig ID'
        ],
        options_gender: [
            'Male' , 'Female'
        ],
        options_visit_purpose: [
            'Official Business' , 'Collection and Pickup', 'Delivery'
        ],
        options_type: [
            'Blacklist'
        ]
    })
}
</script>
