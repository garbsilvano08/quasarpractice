<template>
    <div class="login">
        <div class="login__banner"></div>
        <div class="login__content">
            <div class="login__title">
                <div class="login__title-primary">
                    <q-img src="../../../assets/vcop-logo.svg"></q-img>
                </div>
                <div class="login__title-sub">Client Login</div>
            </div>
            <div class="login__input">
                <q-input v-model="form_data.username" placeholder="Username" dense borderless>
                    <template v-slot:prepend>
                        <q-icon name="mdi-account-outline" />
                    </template>
                </q-input>
                <q-input v-model="form_data.password" type="password" placeholder="Password" dense borderless>
                    <template v-slot:prepend>
                        <q-icon name="mdi-lock-outline" />
                    </template>
                </q-input>
            </div>
            <div class="login__btn">
                <q-btn flat dense no-caps label="Login" @click="$router.push('/myhealth-dashboard')"></q-btn>
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

import { postLoginUser } from '../../../references/url';

export default
{
    data:() =>
    ({
        form_data:
        {
            username: '',
            password: '',
        },
    }),
    mounted() {},
    methods:
    {
        async submitLogin()
        {
            this.$q.loading.show();
            await this.$axios.post(postLoginUser, this.form_data);
            this.$q.loading.hide();
        }
    },
}
</script>
