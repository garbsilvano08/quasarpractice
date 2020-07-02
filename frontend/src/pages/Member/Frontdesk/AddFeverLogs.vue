<template>
    <div class="frontdesk">
        <div class="frontdesk__header">
            <div class="header__title">ADD FEVER LOGS</div>
            <div class="frontdesk__header-btn">
                <q-btn class="btn-outline btn-discard" flat dense no-caps label="Discard"></q-btn>
                <q-btn class="btn-save btn-primary" flat dense no-caps label="Save"></q-btn>
            </div>
        </div>
        <div class="frontdesk__container content__grid-2x2">
            <div class="content__grid-left">
                <div class="frontdesk__content content__box">
                    <!-- FACIAL RECOGNITION -->
                    <div class="frontdesk__content-info">
                        <div class="content__title">Facial Recognition</div>
                        <div class="content__img-holder">
                            <q-img class="content__img" src="../../../assets/Member/placeholder-img.jpg"></q-img>
                            <q-btn class="btn-upload btn-primary" flat dense no-caps label="Browse Face Detection" @click="profile_img_dialog = true"></q-btn>
                        </div>
                    </div>
                    <!-- BODY TEMPERATURE -->
                    <div class="frontdesk__content-info">
                        <div class="content__title">Body Temperature</div>
                        <div class="frontdesk__content-temperature">36°C</div>
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
                        </div>
                    </div>
                </div>
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
import "./Frontdesk.scss";

export default {
    data:() =>
    ({
        profile_img_dialog: false,
        select__id_type: '',
        select__gender: '',
        select__visit_purpose: '',
        options_id: [
            'Drivers License', 'UMID' , 'PhilHealth'
        ],
        options_gender: [
            'Male' , 'Female'
        ],
        options_visit_purpose: [
            'Official Business' , 'Collection and Pickup', 'Delivery', 'Corporate Meeting', 'Client/Customer', 'Guest'
        ]
    })
}
</script>
