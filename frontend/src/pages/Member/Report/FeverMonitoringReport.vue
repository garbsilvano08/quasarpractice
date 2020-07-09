<template>
    <div class="report">
        <div class="report__header">
            <div class="header__title">FEVER MONITORING REPORTS</div>
            <div class="header__filter">
                <q-select class="select-sm" v-model="select__date" :options="options_date" outlined dense></q-select>
                <q-select class="select-lg" v-model="select__company" :options="options_company" outlined dense></q-select>
                <q-btn class="btn-outline btn-export" flat dense no-caps>
                    Export &nbsp;<q-icon name="mdi-export"></q-icon>
                </q-btn>
            </div>
        </div>
        <div class="report__container">
            <div class="report__content content__card">
                <q-img src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"></q-img>
                <div class="report__info">
                    <div class="report__info-details">
                        <span>Monica C. De Jesus</span> is on the <span>8th day</span> after abnormal temperature was detected.
                    </div>
                    <div class="report__info-datetime">3 hrs ago</div>
                </div>
            </div>
            <div class="report__content content__card">
                <q-img src="https://images.unsplash.com/photo-1482235225574-c37692835cf3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80"></q-img>
                <div class="report__info">
                    <div class="report__info-details">
                        <span>Armando M. dela Cruz</span> is on the <span>10th day</span> after abnormal temperature was detected.
                    </div>
                    <div class="report__info-datetime">1 day ago</div>
                </div>
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
