<template>
    <div class="account-directory">
        <div class="account-directory__header">
            <div class="header__title">BLACKLIST</div>
            <div class="header__filter">
                <q-input v-model="search" outlined dense placeholder="Search People...">
                    <template v-slot:append>
                        <q-icon name="mdi-magnify" />
                    </template>
                </q-input>
                <com-picker class="btn-choose" @select=getCompanyData></com-picker>
                <!-- <q-select v-model="select__date" :options="options_date" outlined dense></q-select> -->
            </div>
        </div>
        <div class="account-directory__header">
            <div class="header__filter">
                <q-input class="select-sm" type="date" outlined dense></q-input>
                <q-input class="select-sm" type="date" outlined dense></q-input>
                <q-btn flat dense no-caps class="btn-outline btn-sort" label="Sort">
                    <q-menu>
                        <q-list style="min-width: 100px">
                            <div class="q-gutter-sm">
                                <q-radio label="Ascending" />
                                <q-radio label="Descending" />
                            </div>
                            <q-separator />
                            <q-item clickable v-close-popup>
                                <q-item-section></q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
                <q-btn class="btn-primary btn-export" flat dense no-caps>
                    Export &nbsp;<q-icon name="mdi-export"></q-icon>
                </q-btn>
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
                        <tr v-for="(account, index) in this.blacklist_account.data" :key="index">
                            <td class="td-active" @click="checkAccount(account)">{{ account.given_name + " " + account.middle_name + " " + account.last_name}}</td>
                            <td>{{account.gender}}</td>
                            <td>{{new Date().getFullYear() - new Date(account.birthday).getFullYear()}}</td>
                            <td>{{account.home_address}}</td>
                            <td>{{account.last_scanned ? account.last_scanned : 'No Logs Yet'}}</td>
                            <td class="td-green">{{account.last_temperature ? account.last_temperature : 'No Temperature Logs Yet'}}</td>
                        </tr>
                    </tbody>
                </table> -->
                <q-table dense @row-click="checkAccount" :filter="search" flat :data="blacklist_account.data" :pagination.sync="pagination" :columns="table_column"></q-table>
            </div>
        </div>
    </div>
</template>

<script>
import "./AccountDirectory.scss";

// Components
import DailyLogCards from "components/DailyLogCards/DailyLogCards"
import  ComPicker from "../../../components/companyPicker/ComPicker"

// References
import { postGetBlacklist, postGetPersons } from '../../../references/url';

export default {
    components: {
        DailyLogCards,
        ComPicker
    },
    data: () => ({
        start_date: new Date().toISOString().split('T')[0],
        end_date:new Date().toISOString().split('T')[0],
        search: '',
        select__id_type: '',
        select__date: '',
        pagination: {
            rowsPerPage: 10,
        },
        options_name: [
            'Green Sun Hotel', 'SM Mall' , 'WalterMart'
        ],
        options_date: [
            '6/24/2020', '6/23/2020' , '6/22/2020'
        ],
        blacklist_account: [],
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
        checkAccount(evt, account_info)
        {
            account_info.type = 'Blacklist'
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
        this.blacklist_account = await this.$_post(postGetPersons, {find_person: {category: 'Blacklist'}});
        // console.log(this.$user_info);

        // this.blacklist_account = await this.$_post(postGetBlacklist);
    }
}
</script>
