<template>
    <div class="user-add">
        <div class="header__title">ADD USER</div>
        <div class="user-add__content content__box">
            <div class="header__title">User Information</div>
            <div class="user-add__content-info">
                <div class="content__img-holder">
                    <img class="content__img img__sm" id="imagePreview" src="../../../assets/Member/placeholder-img.jpg"/>
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
                    <q-input v-model="user_information.email" outlined dense></q-input>
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
                    <q-select v-model="user_information.user_type" :options="options_user_type" outlined dense></q-select>
                </div>
            </div>
            <div class="user-add__content-info">
                <div class="content__select">
                    <div class="content__select-label">Tag a Company</div>
                    <!-- <q-select v-model="user_information.select_tag_company" :options="options_tag_company" outlined dense></q-select> -->

                    <com-picker :user="this.$user_info" @select=getCompanyData class="btn-choose"></com-picker>
                </div>
            </div>
            <div class="user-add__btn">
                <q-btn class="btn-save btn-primary" flat dense @click="submit()" no-caps label="Save"></q-btn>
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
import "./UserManagement.scss";

// Component
import  SuccessDialog from "../../../components/SuccessDialog/SuccessDialog"
import  ComPicker from "../../../components/companyPicker/ComPicker"

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

export default {
    components: {
        ComPicker,
        SuccessDialog
        },
    data: () => ({
        is_success_dialog: false,
        user_information:{
            full_name: '',
            email: '',
            username: '',
            password: '',
            user_type: '',
            company: {},
        },
        options_user_type: [
            'Admin',
            'Receptionist',
            'Technician',
            'Officer'
        ],
        options_tag_company: [
            'Green Sun Hotel'
        ]
    }),
    mounted()
    {
        this.user_information.user_type = this.options_user_type[0];
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
                else if ((this.user_information.user_type =="Receptionist") && (this.user_information.company.parent_id== "No Parent")){
                    throw new Error("Receptionist can only create on branch company.");
                }
                else{
                    this.$q.loading.show();
                    const formData = new FormData();
                    formData.append('image',document.getElementById("userImage").files[0] );
                    let res = await this.$_post_file(formData);
                    this.user_information.company_id = this.user_information.company._id
                    this.user_information.user_picture = res;
                    await this.$_post('member/add/user',  this.user_information );

                    this.user_information={
                        full_name: '',
                        email: '',
                        username: '',
                        password: '',
                        user_type: '',
                        company: {},
                    }
                    document.getElementById("userImage").value = "";
                    document.getElementById("imagePreview").src = "/img/placeholder-img.jpg";


                    this.$q.loading.hide();

                    this.$q.notify(
                    {
                        color: 'green',
                        message: 'User successfully created!'
                    });

                    this.$router.push({ name: 'member_alluser' });
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
        getCompanyData(value)
        {
            this.user_information.company = value;
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


        }



    }
}
</script>
