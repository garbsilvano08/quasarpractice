<template>
    <div class="account-directory">
        <div class="account-directory__header">
            <div class="header__title">BLACKLIST</div>
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
                        <tr v-for="(account, index) in this.blacklist_account.data" :key="index">
                            <td class="td-active" @click="checkAccount(account)">{{ account.given_name + " " + account.middle_name + " " + account.last_name}}</td>
                            <td>{{account.gender}}</td>
                            <td>{{new Date().getFullYear() - new Date(account.birthday).getFullYear()}}</td>
                            <td>{{account.home_address}}</td>
                            <td>{{account.last_scanned ? account.last_scanned : 'No Logs Yet'}}</td>
                            <td class="td-green">{{account.last_temperature ? account.last_temperature : 'No Temperature Logs Yet'}}</td>
                        </tr>
                        <!-- <tr>
                            <td class="td-active">Adda M. Hope</td>
                            <td>F</td>
                            <td>22</td>
                            <td>111 San Jose del Monte</td>
                            <td>6/24/2020 8:00 AM</td>
                            <td class="td-green">36°C</td>
                        </tr>
                        <tr>
                            <td class="td-active">Adda M. Hope</td>
                            <td>F</td>
                            <td>22</td>
                            <td>111 San Jose del Monte</td>
                            <td>6/24/2020 8:00 AM</td>
                            <td class="td-red">38.2°C</td>
                        </tr> -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import "./AccountDirectory.scss";

// Components
import DailyLogCards from "components/DailyLogCards/DailyLogCards"

// References
import { postGetBlacklist } from '../../../references/url';

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
        blacklist_account: []
    }),

    methods:
    {
        checkAccount(account_info)
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
        this.blacklist_account = await this.$_post(postGetBlacklist);
    }
}
</script>
