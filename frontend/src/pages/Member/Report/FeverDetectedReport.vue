<template>
    <div class="report">
        <div class="report__header">
            <div class="header__title">FEVER DETECTED REPORTS</div>
            <div class="header__filter">
                <q-select class="select-sm" v-model="select__date" :options="options_date" outlined dense></q-select>
                <q-select class="select-lg" v-model="select__company" :options="options_company" outlined dense></q-select>
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
import { postGetPersonLogs , postGetPerson}                        from '../../../references/url';

function calculate_age(dob) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

export default {
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
        this.getPersonWithFever();
    },
    methods:
    {
        async getPersonWithFever()
        {
            let logs = await this.$_post(postGetPersonLogs);
            logs = logs.data;
            logs.forEach(async person => {   
            if(person.has_fever)
            {
                let det = await this.$_post(postGetPerson, {id: person.person_id});
                person.gender = det.data.personal_info.gender;
                person.home_address = det.data.personal_info.home_address;
                person.age = calculate_age(new Date(det.data.personal_info.birthday))
                this.personWithFever.push(person);
            }
        });
        }
    },
    computed:
    {

        
    }

}
</script>
