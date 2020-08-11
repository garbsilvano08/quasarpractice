<template>
    <div class="user-management">
        <div class="user-management__header">
            <div class="header__title">ALL USERS</div>
            <div class="header__filter">
                <q-btn class="btn-primary btn-add" flat dense no-caps>
                    Add User
                </q-btn>
            </div>
        </div>
        <div class="user-management__container content__box">
            <div  v-for="(user, i) in this.users_list.data" :key="i" class="user-management__info-content">
                <q-img :src="user.user_picture"></q-img>
                <div class="user-management__info-user">
                    <div class="user-management__info-name">{{user.full_name}}</div>
                    <div class="user-management__info-email">{{user.email}}</div>
                </div>
                <div class="user-management__info-action">
                    <div class="user-management__info-details">
                        <span>{{user.user_type}}</span><br>
                        Date Created: {{(new Date(user.date_created).getMonth()+1).toString().padStart(2, "0")+'/'+new Date(user.date_created).getDate().toString().padStart(2, "0")+'/'+(new Date(user.date_created).getFullYear()-1)}}
                    </div>
                    <div class="user-management__btn">
                        <q-btn flat dense class="btn-outline" icon="mdi-delete" @click="deleteUser(i)"></q-btn>
                        <q-btn flat dense class="btn-outline" icon="mdi-square-edit-outline" @click="editUser(i)"></q-btn>
                    </div>
                </div>
            </div>
        </div>
        <q-dialog v-model="is_edit_user_dialog_open" full-width>
            <edit-user-dialog :user_info = "pasData" @closePopup="is_edit_user_dialog_open=false" ></edit-user-dialog>
        </q-dialog>
    </div>
</template>

<script>
import "./UserManagement.scss";
import EditUserDialog from "./Dialogs/EditUserDialog"

export default {
    components: { EditUserDialog },
    data: () =>
    ({
        users_list : [],
        is_edit_user_dialog_open : false,
        pasData : {},
    }),
    async mounted(){
        this.users_list = await this.$_post('member/get/user');
    },
    methods:
    {
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
        async editUser(index)
        {
            this.is_edit_user_dialog_open = true;
            this.pasData= this.users_list.data[index];
        }
    }
}
</script>
