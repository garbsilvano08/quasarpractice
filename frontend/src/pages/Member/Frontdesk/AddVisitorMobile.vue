<template>
    <div class="frontdesk">
        <div class="frontdesk__header">
            <div class="header__title">ADD VISITOR</div>
            <div class="frontdesk__header-btn">
                <q-btn class="btn-outline btn-discard" flat dense no-caps label="Discard"></q-btn>
                <q-btn class="btn-save btn-primary" flat dense no-caps label="Save"></q-btn>
            </div>
        </div>
        <div class="frontdesk__container content__grid-2x2">
            <div class="content__grid-left">
                <div class="frontdesk__content content__box">
                    <div class="frontdesk__content-info">
                        <div class="content__title">Facial Recognition</div>
                        <div class="content__img-holder">
                            <q-img class="content__img" src="/img/placeholder-img.jpg"></q-img>
                            <!-- <input style="display:none" id="uploadImage" accept="image/*" @change="uploadImage()" ref="uploader" type="file"> -->
                            <q-btn class="btn-upload btn-primary" flat dense no-caps label="Capture Face"></q-btn>
                        </div>
                    </div>

                    <div class="frontdesk__content-info">
                        <div class="content__title">Choose ID</div>
                        <div class="content__select">
                            <div class="content__select-label">Identification Card Type</div>
                            <q-select v-model="select_id_type" :options="options_id" outlined dense></q-select>
                        </div>
                        <div class="content__img-holder img-holder__sm">
                            <q-img class="content__img img__sm" src="/img/placeholder-img.jpg"></q-img>
                            <!-- <input style="display:none" id="uploadIDImage" accept="image/*" @change="checkImage()" ref="idUploader" type="file"> -->
                            <q-btn class="btn-upload btn-primary" flat dense no-caps label="Capture ID"></q-btn>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content__grid-right">
                <div class="frontdesk__content content__box">
                    <div class="frontdesk__content-info">
                        <div class="content__title">Personal Information</div>
                         <!-- ID Information -->
                        <div class="frontdesk__content-grid">
                            <div class="content__select">
                                <div class="content__select-label">Identification Card Type</div>
                                <q-select v-model="select_id_type" :options="options_id" outlined dense></q-select>
                            </div>
                            <div class="content__input">
                                <div class="content__input-label">ID Number</div>
                                <q-input v-model="input_id_number" outlined dense></q-input>
                            </div>
                        </div>
                        <!-- Firstname -->
                        <div class="content__input">
                            <div class="content__input-label">First Name</div>
                            <q-input v-model="input_first_name" outlined dense></q-input>
                        </div>
                        <!-- Lastname -->
                        <div class="content__input">
                            <div class="content__input-label">Last Name</div>
                            <q-input v-model="input_last_name" outlined dense></q-input>
                        </div>
                        <!-- Middlename -->
                        <div class="content__input">
                            <div class="content__input-label">Middle Name</div>
                            <q-input v-model="input_middle_name" outlined dense></q-input>
                        </div>
                        <!-- Gender and Birthdate -->
                        <div class="frontdesk__content-grid">
                            <div class="content__select">
                                <div class="content__select-label">Gender</div>
                                <q-select v-model=" select_gender" :options="options_gender" outlined dense></q-select>
                            </div>
                            <div class="content__input">
                                <div class="content__input-label">Birth Date</div>
                                <q-input type="date" v-model="input_birth_date" outlined dense></q-input>
                            </div>
                        </div>
                        <!-- Nationality -->
                        <div class="content__input">
                            <div class="content__input-label">Nationality</div>
                            <q-input v-model="input_nationality" outlined dense></q-input>
                        </div>
                        <!-- Home Address -->
                        <div class="content__input">
                            <div class="content__input-label">Home Address</div>
                            <q-input v-model="input_home_address" outlined dense></q-input>
                        </div>
                        <!-- Location -->
                        <div class="content__select">
                            <div class="content__select-label">Location</div>
                            <q-select v-model="select_location" :options="options_location" outlined dense></q-select>
                        </div>
                         <!-- Contact -->
                        <div class="frontdesk__content-grid">
                            <div class="content__input">
                                <div class="content__input-label">Contact Number</div>
                                <q-input v-model="input_contact_number" outlined dense></q-input>
                            </div>
                            <div class="content__input">
                                <div class="content__input-label">Emergency Contact Number</div>
                                <q-input v-model="input_emergency_contact_number" outlined dense></q-input>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="frontdesk__content content__box" style="margin-top: 30px;">
                    <div class="frontdesk__content-info">
                        <div class="content__title">Visitor's Purpose</div>
                        <!-- Purpose of Visit -->
                        <div class="content__select">
                            <div class="content__select-label">Purpose of Visit</div>
                            <q-select v-model="select_visit_purpose" :options="options_purpose" outlined dense></q-select>
                        </div>
                        <!-- Visitor Details -->
                        <div class="frontdesk__content-grid">
                            <div class="content__input">
                                <div class="content__input-label">Contact Person</div>
                                <q-input v-model="input_contact_person" outlined dense></q-input>
                            </div>
                            <div class="content__input">
                                <div class="content__input-label">Destination</div>
                                <q-input v-model="input_destination" outlined dense></q-input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mobile-view__btn">
            <q-btn class="btn-outline btn-discard" flat dense no-caps label="Discard"></q-btn>
            <q-btn class="btn-save btn-primary" flat dense no-caps label="Save"></q-btn>
        </div>

    </div>
</template>

<script>
import "./Frontdesk.scss";

export default {
    data:() =>
    ({
        input_id_number: '',
        input_first_name: '',
        input_last_name: '',
        input_middle_name: '',
        input_birth_date: '',
        input_nationality: '',
        input_home_address: '',
        input_contact_number: '',
        input_emergency_contact_number: '',
        input_contact_person: '',
        input_destination: '',
        select_id_type: '',
        select_gender: '',
        select_location: '',
        select_visit_purpose: '',
        options_id: [
            'UMID','Passport','SSS ID'
        ],
        options_gender: [
            'Male','Female'
        ],
        options_location: [
            'Manila, Philippines','Bulacan, Philippines'
        ],
        options_purpose: [
            'Official Business','Collection and Pickup','Delivery','Corporate Meeting','Client/Customer','Guest'
        ]
    }),
}
</script>
