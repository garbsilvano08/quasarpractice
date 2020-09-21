<template>
    <div class="user-management">
        <div class="user-management__header">
            <div class="header__title">ALL USERS</div>
            <div class="header__filter">
                <q-btn @click="addUser" class="btn-primary btn-add" flat dense no-caps>
                    Add User
                </q-btn>
            </div>
        </div>
        <div class="user-management__container content__box">
            <div  v-for="(user, i) in this.users_list" :key="i" class="user-management__info-content">
                <q-img :src="user.user_picture"></q-img>
                <div class="user-management_ _info-user">
                    <div class="user-management__info-name">{{user.full_name}}</div>
                    <div class="user-management__info-email">{{user.email}}</div>
                </div>
                <div class="user-management__info-action">
                    <div class="user-management__info-details">
                        <span>{{user.user_type}}</span><br>
                        Date Created: {{(new Date(user.date_created).getMonth()+1).toString().padStart(2, "0")+'/'+new Date(user.date_created).getDate().toString().padStart(2, "0")+'/'+(new Date(user.date_created).getFullYear())}}
                    </div>
                    <div class="user-management__btn">
                        <q-btn :disabled="checkCompany(user)" flat dense class="btn-outline" icon="mdi-delete" @click="deleteUser(i)"></q-btn>
                        <q-btn flat dense class="btn-outline" icon="mdi-square-edit-outline" @click="editUser(user)"></q-btn>
                    </div>
                </div>
            </div>
        </div>
        <q-dialog v-model="is_edit_user_dialog_open" full-width>
            <edit-user-dialog :user_info="pasData" @closePopup="is_edit_user_dialog_open=false" ></edit-user-dialog>
        </q-dialog>
    </div>
</template>

<script>
import "./UserManagement.scss";
import EditUserDialog from "./Dialogs/EditUserDialog"
import { log } from 'util';

export default {
    components: { EditUserDialog },
    data: () =>
    ({
        users_list : [],
        is_edit_user_dialog_open : false,
        pasData : {},
    }),
    async mounted(){
        let company_id = []
        if (this.$user_info.user_type =='Super Admin')
        {
            console.log('kjhkhjk');
            // let data = await this.$_post('member/get/user');
            this.users_list = await this.getUsers()
        }
        else 
        {
            // this.users_list = await this.getUsers({company})
            // console.log(this.users_list);
            company_id.push(this.$user_info.company_id)
            for (let index = 0; index < this.$user_info.company.subcompanies.length; index++) {
                    company_id.push(this.$user_info.company.subcompanies[index])
            }
            await this.allUsers(company_id)
        }



        // this.users_list
    },
    methods:
    {
        checkCompany(user_info)
        {
            if (user_info._id == this.$user_info._id) return true
        },

        async allUsers(company_id)
        {
            for (let index = 0; index < company_id.length; index++) {
                let users = await this.getUsers({id: {'$in': company_id[index]}})
                for (let sub = 0; sub < users.length; sub++) {
                    this.users_list.push(users[sub]);
                }
            }
        },
        async getUsers(params = {})
        {
            let data = await this.$_post('member/get/user', params);
            console.log(data);
            return data.data
        },
        addUser()
        {
            this.$router.push({ name: 'member_adduser' });
        },
        async deleteUser(index){
            this.$q.dialog({
            title: 'Confirm',
            message: `Are you sure to delete this user?`,
            color: 'negative',
            ok: `Yes, I'm sure`,
            cancel: true,
            default: 'cancel'   // <<<<
            }).onOk(async () =>{
                this.confirmDelete(index);
            });

        },
        async confirmDelete(index)
        {
            this.$q.loading.show();
            await this.$_post('member/delete/user', this.users_list.data[index] );
            this.users_list.data.splice(index, 1);
            this.$q.loading.hide();
        },
        async editUser(user_info)
        {
            this.pasData= user_info
            this.is_edit_user_dialog_open = true;
        }
    }
}
</script>
