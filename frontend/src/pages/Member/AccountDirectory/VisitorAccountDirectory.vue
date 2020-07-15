<template>
    <div class="account-directory">
        <div class="account-directory__header">
            <div class="header__title">ALL VISITORS</div>
            <div class="header__filter">
                <q-input outlined dense placeholder="Search People...">
                    <template v-slot:append>
                        <q-icon name="mdi-magnify" />
                    </template>
                </q-input>
                <q-select v-model="select__date" :options="options_date" outlined dense></q-select>
            </div>
        </div>
        <div class="account-directory__container content__box">
            <div class="content__table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Home Address</th>
                            <th>Last Scanned</th>
                            <th>Body Temperature</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr @click="checkAccount(visitor)" v-for="(visitor, index) in this.visitor_lists.data" :key="index">
                            <td class="td-active">{{visitor.given_name}}</td>
                            <td>{{visitor.gender}}</td>
                            <td>{{new Date().getFullYear() - new Date(visitor.birthday).getFullYear()}}</td>
                            <td>{{visitor.home_address}}</td>
                            <!-- <td>{{visitor.last_scanned ? staff.last_scanned : 'No Logs Yet'}}</td>
                            <td class="td-green">{{visitor.last_temperature ? visitor.last_temperature : 'No Temperature Logs Yet'}}</td> -->
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import "./AccountDirectory.scss";

import { postGetVisitors, postGetPersons, postGetDailyLog, postLatestLog } from '../../../references/url';
// Components
import DailyLogCards from "components/DailyLogCards/DailyLogCards"

export default {
    components: {
        DailyLogCards
    },
    data: () => ({
        select__id_type: '',
        select__date: '',
        options_name: [
            'Green Sun Hotel', 'SM Mall' , 'WalterMart'
        ],
        options_date: [
            '6/24/2020', '6/23/2020' , '6/22/2020'
        ],
        visitor_lists: [],
        person_logs: []
    }),

    methods:
    {
        async getLatestLog(person_id)
        {
            return await this.$_post(postLatestLog, {id: person_id});
        },
        checkAccount(account_info)
        {
            account_info.type = 'Visitor'
            this.$router.push({
                name: "member_personal-information",
                params: {
                    account_info: account_info
                }
            })
        }
    }, 

    async mounted()
    {
        this.visitor_lists = await this.$_post(postGetPersons, {find_person: {category: 'Visitors'}});
        console.log(this.visitor_lists);
    }
}
</script>
