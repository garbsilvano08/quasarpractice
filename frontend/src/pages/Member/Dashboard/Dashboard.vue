<template>
   <div class="dashboard">
      <div class="dashboard__header">
         <div class="dashboard__header-title">DASHBOARD OVERVIEW</div>
         <q-btn flat dense no-caps label="Export" class="btn-export">
            <q-icon name="mdi-export"></q-icon>
         </q-btn>
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
         </div>
         <!-- EMPLOYEE/VISITOR OVERVIEW -->
         <div class="dashboard__graph-item">
            <div class="dashboard__graph-header">
               <div class="dashboard__graph-title">
                  Employee/Visitor Overview
               </div>
               <q-select v-model="select_date" :options="options" outlined dense></q-select>
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
         </div>
         <!-- VISITOR LOGS -->
         <div class="dashboard__graph-item">
            <div class="dashboard__graph-header">
               <div class="dashboard__graph-title">
                  Visitor Logs
               </div>
               <q-select v-model="select_date" :options="options" outlined dense></q-select>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import "./Dashboard.scss";

export default
{
   data:() =>
   ({
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
   methods: { },
}
</script>
