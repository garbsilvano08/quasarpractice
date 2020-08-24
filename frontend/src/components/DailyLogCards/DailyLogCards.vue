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
            <q-img :src="all_logs.person_img"></q-img>
            <div class="content__temperature">
                {{all_logs.temperature}} °C <br>
                <span v-if="all_logs.has_fever" class="abnormal-temperature">Has Fever</span>
                <span v-else class="normal-temperature">Normal</span>
            </div>
        </div>
        <div class="content__info">
            <div class="content__name">
                {{all_logs.full_name}} <br>
                <span v-if="all_logs.full_name != 'Stranger'">{{all_logs.category}}</span>
            </div>
            <div class="content__datetime">
                <q-icon name="mdi-clock-outline" size="18px"></q-icon> {{new Date(all_logs.date)}}
            </div>
            <div class="content__room">
                <q-icon name="mdi-cellphone-iphone" size="16px"></q-icon> {{ all_logs.device.device_name + "-" + all_logs.device.log_type }}
            </div>
            <div class="content__location">
                <q-icon name="mdi-briefcase" size="16px"></q-icon> {{all_logs.company_name}}
            </div>
        </div>
    </div>
</template>

<script>
import "./DailyLogCards.scss";

export default {
    props:
    {
        all_logs: Object,
        type: String
    },

}
</script>
