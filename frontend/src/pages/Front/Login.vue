<template>
   <div>
       <q-form @submit="submitLogin()" class="login q-pa-lg">
           <div @dblclick="createAdmin()" class="title">Sign In</div>
           <div class="subtitle">Enter your e-mail and password</div>
           <div class="fieldset q-mt-md">
               <label class="text-bold">
                   E-mail / Username
               </label>
               <div class="field">
                   <q-input v-model="form_data.email" outlined dense></q-input>
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
               <q-btn type="button" color="primary full-width q-mt-sm" outline>Forgot Password</q-btn>
           </div> 
       </q-form>
   </div>
</template>

<script>
import { postLoginUser }                    from '../../references/url';
import { postCreateAdmin }                  from '../../references/url';

export default
{
    data:() =>
    ({
        form_data:
        {
            email: 'guillermotabligan@gmail.com',
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
                console.log(res);
                this.$store.commit('user/updateUser', res.data)
                localStorage.setItem("auth", JSON.stringify(res.data));
                this.$router.push({ name: 'member_dashboard' });
            }

            this.$q.loading.hide();
        }
    },
}
</script>

<style lang="scss">
.login {
    background-color: #fff;
    margin: auto;
    width: 600px;
    margin-top: 100px;
    border-radius: 5px;

    .title {
        text-align: center;
        font-size: 30px;
        font-weight: 500;
    }
    .subtitle {
        text-align: center;
        color: #666;
    }
}
</style>