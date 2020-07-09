<template>
    <div class="account-directory">
        <div class="account-directory__header">
            <div class="header__title">ALL STAFF</div>
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
                        <tr v-for="(staff, index) in this.staff_list.data" :key="index">
                            <td class="td-active" @click="checkAccount(staff)">{{ staff.given_name + " " + staff.middle_name + " " + staff.last_name}}</td>
                            <td>{{staff.gender}}</td>
                            <td>{{new Date().getFullYear() - new Date(staff.birthday).getFullYear()}}</td>
                            <td>{{staff.home_address}}</td>
                            <td>{{staff.last_scanned ? staff.last_scanned : 'No Logs Yet'}}</td>
                            <td class="td-green">{{staff.last_temperature ? staff.last_temperature : 'No Temperature Logs Yet'}}</td>
                        </tr>
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
import { postGetStaff, postGetPersons } from '../../../references/url';

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
        staff_list: []
    }),
    methods:
    {
        checkAccount(account_info)
        {
            account_info.type = 'Staff'
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
        this.staff_list = await this.$_post(postGetPersons, {find_by_category: {category: 'Staff'}});
    }

}
</script>
