<template>
    <div class="report">
        <div class="report__header">
            <div class="header__title">FEVER HEAT MAP REPORTS</div>
            <div class="header__filter">
                <q-select class="select-lg" v-model="select__company" :options="options_company" outlined dense></q-select>
                <q-btn class="btn-outline btn-export" flat dense no-caps>
                    Export &nbsp;<q-icon name="mdi-export"></q-icon>
                </q-btn>
            </div>
        </div>
        <div class="report__container">

        </div>
    </div>
</template>

<script>
import './Report.scss';

export default {
     data: () => ({
        select__company: '',
        options_company: [
            'Green Sun Hotel', 'SM Mall' , 'WalterMart'
        ],

    }),
}
</script>
