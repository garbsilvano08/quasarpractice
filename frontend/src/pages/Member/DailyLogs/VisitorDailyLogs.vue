<template>
    <div class="daily-logs">
        <div class="daily-logs__header">
            <div class="header__title">DAILY LOGS</div>
            <div class="header__filter">
                <q-btn class="btn-outline btn-export" flat dense no-caps>
                    Export &nbsp;<q-icon name="mdi-export"></q-icon>
                </q-btn>
                <com-picker @select=getCompanyData></com-picker>
                <!-- <q-select class="select-lg" v-model="select__id_type" :options="options_name" outlined dense></q-select> -->
            </div>
        </div>
        <div class="daily-logs__header" style="margin-bottom: 30px !important;">
            <div class="content__title">VISITOR</div>
            <div class="header__filter">
                <q-input outlined dense placeholder="Search People...">
                    <template v-slot:append>
                        <q-icon name="mdi-magnify" />
                    </template>
                </q-input>
                <q-input type='date' class="select-sm" v-model="select__date" outlined dense></q-input>
                <!-- <q-select class="select-sm" v-model="select__date" :options="options_date" outlined dense></q-select> -->
            </div>
        </div>
        <div class="content__grid-4x4">
            <div v-for="(visitor, index) in this.visitor_list.data" :key="index">
            <DailyLogCards :staff_logs="visitor"></DailyLogCards>
            <!-- <DailyLogCards></DailyLogCards>
            <DailyLogCards></DailyLogCards>
            <DailyLogCards></DailyLogCards> -->
            </div>
        </div>
    </div>
</template>

<script>
import "./DailyLogs.scss";

// Components
import DailyLogCards from "components/DailyLogCards/DailyLogCards"
import  ComPicker from "../../../components/companyPicker/ComPicker"

import { postGetCompanies, postFindLogs, postPersonByCateg } from '../../../references/url';

export default {
    components: {
        DailyLogCards,
        ComPicker,
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
        visitor_list: [],
        company_id: ''
    }),
     watch:
    {
        async select__date(val)
        {
            if (val) this.visitor_list = await this.getStaffList({category: 'Visitors', date_logged: this.select__date, company_id: this.company_id})
        }
    },

    methods:
    {
        async getCompanyData(value)
        {
            this.company_id = value
            // this.getTotalScannedToday(new Date(), value._id)
            this.visitor_list = await this.getStaffList({category: 'Visitors', date_logged: this.select__date, company_id: value._id})
        },

        async getStaffList(params)
        {
            return await this.$_post(postPersonByCateg, {find_by_category: params});
        }
    },
    async mounted()
    {
        this.visitor_list = await this.getStaffList({category: 'Visitors', date_logged: this.select__date})
        console.log(this.visitor_list);
    }
}
</script>
