<template>
    <div>
        <q-btn dense no-caps flat class="btn-outline btn-choose" align="between">
            <span>{{value.company_name ? value.company_name : "Super Admin"}}</span>
            <q-icon size="small" class="icon" name="fa fa-caret-down"></q-icon>
            <q-menu fit>
                <q-list style="min-width: 200px">
                    <div v-for="(data, i) in this.parent_companies" :key="i">
                        <q-item clickable @click="getValue(data)" v-close-popup>
                            <q-item-section>
                                <q-item-label>{{data.company_name}}</q-item-label>
                            </q-item-section>
                        </q-item>
                        <div v-for="(membership, a) in getSubCompanies(data.subcompanies)" :key="a">
                            <div></div>
                            <q-item clickable v-close-popup @click="getValue(getSubCompanyDetails(membership))" >
                                <q-item-section>
                                    <q-item-label class="q-ml-md" >{{ getSubCompanyDetails(membership).company_name}}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <div v-for="(sub, a) in getSubCompanyDetails(membership).subcompanies" :key="a">
                                <q-item clickable v-close-popup @click="getValue(getSubCompanyDetails(sub))" >
                                    <q-item-section>
                                        <q-item-label class="q-ml-xl" >{{ getSubCompanyDetails(sub).company_name ?  getSubCompanyDetails(sub).company_name : null}}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </div>
                        </div>
                    </div>
                </q-list>
            </q-menu>
        </q-btn>
    </div>
</template>

<script>
import { postGetCompanies, postGetCompany }                     from '../../references/url';
export default {
    props:
    {
        user: Object
    },
    data: () => ({
        company_list: [],
        parent_companies: [],
        value : {   company: "" },
    }),
    async mounted()
    {
        if (this.$user_info.company || !this.$user_info.user_type == 'Super Admin') this.value = this.$user_info.company


        this.company_list = await this.$_post(postGetCompanies);
        // console.log(this.company_list.data)
        this.getParentCompanies();
        // console.log(this.parent_companies);
    },
    methods:
    {
        async getCompany(company_id)
        {
            return await this.$_post(postGetCompany, {id: company_id})
        },

        async getParentCompanies()
        {
            if (this.user.user_type == "Super Admin")
            {
                this.parent_companies.push({company_name: "Super Admin"});
                this.company_list.data.forEach((com) => {
                    if(com.parent_id == "No Parent")
                    {
                        this.parent_companies.push(com);
                    }
                })
            }
            else if (this.user.user_type == 'Admin')
            {
                
                let user_company = await this.getCompany(this.$user_info.company._id)
                this.parent_companies.push(user_company.data);
            }
        },
        getSubCompanies(subCom)
        {
                // console.log(subCom, 'sub')
                return subCom

        },
        getSubCompanyDetails(subId)
        {
            // console.log(this.company_list.data)
            let retVal = "";
            this.company_list.data.forEach((com) => {
                if(com._id==subId)
                {
                    // console.log("loop",com.company_info.company_name);
                   retVal = com;
                }
            })
            return retVal;
        },
        getValue(data)
        {
            this.value = data;
            this.$emit('select', data)
        }

    }
}
</script>

<style lang="scss" scoped>
.btn-choose[data-v-6ba98f6a] {
    padding: 3px 10px !important;
    width: 100%;
}
</style>
