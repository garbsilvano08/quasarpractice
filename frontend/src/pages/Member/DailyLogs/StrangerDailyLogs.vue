<template>
    <div class="daily-logs">
        <div class="daily-logs__header">
            <div class="header__title">DAILY LOGS</div>
            <div class="header__filter">
                <q-btn class="btn-outline btn-export" flat dense no-caps>
                    Export &nbsp;<q-icon name="mdi-export"></q-icon>
                </q-btn>
                <!-- <q-select class="select-lg" v-model="select__id_type" :options="options_company" outlined dense></q-select> -->
            </div>
        </div>
        <div class="daily-logs__header" style="margin-bottom: 30px !important;">
            <div class="content__title">STRANGERS</div>
            <div class="header__filter">
                <!-- <q-input outlined dense placeholder="Search People...">
                    <template v-slot:append>
                        <q-icon name="mdi-magnify" />
                    </template>
                </q-input> -->
                <q-input type='date' class="select-sm" v-model="select__date" outlined dense></q-input>
                <!-- <q-select class="select-sm" v-model="select__date" :options="options_date" outlined dense></q-select> -->
            </div>
        </div>
        <div class="content__grid-4x4">
            <div v-for="(staff, index) in this.staff_list.data" :key="index">
            <DailyLogCards :staff_logs="staff"></DailyLogCards>
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

import { postGetCompanies, postFindLogs, postPersonByCateg } from '../../../references/url';

export default {
    components: {
        DailyLogCards, 
        
    },
    data: () => ({
        staff_list: {},
        company_list: [],
        options_company: ['All Company'],
        select__id_type: 'All Company',
        select__date: new Date().toISOString().split('T')[0],
        options_name: [
            'Green Sun Hotel', 'SM Mall' , 'WalterMart'
        ],
        options_date: [
            '6/24/2020', '6/23/2020' , '6/22/2020'
        ],
        company_id: '',
    }),

     watch:
    {
        async select__date(val)
        {
            if (val) this.staff_list = await this.getStaffList({category: 'Stranger', date_logged: this.select__date})
        }
    },

    methods:
    {
        async getCompanyData(value)
        {
            this.company_id = value
            // this.getTotalScannedToday(new Date(), value._id)
            this.staff_list = await this.getStaffList({category: 'Stranger', date_logged: this.select__date, company_id: value._id})
        },

        async getStaffList(params)
        {
            return await this.$_post(postPersonByCateg, {find_by_category: params});
        }
    },
    async mounted()
    {
        this.staff_list = await this.getStaffList({category: 'Stranger', date_logged: (new Date().getFullYear())+ '-' +(new Date().getMonth()+1).toString().padStart(2, "0")+'-'+new Date().getDate().toString().padStart(2, "0")})
    }
}
</script>
