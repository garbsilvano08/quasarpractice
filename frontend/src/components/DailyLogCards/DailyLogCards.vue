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

        <q-img :src="staff_logs.person_img"></q-img>
        <div class="content__info">
            <div class="content__name">{{staff_logs.full_name}}</div>
            <div class="content__datetime"><span>Date: </span>{{ staff_logs.date_saved }}</div>
            <div class="content__details">
                {{staff_logs.temperature}}°C <br>
                <span>{{staff_logs.company_name}}</span>
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
