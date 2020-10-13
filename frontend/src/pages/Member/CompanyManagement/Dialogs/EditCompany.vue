<template>
    <q-card>
        <q-bar class="bg-primary text-white q-pa-lg">
                <q-icon class="q-mr-sm" name="fa fa-edit"></q-icon>
                <b>Edit Company</b>
                <q-space />

                <q-btn dense flat icon="close" v-close-popup>
                    <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
                </q-btn>
            </q-bar>
        <div class="company-add" style="padding:0px">
                <div class="content__box">
                    <div class="header__title">Company Information</div>

                    <div class="company-add__content-info">
                        <div class="content__title">Choose ID</div>
                        <div class="content__img-holder img-holder__sm">
                            
                            <div></div>
                            <!-- <img id="uploadPreview" style="width: 200px; height: 200px;" /> -->
                            <img class="content__img img__sm" id="uploadPreview" :src="company_details.company_logo_url"/>
                            <input style="display:none" id="uploadImage" accept="image/*" @change="PreviewImage()" ref="uploader" class="hidden-uploader" type="file">
                            <q-btn class="btn-upload btn-primary" flat dense no-caps label="Upload" @click="getFile"></q-btn>
                        </div>
                    </div>

                    <div class="company-add__content-info company-add__content-grid">
                        <div class="content__input">
                            <div class="content__input-label">Company Name</div>
                            <q-input v-model="company_details.company_name" outlined dense></q-input>
                        </div>
                        <!-- <div class="content__input">
                            <div class="content__input-label">Location</div>
                            <q-input v-model="typeof(company_details.company_location) == 'object' ? company_details.company_location.description : company_details.company_location" outlined dense></q-input>
                        </div> -->
                    </div>

                    <div class="company-add__content-info">
                        <div class="content__select">
                            <div class="content__select-label">Parent</div>
                            <!-- {{company_list[0].company_info.company_name}} -->
                            <q-input disable v-model="parent" outlined dense></q-input>
                        </div>
                    </div>
                    <div class="company-add__content-info">
                        <div class="content__select-label">
                            <q-checkbox v-model="is_device_owner" label="Is this company a device owner?"/>
                        </div>
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
                            class="q-mb-sm"
                        />
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
                    </div>
                </div>
            </div>
    </q-card>
</template>

<script>
import { postAddPerson }                        from '../../../../references/url';
import { postGetCompanies, postGetCompany }                     from '../../../../references/url';

import "../CompanyManagement.scss";

export default {
    props:
        {
            company_info          : Object,
        },
    data: () =>
    ({
        is_device_owner: true,
        is_open: false,
        company_type: '',
        input_company_name: '',
        input_location: '',
        parent: '',
        company_pic: "",
        company_details: {},
        company_list : [],
        does_picture_change : false,
        company_owners: [],
        owner_name: ''
    }),
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
    async mounted()
    {   
        // this.company_type = this.company_details.company_info.company_type;
        if(this.company_info){
            this.company_details = this.company_info;
            await this.getCompanies(this.company_details)
            if (this.company_details.device_owner == 'Device Owner') this.is_device_owner = true
            else
            {
                let company = await this.$_company({_id: this.company_details.device_owner})
                this.owner_name = company[0].company_name
                this.is_device_owner = false
            }
        }
        await this.getParent();
        this.company_type = this.company_details.company_type
    },
    methods:{
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
        async getCompanies(company)
        {
            if (company && company.parent_id && company.parent_id != 'No Parent')
            {
                let parent = await this.$_post(postGetCompany, {id: company.parent_id})
                this.company_owners.push(parent.data.company_name)
                this.company_list.push(parent.data)

                if (parent.data && parent.data.parent_id != 'No Parent')
                {
                    await this.getCompanies(parent.data)
                }
            }
            console.log(this.company_list);
            return
        },
        async getParent()
        {
            this.company_list = await this.$_post(postGetCompanies);
            let com_list = [];
            
            if(this.company_list.data.length >= 1)
            {
                this.company_list.data.forEach((com) => {
                    if(com._id==this.company_details.parent_id)
                    this.parent = com.company_name;
                    
                })
            }
            else 
            {
                com_list.push("No Parent");
            }
        if(this.parent.length==0)
        {
            this.parent = "No Parent";
        }
        },
        async submit(){
            this.$q.loading.show();
            try
            {
                if (this.company_details.company_name.length <= 2 ){
                    throw new Error("Company Name is required.");
                }
                else if (!company_details.company_logo_url){
                    throw new Error("Company Logo is required.");
                }
                else{
                    if (this.does_picture_change)
                    {
                        const formData = new FormData();
                        formData.append('image',document.getElementById("uploadImage").files[0] );
                        let res = await this.$_post_file(formData);
                        this.company_details.company_logo_url = res;
                    }
                    // this.company_details._id = this.company_info._id;
                    
                    // let pasDat = { _id: this.company_info._id, company_info: this.company_details.company_info }
                    // console.log(this.company_details);
                    this.company_details.company_type = this.company_type;
                    await this.$_post('member/edit/company', this.company_details );
                    this.$q.loading.hide();
                    this.$emit('closePopup');

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
            try{
                this.does_picture_change= true;
                let oFReader = new FileReader();
                oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);
                oFReader.onload = function (oFREvent) {
                    document.getElementById("uploadPreview").src = oFREvent.target.result;
                };
            }
            catch(e){}
            
        },
    }
}
</script>
