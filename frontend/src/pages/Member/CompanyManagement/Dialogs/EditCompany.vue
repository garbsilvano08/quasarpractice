<template>
<div>
    <q-bar class="bg-primary text-white q-pa-lg">
            <q-icon class="q-mr-sm" name="fa fa-edit"></q-icon>
            <b>Edit Comapany</b>
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
                    <div class="content__input">
                        <div class="content__input-label">Location</div>
                        <q-input v-model="company_details.company_location" outlined dense></q-input>
                    </div>
                </div>

                <div class="company-add__content-info">
                    <div class="content__select">
                        <div class="content__select-label">Parent</div>
                        <!-- {{company_list[0].company_info.company_name}} -->
                        <q-select v-model="select_parent" :option-label="com => com.company_name" :options="company_list" :option-value="com => com._id" outlined dense></q-select>
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
                                    <q-radio v-model="company_details.company_type" val="public" color="primary" dense/>
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
                </div>
            </div>
        </div>
</div>
</template>

<script>
import { postAddPerson }                        from '../../../../references/url';
import { postGetCompanies }                     from '../../../../references/url';

import "../CompanyManagement.scss";

export default {
    props:
        {
            company_info          : Object,
        },
    data: () =>
    ({
        company_type: '',
        input_company_name: '',
        input_location: '',
        select_parent: '',
        options_parent: [
            'Parent'
        ],
        company_pic: "",
        company_details: {},
        company_list : [],
    }),
    async mounted()
    {
        // console.log("company info",this.company_info.company_info);
        this.company_list = await this.$_post(postGetCompanies);
        this.company_type = this.company_details.company_type;
        if(this.company_info){
            this.company_details = this.company_info.company_info;
            this.getImgUrl(this.company_details.company_logo_url);
        }
        let com_list = [];
        this.company_list.data.forEach((com) => {
        com_list.push( {"id" : com._id, "company_name" : com.company_info.company_name});
        })
        
        this.company_list = com_list
        console.log("etos", this.company_list);
        // if(this.company_list.length>=1)
        //     {
        //         // this.company_list.data.splice(0, 0, comp{company_name: "No Parent"});
        //     }
        //     else 
        //     {
        //         // this.company_list.data.push( {company_name: "No Parent"} );
        //     }
        // // console.log(this.company_list.data)
    },
    methods:{
        async submit(){
            this.$q.loading.show();
            
            try
            {
                if (this.input_company_name.length <= 2 ){
                    throw new Error("Company Name is required.");
                }
                else if (this.input_location.length <= 2 ){
                    throw new Error("Location is required.");
                }
                else if (document.getElementById("uploadImage").files.length <= 0 ){
                    throw new Error("Logo is required.");
                }
                else{
                    await this.$_post('member/add/company', { company_info: { company_name: this.input_company_name,  company_location: this.input_location , company_type:this.company_type, company_logo: res.path, logo_filename: res.filename} });
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
            
        },
        getImgUrl(path){

            return "http://localhost:4001/images/"+path;
        },
    }
}
</script>
