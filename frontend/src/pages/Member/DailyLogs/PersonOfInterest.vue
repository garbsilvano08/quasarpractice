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
            <div class="content__title">PERSON OF INTEREST</div>
            <div class="header__filter">
                <q-input outlined dense placeholder="Search People...">
                    <template v-slot:append>
                        <q-icon name="mdi-magnify" />
                    </template>
                </q-input>
                <q-select class="select-sm" v-model="select__date" :options="options_date" outlined dense></q-select>
            </div>
        </div>
        <div class="content__grid-4x4">
            <DailyLogCards></DailyLogCards>
            <DailyLogCards></DailyLogCards>
            <DailyLogCards></DailyLogCards>
            <DailyLogCards></DailyLogCards>
        </div>
    </div>
</template>

<script>
import "./DailyLogs.scss";

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
