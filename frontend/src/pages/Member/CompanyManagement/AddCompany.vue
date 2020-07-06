<template>
    <div class="company-add">
        <div class="header__title">ADD COMPANY</div>
            <div class="content__box">
                <div class="header__title">Company Information</div>

                <div class="company-add__content-info">
                    <div class="content__title">Choose ID</div>
                    <div class="content__img-holder img-holder__sm">
                         
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
                        <q-input v-model="input_location" outlined dense></q-input>
                    </div>
                </div>

                <div class="company-add__content-info">
                    <div class="content__select">
                        <div class="content__select-label">Parent</div>
                        <q-select v-model="select_parent" :options="options_parent" outlined dense></q-select>
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
                </div>
            </div>
        </div>
</template>

<script>
import { postAddPerson }                        from '../../../references/url';

import "./CompanyManagement.scss";

export default {
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
    }),
    mounted()
    {
        this.select_parent= this.options_parent[0];
        this.company_type = "private";
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
                    const formData = new FormData();
                    formData.append('image',document.getElementById("uploadImage").files[0] ); 
                    let res = await this.$_post_file(postAddPerson, formData);
                    await this.$_post('member/add/company', { company_info: { company_name: this.input_company_name,  location: this.input_location , company_type:this.company_type, company_logo: res.path, logo_filename: res.filename} });
                    this.input_company_name = "";
                    this.input_location = "";
                    this.company_type = this.company_type = "";
                    document.getElementById("uploadImage").value = "";
                    document.getElementById("uploadPreview").src = "/img/placeholder-img.jpg";
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
