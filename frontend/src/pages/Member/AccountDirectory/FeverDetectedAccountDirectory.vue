<template>
    <div class="account-directory">
        <div class="account-directory__header">
            <div class="header__title">ALL FEVER DETECTED</div>
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
                        <tr>
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
                            <td class="td-green">36°C</td>
                        </tr>
                        <tr>
                            <td class="td-active">Adda M. Hope</td>
                            <td>F</td>
                            <td>22</td>
                            <td>111 San Jose del Monte</td>
                            <td>6/24/2020 8:00 AM</td>
                            <td class="td-red">38.2°C</td>
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
    })
}
</script>
