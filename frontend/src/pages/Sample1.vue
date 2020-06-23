<template>
   <div class="q-pa-lg">
        <!-- <q-btn @click="is_add_form_shown = true" color="primary">Add User</q-btn> -->
        <q-btn @click="is_add_form_shown = true" color="primary">Login</q-btn>
        <!-- User List -->
        <div v-if="users_list.length > 0">
            <ul>
                <li v-for="user in users_list" :key="user.id">
                    {{ user.fullname  }} ({{ user.username }})
                </li>
            </ul>
        </div>
        <div class="text-center" v-else>
            <q-spinner color="primary" size="3em"/>
        </div>

        <!-- Add Form -->
        <!-- <q-dialog transition-show="slide-down" transition-hide="fade" class="text-left" v-model="is_add_form_shown">
            <sample-1-add-dialog @success="getUsers()"></sample-1-add-dialog>
        </q-dialog> -->

        <q-dialog transition-show="slide-down" transition-hide="fade" class="text-left" v-model="is_add_form_shown">
            <login-dialog></login-dialog>
        </q-dialog>
   </div>
</template>

<script>
import { postUserList } from '../references/url';
import Sample1AddDialog from './Sample1AddDialog';
import LoginDialog      from './LoginDialog';

export default
{
   data:() =>
   ({
        is_add_form_shown: false,
        users_list: [],
   }),
   components: { Sample1AddDialog, LoginDialog },
    mounted()
    {
        console.log(navigation);
        alert(123);
        this.getUsers();
    },
   methods:
   {
        getUsers()
        {
            this.is_add_form_shown = false,
            setTimeout(() =>
            {
                this.$axios.post(postUserList).then((response) =>
                {
                    // this.$q.notify(JSON.stringify(response.data))
                    this.users_list = response.data;
                    // this.$q.loading.hide();
                }).catch((e) =>
                {
                    this.$q.notify(e.message);
                    // this.$q.loading.hide();
                }) 
            }, 1000)

        }
   },
}
</script>