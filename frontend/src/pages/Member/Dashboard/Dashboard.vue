<template>
   <div class="dashboard">
      <div class="dashboard__header">
         <div class="header__title">DASHBOARD OVERVIEW</div>
         <div class="header__filter">
            <!-- <q-btn class="btn-outline btn-export" flat dense no-caps>
               Export &nbsp;<q-icon name="mdi-export"></q-icon>
            </q-btn> -->
            <com-picker @select=getCompanyData></com-picker>
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
            <q-img cover src="../../../assets/Member/dashboard_overview-bg-1.jpg">
               <div class="dashboard__overview-info">
                  <div class="dashboard__overview-title">Total Scanned Today</div>
                  <div class="dashboard__overview-desc">
                     <div class="decs-total">{{traffic_data.count ? traffic_data.count : 0}}</div>
                     <div class="desc-separator"></div>
                     <div class="decs-info">{{logged_today}}% of Registered Users</div>
                  </div>
                  <div class="dashboard__overview-date">{{current_date}}</div>
               </div>
            </q-img>
         </div>
         <div class="dashboard__overview-item">
            <q-img cover src="../../../assets/Member/dashboard_overview-bg-2.jpg">
               <div class="dashboard__overview-info">
                  <div class="dashboard__overview-title">Highest Temperature Today</div>
                  <div class="dashboard__overview-desc">
                     <div class="decs-total">{{highest_log.data.length ? highest_log.data[0].temperature + "°" : 'No Logs Yet'}} </div>
                     <div class="desc-separator"></div>
                     <div class="decs-info">{{highest_log.data.length && highest_log.data[0].has_fever ? 'Has Fever' : 'Normal'}}</div>
                  </div>
                  <div class="dashboard__overview-date">{{current_date}}</div>
               </div>
            </q-img>
         </div>
         <div class="dashboard__overview-item">
            <q-img cover src="../../../assets/Member/dashboard_overview-bg-3.jpg">
               <div class="dashboard__overview-info">
                  <div class="dashboard__overview-title">Total Alerts Today</div>
                  <div class="dashboard__overview-desc">
                     <div class="decs-total">{{current_alerts}}</div>
                     <div class="decs-info"></div>
                  </div>
                  <div class="dashboard__overview-date">{{current_date}}</div>
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
               <div class="dashboard__total-number">{{staff_number}}</div>
               <div class="dashboard__total-date">Since {{current_month}}</div>
            </div>
         </div>
         <div class="dashboard__overview-total">
            <q-img src="../../../assets/Member/total-visitors.svg" width="45px"></q-img>
            <div class="dashboard__total-info">
               <div class="dashboard__total-title">Total Visitors</div>
               <div class="dashboard__total-number">{{visitor_number}}</div>
               <div class="dashboard__total-date">Since {{current_month}}</div>
            </div>
         </div>
         <div class="dashboard__overview-total">
            <q-img src="../../../assets/Member/total-alerts.svg" width="45px"></q-img>
            <div class="dashboard__total-info">
               <div class="dashboard__total-title">Total Alerts</div>
               <div class="dashboard__total-number">{{monthly_alert}}</div>
               <div class="dashboard__total-date">Since {{current_month}}</div>
            </div>
         </div>
         <div class="dashboard__overview-total">
            <q-img src="../../../assets/Member/total-devices.svg" width="30px"></q-img>
            <div class="dashboard__total-info">
               <div class="dashboard__total-title">Total Devices Installed</div>
               <div class="dashboard__total-number">{{device_number}}</div>
               <div class="dashboard__total-date">Since {{current_month}}</div>
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
               <q-input v-model="traffic_date" type='date' outlined dense></q-input>
               <!-- <q-select v-model="select_date" :options="options" outlined dense></q-select> -->
            </div>

            <!-- <div class="dashboard__graph-content">
               <line-chart :data="data_line_graph" />
            </div> -->

            <div v-if="traffic_weekly.data" class="dashboard__graph-content">
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
            </div>
         </div>
         <!-- EMPLOYEE/VISITOR OVERVIEW -->
         <div class="dashboard__graph-item">
            <div class="dashboard__graph-header">
               <div class="dashboard__graph-title">
                  Employee/Visitor Overview
               </div>
               <q-input v-model="employee_date" type='date' outlined dense></q-input>
               <!-- <q-select v-model="select_date" :options="options" outlined dense></q-select> -->
            </div>

            <div class="dashboard__graph-content">
               <bar-chart :data="data_bar_graph"></bar-chart>
            </div>

            <!-- <div v-if="staff_visitors.data" class="dashboard__graph-content">
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
            </div> -->
         </div>
         <!-- VISITORS PURPOSE -->
         <div class="dashboard__graph-item">
            <div class="dashboard__graph-header">
               <div class="dashboard__graph-title">
                  Visitors Purpose
               </div>
               <q-input v-model="visitors_date" type='date' outlined dense></q-input>
               <!-- <q-select v-model="select_date" :options="options" outlined dense></q-select> -->
            </div>
            <div class="dashboard__graph-content">
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
            </div>
         </div>
         <!-- VISITOR LOGS -->
         <div class="dashboard__graph-item dashboard__graph-item--alert-logs">
            <div class="dashboard__graph-header">
               <div class="dashboard__graph-title">
                  Alert Logs
               </div>
               <q-input v-model="alert_date" type='date' outlined dense></q-input>
               <!-- <q-select v-model="select_date" :options="options" outlined dense></q-select> -->
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
                           <!-- <span>{{alert.company_name}}</span> -->
                        </div>
                        <div class="visitor-logs__visit-company">
                           {{alert.company_name}}
                        </div>
                     </div>
                  </div>
               </div>
               <div class="visitor-logs__btn">
                  <!-- <q-btn v-if="this.alert_list.data.length == 3" flat dense no-caps class="btn-see btn-outline" label="See All"></q-btn> -->
               </div>
            </div>
         </div>
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
   postGetDevice
} from '../../../references/url';

// Classes
import DashboardClass from '../../../classes/DashboardClass';

Vue.use(Chartkick.use(Chart))

export default
{
   components: { ComPicker },

   data:() =>
   ({
      data_bar_graph: [
         {
            name: 'Employee', data: {'Monday': 2, 'Tuesday': 5, 'Wednesday': 3, 'Thrusday': 6, 'Friday': 8}
         },
         {
            name: 'Visitor', data: {'Monday': 3, 'Tuesday': 4, 'Wednesday': 7, 'Thrusday': 6, 'Friday': 5,}
         }
      ],
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
      options: [
         'July 1, 2019' , 'July 2, 2019', 'July 3, 2019' , 'July 4, 2019', 'July 5, 2019'
      ],
      select_date: '',
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
   }),

   watch:
    {
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
      async getCompanyData(value)
      {
         let date_string = new Date().toISOString().split('T')[0].split("-")
         this.company_details = value
         this.staff_number = await this.personsData({find_person: {company_name: this.company_details.company_name, category: 'Staff', date_string: date_string[0] + "-" + date_string[1]}})
         this.visitor_number = await this.personsData({find_person: {company_name: this.company_details.company_name, category: 'Visitors', date_string: date_string[0] + "-" + date_string[1]}})
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

         let devices =  await this.$_post(postGetDevice, params);
         this.device_number = devices.data.length
      },

      async getMonthlyAlert()
      {
         let params = {}
         if (this.company_details || this.company_details.company_name != "All Company" ){
            params = {find_by_category: {date_saved: { '$gt' : new Date(this.date_range) , '$lt' : new Date() },
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
           params = {find_all: {date_string: new Date(this.visitors_date).toISOString().split('T')[0], company_id: this.company_details._id}}

         }
         else {
            params = {find_all: {date_string: new Date().toISOString().split('T')[0]}}
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
           params =  {find_count: {date_string: new Date(this.employee_date).toISOString().split('T')[0], company_id: this.company_details.company_id, key: {$in: ['Staff', 'Visitors']}}}

         }
         else {
            params =  {find_count: {date_string: new Date(this.traffic_date).toISOString().split('T')[0], company_id: 'global', key: {$in: ['Staff', 'Visitors']}}}
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

      async getTotalRegistered()
      {
         let total = 0
          let params = {}
         // if (this.company_details)
         if (this.company_details) params = {find_count: {date_string: new Date(this.traffic_date).toISOString().split('T')[0], company_id: this.company_details._id ? this.company_details._id : null, key: {$in: ['Staff', 'Visitors']}}}
         if (params.find_count.company_id == null) params = {find_count: {date_string: new Date(this.traffic_date).toISOString().split('T')[0], company_id: 'global', key: {$in: ['Staff', 'Visitors']}}}

         // console.log(params);
         let today_logs = await this.$_post(postGetDailyLog, params);
         if (today_logs.data.length)
         {
            for (let log of today_logs.data) {
               // console.log(log, 'log');
               total = total + Number(log.count)
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


      let date_string = new Date().toISOString().split('T')[0].split("-")
      this.getTotalScannedToday(new Date(), 'global')
      this.current_date = this.current_date[0] + " " + this.current_date[1] + " " + this.current_date[2] + " " + this.current_date[3]
      this.current_month = this.current_month[2] + " " + this.current_month[3]
      this.staff_number = await this.personsData({find_person: {category: 'Staff', date_string: date_string[0] + "-" + date_string[1]}})
      this.visitor_number = await this.personsData({find_person: {category: 'Visitors', date_string: date_string[0] + "-" + date_string[1]}})
      await this.getTotalRegistered()
   }
}
</script>
