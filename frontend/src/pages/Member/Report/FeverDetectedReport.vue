<template>
    <div class="report">
        <div class="report__header">
            <div class="header__title">FEVER DETECTED REPORTS</div>
            <div class="header__filter">
                <q-input class="select-sm" v-model="select__date" type="date" outlined dense></q-input>
                <com-picker class="select-lg" @select=getCompanyData></com-picker>
                <q-btn class="btn-outline btn-export" flat dense no-caps>
                    Export &nbsp;<q-icon name="mdi-export"></q-icon>
                </q-btn>
            </div>
        </div>
        <div class="report__container content__box">
            <div class="content__table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Home Address</th>
                            <th>Last Scanned</th>
                            <th>Body Temperature</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(person, i) in this.personWithFever" :key="i">
                            <td class="td-active">{{person.full_name}}</td>
                            <td>{{person.gender}}</td>
                            <td>{{person.age}}</td>
                            <td>{{ person.home_address }}</td>
                            <td>{{person.date_logged}}</td>
                            <td class="td-red">{{person.temperature}}°C</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import './Report.scss';
import { postGetPersonLogs , postGetPerson, postPersonByCateg}                        from '../../../references/url';
import  ComPicker from "../../../components/companyPicker/ComPicker"

function calculate_age(dob) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

export default {
    components: { 
        ComPicker,
    },
     data: () => ({
        select__date: '',
        select__company: '',
        options_date: [
            '6/24/2020', '6/23/2020' , '6/22/2020'
        ],
        options_company: [
            'Green Sun Hotel', 'SM Mall' , 'WalterMart'
        ],
        personWithFever : [],
    }),
    async mounted()
    {
        let logs = await this.$_post(postPersonByCateg, {find_by_category : {date_logged : (new Date().getFullYear())+ '-' +(new Date().getMonth()+1).toString().padStart(2, "0")+'-'+new Date().getDate().toString().padStart(2, "0")}});
        this.getPersonWithFever(logs);
    },
     watch:
    {
        async select__date(val)
        {
            if (val)  this.getPersonWithFever(await this.getStaffList({date_logged: this.select__date, company_id: this.company_id}));
        }
    },
    methods:
    {
        async getPersonWithFever(logs)
        {
            this.personWithFever = [];
            // let logs = await this.$_post(postGetPersonLogs, );
            logs = logs.data;
            logs.forEach(async person => {   
            if(person.has_fever)
            {
                if (person.category == "Stranger")
                {
                    person.gender = "Unknown";
                    person.home_address = "Unknown";
                    person.age = "Unknown";
                    this.personWithFever.push(person);
                }
                else
                {
                let det = await this.$_post(postGetPerson, {id: person.person_id});
                person.gender = det.data.personal_info.gender;
                person.home_address = det.data.personal_info.home_address;
                person.age = calculate_age(new Date(det.data.personal_info.birthday))
                this.personWithFever.push(person);
                }
            }
        });
        },
        async getCompanyData(value)
        {
            this.company_id = value
            // this.getTotalScannedToday(new Date(), value._id)
            this.staff_list = await this.getStaffList({date_logged: this.select__date})
        },

        async getStaffList(params)
        {
            return await this.$_post(postPersonByCateg, {find_by_category: params});
        }
    },

}
</script>
