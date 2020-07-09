<template>
    <div class="report">
        <div class="report__header">
            <div class="header__title">FEVER DETECTED REPORTS</div>
            <div class="header__filter">
                <q-select class="select-sm" v-model="select__date" :options="options_date" outlined dense></q-select>
                <q-select class="select-lg" v-model="select__company" :options="options_company" outlined dense></q-select>
                <q-btn class="btn-outline btn-export" flat dense no-caps>
                    Export &nbsp;<q-icon name="mdi-export"></q-icon>
                </q-btn>
            </div>
        </div>
        <div class="report__container content__box">
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
                            <td>111 San Jose del Monte, Bulacan</td>
                            <td>6/24/2020 8:00 AM</td>
                            <td class="td-red">38.2°C</td>
                        </tr>
                        <tr>
                            <td class="td-active">Adda M. Hope</td>
                            <td>F</td>
                            <td>22</td>
                            <td>111 San Jose del Monte, Bulacan</td>
                            <td>6/24/2020 8:00 AM</td>
                            <td class="td-red">38.2°C</td>
                        </tr>
                        <tr>
                            <td class="td-active">Adda M. Hope</td>
                            <td>F</td>
                            <td>22</td>
                            <td>111 San Jose del Monte, Bulacan</td>
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
import './Report.scss';

export default {
     data: () => ({
        select__date: '',
        select__company: '',
        options_date: [
            '6/24/2020', '6/23/2020' , '6/22/2020'
        ],
        options_company: [
            'Green Sun Hotel', 'SM Mall' , 'WalterMart'
        ],

    }),
}
</script>
