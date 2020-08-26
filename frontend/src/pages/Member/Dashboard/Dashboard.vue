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
               <q-img src="../../../assets/Member/total-employees.svg" width="45px"></q-img>
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
      <div class="dashboard__overview">
         <div class="dashboard__overview-total">
            <div class="dashboard__total-info">
               <div class="dashboard__total-number">{{staff_number}}</div>
               <div class="dashboard__total-title">Registered Staff</div>
               <!-- <div class="dashboard__total-date">Since {{current_month}}</div> -->
            </div>
            <q-img src="../../../assets/Member/total-employees.svg" width="45px"></q-img>
         </div>
         <div class="dashboard__overview-total">
            <div class="dashboard__total-info">
               <div class="dashboard__total-number">{{visitor_number}}</div>
               <div class="dashboard__total-title">Registered Visitors</div>
               <!-- <div class="dashboard__total-date">Since {{current_month}}</div> -->
            </div>
            <q-img src="../../../assets/Member/total-visitors.svg" width="70px"></q-img>
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
            <q-img src="../../../assets/Member/total-devices.svg" width="30px"></q-img>
         </div>
         <div class="dashboard__overview-total">
            <div class="dashboard__total-info">
               <div class="dashboard__total-number">0</div>
               <div class="dashboard__total-title">Fever Cases</div>
               <!-- <div class="dashboard__total-date">Since {{current_month}}</div> -->
            </div>
            <q-img src="../../../assets/Member/total-cases.svg" width="23px"></q-img>
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
                  <q-select v-model="select_people" :options="options_people" outlined dense></q-select>
                  <q-select v-model="select_date" :options="options_date" outlined dense></q-select>
                  <!-- <q-input v-model="traffic_date" type='date' outlined dense></q-input> -->
               </div>
               <!-- <q-select v-model="select_date" :options="options" outlined dense></q-select> -->
            </div>

            <div class="dashboard__graph-content">
               <line-chart :data="data_line_graph.data" />
            </div>
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
                  Employee/Visitor Overview
               </div>

               <div class="dashboard__graph-filter">
                  <!-- <q-input v-model="employee_date" type='date' outlined dense></q-input> -->
                  <!-- <q-select v-model="select_people" :options="options_people" outlined dense></q-select> -->
                  <q-select v-model="registered_filter" :options="options_date" outlined dense></q-select>
               </div>
            </div>

            <div class="dashboard__graph-content">
               <column-chart :data="data_bar_graph.data"></column-chart>
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

         <!-- EMPLOYEE/VISITOR OVERVIEW -->
         <!-- <div class="dashboard__graph-item">
            <div class="dashboard__graph-header">
               <div class="dashboard__graph-title">
                  Employee/Visitor Overview
               </div>
               <q-input v-model="employee_date" type='date' outlined dense></q-input>
               <q-select v-model="select_date" :options="options" outlined dense></q-select>
            </div>

            <div class="dashboard__graph-content">
               <column-chart :data="data_bar_graph"></column-chart>
            </div>

            <div class="dashboard__graph-content">
               <bar-chart :data="data_bar_graph"></bar-chart>
            </div>

            <div v-if="staff_visitors.data" class="dashboard__graph-content">
               <bar-chart style="position: relative; height:250px; width:100%"
                  :data="{
                     'MON': staff_visitors.data.Mon,
                     'TUES': staff_visitors.data.Tue,
                     'WED': staff_visitors.data.Wed,
                     'THURS': staff_visitors.data.Thurs,
                     'FRI': staff_visitors.data.Fri,
                     'SAT': staff_visitors.data.Sat,
                     'SUN': staff_visitors.data.Sun,
                  }"
               >
               </bar-chart>
            </div>
         </div> -->

         <!-- VISITORS PURPOSE -->
         <div class="dashboard__graph-item">
            <div class="dashboard__graph-header">
               <div class="dashboard__graph-title">
                  Visitors Purpose
               </div>
               <div class="dashboard__graph-filter">
                  <q-select v-model="purpose_filter" :options="option_purpose" outlined dense></q-select>
                  <!-- <q-input v-model="visitors_date" type='date' outlined dense></q-input> -->
               </div>
               <!-- <q-select v-model="select_date" :options="options" outlined dense></q-select> -->
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
                     <div class="dashboard__graph-number--grand">{{purpose_visit.data.official_business +
                        purpose_visit.data.collection_pickup +
                        purpose_visit.data.delivery +
                        purpose_visit.data.corporate_meeting +
                        purpose_visit.data.client_customer +
                        purpose_visit.data.guest
                        }}</div>
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
                     <q-btn @click="purpose_popup = false, select_date = last_option_registered" flat label="Cancel" color="primary" v-close-popup />
                     <q-btn @click="getPurposeVisit('Registered')" flat label="Search" color="primary" v-close-popup />
                  </q-card-actions>
               </q-card>
            </q-dialog>

            <!-- <div class="dashboard__graph-content">
               <pie-chart style="position: relative; height:250px; width:100%"
                  suffix=""
                  :data="{
                     'Official Business': purpose_visit.data.official_business,
                     'Collection & Pickup': purpose_visit.data.collection_pickup,
                     'Delivery': purpose_visit.data.delivery,
                     'Corporate Meeting': purpose_visit.data.corporate_meeting,
                     'Client/Customer': purpose_visit.data.client_customer,
                     'Guest': purpose_visit.data.guest,
                  }"
               >
               </pie-chart>
            </div> -->
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
   </div>
</template>

<script>
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
   postDashboard
} from '../../../references/url';

// Classes
import DashboardClass from '../../../classes/DashboardClass';
import { date } from 'quasar';
import { log } from 'util';

Vue.use(Chartkick.use(Chart))

export default
{
   components: { ComPicker },

   data:() =>
   ({
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

      purpose_visit: {data: []},
      company_details: {data: []},
      traffic_weekly:{data: []},
      staff_visitors: {data: []},
      options: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
      dashboard_class: new DashboardClass(),
      company_list: [],
      select__company: 'All Caompanies',
      options_company: ['All Caompanies'],
      options_date: [
         'Daily' , 'Weekly', 'Monthly' , 'Yearly', 'Custom Date'
      ],
      select_people: 'All',
      options_people: [
         'All' , 'Staff', 'Visitor', 'Stranger'
      ],
      select_date: 'Daily',
      traffic_data: {data: []},
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
      registered_filter: 'Daily',
      purpose_filter: 'Daily',
      option_purpose: ['Daily', 'Custom Date'],
      purpose_popup: false,
      purposeStart: new Date().toISOString().split('T')[0],
      purposeEnd: new Date().toISOString().split('T')[0],
      last_option_purpose: '',
      registered_has_fever: 0,
      today_visitors: 0,
      today_staff: 0
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
            else
            {
               await this.getPurposeVisit()
            }
       },

       async select_date(val, old)
        {
           this.last_option = old
           if (val == 'Custom Date')
           {
              this.date_filter_dialog = true
           }
           else
           {
              if (this.company_details._id) await this.getTrafficData({filter: {company_id: this.company_details._id, date_filter: this.select_date , person: this.select_people}})
              else await this.getTrafficData({filter: {date_filter: this.select_date , person: this.select_people}})
           }
        },

        async registered_filter(val, old)
        {
            this.last_option_registered = old

            if (val == 'Custom Date')
            {
               this.date_filter_registered = true
            }
            else
            {
               await this.getEmployeeVisitor()
            }
        },

        async select_people(val)
        {
           if (this.select_date == 'Custom Date')
           {
              await this.getCustomTraffic()
           }
           else
           {
              if (this.company_details._id) await this.getTrafficData({filter: {company_id: this.company_details._id, date_filter: this.select_date , person: this.select_people}})
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

      async getEmployeeVisitor()
      {
         let data
         let registered_type = ['Staff', 'Visitor', , 'Stranger']
         this.data_bar_graph.data = []

         for (let index = 0; index < registered_type.length; index++) {
            if (this.company_details._id) data = await this.getTrafficData({filter: {company_id: this.company_details._id, date_filter: this.registered_filter , person: registered_type[index]}}, 'Registered')
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
         if (type == 'Registered')
         {
            let option_filter = ['Staff', 'Visitor', 'Stranger']

            if (new Date(this.startDateRegistered) <= new Date(this.endDateRegistered))
            {
               for (let index = 0; index < option_filter.length; index++) {
                     if (this.company_details._id) data = await this.getTrafficData({filter: {start_date: this.startDateRegistered, end_date: this.endDateRegistered, company_id: this.company_details._id, date_filter: this.registered_filter , person: option_filter[index]}}, 'Registered')
                     else data = await this.getTrafficData({filter: {date_filter: this.registered_filter , person: option_filter[index], end_date: this.endDateRegistered, start_date: this.startDateRegistered}}, 'Registered')

                     data.data.forEach(reg => {
                        if (reg.name == option_filter[index])
                        {
                           this.data_bar_graph.data.push(reg)
                        }
                     });
                     this.date_filter_registered = false
               }
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
            if (new Date(this.startDate) <= new Date(this.endDate))
            {
               if (this.company_details._id) await this.getTrafficData({filter: {start_date: this.startDate, end_date: this.endDate, company_id: this.company_details._id, date_filter: this.select_date , person: this.select_people}})
               else await this.getTrafficData({filter: {date_filter: this.select_date , person: this.select_people, end_date: this.endDate, start_date: this.startDate}})
               this.date_filter_dialog = false
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
      },

      async getCompanyData(value)
      {
         let date_string = new Date().toISOString().split('T')[0].split("-")
         this.company_details = value
         this.staff_number = await this.personsData({find_person: {company_name: this.company_details.company_name, category: 'Staff', date_created: { '$gt' : new Date(this.company_details.date_created) , '$lt' : new Date()}}})
         this.visitor_number = await this.personsData({find_person: {company_name: this.company_details.company_name, category: 'Visitor', date_created: { '$gt' : new Date(this.company_details.date_created) , '$lt' : new Date()}}})
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
            params = {find_device: {company_name: this.company_details.company_name, date_created: { '$gt' : new Date(this.company_details.date_created) , '$lt' : new Date()}}}
         }
         // else params = {find_device: {date_installed: { '$gt' : new Date(this.date_range) , '$lt' : new Date()}}}

         let devices =  await this.$_post(postGetDevice, params);
         this.device_number = devices.data.length
      },

      async getMonthlyAlert()
      {
         let params = {}
         if (this.company_details || this.company_details.company_name != "All Company" ){
            params = {find_by_category: {date_saved: { '$gt' : new Date(this.company_details.date_created) , '$lt' : new Date() },
            has_fever: true,
            company_name: this.company_details.company_name}}
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

            if( this.purpose_filter == 'Custom Date')
            {
               if (new Date(this.purposeStart) > new Date(this.purposeEnd))
               {
                  this.purpose_filter = this.last_option_purpose
                  this.$q.notify(
                  {
                     color: 'red',
                     message: 'Invalid date'
                  });
                  params = {find_all: {date_string: new Date(this.visitors_date).toISOString().split('T')[0], company_id: this.company_details._id}}
               }
               else params = {find_all: {date_saved: { $gte: new Date(this.purposeStart), $lt: new Date(this.purposeEnd)}, company_id: this.company_details._id}}
            }
            else params = {find_all: {date_string: new Date(this.visitors_date).toISOString().split('T')[0], company_id: this.company_details._id}}

         }
         else {
            if( this.purpose_filter == 'Custom Date')
            {
               if (new Date(this.purposeStart) > new Date(this.purposeEnd))
               {
                  this.purpose_filter = this.last_option_purpose
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
      },

      async getAlertLogs()
      {
         let params = {}
         let current_params = {}
         if (this.company_details || this.company_details.company_name != "All Company" ){
           params =  {find_by_category: {has_fever: true, date_logged: new Date(this.alert_date).toISOString().split('T')[0], company_id: this.company_details._id}, limit: 3}
           current_params =  {find_by_category: {has_fever: true, date_logged: new Date().toISOString().split('T')[0], company_id: this.company_details._id}}
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
           params =  {find_count: {date_string: new Date(this.traffic_date).toISOString().split('T')[0], company_id: this.company_details.company_id, key: 'Traffic'}}
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
           params =  {find_count: {date_string: new Date(this.employee_date).toISOString().split('T')[0], company_id: this.company_details.company_id, key: 'Visitor'}}

         }
         else {
            params =  {find_count: {date_string: new Date(this.traffic_date).toISOString().split('T')[0], company_id: 'global', key:  'Visitor'}}
         }
         this.staff_visitors = await this.$_post(postGetWeeklyCount, params);
         // console.log(data, 'data');
      },

      async getTotalScannedToday()
      {
         let params = {}
         let filter = {}
         if (this.company_details)
         {
            params = {find_by: {date_logged: new Date().toISOString().split('T')[0], company_id: this.company_details._id}, limit: 1, sort_by:{temperature: -1}}
            filter = {find_count: {date_string: new Date().toISOString().split('T')[0], company_id: this.company_details._id}}
         }
         else
         {
            params = {find_by: {date_logged: new Date().toISOString().split('T')[0]}, limit: 1, sort_by:{temperature: -1}}
            filter = {find_count: {date_string: new Date().toISOString().split('T')[0], company_id: 'global'}}
         }

         let date_string = new Date().toISOString().split('T')[0].split("-")
         this.highest_log = await this.$_post(postLatestLog, params);

         let data = await this.$_post(postGetDailyLog, filter);
         for (let logs of data.data)
         {
            if (logs.key == 'Traffic')
            {
               this.traffic_data = logs
               this.traffic_data.date_string = new Date(logs.date_string).toUTCString().split(" ")
               this.traffic_data.date_string = this.traffic_data.date_string[0] + " " + this.traffic_data.date_string[1] + " " + this.traffic_data.date_string[2] + " " + this.traffic_data.date_string[3]
            }
         }
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
         if (this.company_details) params = {find_count: {date_string: new Date(this.traffic_date).toISOString().split('T')[0], company_id: this.company_details._id ? this.company_details._id : null, key: {$in: ['Staff', 'Visitor']}}}
         if (params.find_count.company_id == null) params = {find_count: {date_string: new Date(this.traffic_date).toISOString().split('T')[0], company_id: 'global', key: {$in: ['Staff', 'Visitor']}}}

         // console.log(params);
         let today_logs = await this.$_post(postGetDailyLog, params);
         if (today_logs.data.length)
         {
            this.today_visitors = 0
            for (let log of today_logs.data) {
               total = total + Number(log.count)
               if (log.key == 'Visitor') this.today_visitors = this.today_visitors + 1
               // else if (log.key == 'Staff') this.today_staff = this.today_staff + 1
            }
            this.logged_today = (total/this.traffic_data.count) * 100
            this.logged_today = this.logged_today.toFixed(0);
         }
         else
         {
             this.logged_today = 0
         }
      }
   },

   async mounted()
   {
      this.company_details = this.$user_info.company ? this.$user_info.company : {}
      let params = {}
      console.log(this.company_details);
      if (this.company_details) params = {filter: {company_id: this.company_details._id,date_filter: this.select_date , person: this.select_people}}
      else params = {filter: {date_filter: this.select_date, person: this.select_people}}
         console.log(params, 'params');
      await this.getTrafficData(params)
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


      let date_string = new Date().toISOString().split('T')[0].split("-")
      this.getTotalScannedToday(new Date(), 'global')
      this.current_date = this.current_date[0] + " " + this.current_date[1] + " " + this.current_date[2] + " " + this.current_date[3]
      this.current_month = this.current_month[2] + " " + this.current_month[3]
      this.staff_number = await this.personsData({find_person: {category: 'Staff', date_string: date_string[0] + "-" + date_string[1]}})
      this.visitor_number = await this.personsData({find_person: {category: 'Visitor', date_string: date_string[0] + "-" + date_string[1]}})
      await this.getTotalRegistered()
   }
}
</script>
