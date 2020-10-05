<template>
    <div class="login">
        <div class="login__banner"></div>
        <div class="login__content">
            <div class="login__title">
                <div class="login__title-primary">
                    <q-img @click="createAdmin()" src="../../../assets/vcop-logo.svg"></q-img>
                </div>
                <div class="login__title-sub">Client Login</div>
            </div>
            <div class="login__input">
                <q-input v-model="form_data.email" placeholder="Username" dense borderless @keypress.enter.native="submitLogin">
                    <template v-slot:prepend>
                        <q-icon name="mdi-account-outline" />
                    </template>
                </q-input>
                <q-input v-model="form_data.password" type="password" placeholder="Password" dense borderless  @keypress.enter.native="submitLogin">
                    <template v-slot:prepend>
                        <q-icon name="mdi-lock-outline" />
                    </template>
                </q-input>
            </div>
            <div class="login__btn">
                <q-btn flat dense no-caps class="btn-primary" label="Login" @click="submitLogin"></q-btn>
            </div>
            <div class="login__footer">
                Copyright © 2020 VCOP, All Rights Reserved.
            </div>
        </div>
    </div>
    <!-- <div>
        <q-form @submit="submitLogin()" class="login q-pa-lg">
            <div class="title">Sign In</div>
            <div class="subtitle">Enter your e-mail and password</div>
            <div class="fieldset q-mt-md">
                <label class="text-bold">
                    E-mail / Username
                </label>
                <div class="field">
                    <q-input v-model="form_data.username" outlined dense></q-input>
                </div>
            </div>
            <div class="fieldset q-mt-sm">
                <label class="text-bold">
                    Password
                </label>
                <div class="field">
                    <q-input type="password" v-model="form_data.password" outlined dense></q-input>
                </div>
            </div>
            <div class="fieldset">
                <q-btn type="submit" color="primary full-width q-mt-md" unelevated>Login</q-btn>
            </div>
        </q-form>
    </div> -->
</template>

<script>
// EXTERNAL CSS
import "./Login.scss";

import { postLoginUser, postCreateAdmin } from '../../../references/url';

export default
{
    data:() =>
    ({
        form_data:
        {
            email: '',
            password: '',
        },
    }),
    mounted() {},
    methods:
    {
        async createAdmin()
        {
            this.$q.loading.show();
            await this.$_post(postCreateAdmin);
            this.$q.loading.hide();
        },
        async submitLogin()
        {
            this.$q.loading.show();

            let res = await this.$_post(postLoginUser, this.form_data);

            if(res)
            {
                this.$store.commit('user/updateUser', res.data)
                localStorage.setItem("auth", JSON.stringify(res.data));
                this.$_isMobile() ?
                    this.$router.push({ name: 'member_mobile_dashboard' }) :
                    this.$router.push({ name: 'member_dashboard' })

            }

            this.$q.loading.hide();
        }
    },
}
</script>
