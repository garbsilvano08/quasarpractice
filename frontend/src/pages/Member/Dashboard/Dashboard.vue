<template>
   <div class="dashboard">
      <div class="dashboard__header">
         <div class="header__title">DASHBOARD OVERVIEW</div>
         <div class="header__filter">
            <!-- <q-btn class="btn-outline btn-export" flat dense no-caps>
               Export &nbsp;<q-icon name="mdi-export"></q-icon>
            </q-btn> -->
            <com-picker :user="this.$user_info" @select=getCompanyData class="btn-choose"></com-picker>
            <!-- <q-select class="select-lg" v-model="select__company" :options="options_company" outlined dense></q-select> -->
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
            <div class="dashboard__overview-bg bg-first">
               <div class="dashboard__overview-info">
                  <div class="dashboard__overview-desc">
                     <div class="decs-total">{{traffic_data.count ? traffic_data.count : 0}}</div>
                     <!-- <div class="desc-separator"></div>
                     <div class="decs-info">{{logged_today}}% of Registered Users</div> -->
                  </div>
                  <div class="dashboard__overview-title">Total Scanned Today</div>
                  <!-- <div class="dashboard__overview-date">{{current_date}}</div> -->
               </div>
               <q-img src="../../../assets/Member/overview-1.svg" width="40px"></q-img>
            </div>
         </div>
         <div class="dashboard__overview-item">
            <div class="dashboard__overview-bg bg-second">
               <div class="dashboard__overview-info">
                  <div class="dashboard__overview-desc">
                     <div class="decs-total">{{today_staff}} </div>
                     <!-- <div class="desc-separator"></div>
                     <div class="decs-info">{{highest_log.data.length && highest_log.data[0].has_fever ? 'Has Fever' : 'Normal'}}</div> -->
                  </div>
                  <div class="dashboard__overview-title">Total Staff Today</div>
                  <!-- <div class="dashboard__overview-date">{{highest_log.data.length && highest_log.data[0].has_fever ? 'Has Fever' : 'Normal'}}</div> -->
               </div>
               <q-img src="../../../assets/Member/overview-2.svg" width="45px"></q-img>
            </div>

            <!-- </q-img> -->
         </div>
         <div class="dashboard__overview-item">
            <div class="dashboard__overview-bg bg-third">
               <div class="dashboard__overview-info">
                  <div class="dashboard__overview-desc">
                     <div class="decs-total">{{today_visitors}}</div>
                     <div class="decs-info"></div>
                  </div>
                  <div class="dashboard__overview-title">Total Visitors Today</div>
               </div>
               <q-img src="../../../assets/Member/overview-3.svg" width="70px"></q-img>
            </div>
         </div>
         <div class="dashboard__overview-item">
            <div class="dashboard__overview-bg bg-fourth">
               <div class="dashboard__overview-info">
                  <div class="dashboard__overview-desc">
                     <div class="decs-total">{{current_alerts}}</div>
                     <div class="decs-info"></div>
                  </div>
                  <div class="dashboard__overview-title">Total Fever Cases Today</div>
                  <!-- <div class="dashboard__overview-date">Out of 275 Registered Users</div> -->
               </div>
               <q-img src="../../../assets/Member/overview-4.svg" width="45px"></q-img>
            </div>
         </div>
      </div>
      
      <div class="dashboard__overview-logs">
         <div class="header__title">RECENT LOGS</div>
         <div class="swiper-container">
            <div class="swiper-wrapper">
               <div class="swiper-slide" v-for="(data, i) in this.logs_card.data" :key="i" v-on:click="personInformation(i)">
                  <div class="content__card-info content__card">
                     <div class="content__info">
                        <q-img :src="data.person_img"></q-img>
                        <div class="content__temperature">
                           {{data.temperature}}<br>
                           <span class="abnormal-temperature" v-if="data.has_fever">Has Fever</span>
                           <span class="normal-temperature" v-if="!data.has_fever">Normal</span>
                        </div>
                     </div>
                     <div class="content__info">
                        <div class="content__name">
                           {{data.full_name}} <br>
                           <span>{{data.category}}</span>
                        </div>
                        <div class="content__datetime">
                           <q-icon name="mdi-clock-outline" size="18px"></q-icon> {{data.date_saved}}
                        </div>
                        <div class="content__room">
                           <q-icon name="mdi-cellphone-iphone" size="16px"></q-icon> {{ data.device.device_name + "-" + data.device.log_type}}
                        </div>
                        <div class="content__location">
                           <q-icon name="mdi-briefcase" size="16px"></q-icon> {{data.company_name}}
                        </div>
                     </div>
                  </div>
               </div>
               <div class="swiper-slide">
                  <div class="content__card-seemore content__card" @click="seeMore()">
                     <q-img src="../../../assets/dashboard-logs-more.svg"></q-img>
                     <div class="seemore-label">See more ..</div>
                  </div>
               </div>
            </div>

            <div class="swiper-next">
               <img src="../../../assets/swiper-next-arrow.svg" alt="">
            </div>
            <div class="swiper-prev">
               <img src="../../../assets/swiper-prev-arrow.svg" alt="">
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
               <div class="dashboard__graph-filter">
                  <q-select v-model="select_people" :options="options_people" dense></q-select>
                  <q-select @change="getFootTraffic()" v-model="select_date" :options="options_date" outlined dense></q-select>
                  <!-- <q-input v-model="traffic_date" type='date' outlined dense></q-input> -->
               </div>
               <!-- <q-select v-model="select_date" :options="options" outlined dense></q-select> -->
            </div>

            <div class="dashboard__graph-content">
               <line-chart
                  :data="data_line_graph.data"
                  :legend="false"
               />
            </div>
            <!-- FILTER DIALOG -->
            <q-dialog v-model="date_filter_dialog" persistent>
               <q-card>
                  <q-card-section>
                  <div class="text-h6">Custom Date</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                     <q-input v-model="startDate" type='date' outlined dense></q-input>
                     <q-input v-model="endDate" type='date' outlined dense></q-input>
                  </q-card-section>

                  <q-card-actions align="right">
                     <q-btn @click="date_filter_dialog = false, select_date = last_option" flat label="Cancel" color="primary" v-close-popup />
                     <q-btn @click="getCustomTraffic" flat label="Search" color="primary" v-close-popup />
                  </q-card-actions>
               </q-card>
         </q-dialog>
         <!-- <div v-if="traffic_weekly.data" class="dashboard__graph-content">
            <line-chart style="position: relative; height:250px; width:100%"
               :data="{
                  'MON': traffic_weekly.data.Mon,
                  'TUES': traffic_weekly.data.Tue,
                  'WED': traffic_weekly.data.Wed,
                  'THURS': traffic_weekly.data.Thurs,
                  'FRI': traffic_weekly.data.Fri,
                  'SAT': traffic_weekly.data.Sat,
                  'SUN': traffic_weekly.data.Sun,
               }"
            >
            </line-chart>
         </div> -->
         </div>

         <!-- EMPLOYEE/VISITOR OVERVIEW -->
         <div class="dashboard__graph-item">
            <div class="dashboard__graph-header">
               <div class="dashboard__graph-title">
                  Compare Foot Traffic
               </div>

               <div class="dashboard__graph-filter">
                  <!-- <q-input v-model="employee_date" type='date' outlined dense></q-input> -->
                  <!-- <q-select v-model="select_people" :options="options_people" outlined dense></q-select> -->
                  <q-select v-model="registered_filter" :options="options_date" outlined dense></q-select>
               </div>
            </div>

            <div class="dashboard__graph-content">
               <column-chart
                  :data="data_bar_graph.data"
                  :stacked="true"
                  :colors="[
                     '#4151b3',
                     '#fd8e22',
                     '#f22435',
                     '#f8fe22',
                     '#2089fe',
                     '#23dea7',
                     '#00af50',
                  ]"
               >
               </column-chart>
            </div>
         </div>
          <q-dialog v-model="date_filter_registered" persistent>
            <q-card>
               <q-card-section>
               <div class="text-h6">Custom Date</div>
               </q-card-section>

               <q-card-section class="q-pt-none">
                  <q-input v-model="startDateRegistered" type='date' outlined dense></q-input>
                  <q-input v-model="endDateRegistered" type='date' outlined dense></q-input>
               </q-card-section>

               <q-card-actions align="right">
                  <q-btn @click="date_filter_registered = false, select_date = last_option_registered" flat label="Cancel" color="primary" v-close-popup />
                  <q-btn @click="getCustomTraffic('Registered')" flat label="Search" color="primary" v-close-popup />
               </q-card-actions>
            </q-card>
         </q-dialog>

         <!-- JAM STACKED BAR CHART -->
         <!-- <div class="dashboard__graph-item">
            <div class="dashboard__graph-header">
               <div class="dashboard__graph-title">
                  Compare Foot Traffic
               </div>

               <div class="dashboard__graph-filter">
                  <q-select v-model="registered_filter" :options="options_date" outlined dense></q-select>
               </div>
            </div>

            <div class="dashboard__graph-content">
               <column-chart
                  :data="data_stacked_bar_graph.data"
                  :stacked="true"
                  :colors="[
                     '#4151b3',
                     '#fd8e22',
                     '#f22435',
                     '#f8fe22',
                     '#2089fe',
                     '#23dea7',
                     '#00af50',
                  ]"
               >
               </column-chart>
            </div>
         </div> -->

         <!-- VISITORS PURPOSE -->
         <!-- <div class="dashboard__graph-item">
            <div class="dashboard__graph-header">
               <div class="dashboard__graph-title">
                  Visitors Purpose
               </div>
               <div class="dashboard__graph-filter">
                  <q-select v-model="purpose_filter" :options="option_purpose" outlined dense></q-select>
               </div>
            </div>
            <div class="dashboard__graph-content">
               <pie-chart :data="{
                  'Official Business': purpose_visit.data.official_business,
                  'Collection & Pickup': purpose_visit.data.collection_pickup,
                  'Delivery': purpose_visit.data.delivery,
                  'Corporate Meeting': purpose_visit.data.corporate_meeting,
                  'Client/Customer': purpose_visit.data.client_customer,
                  'Guest': purpose_visit.data.guest,
               }">
               </pie-chart>

               <div class="dashboard__graph-total">
                  <div class="dashboard__graph-content">
                     <div class="dashboard__graph-number--grand">{{purpose_visit.total}}</div>
                     <div class="dashboard__graph-label">Total Visitor</div>
                  </div>
               </div>
               <div class="dashboard__graph-total content__grid-6x6">
                  <div class="dashboard__graph-content">
                     <div class="dashboard__graph-number">{{purpose_visit.data.official_business}}</div>
                     <div class="dashboard__graph-label">Official Business</div>
                  </div>
                  <div class="dashboard__graph-content">
                     <div class="dashboard__graph-number">{{purpose_visit.data.collection_pickup}}</div>
                     <div class="dashboard__graph-label">Collection & Pickup</div>
                  </div>
                  <div class="dashboard__graph-content">
                     <div class="dashboard__graph-number">{{purpose_visit.data.delivery}}</div>
                     <div class="dashboard__graph-label">Delivery</div>
                  </div>
                  <div class="dashboard__graph-content">
                     <div class="dashboard__graph-number">{{purpose_visit.data.corporate_meeting}}</div>
                     <div class="dashboard__graph-label">Corporate Meeting</div>
                  </div>
                  <div class="dashboard__graph-content">
                     <div class="dashboard__graph-number">{{purpose_visit.data.client_customer}}</div>
                     <div class="dashboard__graph-label">Client/Customer</div>
                  </div>
                  <div class="dashboard__graph-content">
                     <div class="dashboard__graph-number">{{purpose_visit.data.guest}}</div>
                     <div class="dashboard__graph-label">Guest</div>
                  </div>
               </div>
            </div>

            <q-dialog v-model="purpose_popup" persistent>
               <q-card>
                  <q-card-section>
                  <div class="text-h6">Custom Date</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                     <q-input v-model="purposeStart" type='date' outlined dense></q-input>
                     <q-input v-model="purposeEnd" type='date' outlined dense></q-input>
                  </q-card-section>

                  <q-card-actions align="right">
                     <q-btn @click="purpose_popup = false, select_date = last_option_purpose" flat label="Cancel" color="primary" v-close-popup />
                     <q-btn @click="getPurposeVisit()" flat label="Search" color="primary" v-close-popup />
                  </q-card-actions>
               </q-card>
            </q-dialog>
         </div> -->

         <!-- VISITORS PURPOSE NEW PIE CHART-->
         <div class="dashboard__graph-item">
            <div class="dashboard__graph-header">
            <div class="dashboard__graph-title">
                  Visitors Purpose
               </div>
               <div class="dashboard__graph-filter">
                  <q-select v-model="purpose_filter" :options="option_purpose" outlined dense></q-select>
                  <!-- <q-input v-model="visitors_date" type='date' outlined dense></q-input> -->
               </div>
            </div>

            <div class="dashboard__graph-content dashboard__graph-pie">
               <div class="dashboard__pie-chart">
                  <pie-chart
                     :donut="true"
                     :legend="false"
                     width="250px"
                     height="250px"
                     :colors="[
                        '#9825f2',
                        '#fd8e22',
                        '#f8fe22',
                        '#2089fe',
                        '#23dea7',
                        '#00af50',
                     ]"
                     :data="{
                        'Official Business': purpose_visit.data.official_business,
                        'Collection & Pickup': purpose_visit.data.collection_pickup,
                        'Delivery': purpose_visit.data.delivery,
                        'Corporate Meeting': purpose_visit.data.corporate_meeting,
                        'Client/Customer': purpose_visit.data.client_customer,
                        'Guest': purpose_visit.data.guest,
                     }">
                  </pie-chart>
                  <div class="dashboard__pie-total">
                     <div class="pie-total__amount">{{purpose_visit.total}}</div>
                     <div class="pie-total__label">Total Visitors</div>
                  </div>
               </div>

               <div class="dashboard__pie-legend">
                  <div class="pie-legend__item">
                     <div class="pie-legend__color first-color"></div>
                     <div class="pie-legend__percent">{{purpose_visit.percentage.official_business}}%</div>
                  </div>
                  <div class="pie-legend__item">
                     <div class="pie-legend__color second-color"></div>
                     <div class="pie-legend__percent">{{purpose_visit.percentage.collection_pickup}}%</div>
                  </div>
                  <div class="pie-legend__item">
                     <div class="pie-legend__color third-color"></div>
                     <div class="pie-legend__percent">{{purpose_visit.percentage.delivery}}%</div>
                  </div>
                  <div class="pie-legend__item">
                     <div class="pie-legend__color fourth-color"></div>
                     <div class="pie-legend__percent">{{purpose_visit.percentage.corporate_meeting}}%</div>
                  </div>
                   <div class="pie-legend__item">
                     <div class="pie-legend__color fifth-color"></div>
                     <div class="pie-legend__percent">{{purpose_visit.percentage.client_customer}}%</div>
                  </div>
                  <div class="pie-legend__item">
                     <div class="pie-legend__color sixth-color"></div>
                     <div class="pie-legend__percent">{{purpose_visit.percentage.guest}}%</div>
                  </div>
               </div>

               <div class="dashboard__pie-total content__grid-3x3">
                  <div class="pie-total__item">
                     <div class="pie-total__item-amount">{{purpose_visit.data.official_business}}</div>
                     <div class="pie-total__item-label">
                        <div class="item-label__color color-1"></div>
                        <div class="item-label__name">Official Business</div>
                     </div>
                  </div>
                  <div class="pie-total__item">
                     <div class="pie-total__item-amount">{{purpose_visit.data.collection_pickup}}</div>
                     <div class="pie-total__item-label">
                        <div class="item-label__color color-2"></div>
                        <div class="item-label__name">Collection & Pickup</div>
                     </div>
                  </div>
                  <div class="pie-total__item">
                     <div class="pie-total__item-amount">{{purpose_visit.data.delivery}}</div>
                     <div class="pie-total__item-label">
                        <div class="item-label__color color-3"></div>
                        <div class="item-label__name">Delivery</div>
                     </div>
                  </div>
                  <div class="pie-total__item">
                     <div class="pie-total__item-amount">{{purpose_visit.data.corporate_meeting}}</div>
                     <div class="pie-total__item-label">
                        <div class="item-label__color color-4"></div>
                        <div class="item-label__name">Corporate Meeting</div>
                     </div>
                  </div>
                  <div class="pie-total__item">
                     <div class="pie-total__item-amount">{{purpose_visit.data.client_customer}}</div>
                     <div class="pie-total__item-label">
                        <div class="item-label__color color-5"></div>
                        <div class="item-label__name">Client/Customer</div>
                     </div>
                  </div>
                  <div class="pie-total__item">
                     <div class="pie-total__item-amount">{{purpose_visit.data.guest}}</div>
                     <div class="pie-total__item-label">
                        <div class="item-label__color color-6"></div>
                        <div class="item-label__name">Guest</div>
                     </div>
                  </div>
               </div>
            </div>
            <q-dialog v-model="purpose_popup" persistent>
               <q-card>
                  <q-card-section>
                  <div class="text-h6">Custom Date</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                     <q-input v-model="purposeStart" type='date' outlined dense></q-input>
                     <q-input v-model="purposeEnd" type='date' outlined dense></q-input>
                  </q-card-section>

                  <q-card-actions align="right">
                     <q-btn @click="purpose_popup = false, select_date = last_option_registered" flat label="Cancel" color="primary" v-close-popup />
                     <q-btn @click="getPurposeVisit('Registered')" flat label="Search" color="primary" v-close-popup />
                  </q-card-actions>
               </q-card>
            </q-dialog>
         </div>

         <!-- VISITOR LOGS -->
         <!-- <div class="dashboard__graph-item dashboard__graph-item--alert-logs">
            <div class="dashboard__graph-header">
               <div class="dashboard__graph-title">
                  Alert Logs
               </div>
               <div class="dashboard__graph-filter">
                  <q-input v-model="alert_date" type='date' outlined dense></q-input>
               </div>
            </div>
            <div v-if="this.alert_list.data" class="dashboard__graph-content dashboard__graph-content--alert-logs">
               <div class="visitor-logs__list"  v-for="(alert, i) in this.alert_list.data" :key="i">
                  <div class="visitor-logs__info">
                     <q-img :src="alert.person_image">
                     </q-img>
                     <div class="visitor-logs__info-user">
                        <div class="visitor-logs__user-name">{{alert.full_name}}</div>
                        <div class="visitor-logs__user-temp">{{alert.temperature}} °C</div>
                     </div>
                     <div class="visitor-logs__info-visit">
                        <div class="visitor-logs__visit-details">
                           {{new Date(alert.date_saved).toLocaleString()}}<br>
                        </div>
                        <div class="visitor-logs__visit-company">
                           {{alert.company_name}}
                        </div>
                     </div>
                  </div>
               </div>
               <div class="visitor-logs__btn">
               </div>
            </div>
         </div> -->
      </div>
      <div class="dashboard__overview">
         <div class="dashboard__overview-total">
            <div class="dashboard__total-info">
               <div class="dashboard__total-number">{{staff_number}}</div>
               <div class="dashboard__total-title">Registered Staff</div>
               <!-- <div class="dashboard__total-date">Since {{current_month}}</div> -->
            </div>
            <!-- <q-img src="../../../assets/Member/total-employees.svg" width="45px"></q-img> -->
         </div>
         <div class="dashboard__overview-total">
            <div class="dashboard__total-info">
               <div class="dashboard__total-number">{{visitor_number}}</div>
               <div class="dashboard__total-title">Registered Visitors</div>
               <!-- <div class="dashboard__total-date">Since {{current_month}}</div> -->
            </div>
            <!-- <q-img src="../../../assets/Member/total-visitors.svg" width="70px"></q-img> -->
         </div>
         <!-- <div class="dashboard__overview-total">
            <q-img src="../../../assets/Member/total-alerts.svg" width="45px"></q-img>
            <div class="dashboard__total-info">
               <div class="dashboard__total-title">Total Alerts</div>
               <div class="dashboard__total-number">{{monthly_alert}}</div>
               <div class="dashboard__total-date">Since {{current_month}}</div>
            </div>
         </div> -->
         <div class="dashboard__overview-total">
            <div class="dashboard__total-info">
               <div class="dashboard__total-number">{{device_number}}</div>
               <div class="dashboard__total-title">Devices Installed</div>
               <!-- <div class="dashboard__total-date">Since {{current_month}}</div> -->
            </div>
            <!-- <q-img src="../../../assets/Member/total-devices.svg" width="30px"></q-img> -->
         </div>
         <div class="dashboard__overview-total">
            <div class="dashboard__total-info">
               <div class="dashboard__total-number">0</div>
               <div class="dashboard__total-title">Fever Cases</div>
               <!-- <div class="dashboard__total-date">Since {{current_month}}</div> -->
            </div>
            <!-- <q-img src="../../../assets/Member/total-cases.svg" width="23px"></q-img> -->
         </div>
      </div>
   </div>
</template>

<script>
import { base64StringToBlob } from 'blob-util';
import  ComPicker from "../../../components/companyPicker/ComPicker"
import "./Dashboard.scss";
import Vue from 'vue';
import Chartkick from 'vue-chartkick';
import "chart.js"
import { postGetCompanies,
   postAddPerson,
   postUpdateStaff,
   postSavePerson,
   postGetDailyLog,
   postGetWeeklyCount,
   postLatestLog,
   postPersonByCateg,
   postGetAllLogs,
   postGetPersons,
   postGetPurposeVisit,
   postGetAlertCount,
   postGetDevice,
   postDashboard,
   postGetCompany
} from '../../../references/url';

// Classes
import DashboardClass from '../../../classes/DashboardClass';
import { date } from 'quasar';
import { log } from 'util';
import LoginVue from '../../Front/Login.vue';

import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import swiper from 'swiper/bundle';

Vue.use(Chartkick.use(Chart))

export default
{
   components: { ComPicker },
   //pointerdata
   data:() =>
   ({
      logs_card : {},
      purpose_visit_total : 0,
      data_stacked_bar_graph: {data: [
         {
            name: 'Employee', data: {'Monday': 2, 'Tuesday': 5, 'Wednesday': 3, 'Thrusday': 6, 'Friday': 8}
         },
         {
            name: 'Visitor', data: {'Monday': 3, 'Tuesday': 4, 'Wednesday': 7, 'Thrusday': 6, 'Friday': 5,}
         },
         {
            name: 'Stranger', data: {'Monday': 4, 'Tuesday': 2, 'Wednesday': 1, 'Thrusday': 5, 'Friday': 4,}
         }
      ]},
      data_bar_graph: {data:[]},
      data_line_graph:
      {data: [
         {
            name: 'Employee', data: {'Monday': 2, 'Tuesday': 5, 'Wednesday': 3, 'Thrusday': 6, 'Friday': 8}
         },
         {
            name: 'Visitor', data: {'Monday': 3, 'Tuesday': 4, 'Wednesday': 7, 'Thrusday': 6, 'Friday': 5,}
         }
      ]},
      sample_alert: [
         {
            person_image: 'http://157.245.55.109/uploader/uploads/optimize_images/lebron.jpg',
            full_name: 'Juan Dela Cruz',
            date_saved: new Date(),
            company_name: 'San Miguel Corp',
            temperature: 27
         },
         {
            person_image: 'http://157.245.55.109/uploader/uploads/optimize_images/lebron.jpg',
            full_name: 'Juan Dela Cruz',
            date_saved: new Date(),
            company_name: 'San Miguel Corp',
            temperature: 27
         },
         {
            person_image: 'http://157.245.55.109/uploader/uploads/optimize_images/lebron.jpg',
            full_name: 'Juan Dela Cruz',
            date_saved: new Date(),
            company_name: 'San Miguel Corp',
            temperature: 27
         },
         {
            person_image: 'http://157.245.55.109/uploader/uploads/optimize_images/lebron.jpg',
            full_name: 'Juan Dela Cruz',
            date_saved: new Date(),
            company_name: 'San Miguel Corp',
            temperature: 27
         },
         {
            person_image: 'http://157.245.55.109/uploader/uploads/optimize_images/lebron.jpg',
            full_name: 'Juan Dela Cruz',
            date_saved: new Date(),
            company_name: 'San Miguel Corp',
            temperature: 27
         },
         {
            person_image: 'http://157.245.55.109/uploader/uploads/optimize_images/lebron.jpg',
            full_name: 'Juan Dela Cruz',
            date_saved: new Date(),
            company_name: 'San Miguel Corp',
            temperature: 27
         },
         {
            person_image: 'http://157.245.55.109/uploader/uploads/optimize_images/lebron.jpg',
            full_name: 'Juan Dela Cruz',
            date_saved: new Date(),
            company_name: 'San Miguel Corp',
            temperature: 27
         },
         {
            person_image: 'http://157.245.55.109/uploader/uploads/optimize_images/lebron.jpg',
            full_name: 'Juan Dela Cruz',
            date_saved: new Date(),
            company_name: 'San Miguel Corp',
            temperature: 27
         },
         {
            person_image: 'http://157.245.55.109/uploader/uploads/optimize_images/lebron.jpg',
            full_name: 'Juan Dela Cruz',
            date_saved: new Date(),
            company_name: 'San Miguel Corp',
            temperature: 27
         },

      ],
      visitors_date: new Date().toISOString().split('T')[0],
      traffic_date: new Date().toISOString().split('T')[0],
      alert_date: new Date().toISOString().split('T')[0],
      employee_date: new Date().toISOString().split('T')[0],

      purpose_visit: {
         data: [],
         percentage: {
            official_business: 0,
            delivery: 0,
            corporate_meeting: 0,
            client_customer: 0,
            guest: 0
         }
      },
      company_details: {data: []},
      traffic_weekly:{data: []},
      staff_visitors: {data: []},
      options: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
      dashboard_class: new DashboardClass(),
      company_list: [],
      select__company: 'All Caompanies',
      options_company: ['All Caompanies'],
      options_date: [
         'Today', 'Daily' , 'Weekly', 'Monthly' , 'Custom Date'
      ],
      select_people: 'All',
      options_people: [
         'All' , 'Staff', 'Visitor', 'Stranger'
      ],
      select_date: 'Today',
      traffic_data: {count: 0},
      highest_log: {data: []},
      current_date: new Date().toUTCString().split(" "),
      current_month: new Date().toUTCString().split(" "),
      alert_list: {data: []},
      current_alerts: 0,
      staff_number: 0,
      visitor_number: 0,
      monthly_alert: 0,
      device_number: 0,
      date_range: new Date().setDate(1),
      logged_today: 0,
      date_filter_dialog: false,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      last_option: '',
      date_filter_registered: false,
      startDateRegistered: new Date().toISOString().split('T')[0],
      endDateRegistered: new Date().toISOString().split('T')[0],
      last_option_registered: '',
      registered_filter: 'Today',
      purpose_filter: 'Today',
      option_purpose: ['Today', 'Custom Date'],
      purpose_popup: false,
      purposeStart: new Date().toISOString().split('T')[0],
      purposeEnd: new Date().toISOString().split('T')[0],
      last_option_purpose: '',
      registered_has_fever: 0,
      today_visitors: 0,
      today_staff: 0,
      if_fever_detected_alert_dialog: true,
      device_list: {data: []},
      company_list: []
   }),

   watch:
    { 
       async purpose_filter(val)
       {
            this.last_option_purpose = val
            if (val == 'Custom Date')
            {
               this.purpose_popup = true
            }
             else if( val == 'Daily' || val == 'Weekly' || val == 'Monthly' || val == 'Today')
            {
               await this.getPurposeVisit()
            }
       },

       async select_date(val, old)
        {
           this.last_option = old
         //   console.log(val, old);
           if (val == 'Custom Date')
           {
              this.date_filter_dialog = true
           }
            else if(val == 'Daily' || val == 'Weekly' || val == 'Monthly' || val == 'Today')
           {
              if (this.company_details._id) await this.getTrafficData({filter: {current_date: new Date(), company_id:{$in: this.company_list }, date_filter: this.select_date , person: this.select_people}})
              else await this.getTrafficData({filter: {current_date: new Date(), date_filter: this.select_date , person: this.select_people}})
           }
        },

        async registered_filter(val, old)
        {
            this.last_option_registered = old
            
            if (val == 'Custom Date')
            {
               this.date_filter_registered = true
            }
            else if(val == 'Daily' || val == 'Weekly' || val == 'Monthly' || val == 'Today')
            {
               await this.getEmployeeVisitor()
            }
        },

        async select_people(val)
        {   let dateTraffic = date.formatDate(this.startDate, 'MMM DD') + " - " + date.formatDate(this.endDate , 'MMM DD YYYY')
           if (this.select_date == dateTraffic)
           {   
              await this.getCustomTraffic()
           }
           else
           {
              if (this.company_details._id) await this.getTrafficData({filter: {company_id:{$in: this.company_list }, date_filter: this.select_date , person: this.select_people}})
              else await this.getTrafficData({filter: {date_filter: this.select_date , person: this.select_people}})
           }
         //   await this.getTrafficData({filter: {date_filter: this.select_date , person: this.select_people}})
        },
        async visitors_date(val)
        {   
            if (val)
            {
               await this.getPurposeVisit()
            }
        },
        async alert_date(val)
        {
            if (val)
            {
               await this.getAlertLogs()
            }
        },
        async traffic_date(val)
        {
           await this.getTraffic()
        },
        async employee_date(val)
        {
           await this.getStaffVisitors()
        }
    },

   methods: {
      async getCompany(company_id)
      {
         return await this.$_post(postGetCompany, {id: company_id})
      },
      async getFootTraffic()
      {  
         if (this.select_date == 'Custom Date')
         {
            this.date_filter_dialog = true
         }
         else
         {
            if (this.company_details._id) await this.getTrafficData({filter: {current_date: new Date(), company_id:{$in: this.company_list }, date_filter: this.select_date , person: this.select_people}})
            else await this.getTrafficData({filter: {current_date: new Date(), date_filter: this.select_date , person: this.select_people}})
         }
         // this.last_option = this.select_date
      },
      async getEmployeeVisitor()
      {
         let data
         let registered_type = ['Staff', 'Visitor', , 'Stranger']
         this.data_bar_graph.data = []

         for (let index = 0; index < registered_type.length; index++) {
            if (this.company_details._id) data = await this.getTrafficData({filter: {company_id:{$in: this.company_list }, date_filter: this.registered_filter , person: registered_type[index]}}, 'Registered')
            else data = await this.getTrafficData({filter: {date_filter: this.registered_filter , person: registered_type[index]}}, 'Registered')
            data.data.forEach(reg => {
               if (reg.name == registered_type[index])
               {
                  this.data_bar_graph.data.push(reg)
               }  
            });
         }
      },

      async getCustomTraffic(type)
      {  
         let data
         let option_filter = ['Staff', 'Visitor', 'Stranger']
         if (type == 'Registered')
         {  
            let bar_data = []
            if (new Date(this.startDateRegistered) <= new Date(this.endDateRegistered))
            {  
               this.registered_filter = date.formatDate(this.startDateRegistered, 'MMM DD') + " - " + date.formatDate(this.endDateRegistered , 'MMM DD YYYY')
               this.data_bar_graph = {data: []}
               for (let index = 0; index < option_filter.length; index++) {
                  if (this.company_details._id) data = await this.getTrafficData({filter: {start_date: this.startDateRegistered, end_date: this.endDateRegistered, company_id:{$in: this.company_list }, date_filter: this.registered_filter , person: option_filter[index]}}, 'Registered')
                  else data = await this.getTrafficData({filter: {date_filter: this.registered_filter , person: option_filter[index], end_date: this.endDateRegistered, start_date: this.startDateRegistered}}, 'Registered')
                    if (data.data[0].data) bar_data.push(data.data[0])
               }  
               this.data_bar_graph.data = bar_data
            }
            else
            {  
               this.registered_filter = this.last_option_registered
               this.$q.notify(
                  {
                     color: 'red',
                  message: 'Invalid date'
               });
            }
         }
         else
         {  
            this.select_date = date.formatDate(this.startDate, 'MMM DD') + " - " + date.formatDate(this.endDate , 'MMM DD YYYY') // Foot Traffic
            if (new Date(this.startDate) <= new Date(this.endDate))
            {
               if (this.company_details._id) await this.getTrafficData({filter: {start_date: this.startDate, end_date: this.endDate, company_id:{$in: this.company_list }, date_filter: this.select_date , person: this.select_people}})
               else await this.getTrafficData({filter: {date_filter: this.select_date , person: this.select_people, end_date: this.endDate, start_date: this.startDate}})
               // this.date_filter_dialog = false
            }
            else
            {
               this.select_date = this.last_option
               this.$q.notify(
                  {
                     color: 'red',
                     message: 'Invalid date'
               });
            }
         }
         this.date_filter_dialog = false
         this.date_filter_registered = false
      },

      async getCompanyData(value)
      {
         this.company_list = []
         let date_string = new Date().toISOString().split('T')[0].split("-")
         this.company_details = value

         this.company_list.push(this.company_details._id)
         let company = await this.getCompany(this.company_details._id)
         if (company.data.tenants && company.data.tenants.length)
         {
            for (let index = 0; index < company.data.tenants.length; index++) {
               this.company_list.push(company.data.tenants[index])
            }
         }
         
         this.staff_number = await this.personsData({find_person: {company_id:{$in: this.company_list }, category: 'Staff', date_created: { '$gt' : new Date(this.company_details.date_created) , '$lt' : new Date()}}})
         this.visitor_number = await this.personsData({find_person: {company_id:{$in: this.company_list }, category: 'Visitor', date_created: { '$gt' : new Date(this.company_details.date_created) , '$lt' : new Date()}}})
         await this.getMonthlyAlert()
         await this.getDevices()
         await this.getPurposeVisit()
         await this.getAlertLogs()
         await this.getTraffic()
         await this.getStaffVisitors()
         await this.getTotalScannedToday(new Date(), value._id)
         await this.getTotalRegistered()
      },

      async personsData(category)
      {
         let data = await this.$_post(postGetPersons, category);
         return data.data.length
      },

      async getDevices()
      {
         let params = {}
         if (this.company_details || this.company_details.company_name != "All Company" ){
            params = {find_device: {company_name: this.company_details.company_name}}
         }
         // else params = {find_device: {date_installed: { '$gt' : new Date(this.date_range) , '$lt' : new Date()}}}

         this.device_list =  await this.$_post(postGetDevice, params);
         this.device_number = this.device_list.data.length
      },

      deviceInfo(id, type)
      {
         for (let index = 0; index < this.device_list.data.length; index++) {
            if (this.device_list.data[index].device_id == id)
            if (type == 'name') return this.device_list.data[index].device_name
            else return this.device_list.data[index].log_type
         }
      },

      async getMonthlyAlert()
      {
         let params = {}
         if (this.company_details || this.company_details.company_name != "All Company" ){
            params = {find_by_category: {date_saved: { '$gt' : new Date(this.company_details.date_created) , '$lt' : new Date() },
            has_fever: true,
            company_id:{$in: this.company_list }}}
         }
         else {
            params = {find_by_category: {date_saved: { '$gt' : new Date(this.date_range) , '$lt' : new Date() }, has_fever: true}}
         }
         let count =  await this.$_post(postPersonByCateg, params);

         this.monthly_alert = count.data.length
      },

      async getPurposeVisit()
      {  
         let params = {}
         if (this.company_details || this.company_details.company_name != "All Company" ){
            
            if( this.purpose_filter != 'Today')
            {     
               this.purpose_filter = date.formatDate(this.purposeStart, 'MMM DD') + " - " + date.formatDate(this.purposeEnd , 'MMM DD YYYY') // Purpose Traffic
               if (new Date(this.purposeStart) > new Date(this.purposeEnd))
               {
                  this.purpose_filter = date.formatDate(this.purposeStart, 'MMM DD') + " - " + date.formatDate(this.purposeEnd , 'MMM DD YYYY') // Purpose Traffic
                  this.$q.notify(
                  {
                     color: 'red',
                     message: 'Invalid date'
                  });
                  params = {find_all: {date_string: new Date(this.visitors_date).toISOString().split('T')[0], company_id:{$in: this.company_list }}}
               }
               else params = {find_all: {date_saved: { $gte: new Date(this.purposeStart), $lt: new Date(this.purposeEnd)}, company_id:{$in: this.company_list }}}
            }
            else params = {find_all: {date_string: new Date(this.visitors_date).toISOString().split('T')[0], company_id:{$in: this.company_list }}}

         }
         else {
            if( this.purpose_filter != 'Today')
            {  
               this.purpose_filter = date.formatDate(this.purposeStart, 'MMM DD') + " - " + date.formatDate(this.purposeEnd , 'MMM DD YYYY') // Purpose Traffic
               if (new Date(this.purposeStart) > new Date(this.purposeEnd))
               {
                  this.purpose_filter = date.formatDate(this.purposeStart, 'MMM DD') + " - " + date.formatDate(this.purposeEnd , 'MMM DD YYYY') // Purpose Traffic
                  this.$q.notify(
                  {
                     color: 'red',
                     message: 'Invalid date'
                  });
                  params = {find_all: {date_string: new Date().toISOString().split('T')[0]}}
               }
               else params = {find_all: {date_saved: { '$gte': new Date(this.purposeStart), '$lt': new Date(this.purposeEnd)}}}
            }
            else params = {find_all: {date_string: new Date().toISOString().split('T')[0]}}
            
         }
         this.purpose_visit =  await this.$_post(postGetPurposeVisit, params);
         this.purpose_visit.total =
            this.purpose_visit.data.official_business 
            + this.purpose_visit.data.collection_pickup 
            + this.purpose_visit.data.delivery
            + this.purpose_visit.data.corporate_meeting
            + this.purpose_visit.data.client_customer
            + this.purpose_visit.data.guest
         this.purpose_visit.percentage =
         {
            official_business: this.purpose_visit.total ? (this.purpose_visit.data.official_business/this.purpose_visit.total)*100 : 0,
            collection_pickup: this.purpose_visit.total ? (this.purpose_visit.data.collection_pickup/this.purpose_visit.total)*100 : 0,
            delivery: this.purpose_visit.total ? (this.purpose_visit.data.delivery/this.purpose_visit.total)*100 : 0,
            corporate_meeting: this.purpose_visit.total ? (this.purpose_visit.data.corporate_meeting/this.purpose_visit.total)*100 : 0,
            client_customer: this.purpose_visit.total ? (this.purpose_visit.data.client_customer/this.purpose_visit.total)*100 : 0,
            guest: this.purpose_visit.total ? (this.purpose_visit.data.guest/this.purpose_visit.total)*100: 0,
         }
      },

      async getAlertLogs()
      {
         let params = {}
         let current_params = {}
         if (this.company_details || this.company_details.company_name != "All Company" ){
           params =  {find_by_category: {has_fever: true, date_logged: new Date(this.alert_date).toISOString().split('T')[0], company_id:{$in: this.company_list }}, limit: 3}
           current_params =  {find_by_category: {has_fever: true, date_logged: new Date().toISOString().split('T')[0], company_id:{$in: this.company_list }}}
         }
         else {
            params =  {find_by_category: {has_fever: true, date_logged: new Date(this.alert_date).toISOString().split('T')[0]}, limit: 3}
            current_params =  {find_by_category: {has_fever: true, date_logged: new Date().toISOString().split('T')[0]}}
         }

         this.alert_list = await this.$_post(postPersonByCateg, params);
         let current_data = await this.$_post(postPersonByCateg, current_params);
         current_data.data.forEach(person=>{
            if (person.category == 'Staff' || person.category == 'Visitor') this.registered_has_fever = this.registered_has_fever + 1
         })
         this.current_alerts = current_data.data.length
      },
      async getTraffic()
      {
         this.traffic_weekly = {}
         let params = {}
         if (this.company_details || this.company_details.company_name != "All Company" ){
           params =  {find_count: {date_string: new Date(this.traffic_date).toISOString().split('T')[0], company_id:{$in: this.company_list }, key: 'Traffic'}}
         }
         else {
            params =  {find_count: {date_string: new Date(this.traffic_date).toISOString().split('T')[0], company_id: 'global', key: 'Traffic'}}
         }
         this.traffic_weekly = await this.$_post(postGetWeeklyCount, params);
      },

      async getStaffVisitors()
      {
         let params = {}
         if (this.company_details || this.company_details.company_name != "All Company" ){
           params =  {find_count: {date_string: new Date(this.employee_date).toISOString().split('T')[0], company_id:{$in: this.company_list }, key: 'Visitor'}}

         }
         else {
            params =  {find_count: {date_string: new Date(this.traffic_date).toISOString().split('T')[0], company_id: 'global', key:  'Visitor'}}
         }
         this.staff_visitors = await this.$_post(postGetWeeklyCount, params);
      },

      async getTotalScannedToday()
      {
         let params = {}
         let filter = {}
         let current_date = new Date()


         if (this.company_details)
         {
            // params = {find_by: {date_logged: new Date().toISOString().split('T')[0], company_id: this.company_details._id}, limit: 1, sort_by:{temperature: -1}}
            filter = {date_saved: {'$gte' : new Date(current_date.setHours(0,0,0,0)), '$lte' : new Date(current_date.setHours(23,59,59,100))}, company_id:{$in: this.company_list }}
         }
         else
         {
            // params = {find_by: {date_logged: new Date().toISOString().split('T')[0]}, limit: 1, sort_by:{temperature: -1}}
            filter = {date_saved: {'$gte' : new Date(current_date.setHours(0,0,0,0)), '$lte' : new Date(current_date.setHours(23,59,59,100))}}
         }

         let data = await this.$_post('member/get/count_logs', {find_by_category: filter});
         this.traffic_data = data.data
      },

      async getTrafficData(params = {}, type)
      {
         if (type == 'Registered') return await this.$_post('member/dashbord/counting', params);
         else this.data_line_graph = await this.$_post('member/dashbord/counting', params);
      },

      async getTotalRegistered()
      {
         let total = 0
          let params = {}
         // if (this.company_details)
         if (this.company_details) params = {find_count: {date_string: new Date(this.traffic_date).toISOString().split('T')[0], company_id: this.company_details._id ? {$in: this.company_list } : null, key: {$in: ['Staff', 'Visitor']}}}
         if (params.find_count.company_id == null) params = {find_count: {date_string: new Date(this.traffic_date).toISOString().split('T')[0], company_id: 'global', key: {$in: ['Staff', 'Visitor']}}}

         // console.log(params);
         let today_logs = await this.$_post(postGetDailyLog, params);
         if (today_logs.data.length)
         {
            this.today_visitors = 0
            for (let log of today_logs.data) {
               total = total + Number(log.count)
               if (log.key == 'Visitor') this.today_visitors = this.today_visitors + 1
               else if (log.key == 'Staff') this.today_staff = this.today_staff + 1
            }
            this.logged_today = (total/this.traffic_data.count) * 100
            this.logged_today = this.logged_today.toFixed(0);
         }
         else
         {
             this.logged_today = 0
         }
      },
      seeMore(){
         this.$router.push({
                name: "member_log_report"
            })
      },
      personInformation(daily_logs_info){
         if (this.logs_card.data[daily_logs_info].category != 'Stranger')
         {
            this.$router.push({
                  name: "member_personal-information",
                  params: {
                     daily_logs_info: this.logs_card.data[daily_logs_info],
                     from_daily_logs : 'daily_logs'
                  },
            })
         }
      },
      async deviceId(device_id)
      {
         let params = {find_device: {device_id: device_id}}
         let data = await this.$_post(postGetDevice, params);
         return data.data[0]
      },
      convertDateFormat(date_saved)
      {
         let full_date = new Date(date_saved)
         let date = full_date.toISOString().split('T')[0]
         var hours = full_date.getHours() ; // gives the value in 24 hours format
         var AmOrPm = hours >= 12 ? 'PM' : 'AM';
         hours = (hours % 12) || 12;
         var minutes = full_date.getMinutes() ;
         var finalTime = hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0") + " " + AmOrPm;
         // console.log(date + ", " + finalTime);
         return date + ", " + finalTime
      },

      async getLatestLogs(){
         let find_by_category = {}
         await this.getTotalScannedToday()
         let sort = {} , flag = 0
         sort['date_saved'] = -1
         if (this.company_details) find_by_category = {company_id: {$in: this.company_list }}
         // console.log(find_by_category);
         let logs = await this.$_post(postPersonByCateg, {find_by_category: find_by_category, sort: sort, limit:8} );
         for (let index = 0; index < logs.data.length; index++) {
               logs.data[index].date = this.convertDateFormat(logs.data[index].date_saved)
               logs.data[index].device = await this.deviceId(logs.data[index].device_id)
               // index++
         }
         this.logs_card = logs
         for (let index = 0; index < this.logs_card.data.length; index++) {
               this.logs_card.data[index].date_saved = date.formatDate(this.logs_card.data[index].date_saved, 'MMM D YYYY - hh:mm:ss A')
         }
         await this.getDevices()
         await this.getMonthlyAlert()
         await this.getPurposeVisit()
         await this.getAlertLogs()
         await this.getTraffic()
         // await this.getStaffVisitors()
         // await this.getEmployeeVisitor()

         setTimeout(this.getLatestLogs, 15000);
      },
      async uploadImage()
      {
         if (this.company_details)
         {
            let logs = await this.$_post(postPersonByCateg, {find_by_category: {date_logged: new Date().toISOString().split('T')[0], company_id:{$in: this.company_list }}, sort: {date_saved: -1}});
            // console.log(logs, 'kljkljlkjlk');
               for (let index = 0; index < logs.data.length; index++) { 
                  if (!logs.data[index].person_img.startsWith('http'))
                  {  
                     let imageName = 'vision-' + Date.now().toString() + ".png"
                     let blob = "";
                     var formDatatoBackend = new FormData();
                     let contentType = 'image/png';
                     blob = "";
                     blob = base64StringToBlob(logs.data[index].person_img, contentType);
                     blob.lastModifiedDate = new Date();
                     formDatatoBackend.append('image', blob, imageName);
                     let res
                     try
                     {
                        res = await this.$_post_file(formDatatoBackend);
                        logs.data[index].person_img = res
                        await this.$_post('member/save/image', {info: {id: logs.data[index]._id, image: res}});
                     }
                     catch(e){}
                  }  
               }
         }
      }
   },

   async mounted()
   {  //pointermount
      let sample_date = new Date()
      sample_date.setHours(sample_date.getHours())
      sample_date.toISOString().split('T')[0].split("-")

      // console.log(sample_date);
      if (this.$user_info.company)
      {
         this.company_details = this.$user_info.company
         this.company_list.push(this.company_details._id)
         let company = await this.getCompany(this.company_details._id)
         if (company.data.tenants && company.data.tenants.length)
         {
            for (let index = 0; index < company.data.tenants.length; index++) {
               this.company_list.push(company.data.tenants[index])
            }
         }
      }
      let params = {}

      await this.uploadImage()
      await this.getLatestLogs()
      let date_string = new Date().toISOString().split('T')[0].split("-")
      this.getTotalScannedToday(new Date(), 'global')
      this.current_date = this.current_date[0] + " " + this.current_date[1] + " " + this.current_date[2] + " " + this.current_date[3]
      this.current_month = this.current_month[2] + " " + this.current_month[3]
      this.staff_number = await this.personsData({find_person: {category: 'Staff', date_string: date_string[0] + "-" + date_string[1]}})
      this.visitor_number = await this.personsData({find_person: {category: 'Visitor', date_string: date_string[0] + "-" + date_string[1]}})
      await this.getTotalRegistered()

      if (this.company_details) params = {filter: {current_date: new Date(), company_id:{$in: this.company_list } ,date_filter: this.select_date , person: this.select_people}}
      else params = {filter: {current_date: new Date(), date_filter: this.select_date, person: this.select_people}}

     if (this.$user_info.user_type == 'Officer')
      {
         this.$router.push({ name: 'member_frontdesk_addreport' });
      }
      this.company_details = this.$user_info.user_type != 'Super Admin' ? this.$user_info.company : {data: []}

      // console.log(this.company_details);
      // Getting Devices
      await this.getDevices()

      // Alert
      await this.getMonthlyAlert()

      //Purpose
      await this.getPurposeVisit()

      // Alert Logs
      await this.getAlertLogs()

      // Traffic
      await this.getTraffic()

      await this.getStaffVisitors()

      await this.getEmployeeVisitor()

      await this.getTrafficData(params)

   },
   
   updated() {
      var swiper = new Swiper('.swiper-container', {
         slidesPerView: 4,
         spaceBetween: 20,
         navigation: {
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev',
         },
         breakpoints: {
        1366: {
            slidesPerView: 4,
        },
        768: {
				slidesPerView: 3,
        },
        425: {
            slidesPerView: 1,
        },
        375: {
            slidesPerView: 1,
        },
        320: {
            slidesPerView: 1,
        },
      }
      });
   },
}
</script>
