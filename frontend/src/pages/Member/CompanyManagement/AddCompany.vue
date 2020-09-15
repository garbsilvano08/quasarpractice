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
                </div>
            </div>
            <div class="company-add__content-info company-add__content-grid">
                <div class="content__input">
                    <div class="company-add__content-info">
                        <div class="content__select-label">Parent</div>
                        <com-picker :user="this.$user_info" @select=getCompanyData></com-picker>
                    </div>
                    <div class="company-add__content-info">
                    </div>
                </div>
                <div class="content__input">
                    <div class="company-add__content-info">
                        <div class="content__select-label">
                            <q-checkbox v-model="is_device_owner" label="Device Owner"/>
                            <!-- Device Owner -->
                        </div>
                        <!-- <com-picker v-show="is_open" :user="this.$user_info" @select=getDeviceOwner></com-picker> -->
                        <q-select
                            v-show="is_open"
                            outlined
                            dense
                            v-model="owner_name"
                            use-input
                            input-debounce="1000"
                            :options="company_owners"
                            option-value="place_id"
                            option-label="description"
                        />
                    </div>
                    <div class="company-add__content-info">
                    </div>
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
                                    Receptionist’s access is limited only to adding of visitors in the company or building. The Front Desk is connected to the SMART PASS/VISION SKY in the tablet. The receptionist will collect information from the person using OCR (Optical Character Recognition, this enables to collect information from the ID presented by the person through scanning.  
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
                                    Receptionist’s access is limited only to adding of fever detected person in the mall.  If the healthbox detected a person with unusual body temperature in the mall, the person will be asked to go to the front desk. The Front Desk will browse the person’s information from the logs which is consist of the Picture of the Person, Temperature, If the person id wearing a mask or not and timestamp.
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                    </div>
                </div>
            </div>

            <div class="company-add__btn">
                <q-btn class="btn-save btn-primary" flat dense no-caps label="Save" @click="submit"></q-btn>
                <!-- <q-btn class="btn-save btn-primary" flat dense no-caps label="Success" @click="is_success_dialog = true"></q-btn> -->
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
        company_details: {},
        is_device_owner: true,
        is_open: false,
        device_owner: {},
        company_owners: [],
        company_list: [],
        owner_name: '',
    }),
    async mounted()
    {
        this.company_details = this.$user_info.company ? this.$user_info.company : {company_name: 'Super Admin'} 
        this.company_type = "private";
        await this.getCompanies();
    },
    
    watch:
    {
        owner_name(val)
        {
            this.getDeviceOwner(val)
        },

        async is_device_owner(val)
        {
            this.company_owners = []
            this.is_open = !this.is_open
            this.company_owners.push(this.company_details.company_name)
            this.company_list.push(this.company_details)
            this.owner_name = this.company_details.company_name
            await this.getCompanies(this.company_details)
        }
    },

    methods:{
        getCompanyData(value)
        {
            // console.log(value);
            this.company_details = value
            this.is_device_owner = true
        },

        getDeviceOwner(name)
        {
            this.device_owner = []
            for (let index = 0; index < this.company_list.length; index++) {
                if ( this.company_list[index].company_name == name ) 
                {
                    this.device_owner = this.company_list[index];
                }
            }
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

        async getCompanies(company)
        {
            
            if (company.parent_id && company.parent_id != 'No Parent')
            {
                let parent = await this.$_post(postGetCompany, {id: company.parent_id})
                this.company_owners.push(parent.data.company_name)
                this.company_list.push(parent.data)

                if(parent.data && parent.data.parent_id != 'No Parent') this.getCompanies(parent.data)
            }
        },
        async submit()
        {
            this.$q.loading.show();
            try
            {
                if (!this.input_location){
                    throw new Error("Location is required.");
                }
                else if (document.getElementById("uploadImage").files.length <= 0 ){
                    throw new Error("Logo is required.");
                }
                else{
                    // console.log(this.company_details);
                    let location_coordinates = null
                    if (this.input_location) location_coordinates = await this.$_post('member/get/coordinates', { place_id: this.input_location.place_id }).then(res => res.data);
                    const formData = new FormData();
                    formData.append('image',document.getElementById("uploadImage").files[0] );
                    let res = await this.$_post_file(formData);
                    await this.$_post('member/add/company', { company_name: this.input_company_name, 
                        company_location: this.input_location, 
                        company_type:this.company_type, 
                        company_logo_url: res, 
                        device_owner: this.is_device_owner ? 'Device Owner' : this.device_owner._id,
                        parent_id: this.company_details.company_name == 'Super Admin' ? 'No Parent' : this.company_details._id, 
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
