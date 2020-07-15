<template>
    <div class="report">
        <div class="report__header">
            <div class="header__title">FEVER MONITORING REPORTS</div>
            <div class="header__filter">
                <q-input label="Start Date" class="select-sm" v-model="start_date" type="date" outlined dense></q-input>
                <q-input label="End Date" class="select-sm" v-model="end_date" type="date" outlined dense></q-input>
                <com-picker @select=getCompanyData></com-picker>
                <!-- <q-select class="select-sm" v-model="select__date" :options="options_date" outlined dense></q-select> -->
                <!-- <q-select class="select-lg" v-model="select__company" :options="options_company" outlined dense></q-select> -->
                <q-btn class="btn-outline btn-export" flat dense no-caps>
                    Export &nbsp;<q-icon name="mdi-export"></q-icon>
                </q-btn>
            </div>
        </div>
        <div class="report__container">
            <div v-for="(person, index) in this.fever_logs" :key="index" class="report__content content__card">
                <q-img :src="person.person_img"></q-img>
                <div class="report__info">
                    <div class="report__info-details">
                        <span>{{person.full_name}}</span> is on the <span>{{getFeverDate(person.date_saved)}}</span> after abnormal temperature was detected.
                    </div>
                    <div class="report__info-datetime">3 hrs ago</div>
                </div>
            </div>
            <!-- <div class="report__content content__card">
                <q-img src="https://images.unsplash.com/photo-1482235225574-c37692835cf3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80"></q-img>
                <div class="report__info">
                    <div class="report__info-details">
                        <span>Armando M. dela Cruz</span> is on the <span>10th day</span> after abnormal temperature was detected.
                    </div>
                    <div class="report__info-datetime">1 day ago</div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import './Report.scss';
import  ComPicker from "../../../components/companyPicker/ComPicker"
import {postPersonByCateg} from '../../../references/url';


export default {
    components: { ComPicker },
     data: () => ({
        start_date: new Date().toISOString().split('T')[0],
        end_date:new Date().toISOString().split('T')[0],
        select__company: '',
        options_date: [
            '6/24/2020', '6/23/2020' , '6/22/2020'
        ],
        options_company: [
            'Green Sun Hotel', 'SM Mall' , 'WalterMart'
        ],
        company_details: {},
        fever_logs: []
    }),

    watch:
    {
        async start_date(val)
        {
            if (val)
            {
                await this.getFeverList()
            }
        },
        async end_date(val)
        {
            if (val)
            {
                await this.getFeverList()
            }
        }
    },

    methods:
    {
        getFeverDate(date)
        {
            let current = new Date()
            date = new Date(date)
            const diffTime = Math.abs(current - date);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            console.log(diffDays);
            if (diffDays % 10 == 1) return String(diffDays) + 'st day'
            else if (diffDays % 10  == 2) return String(diffDays) + 'nd day'
            else if (diffDays % 10  == 3) return String(diffDays) + 'rd day'
            else return String(diffDays) + 'th day'

        },

        async getCompanyData(value)
        {
            this.company_details = value
            await this.getFeverList()
        },

        async getFeverList()
        {
            let params = {}
            if (this.company_details || this.company_details.company_name == 'All Company') {
                params = {find_by_category: {date_saved: { '$gte' : new Date(this.start_date) , '$lte' : new Date(this.end_date)}, 
                has_fever: true, 
                company_id: this.company_details._id}, 
                limit: 10}
            }
            else params = {find_by_category: {date_saved: { '$gte' : new Date(this.start_date) , '$lte' : new Date(this.end_date)}, 
                has_fever: true}, 
                limit: 10}

            let data = await this.$_post(postPersonByCateg, params);
            this.fever_logs = data.data
            console.log(data);
        }
    },

    async mounted()
    {
        await this.getFeverList()
    }
}
</script>
