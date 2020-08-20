<template>
    <div class="content__card">
        <!-- <q-img :src="staff_logs.person_img"></q-img>
        <div class="content__info">
            <div v-if="type == 'Staff'" class="content__name">{{staff_logs.full_name}}</div>
            <div class="content__datetime"><span>Date: </span>{{new Date(staff_logs.date_saved).toLocaleString()}}</div>
            <div class="content__details">
                {{staff_logs.temperature}}°C <br>
                <span>{{staff_logs.company_name}}</span>
            </div>
        </div> -->

        <!-- <q-img :src="staff_logs.person_img"></q-img>
        <div class="content__info">
            <div class="content__name">{{staff_logs.full_name}}</div>
            <div class="content__datetime"><span>Date: </span>{{ staff_logs.date_saved }}</div>
            <div class="content__details">
                {{staff_logs.temperature}}°C <br>
                <span>{{staff_logs.company_name}}</span>
            </div>
        </div> -->

        <div class="content__info">
            <q-img src="https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"></q-img>
            <div class="content__temperature">
                36.4 °C <br>
                <span class="normal-temperature">Normal</span>
            </div>
        </div>
        <div class="content__info">
            <div class="content__name">
                John Paul Sebastian <br>
                <span>Stranger</span>
            </div>
            <div class="content__datetime">
                <q-icon name="mdi-clock-outline" size="18px"></q-icon> 8/19/2020, 12:00 AM
            </div>
            <div class="content__room">
                <q-icon name="mdi-cellphone-iphone" size="16px"></q-icon> Main Door - IN
            </div>
            <div class="content__location">
                <q-icon name="mdi-briefcase" size="16px"></q-icon> Green Sun Hotel
            </div>
        </div>
    </div>
</template>

<script>
import "./DailyLogCards.scss";

export default {
    props:
    {
        staff_logs: Object,
        type: String
    },

}
</script>
