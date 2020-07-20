<template>
    <div class="account-directory">
        <div class="account-directory__header">
            <div class="header__title">ALL VISITORS</div>
            <div class="header__filter">
                <q-input v-model="search" outlined dense placeholder="Search People...">
                    <template v-slot:append>
                        <q-icon name="mdi-magnify" />
                    </template>
                </q-input>
                <q-input class="select-sm" v-model="select__date" type="date" outlined dense></q-input>
                <q-btn @click="exportTableToExcel('tblData', 'visitor-list')" class="btn-outline btn-export" flat dense no-caps>
                    Export &nbsp;<q-icon name="mdi-export"></q-icon>
                </q-btn>
            </div>
        </div>
        <div class="account-directory__container content__box">
            <div class="content__table">
                <q-table id="tblData" dense @row-click="checkAccount" :filter="search" flat :data="visitor_lists.data" :pagination.sync="pagination" :columns="table_column"></q-table>
            </div>
        </div>
    </div>
</template>

<script>
import "./AccountDirectory.scss";

import { postGetVisitors, postGetPersons, postGetDailyLog, postLatestLog } from '../../../references/url';
// Components
import DailyLogCards from "components/DailyLogCards/DailyLogCards"

export default {
    components: {
        DailyLogCards
    },
    data: () => ({
        search : "",
        pagination: {
            rowsPerPage: 10,
        },
        select__id_type: '',
        select__date: '',
        options_name: [
            'Green Sun Hotel', 'SM Mall' , 'WalterMart'
        ],
        options_date: [
            '6/24/2020', '6/23/2020' , '6/22/2020'
        ],
        visitor_lists: [],
        person_logs: [],
        table_column:
        [
            { 
                name    : 'full_name',
                label   : 'Name',
                field   : row => row.given_name +" " + row.middle_name +" "+row.last_name,
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
                name    : 'contact_person',
                label   : 'Contact Person',
                field   : row => row.contact_person ? row.contact_person : 'Unknown',
                align   : 'left',
                required: true,
                
                sortable: true,
            },
            { 
                name    : 'destination',
                label   : 'Destination',
                field   : row => row.destination ? row.destination : 'Unknown',
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
            let start_date = new Date(val)
            let end_date = start_date.setDate(start_date.getDate() + 1)
            start_date = start_date.setDate(start_date.getDate() - 1)

            await this.getVisitorList({find_person: {category: 'Visitors', date_created: {$gt: start_date, $lt: end_date }}})  
        }
    },
    methods:
    {
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
        async getLatestLog(person_id)
        {
            return await this.$_post(postLatestLog, {id: person_id});
        },
        checkAccount(evt,account_info)
        {
            account_info.type = 'Visitor'
            this.$router.push({
                name: "member_personal-information",
                params: {
                    account_info: account_info
                }
            })
        },
        async getVisitorList(params = {})
        {
            this.visitor_lists = await this.$_post(postGetPersons, params);
            
        }
    }, 

    async mounted()
    {
        await this.getVisitorList({find_person: {category: 'Visitors'}}) 
        // console.log(this.visitor_lists);
    }
}
</script>
