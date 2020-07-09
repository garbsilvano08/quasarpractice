<template>
   <div class="dashboard">
      <div class="dashboard__header">
         <div class="header__title">DASHBOARD OVERVIEW</div>
         <div class="header__filter">
            <q-btn class="btn-outline btn-export" flat dense no-caps>
               Export &nbsp;<q-icon name="mdi-export"></q-icon>
            </q-btn>
            <q-select class="select-lg" v-model="select__company" :options="options_company" outlined dense></q-select>
         </div>
      </div>

      <div class="dashboard__overview">
         <!-- <div class="dashboard__overview-item" v-for="(overview, index) in dashboard_overview" :key="index">
            <q-img cover :src="overview.overview_img">
               <div class="dashboard__overview-info">
                  <div class="dashboard__overview-title">{{ overview.overview_title }}</div>
                  <div class="dashboard__overview-desc">
                     <div class="decs-total">{{ overview.overview_total }}</div>
                     <div class="desc-separator"></div>
                     <div class="decs-info">{{ overview.overview_info }}</div>
                  </div>
                  <div class="dashboard__overview-date">{{ overview.overview_date }}</div>
               </div>
            </q-img>
         </div> -->
         <div class="dashboard__overview-item">
            <q-img cover src="../../../assets/Member/dashboard_overview-bg-1.jpg">
               <div class="dashboard__overview-info">
                  <div class="dashboard__overview-title">Total Scanned Today</div>
                  <div class="dashboard__overview-desc">
                     <div class="decs-total">193</div>
                     <div class="desc-separator"></div>
                     <div class="decs-info">93% of Registered Users</div>
                  </div>
                  <div class="dashboard__overview-date">June 21, 2020</div>
               </div>
            </q-img>
         </div>
         <div class="dashboard__overview-item">
            <q-img cover src="../../../assets/Member/dashboard_overview-bg-2.jpg">
               <div class="dashboard__overview-info">
                  <div class="dashboard__overview-title">Highest Temperature Today</div>
                  <div class="dashboard__overview-desc">
                     <div class="decs-total">36.5 °</div>
                     <div class="desc-separator"></div>
                     <div class="decs-info">Normal</div>
                  </div>
                  <div class="dashboard__overview-date">June 21, 2020</div>
               </div>
            </q-img>
         </div>
         <div class="dashboard__overview-item">
            <q-img cover src="../../../assets/Member/dashboard_overview-bg-3.jpg">
               <div class="dashboard__overview-info">
                  <div class="dashboard__overview-title">Total Alerts Today</div>
                  <div class="dashboard__overview-desc">
                     <div class="decs-total">0</div>
                     <div class="decs-info"></div>
                  </div>
                  <div class="dashboard__overview-date">June 21, 2020</div>
               </div>
            </q-img>
         </div>
         <div class="dashboard__overview-item">
            <q-img cover src="../../../assets/Member/dashboard_overview-bg-4.jpg">
               <div class="dashboard__overview-info">
                  <div class="dashboard__overview-title">COVID Cases Confirmed</div>
                  <div class="dashboard__overview-desc">
                     <div class="decs-total">0</div>
                     <div class="decs-info"></div>
                  </div>
                  <div class="dashboard__overview-date">Out of 275 Registered Users</div>
               </div>
            </q-img>
         </div>
      </div>
      <div class="dashboard__overview">
         <div class="dashboard__overview-total">
            <q-img src="../../../assets/Member/total-employees.svg" width="45px"></q-img>
            <div class="dashboard__total-info">
               <div class="dashboard__total-title">Total Employess</div>
               <div class="dashboard__total-number">200</div>
               <div class="dashboard__total-date">Since June, 2020</div>
            </div>
         </div>
         <div class="dashboard__overview-total">
            <q-img src="../../../assets/Member/total-visitors.svg" width="45px"></q-img>
            <div class="dashboard__total-info">
               <div class="dashboard__total-title">Total Visitors</div>
               <div class="dashboard__total-number">75</div>
               <div class="dashboard__total-date">Since June, 2020</div>
            </div>
         </div>
         <div class="dashboard__overview-total">
            <q-img src="../../../assets/Member/total-alerts.svg" width="45px"></q-img>
            <div class="dashboard__total-info">
               <div class="dashboard__total-title">Total Alerts</div>
               <div class="dashboard__total-number">0</div>
               <div class="dashboard__total-date">Since June, 2020</div>
            </div>
         </div>
         <div class="dashboard__overview-total">
            <q-img src="../../../assets/Member/total-devices.svg" width="30px"></q-img>
            <div class="dashboard__total-info">
               <div class="dashboard__total-title">Total Devices Installed</div>
               <div class="dashboard__total-number">0</div>
               <div class="dashboard__total-date">Since June, 2020</div>
            </div>
         </div>
      </div>
      <div class="dashboard__graph">
         <!-- FOOT TRAFFIC GRAPH -->
         <div class="dashboard__graph-item">
            <div class="dashboard__graph-header">
               <div class="dashboard__graph-title">
                  Foot Traffic
               </div>
               <q-select v-model="select_date" :options="options" outlined dense></q-select>
            </div>
            <div class="dashboard__graph-content">
               <line-chart style="position: relative; height:250px; width:100%"
                  :data="{
                     'MON': 250,
                     'TUES': 150,
                     'WED': 350,
                     'THURS': 500,
                     'FRI': 200,
                     'SAT': 300,
                     'SUN': 100,
                  }"
               >
               </line-chart>
            </div>
         </div>
         <!-- EMPLOYEE/VISITOR OVERVIEW -->
         <div class="dashboard__graph-item">
            <div class="dashboard__graph-header">
               <div class="dashboard__graph-title">
                  Employee/Visitor Overview
               </div>
               <q-select v-model="select_date" :options="options" outlined dense></q-select>
            </div>
            <div class="dashboard__graph-content">
               <bar-chart style="position: relative; height:250px; width:100%"
                  :data="{
                     'MON': 250,
                     'TUES': 150,
                     'WED': 350,
                     'THURS': 500,
                     'FRI': 200,
                     'SAT': 300,
                     'SUN': 100,
                  }"
               >
               </bar-chart>
            </div>
         </div>
         <!-- VISITORS PURPOSE -->
         <div class="dashboard__graph-item">
            <div class="dashboard__graph-header">
               <div class="dashboard__graph-title">
                  Visitors Purpose
               </div>
               <q-select v-model="select_date" :options="options" outlined dense></q-select>
            </div>
            <div class="dashboard__graph-content">
               <pie-chart style="position: relative; height:250px; width:100%"
                  suffix="%"
                  :data="{
                     'Official Business': 60,
                     'Collection & Pickup': 25,
                     'Delivery': 10,
                     'Corporate Meeting': 0,
                     'Client/Customer': 0,
                     'Guest': 0,
                  }"
               >
               </pie-chart>
            </div>
         </div>
         <!-- VISITOR LOGS -->
         <div class="dashboard__graph-item">
            <div class="dashboard__graph-header">
               <div class="dashboard__graph-title">
                  Alert Logs
               </div>
               <q-select v-model="select_date" :options="options" outlined dense></q-select>
            </div>
            <div class="dashboard__graph-content">
               <div class="visitor-logs__list">
                  <div class="visitor-logs__info">
                     <q-img src="https://www.thefamouspeople.com/profiles/thumbs/natalie-dormer-1.jpg">
                     </q-img>
                     <div class="visitor-logs__info-user">
                        <div class="visitor-logs__user-name">Natalie Dormer</div>
                        <div class="visitor-logs__user-temp">36.5 °C</div>
                     </div>
                     <div class="visitor-logs__info-visit">
                        <div class="visitor-logs__visit-details">
                           6/19/2020 9:00 AM<br>
                           <span>Green Sun Hotel</span>
                        </div>
                     </div>
                  </div>

                  <div class="visitor-logs__info">
                     <q-img src="https://images.csmonitor.com/csm/2012/08/sclaflin.jpg?alias=standard_900x600">
                     </q-img>
                     <div class="visitor-logs__info-user">
                        <div class="visitor-logs__user-name">Sam Claflin</div>
                        <div class="visitor-logs__user-temp">36.5 °C</div>
                     </div>
                     <div class="visitor-logs__info-visit">
                        <div class="visitor-logs__visit-details">
                           6/17/2020 1:00 PM<br>
                           <span>My Phone</span>
                        </div>
                     </div>
                  </div>

                  <div class="visitor-logs__info">
                     <q-img src="https://www.famousbirthdays.com/headshots/dean-charles-chapman-4.jpg">
                     </q-img>
                     <div class="visitor-logs__info-user">
                        <div class="visitor-logs__user-name">Dean-Charles Chapman</div>
                        <div class="visitor-logs__user-temp">36.5 °C</div>
                     </div>
                     <div class="visitor-logs__info-visit">
                        <div class="visitor-logs__visit-details">
                           6/15/2020 4:00 pM<br>
                           <span>Green Sun Hotel</span>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="visitor-logs__btn">
                  <q-btn flat dense no-caps class="btn-see btn-outline" label="See All"></q-btn>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import "./Dashboard.scss";
import Vue from 'vue';
import Chartkick from 'vue-chartkick';
import "chart.js"

Vue.use(Chartkick.use(Chart))

export default
{
   data:() =>
   ({
      select__company: '',
      options_company: [
            'Green Sun Hotel', 'SM Mall' , 'WalterMart'
      ],
      options: [
         'July 1, 2019' , 'July 2, 2019', 'July 3, 2019' , 'July 4, 2019', 'July 5, 2019'
      ],
      select_date: '',
      // dashboard_overview: [
      //    {
      //       overview_img  : '../../../assets/Member/dashboard_overview-bg-1.jpg',
      //       overview_title: 'Total Scanned Today',
      //       overview_total: '193',
      //       overview_info : '93% of Registered Users',
      //       overview_date : 'June 21, 2020'
      //    }
      // ]
   }),
   mounted() { },
   methods: {

   },
}
</script>
