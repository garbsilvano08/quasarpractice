<template>
    <div class="frontdesk">
        <div class="frontdesk__header">
            <div class="header__title">ADD VISITOR</div>
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
                            <q-img class="content__img" src="../../../assets/Member/placeholder-img.jpg"></q-img>
                            <q-btn class="btn-upload btn-primary" flat dense no-caps label="Capture Face" @click="profile_img_dialog = true"></q-btn>
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
                            <q-select v-model="personal_information.id_type" :options="options_id" outlined dense></q-select>
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
                                    <q-select v-model="personal_information.id_type" :options="options_id" outlined dense></q-select>
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">ID Number</div>
                                    <q-input v-model="personal_information.id_number" outlined dense></q-input>
                                </div>
                            </div>
                            <!-- Firstname -->
                            <div class="content__input">
                                <div class="content__input-label">First Name</div>
                                <q-input v-model="personal_information.first_name" outlined dense></q-input>
                            </div>
                            <!-- Lastname -->
                            <div class="content__input">
                                <div class="content__input-label">Last Name</div>
                                <q-input v-model="personal_information.last_name" outlined dense></q-input>
                            </div>
                            <!-- Middlename -->
                            <div class="content__input">
                                <div class="content__input-label">Middle Name</div>
                                <q-input v-model="personal_information.middle_name" outlined dense></q-input>
                            </div>
                            <!-- Gender and Birthdate -->
                            <div class="frontdesk__content-grid">
                                <div class="content__select">
                                    <div class="content__select-label">Gender</div>
                                    <q-select v-model="personal_information.gender" :options="options_gender" outlined dense></q-select>
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">Birth Date</div>
                                    <q-input type="date" v-model="personal_information.birth_date" outlined dense></q-input>
                                </div>
                            </div>
                            <!-- Nationality -->
                            <div class="content__input">
                                <div class="content__input-label">Nationality</div>
                                <q-input v-model="personal_information.nationality" outlined dense></q-input>
                            </div>
                            <!-- Home Address -->
                            <div class="content__input">
                                <div class="content__input-label">Home Address</div>
                                <q-input v-model="personal_information.home_address" outlined dense></q-input>
                            </div>
                            <!-- Location -->
                            <div class="content__input">
                                <div class="content__input-label">Location</div>
                                <q-select
                                    outlined 
                                    dense
                                    v-model="personal_information.location"
                                    use-input
                                    input-debounce="200"
                                    :options="options_location"
                                    @filter="getNearbyPlaces"
                                    option-value="place_id"
                                    option-label="description"
                                >
                                    <template v-slot:no-option>
                                        <q-item>
                                            <q-item-section class="text-grey">
                                            No results
                                            </q-item-section>
                                        </q-item>
                                    </template>
                                </q-select>
                            </div>
                            <!-- Contact -->
                            <div class="frontdesk__content-grid">
                                <div class="content__input">
                                    <div class="content__input-label">Contact Number</div>
                                    <q-input v-model="personal_information.contact_number" outlined dense></q-input>
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">Emergency Contact Number</div>
                                    <q-input v-model="personal_information.emergency_contact_number" outlined dense></q-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="frontdesk__content content__box" style="margin-top: 30px;">
                    <div class="frontdesk__content">
                        <div class="frontdesk__content-info">
                            <div class="content__title">Visitor's Purpose</div>
                            <!-- Purpose of Visit -->
                            <div class="content__select">
                                <div class="content__select-label">Purpose of Visit</div>
                                <q-select v-model="visitor_purpose.purpose_visit" :options="options_visit_purpose" outlined dense></q-select>
                            </div>
                            <!-- Visitor Details -->
                            <div class="frontdesk__content-grid">
                                <div class="content__input">
                                    <div class="content__input-label">Contact Person</div>
                                    <q-input v-model="visitor_purpose.contact_person" outlined dense></q-input>
                                </div>
                                <div class="content__input">
                                    <div class="content__input-label">Destination</div>
                                    <q-input v-model="visitor_purpose.destination" outlined dense></q-input>
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
import Model from "../../../models/Model";

export default {
    data:() =>
    ({
        profile_img_dialog: false,

        options_id: [
            'Drivers License', 'UMID' , 'PhilHealth'
        ],
        options_gender: [
            'Male' , 'Female'
        ],
        options_visit_purpose: [
            'Official Business' , 'Collection and Pickup', 'Delivery', 'Corporate Meeting', 'Client/Customer', 'Guest'
        ],
        options_location: [],

        // Submit Data
        personal_information:
        {
            id_type: null,
            id_number: null,
            first_name: null,
            middle_name: null,
            last_name: null,
            gender: null,
            birth_date: null,
            nationality: null,
            home_address: null,
            contact_number: null,
            emergency_contact_number: null,
            location: null
        },
        visitor_purpose:
        {
            purpose_visit: null,
            contact_person: null,
            destination: null
        },

        db: new Model()
    }),
    methods:
    {
        async getNearbyPlaces(val, update) 
        {
            if (val === '') 
            {
                update();
                return;
            }

            // get nearby locations
            let nearby_locations = await this.$_post('member/get/nearby_places', { location: val });

            update(() =>
            {
                this.options_location = nearby_locations.data;
            })
        },
        async submit()
        {
            try
            {
                const capitalize = (str) =>
                {
                    str = str.split(" ");

                    for (var i = 0, x = str.length; i < x; i++) 
                    {
                        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
                    }

                    return str.join(" ");
                }

                for (let validate in this.personal_information)
                {
                    let field = validate;

                    if (field === 'id_type') field = "ID Card Type";
                    if (field === 'id_number') field = "ID Number";
                    else field = capitalize(field.replace('_', ' '));

                    if (!this.personal_information[validate]) throw new Error(field + ' is required.');
                }

                for (let validate in this.visitor_purpose)
                {
                    let field = validate;

                    if (field === 'purpose_visit') field = "Purpose of Visit";
                    else field = capitalize(field.replace('_', ' '));

                    if (!this.visitor_purpose[validate]) throw new Error(field + ' is required.');
                }

                if (this.personal_information.location) this.personal_information.location_coordinates = await this.$_post('member/get/coordinates', { place_id: this.personal_information.location.place_id }).then(res => res.data);
                console.log(this.personal_information.location_coordinates);
                await this.db.add(
                {
                    personal_information: this.personal_information,
                    visitor_purpose: this.visitor_purpose
                },
                'visitors');

                this.$store.commit('sync/storeVisitors', await this.db.get("visitors"));
            }
            catch (e)
            {
                this.$q.notify(
                {
                    color: 'red',
                    message: e.message
                });
            }
        }
    },
    async created()
    {
        await this.db.initialize();
    }
}
</script>
