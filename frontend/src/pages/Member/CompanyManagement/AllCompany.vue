<template>
    <div class="company-management">
        <div class="company-management__header">
            <div class="header__title">COMPANY MANAGEMENT</div>
            <div class="header__filter">
                <q-input outlined dense placeholder="Search Company...">
                    <template v-slot:append>
                        <q-icon name="mdi-magnify" />
                    </template>
                </q-input>
            </div>
        </div>
        <div class="company-management__container content__grid-3x3">
            <div v-for="(company, i) in this.company_list.data" :key="i"  class="company-management__content content__card">
                <div class="company-management__info-logo">
                    <img :src=company.company_info.company_logo_url>
                </div>
                <div class="company-management__info-content">
                    <div class="company-management__info-btn">
                        <q-btn flat dense rounded :ripple="false" icon="mdi-delete" @click="deleteCompany(i)"></q-btn>
                        <q-btn flat dense rounded :ripple="false" icon="mdi-square-edit-outline" @click="editCompany(i)"></q-btn>
                    </div>
                    <div class="company-management__info-name">
                        {{company.company_info.company_name}}
                    </div>
                    <div class="company-management__info-number">
                        Owned {{company.company_info.subcompanies.length}} Establishment(s)
                    </div>
                    <div class="company-management__info-people">
                        300 People Registered Here
                    </div>
                </div>
            </div>

        </div>
    <q-dialog full-width full-height v-model="is_edit_company_dialog_open">
        <edit-company :company_info="pasData" @closePopup="is_edit_company_dialog_open = false"></edit-company>
    </q-dialog>
    </div>
</template>

<script>
import "./CompanyManagement.scss";
import { postGetCompanies }                         from '../../../references/url';
import { postDeleteCompany }                        from '../../../references/url';
import EditCompany                                  from './Dialogs/EditCompany';
export default {
    components: { EditCompany },
    data: () =>
    ({
        company_list : [],
        is_edit_company_dialog_open: false,
        pasData: {},
    }),
    async mounted(){
        this.company_list = await this.$_post(postGetCompanies);
    },
    methods:{
        async deleteCompany(index)
        {
            this.$q.dialog({
            title: 'Confirm',
            message: `Are you sure to delete this company?`,
            color: 'negative',
            ok: `Yes, I'm sure`,
            cancel: true,
            default: 'cancel'   // <<<<
            }).onOk(async () =>{
              await this.$_post(postDeleteCompany, {id:this.company_list.data[index]._id} )
              this.company_list.data.splice(index, 1);       
              alert("deleted")      
            });
            
            // let asd = await this.$_post(postDeleteCompany, {id:this.company_list.data[index]._id});
        },
        editCompany(index)
        {
            this.is_edit_company_dialog_open = true;
            // console.log(this.company_list.data[index]);
            this.pasData = this.company_list.data[index];
            return this.company_list.data[index];
            
        }
    }

}
</script>
