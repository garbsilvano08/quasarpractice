<template>
    <div class="daily-logs">
        <div class="daily-logs__header">
            <div class="header__title">DAILY LOGS</div>
            <div class="header__filter">
                <q-btn class="btn-outline btn-export" flat dense no-caps>
                    Export &nbsp;<q-icon name="mdi-export"></q-icon>
                </q-btn>
                <q-select class="select-lg" v-model="select__id_type" :options="options_name" outlined dense></q-select>
            </div>
        </div>
        <div class="daily-logs__header" style="margin-bottom: 30px !important;">
            <div class="content__title">STAFF</div>
            <div class="header__filter">
                <q-input outlined dense placeholder="Search People...">
                    <template v-slot:append>
                        <q-icon name="mdi-magnify" />
                    </template>
                </q-input>
                <q-select class="select-sm" v-model="select__date" :options="options_date" outlined dense></q-select>
            </div>
        </div>
        <div class="daily-logs__container content__grid-4x4">
            <div class="daily-logs__content content__card">
                <q-img src="https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80"></q-img>
                <div class="daily-logs__content-info">
                    <div class="content__name">Monica C. de Jesus</div>
                    <div class="content__datetime"><span>Date: </span>6/24/2020 9:00 AM</div>
                    <div class="content__temperature">36.5°C</div>
                    <div class="content__location">Green Sun Hotel Philippines</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "./DailyLogs.scss";

export default {
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
