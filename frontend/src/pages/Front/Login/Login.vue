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
                <q-img v-show="this.show" class="content__img" :src="person_image"></q-img>
                <canvas v-show="this.show == false" class="content__img"  border icon="mdi-camera" id="canvas" width="640" height="480"></canvas>
                <!-- <video v-show="is_carturing" class="content__img" id="video" width="500" height="500" autoplay></video> -->
                <!-- <q-img class="content__img" :src="personal_information.account_img ? personal_information.account_img : '/img/placeholder-img.jpg'"></q-img> -->
                <!-- <input style="display:none" capture="camera" id="uploadImage" accept="image/*" @change="uploadImage()" ref="uploader" type="file"> -->
                <q-btn class="btn-upload btn-primary" flat dense no-caps label="Capture Face"  @click="openCamera()"></q-btn>
                  <q-dialog v-model="open_camera">
                    <q-card>
                        <q-card-section class="row items-center q-pb-none">
                        <div class="text-h6">Capture Image</div>
                        <q-space />
                        <q-btn icon="close" flat round dense v-close-popup />
                        </q-card-section>

                        <q-card-section>
                            <div class="text-center">
                                <video id="video" width="500" height="500" autoplay></video>
                                <q-btn icon="mdi-camera" @click="scanFace()" id='snap'></q-btn>
                            </div>
                        </q-card-section>
                    </q-card>
                  </q-dialog>
                <!-- <q-btn flat dense no-caps class="btn-primary" label="Facial Scan" @click="scanFace"></q-btn> -->
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
import { log } from 'util';

export default
{
    data:() =>
    ({
        show: true,
        person_img: '',
        person_image: '',
        open_camera: false,
        form_data:
        {
            email: '',
            password: '',
        },
    }),
    mounted() {},
    watch:
    {
        open_camera(val)
        {
            if (val)
            {
                console.log(navigator.mediaDevices);
                if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    // Not adding `{ audio: true }` since we only want video now
                navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
                    //video.src = window.URL.createObjectURL(stream);
                    video.srcObject = stream;
                    video.play();
                });
                }
            }
        }
    },
    methods:
    {
        openCamera()
        {
            var canvas = document.getElementById('canvas');
            var context = canvas.getContext('2d');
            var video = document.getElementById('video');
            this.open_camera = true
        },
        async scanFace()
        {

        },

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
                    ( res.data.device ? 
                    this.$router.push({ name: 'member_mobile_dashboard' }) :
                    this.$q.notify(
                    {
                        color: 'red',
                        message: 'This user is not allowed!'
                    })
                    ) :
                    this.$router.push({ name: 'member_dashboard' })

            }

            this.$q.loading.hide();
        }
    },
}
</script>
