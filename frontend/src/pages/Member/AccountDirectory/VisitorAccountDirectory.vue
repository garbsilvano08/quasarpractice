<template>
    <div class="account-directory">
        <div class="account-directory__header">
            <div class="header__title">ALL VISITORS</div>
            <div class="header__filter">
                <q-input v-model="search" outlined dense placeholder="Search People...">
                    <template v-slot:append>
                        <q-icon name="mdi-magnify" />
                    </template>
                </q-input>
                <q-select v-model="select__date" :options="options_date" outlined dense></q-select>
            </div>
        </div>
        <div class="account-directory__container content__box">
            <div class="content__table">
                <!-- <table>
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
                        </tr>
                    </tbody>
                </table> -->
                <q-table dense @row-click="checkAccount" :filter="search" flat :data="visitor_lists.data" :pagination.sync="pagination" :columns="table_column"></q-table>
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
        search : "",
        pagination: {
            rowsPerPage: 10,
        },
        select__id_type: '',
        select__date: '',
        options_name: [
            'Green Sun Hotel', 'SM Mall' , 'WalterMart'
        ],
        options_date: [
            '6/24/2020', '6/23/2020' , '6/22/2020'
        ],
        visitor_lists: [],
        person_logs: [],
        table_column:
        [
            { 
                name    : 'full_name',
                label   : 'Name',
                field   : row => row.given_name +" " + row.middle_name +" "+row.last_name,
                align   : 'left',
                required: true,
                sortable: true,
            },
            { 
                name    : 'gender',
                label   : 'Gender',
                field   : 'gender',
                align   : 'left',
                required: true,
                sortable: true,
            },
            { 
                name    : 'age',
                label   : 'Age',
                field   : row => new Date().getFullYear() - new Date(row.birthday).getFullYear(),
                align   : 'left',
                required: true,
                sortable: true,
            },
            { 
                name    : 'home_address',
                label   : 'Home Address',
                field   : 'home_address',
                align   : 'left',
                required: true,
                
                sortable: true,
            },
            { 
                name    : 'last_scanned',
                label   : 'Last Scanned',
                field   : row => row.last_scanned ? row.last_scanned : 'No Logs Yet',
                align   : 'left',
                required: true,
                sortable: true,
            },
            { 
                name    : 'temperature',
                label   : 'Temperature',
                field   : row => row.last_temperature ? row.last_temperature : 'No Temperature Logs Yet',
                align   : 'left',
                required: true,
                sortable: true,
            }
        ],
    }),

    methods:
    {
        async getLatestLog(person_id)
        {
            return await this.$_post(postLatestLog, {id: person_id});
        },
        checkAccount(evt,account_info)
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
        // console.log(this.visitor_lists);
    }
}
</script>
