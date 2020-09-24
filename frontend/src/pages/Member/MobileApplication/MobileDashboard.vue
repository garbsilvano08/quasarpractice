<template>
   <div class="dashboard">

      <div class="dashboard__overview">
         <div class="dashboard__graph">
         <!-- VISITORS PURPOSE NEW PIE CHART-->
            <div class="dashboard__graph-item">
                <div class="dashboard__graph-content dashboard__graph-pie">
                <div class="dashboard__pie-chart">
                    <pie-chart
                        :donut="true"
                        :legend="false"
                        width="150px"
                        height="150px"
                        :colors="[
                            '#972CF3',
                            '#FF8B29',
                            '#EDFF00',
                            '#2F84FF',
                            '#27E4AB',
                            '#00B347',
                        ]"
                        :data="{
                            'Official Business': 0,
                            'Collection & Pickup': 6,
                            'Delivery': 0,
                            'Corporate Meeting': 4,
                            'Client/Customer': 0,
                            'Guest': 0,
                        }"
                        :library="{cutoutPercentage: 85}">
                    </pie-chart>
                    <div class="dashboard__pie-total">
                        <div class="pie-total__amount">10</div>
                        <div class="pie-total__label">Fever Logs</div>
                    </div>
                </div>

                <div class="dashboard__pie-legend">
                    <div class="pie-legend__item">
                        <div class="pie-legend__color fourth-color"></div>
                        <div class="pie-legend__percent">Staff (4)</div>
                    </div>
                    <div class="pie-legend__item">
                        <div class="pie-legend__color second-color"></div>
                        <div class="pie-legend__percent">Visitor (6)</div>
                    </div>
                </div>
                <q-btn class="btn-primary" flat dense no-caps>Export</q-btn>
                </div>
            </div>
         </div>
        </div>
    
      <div class="dashboard__overview-logs">
        
        <div class="header__title">Fever Logs  <q-icon class="icon-float" name="fas fa-sliders-h"/></div>
         <div class="content__card-info content__card">
            <div class="content__info">
                <div class="flex flex-center">
                    <q-img src=""></q-img>
                </div>
            <div class="content__temperature">
                37<br>
                <span class="abnormal-temperature">Normal</span>
                <!-- <span class="normal-temperature" v-if="!data.has_fever">Normal</span> -->
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
        <div class="content__card-info content__card">
            <div class="content__info">
                <div class="flex flex-center">
                    <q-img src=""></q-img>
                </div>
            <div class="content__temperature">
                37<br>
                <span class="abnormal-temperature">Normal</span>
                <!-- <span class="normal-temperature" v-if="!data.has_fever">Normal</span> -->
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
</template>

<script>
import { base64StringToBlob } from 'blob-util';
import  ComPicker from "../../../components/companyPicker/ComPicker"
import "./MobileDashboard.scss";
import Vue from 'vue';
import Chartkick from 'vue-chartkick';
import "chart.js"

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
      
   }),

   watch:
    { 
       
    },

   methods: {
   

   },
   
   updated() {
      
   },
}
</script>
