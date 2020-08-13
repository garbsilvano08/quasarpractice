<template>
    <div>
        <q-btn dense no-caps flat class="btn-outline btn-choose" align="between">
            <span>{{value.company_name ? value.company_name : "Choose"}}</span>
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
                            <q-item clickable v-close-popup @click="getValue(getSubCompanyDetails(membership))" >
                                <q-item-section>
                                    <q-item-label class="q-ml-md" >{{ getSubCompanyDetails(membership).company_name}}</q-item-label>
                                </q-item-section>
                            </q-item>
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
        getParentCompanies()
        {
            this.company_list.data.forEach((com) => {
                if(com.parent_id == "No Parent")
                {
                    this.parent_companies.push(com);
                }
            })
        },
        getSubCompanies(subCom)
        {
                // console.log(subCom)
                return subCom

        },
        getSubCompanyDetails(subId)
        {
            // console.log(subId);
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
.btn-choose {
    padding: 3px 10px !important;
    width: 200px !important;
}
</style>
