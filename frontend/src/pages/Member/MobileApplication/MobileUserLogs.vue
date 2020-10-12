<template>
    <div class="userlogs">
        <div class="userlogs__overview">
            <div class="user_card" v-for="(logs, index) in this.user_logs.data" :key="index">
                <div class="content__info">
                    <div class="flex flex-center">
                        <q-img :src="logs.user_picture"></q-img>
                    </div>
                </div>
                <div class="content__info">
                    <div class="content__name">
                        {{logs.full_name}}
                    </div>
                    <div class="content__datetime">
                    <label>Date & Time:</label> {{logs.time_log_in}}
                    </div>
                </div>
            </div>
            <!-- <div class="user_card">
                <div class="content__info">
                    <div class="flex flex-center">
                        <q-img src=""></q-img>
                    </div>
                </div>
                <div class="content__info">
                    <div class="content__name">
                        Juan Dela Cruz
                    </div>
                    <div class="content__datetime">
                    <label>Date & Time:</label> Sep 11 2020 - 5:45:12 PM
                    </div>
                </div>
            </div>
            <div class="user_card">
                <div class="content__info">
                    <div class="flex flex-center">
                        <q-img src=""></q-img>
                    </div>
                </div>
                <div class="content__info">
                    <div class="content__name">
                        Juan Dela Cruz
                    </div>
                    <div class="content__datetime">
                    <label>Date & Time:</label> Sep 11 2020 - 5:45:12 PM
                    </div>
                </div>
            </div> -->
        </div>
    </div>

   <!-- <div class="dashboard">
      <div class="dashboard__overview">
      <div class="dashboard__overview-logs">
         <div class="content__card-info">
            
         </div>
        <div class="content__card-info content__card">
            <div class="content__info">
                <div class="flex flex-center">
                    <q-img src=""></q-img>
                </div>
            <div class="content__temperature">
                37<br>
                <span class="abnormal-temperature">Normal</span>
                <span class="normal-temperature" v-if="!data.has_fever">Normal</span>
            </div>
            </div>
            <div class="content__info">
                <div class="content__name">
                    Juan Dela Cruz <br>
                    <span>Staff</span>
                </div>
                <div class="content__location">
                    <label>Tagged to:</label> Green Sun
                </div>
                <div class="content__room">
                    <label>Device Scanned:</label> Vision Sky - Public
                </div>
                <div class="content__datetime">
                   <label>Date & Time:</label> Sep 11 2020 - 5:45:12 PM
                </div>
            </div>
         </div>
      </div>
        <div class="add_fever_logs-btn">
            <q-icon name="fas fa-plus"></q-icon>
        </div>
      </div>
   </div> -->
</template>

<script>
import { base64StringToBlob } from 'blob-util';
import  ComPicker from "../../../components/companyPicker/ComPicker"
import "./MobileDashboard.scss";
import Vue from 'vue';
import Chartkick from 'vue-chartkick';
import "chart.js"
import { postGetMobileUserLogs } from '../../../references/url';
// Classes
import { date } from 'quasar';
import { log } from 'util';


Vue.use(Chartkick.use(Chart))

export default
{
   components: { ComPicker },
   //pointerdata
   data:() =>
   ({
      user_logs: {}
   }),

   watch:
    { 
       
    },

   methods: {
   

   },
   
   updated() {
      
   },
   async mounted(){
       this.user_logs = await this.$_post(postGetMobileUserLogs)
       console.log(this.user_logs);
       for (let index = 0; index < this.user_logs.data.length; index++) {
            this.user_logs.data[index].time_log_in = date.formatDate(this.user_logs.data[index].time_log_in, 'MMM D YYYY - hh:mm:ss A')
        }
   }
}
</script>
