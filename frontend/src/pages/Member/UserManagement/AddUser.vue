<template>
    <div class="user-add">
        <div class="header__title">ADD USER</div>
        <div class="user-add__content content__box">
            <div class="header__title">User Information</div>
            <div class="user-add__content-info">
                <div class="content__img-holder">
                    <img class="content__img img__sm" src="../../../assets/Member/placeholder-img.jpg"/>
                    <q-btn class="btn-upload btn-primary" flat dense no-caps label="Upload"></q-btn>
                </div>
            </div>
            <div class="user-add__content-info user-add__content-grid">
                <div class="content__input">
                    <div class="content__input-label">Full Name</div>
                    <q-input v-model="input_fullname" outlined dense></q-input>
                </div>
                <div class="content__input">
                    <div class="content__input-label">Email Address</div>
                    <q-input v-model="input_email" outlined dense></q-input>
                </div>
            </div>
            <div class="user-add__content-info user-add__content-grid">
                <div class="content__input">
                    <div class="content__input-label">Username</div>
                    <q-input v-model="input_username" outlined dense></q-input>
                </div>
                <div class="content__input">
                    <div class="content__input-label">Password</div>
                    <q-input v-model="input_password" outlined dense></q-input>
                </div>
            </div>
            <div class="user-add__content-info">
                <div class="content__select">
                    <div class="content__select-label">Select a type of User</div>
                    <q-select v-model="select_user_type" :options="options_user_type" outlined dense></q-select>
                </div>
            </div>
            <div class="user-add__content-info">
                <div class="content__select">
                    <div class="content__select-label">Tag a Company</div>
                    <q-select v-model="select_tag_company" :options="options_tag_company" outlined dense></q-select>
                </div>
            </div>
            <div class="user-add__btn">
                <q-btn class="btn-save btn-primary" flat dense no-caps label="Save"></q-btn>
            </div>
        </div>
    </div>
</template>

<script>
import "./UserManagement.scss";

export default {
    data: () => ({
        input_fullname: '',
        input_email: '',
        input_username: '',
        input_password: '',
        select_user_type: '',
        options_user_type: [
            'Company Admin'
        ],
        select_tag_company: '',
        options_tag_company: [
            'Green Sun Hotel'
        ]
    }),
}
</script>
