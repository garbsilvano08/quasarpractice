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
                    <img :src=getImgUrl(company.company_info.logo_filename)>
                </div>
                <div class="company-management__info-content">
                    <div class="company-management__info-btn">
                        <q-btn flat dense rounded :ripple="false" icon="mdi-delete" @click="deleteCompany(i)"></q-btn>
                        <q-btn flat dense rounded :ripple="false" icon="mdi-square-edit-outline"></q-btn>
                    </div>
                    <div class="company-management__info-name">
                        {{company.company_info.company_name}}
                    </div>
                    <div class="company-management__info-number">
                        Owned 2 Establishment(s)
                    </div>
                    <div class="company-management__info-people">
                        300 People Registered Here
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import "./CompanyManagement.scss";
import { postGetCompanies }                        from '../../../references/url';
import { postDeleteCompany }                        from '../../../references/url';

export default {
    data: () =>
    ({
        company_list : [],
    }),
    async mounted(){
        this.company_list = await this.$_post(postGetCompanies);
    },
    methods:{
        getImgUrl(path){

            return "http://localhost:4001/images/"+path;
        },
        async deleteCompany(index)
        {
            let asd = await this.$_post(postDeleteCompany, {id:this.company_list.data[index]._id});
        }
    }

}
</script>
