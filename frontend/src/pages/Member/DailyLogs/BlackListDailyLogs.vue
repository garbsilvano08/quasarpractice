<template>
    <div class="daily-logs">
        <div class="daily-logs__header">
            <div class="header__title">DAILY LOGS</div>
            <div class="header__filter">
                <q-btn class="btn-outline btn-export" flat dense no-caps>
                    Export &nbsp;<q-icon name="mdi-export"></q-icon>
                </q-btn>
                <com-picker class="select-lg" @select=getCompanyData></com-picker>
                <!-- <q-select class="select-lg" v-model="select__id_type" :options="options_name" outlined dense></q-select> -->
            </div>
        </div>
        <div class="daily-logs__header" style="margin-bottom: 30px !important;">
            <div class="content__title">BLACKLIST</div>
            <div class="header__filter">
                <q-input outlined dense placeholder="Search People...">
                    <template v-slot:append>
                        <q-icon name="mdi-magnify" />
                    </template>
                </q-input>
                <q-input type="date" class="select-sm" v-model="select__date"  outlined dense></q-input>
            </div>
        </div>
        <div class="content__grid-4x4">
            <div v-for="(person, index) in this.blacklist.data" :key="index">
                <DailyLogCards :staff_logs="person"></DailyLogCards>
            </div>
            <!-- <DailyLogCards></DailyLogCards>
            <DailyLogCards></DailyLogCards>
            <DailyLogCards></DailyLogCards> -->
        </div>
    </div>
</template>

<script>
import "./DailyLogs.scss";

// Components
import DailyLogCards from "components/DailyLogCards/DailyLogCards"
import  ComPicker from "../../../components/companyPicker/ComPicker"

import { postGetCompanies, postFindLogs, postPersonByCateg, postExpFeverDeteted } from '../../../references/url';

export default {
    components: {
        DailyLogCards,
        ComPicker
    },
    data: () => ({
        select__id_type: '',
        select__date: new Date().toISOString().split('T')[0],
        options_name: [
            'Green Sun Hotel', 'SM Mall' , 'WalterMart'
        ],
        options_date: [
            '6/24/2020', '6/23/2020' , '6/22/2020'
        ],
        blacklist: "",
        company_details: ''
    }),
    methods:{
         async getCompanyData(value)
        {
            this.company_details = value
            // console.log(this.company_details);
            // this.getTotalScannedToday(new Date(), value._id)
            if (value) this.staff_list = await this.getBlacklist({category: 'Blacklist', date_logged: this.select__date, company_id: value._id})
            else this.staff_list = await this.getBlacklist({category: 'Blacklist', date_logged: this.select__date})
        },
        async getBlacklist(params, sort)
        {
            return await this.$_post(postPersonByCateg, {find_by_category: params, sort: sort} );
        }
    },
    async mounted()
    {
        this.blacklist = await this.getBlacklist({category: 'Blacklist', date_logged: this.select__date})
        console.log(this.blacklist);
    }
}
</script>
