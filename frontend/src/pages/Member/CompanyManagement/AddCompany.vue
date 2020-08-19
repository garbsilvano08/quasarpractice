<template>
    <div class="company-add">
        <div class="header__title">ADD COMPANY</div>
        <div class="company-add__content content__box">
            <div class="header__title">Company Information</div>
            <div class="company-add__content-info">
                <div class="content__title">Choose ID</div>
                <div class="content__img-holder">
                    <div></div>
                    <!-- <img id="uploadPreview" style="width: 200px; height: 200px;" /> -->
                    <img class="content__img img__sm" id="uploadPreview" src="../../../assets/Member/placeholder-img.jpg"/>
                    <input style="display:none" id="uploadImage" accept="image/*" @change="PreviewImage()" ref="uploader" class="hidden-uploader" type="file">
                    <q-btn class="btn-upload btn-primary" flat dense no-caps label="Upload" @click="getFile"></q-btn>
                </div>
            </div>

            <div class="company-add__content-info company-add__content-grid">
                <div class="content__input">
                    <div class="content__input-label">Company Name</div>
                    <q-input v-model="input_company_name" outlined dense></q-input>
                </div>
                <div class="content__input">
                    <div class="content__input-label">Location</div>
                     <q-select
                            outlined
                            dense
                            v-model="input_location"
                            use-input
                            input-debounce="1000"
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
                    <!-- <q-input v-model="input_location" outlined dense></q-input> -->
                </div>
                <!-- <div class="company-add__content-info company-add__content-grid">
                    <div class="content__input">
                        <div class="content__input-label">Company Name</div>
                        <q-input v-model="input_company_name" outlined dense></q-input>
                    </div>
                    <div class="content__input">
                        <div class="content__input-label">Location</div>
                        <q-select
                            outlined
                            dense
                            v-model="input_location"
                            use-input
                            input-debounce="1000"
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
                </div> -->
            </div>

            <div class="company-add__content-info">
                <div class="content__select">
                    <div class="content__select-label">Parent</div>
                    <!-- <q-select v-model="parent"  map-options emit-value  option-label="company_name" option-value="_id" :options="company_list" outlined dense></q-select> -->
                        <com-picker :user="this.$user_info" @select=getCompanyData></com-picker>
                </div>
            </div>

            <div class="company-add__content-info">
                <div class="content__title" style="font-weight: 700 !important; font-size: 16px;">Company Type</div>
                <div class="content__title-sub">Choose what type of account are you creating.</div>
                <div class="content__radio-grid">
                    <div class="content__radio">
                        <q-item tag="label" v-ripple dense>
                            <q-item-section avatar top dense>
                                <q-radio v-model="company_type" val="private" color="primary" dense/>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label class="content__radio-title">Private</q-item-label>
                                <q-item-label class="content__radio-details" caption>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, sint consequatur eveniet laudantium in laboriosam quas, nostrum magni quaerat, id eligendi totam nesciunt natus doloribus nemo nam. Porro, vel quis!
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                    </div>
                    <div class="content__radio">
                        <q-item tag="label" v-ripple>
                            <q-item-section avatar top dense>
                                <q-radio v-model="company_type" val="public" color="primary" dense/>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label class="content__radio-title">Public</q-item-label>
                                <q-item-label class="content__radio-details" caption>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, sint consequatur eveniet laudantium in laboriosam quas, nostrum magni quaerat, id eligendi totam nesciunt natus doloribus nemo nam. Porro, vel quis!
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                    </div>
                </div>
            </div>

            <div class="company-add__btn">
                <q-btn class="btn-save btn-primary" flat dense no-caps label="Save" @click="submit"></q-btn>
                <q-btn class="btn-save btn-primary" flat dense no-caps label="Success" @click="is_success_dialog = true"></q-btn>
            </div>
        </div>

        <!-- SUCCESS DIALOG -->
        <q-dialog v-model="is_success_dialog">
            <div>
                <SuccessDialog></SuccessDialog>
            </div>
        </q-dialog>
    </div>
</template>

<script>
import { postAddPerson }                        from '../../../references/url';
import { postGetCompanies, postGetCompany }                     from '../../../references/url';
import  ComPicker from "../../../components/companyPicker/ComPicker"

// External CSS
import "./CompanyManagement.scss";

// Component
import  SuccessDialog from "../../../components/SuccessDialog/SuccessDialog"

export default {
    components: {
        SuccessDialog,
        ComPicker
    },
    data: () =>
    ({
        is_success_dialog: false,
        options_location: [],
        company_type: '',
        input_company_name: '',
        input_location: '',
        parent: '',
        options_parent: [
            'Parent'
        ],
        company_pic: "",
        company_list: [{company_name: 'No Parent'}],
        company_details: {}
    }),
    async mounted()
    {

        this.company_type = "public";
        await this.getCompanies();

        console.log(this.parent, 'jkhjhjhjhg');
    },
    methods:{
        getCompanyData(value)
        {
            console.log(value);
        },
        getValue()
        {

        },
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

        async getCompanies()
        {
            // console.log(this.$user_info);
            // this.company_list.push(this.$user_info.company);
            // console.log(this.company_list);
            // let com_list = [];
            // if(this.company_list.data.length>=1)
            // {
            //     this.company_list.data.forEach((com) => {
            //         if(com.parent_id=="No Parent")
            //         com_list.push( {"_id" : com._id, "company_name" : com.company_name});
            //     })
            //     com_list.splice(0, 0, "No Parent");
            // }
            // else
            // {
            //     com_list.push("No Parent");
            // }
            // this.company_list = com_list;
            // // console.log("etos", this.company_list);
            //  this.parent= this.company_list[0];


        },
        async submit()
        {
            this.$q.loading.show();

            try
            {
                if (this.input_company_name.length <= 2 ){
                    throw new Error("Company Name is required.");
                }
                else if (!this.input_location){
                    throw new Error("Location is required.");
                }
                else if (document.getElementById("uploadImage").files.length <= 0 ){
                    throw new Error("Logo is required.");
                }
                else{
                    let location_coordinates = null
                    if (this.input_location) location_coordinates = await this.$_post('member/get/coordinates', { place_id: this.input_location.place_id }).then(res => res.data);
                    const formData = new FormData();
                    formData.append('image',document.getElementById("uploadImage").files[0] );
                    let res = await this.$_post_file(formData);
                    await this.$_post('member/add/company', { company_name: this.input_company_name, 
                        company_location: this.input_location, 
                        company_type:this.company_type, 
                        company_logo_url: res, 
                        parent_id: this.parent, 
                        location_coordinates: location_coordinates,
                        date_created: new Date()
                        });
                    this.input_company_name = "";
                    this.input_location = "";
                    this.company_type = this.company_type = "public";
                    document.getElementById("uploadImage").value = "";
                    document.getElementById("uploadPreview").src = "/img/placeholder-img.jpg";
                    // this.getCompanies();

                    this.$q.notify(
                    {
                        color: 'green',
                        message: 'Company successfully created!'
                    });

                    this.$router.push({ name: 'member_allcompany' });
                    this.$q.loading.hide();
                }
            }
            catch (e)
            {
                this.$q.loading.hide();
                this.$q.notify(
                {
                    color: 'red',
                    message: e.message
                });
            }

        },
        getFile () {
            this.$refs.uploader.click();

        },
        PreviewImage()
        {
            // console.log("Asd")
            let oFReader = new FileReader();
            oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

            oFReader.onload = function (oFREvent) {
                document.getElementById("uploadPreview").src = oFREvent.target.result;
            };

        }
    }
}
</script>
