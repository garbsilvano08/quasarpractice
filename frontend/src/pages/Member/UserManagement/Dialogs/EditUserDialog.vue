<template>
    <div>
        <q-bar class="bg-primary text-white q-pa-lg">
                <q-icon class="q-mr-sm" name="fa fa-edit"></q-icon>
                <b>Edit User</b>
                <q-space />

                <q-btn dense flat icon="close" v-close-popup>
                    <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
                </q-btn>
        </q-bar>
        <div class="user-add" style="padding:0px">
            <div class="user-add__content content__box">
                <div class="header__title">User Information</div>
                <div class="user-add__content-info">
                    <div class="content__img-holder">
                        <img class="content__img img__sm" id="imagePreview" :src="user_information.user_picture"/>
                        <input style="display:none" id="userImage" accept="image/*" @change="uploadUserImage()" ref="useImageUploader" type="file">
                        <q-btn class="btn-upload btn-primary" flat dense no-caps label="Upload" @click="openFilemanager()"></q-btn>
                    </div>
                </div>
                <div class="user-add__content-info user-add__content-grid">
                    <div class="content__input">
                        <div class="content__input-label">Full Name</div>
                        <q-input v-model="user_information.full_name" outlined dense></q-input>
                    </div>
                    <div class="content__input">
                        <div class="content__input-label">Email Address</div>
                        <q-input disable v-model="user_information.email" outlined dense></q-input>
                    </div>
                </div>
                <div class="user-add__content-info user-add__content-grid">
                    <div class="content__input">
                        <div class="content__input-label">Username</div>
                        <q-input v-model="user_information.username" outlined dense></q-input>
                    </div>
                    <div class="content__input">
                        <div class="content__input-label">Password</div>
                        <q-input v-model="user_information.password" type="password" outlined dense></q-input>
                    </div>
                </div>
                <div class="user-add__content-info">
                    <div class="content__select">
                        <div class="content__select-label">Select a type of User</div>
                        <q-select v-model="user_information.user_type" disable :options="options_user_type" outlined dense></q-select>
                    </div>
                </div>
                <div class="user-add__content-info">
                    <div class="content__select">
                        <div class="content__select-label">Tag a Company</div>
                        <!-- <q-select v-model="user_information.select_tag_company" :options="options_tag_company" outlined dense></q-select> -->
                        <q-select v-model="user_information.company.company_info.company_name" disable :options="options_user_type" outlined dense></q-select>
                        <!-- <com-picker @select=getCompanyData></com-picker> -->
                    

                    </div>
                </div>
                <div class="user-add__btn">
                    <q-btn class="btn-save btn-primary" flat dense @click="submit()" no-caps label="Save"></q-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "../UserManagement.scss";
// import  ComPicker from "../../../components/companyPicker/ComPicker"

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

export default {
    // components: { ComPicker },
    props:
        {
            user_info          : Object,
        },
    data: () => ({
        user_information:{
            full_name: '',
            email: '',
            username: '',
            password: '',
            user_type: '',
            company: {company_info:{company_name:""}},
            does_picture_change : false,
        },
        options_user_type: [
            'Admin',
            'Receptionist',
            'Technician'
        ],  
        options_tag_company: [
            'Green Sun Hotel'
        ]
    }),
    mounted()
    {
        console.log(this.user_info);
        if(this.user_info){
            this.user_information = this.user_info;
        }
        console.log(this.user_information)
    },
    methods:
    {

        async submit()
        {

            
            try
            {
                if (this.user_information.full_name <= 2 ){
                    throw new Error("Full Name is required.");
                }
                else if (this.user_information.email <= 2 ){
                    throw new Error("Email is required.");
                }
                else if (this.user_information.username <= 2 ){
                    throw new Error("Username is required.");
                }
                else if (this.user_information.password <= 2 ){
                    throw new Error("Password is required.");
                }
                else if (this.user_information.user_type =="" ){
                    throw new Error("User Type is required.");
                }
                else if (isEmpty(this.user_information.company)){
                    throw new Error("select company.");
                }
                else if (document.getElementById("userImage").files.length <= 0 ){
                    throw new Error("Picture is required.");
                }
                else if (this.user_information.user_type =="Receptionist"){
                    if (this.user_information.company.company_info.parent_id== "No Parent")
                    throw new Error("Receptionist can only create on branch company.");
                }
                else{
                    this.$q.loading.show();
                    const formData = new FormData();
                    formData.append('image',document.getElementById("userImage").files[0] );
                    let res = await this.$_post_file(formData);
                    this.user_information.user_picture = res;
                    await this.$_post('member/edit/user',  this.user_information );

                    this.user_information={
                        full_name: '',
                        email: '',
                        username: '',
                        password: '',
                        user_type: '',
                        company: {},
                    }
                    document.getElementById("userImage").value = "";
                    document.getElementById("imagePreview").src = "../../../assets/Member/placeholder-img.jpg";
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
        openFilemanager()
        {
            this.$refs.useImageUploader.click()
        },
        uploadUserImage()
        {
            let oFReader = new FileReader();
            oFReader.readAsDataURL(document.getElementById("userImage").files[0]);

            oFReader.onload = function (oFREvent) {
                document.getElementById("imagePreview").src = oFREvent.target.result;
            };
            this.does_picture_change= true;

        }

        

    }
}
</script>
