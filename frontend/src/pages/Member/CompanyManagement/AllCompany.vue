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
                <q-btn @click="addCompany" class="btn-primary btn-add" flat dense no-caps>
                    Add Company
                </q-btn>
            </div>
        </div>
        <div class="company-management__container content__grid-3x3">
            <div v-for="(company, i) in this.company_list" :key="i"  class="company-management__content content__card">
                <div class="company-management__info-logo">
                    <img :src=company.company_logo_url>
                </div>
                <div class="company-management__info-content">
                    <div class="company-management__info-btn">
                        <q-btn flat dense rounded :ripple="false" icon="mdi-delete" @click="deleteCompany(i)"></q-btn>
                        <q-btn flat dense rounded :ripple="false" icon="mdi-square-edit-outline" @click="editCompany(i)"></q-btn>
                    </div>
                    <div class="company-management__info-name">
                        {{company.company_name}}
                    </div>
                    <div class="company-management__info-number">
                        Owned {{company.subcompanies.length}} Establishment(s)
                    </div>
                    <div class="company-management__info-people">
                        <!-- 300 People Registered Here -->
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
import { log } from 'util';
export default {
    components: { EditCompany },
    data: () =>
    ({
        company_list : [],
        is_edit_company_dialog_open: false,
        pasData: {},
    }),
    async mounted(){
        if (this.$user_info.user_type == 'Super Admin')
        {
            await this.$_post(postGetCompanies);
        }
        else if (this.$user_info.company)
        {
            let companies = null
            if (this.$user_info.company.subcompanies && this.$user_info.company.subcompanies.length)
            {
                companies = this.$user_info.company.subcompanies
            }

            companies.push(this.$user_info.company._id)
            await this.getCompanyList({_id: {$in: companies}})
        }
    },
    methods:{
        async getCompanyList(params)
        {
            let subcompanies = []
            let companies = await this.$_post(postGetCompanies, {find_company: params});
            for (let index = 0; index < companies.data.length; index++) {
               this.company_list.push(companies.data[index])
               if (companies.data[index].subcompanies && companies.data[index].subcompanies.length)
               {
                   for (let i = 0; i < companies.data[index].subcompanies.length; i++) {
                       subcompanies.push(companies.data[index].subcompanies[i])
                   }
               }
            }
            if (subcompanies.length) this.getCompanyList({_id: {$in: subcompanies}})
        },
        addCompany()
        {
            this.$router.push({ name: 'member_addcompany' });
        },

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
                this.$q.loading.show();
                await this.$_post(postDeleteCompany, { id:this.company_list.data[index]._id} )
                this.$q.loading.hide();
                this.company_list.data.splice(index, 1);
            });
        },
        editCompany(index)
        {
            this.is_edit_company_dialog_open = true;
            this.pasData = this.company_list.data[index];
            return this.company_list.data[index];

        }
    }

}
</script>
