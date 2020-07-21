<template>
    <div class="account-directory">
        <div class="account-directory__header">
            <div class="header__title">ALL FEVER DETECTED</div>
            <div class="header__filter">
                <q-input outlined dense placeholder="Search People...">
                    <template v-slot:append>
                        <q-icon name="mdi-magnify" />
                    </template>
                </q-input>
                <!-- <q-select v-model="select__date" :options="options_date" outlined dense></q-select> -->
                <q-input class="select-sm" v-model="select__date" type="date" outlined dense></q-input>
                <q-btn @click="exportTableToExcel('tblData', 'fever_detected-list')" class="btn-outline btn-export" flat dense no-caps>
                    Export &nbsp;<q-icon name="mdi-export"></q-icon>
                </q-btn>
            </div>
        </div>
        <div class="account-directory__container content__box">
            <div class="content__table">
                <q-table id="tblData" dense  flat :data="fever_detected.data" :pagination.sync="pagination" :columns="table_column"></q-table>
            </div>
        </div>
    </div>
</template>

<script>
import "./AccountDirectory.scss";

// Components
import DailyLogCards from "components/DailyLogCards/DailyLogCards"
import { postGetPersonLogs , postGetPerson, postPersonByCateg} from '../../../references/url';

export default {
    components: {
        DailyLogCards
    },
    data: () => ({
        pagination: {
            rowsPerPage: 10,
        },
        select__id_type: '',
        select__date: '',
        fever_detected: [],
        options_name: [
            'Green Sun Hotel', 'SM Mall' , 'WalterMart'
        ],
        options_date: [
            '6/24/2020', '6/23/2020' , '6/22/2020'
        ],
        table_column:
        [
            { 
                name    : 'full_name',
                label   : 'Name',
                field   : row => row.full_name,
                align   : 'left',
                required: true,
                sortable: true,
            },
            { 
                name    : 'gender',
                label   : 'Gender',
                field   : row => row.gender ? row.gender : 'Unknown',
                align   : 'left',
                required: true,
                sortable: true,
            },
            { 
                name    : 'age',
                label   : 'Age',
                field   : row => row.birthday ? new Date().getFullYear() - new Date(row.birthday).getFullYear() : 'Unknown',
                align   : 'left',
                required: true,
                sortable: true,
            },
            { 
                name    : 'home_address',
                label   : 'Home Address',
                field   : row => row.home_address ? row.home_address : 'Unknown',
                align   : 'left',
                required: true,
                
                sortable: true,
            },
            { 
                name    : 'company_name',
                label   : 'Company Name',
                field   : row => row.company_name ? row.company_name : 'Unknown',
                align   : 'left',
                required: true,
                
                sortable: true,
            },
            { 
                name    : 'date_detected',
                label   : 'Date Detected',
                field   : row => row.date_logged ? row.date_logged : 'Unknown',
                align   : 'left',
                required: true,
                
                sortable: true,
            },
            { 
                name    : 'temperature',
                label   : 'Temperature',
                field   : row => row.temperature ? row.temperature : 'Unknown',
                align   : 'left',
                required: true,
                
                sortable: true,
            },
        ],
    }),
    watch:
    {
        async select__date(val)
        {
            await this.getDetectedFever({find_by_category: {has_fever: true, date_logged: new Date(val).toISOString().split('T')[0]}})  
        }
    },
    methods:{
        exportTableToExcel(tableID, filename = ''){
            var downloadLink;
            var dataType = 'application/vnd.ms-excel';
            var tableSelect = document.getElementById(tableID);
            var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
            
            // Specify file name
            filename = filename?filename+'.xls':'excel_data.xls';
            
            // Create download link element
            downloadLink = document.createElement("a");
            
            document.body.appendChild(downloadLink);
            
            if(navigator.msSaveOrOpenBlob){
                var blob = new Blob(['\ufeff', tableHTML], {
                    type: dataType
                });
                navigator.msSaveOrOpenBlob( blob, filename);
            }else{
                // Create a link to the file
                downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
            
                // Setting the file name
                downloadLink.download = filename;
                
                //triggering the function
                downloadLink.click();
            }
        },
        async getDetectedFever(params = {})
        {
            this.fever_detected = await this.$_post(postPersonByCateg, params);
            console.log(this.fever_detected);
        }
    },
    async mounted(){
        await this.getDetectedFever({find_by_category: {has_fever: true}})
    }
}
</script>
