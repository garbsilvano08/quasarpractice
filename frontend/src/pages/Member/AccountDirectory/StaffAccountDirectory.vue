<template>
    <div class="account-directory">
        <div class="account-directory__header">
            <div class="header__title">ALL STAFF</div>
            <div class="header__filter">
                <q-input outlined dense v-model="search" placeholder="Search People...">
                    <template v-slot:append>
                        <q-icon name="mdi-magnify" />
                    </template>
                </q-input>
                <q-input class="select-sm" v-model="select__date" type="date" outlined dense></q-input>
                <q-btn @click="exportTableToExcel('tblData', 'staff-list')" class="btn-outline btn-export" flat dense no-caps>
                    Export &nbsp;<q-icon name="mdi-export"></q-icon>
                </q-btn>
            </div>
        </div>
        <div class="account-directory__container content__box">
            <div class="content__table">
                <q-table id="tblData" dense @row-click="checkAccount" :filter="search" flat :data="this.staff_list.data" :pagination.sync="pagination" :columns="table_column"></q-table>

            </div>
        </div>
    </div>
</template>

<script>
import "./AccountDirectory.scss";

// Components
import DailyLogCards from "components/DailyLogCards/DailyLogCards"

// References
import { postGetStaff, postGetPersons, postGetLogs } from '../../../references/url';

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
        staff_list: [],
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
                field   : 'gender',
                align   : 'left',
                required: true,
                sortable: true,
            },
            { 
                name    : 'age',
                label   : 'Age',
                field   : row => new Date().getFullYear() - new Date(row.birthday).getFullYear(),
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
                name    : 'position',
                label   : 'Position',
                field   : row => row.position ? row.position : 'Unknown',
                align   : 'left',
                required: true,
                sortable: true,
            }
        ],
    }),
    watch:
    {
        async select__date(val)
        {
            let start_date = new Date(val)
            let end_date = start_date.setDate(start_date.getDate() + 1)
            start_date = start_date.setDate(start_date.getDate() - 1)

            await this.getStaffList({find_person: {category: 'Staff', date_created: {$gt: start_date, $lt: end_date }}})  
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

        checkAccount(evt, account_info)
        {
            account_info.type = 'Staff'
            this.$router.push({
                name: "member_personal-information",
                params: {
                    account_info: account_info
                }
            })
        },

        async getTempLogs(person_id)
        {
            let temp_log = await this.$_post(postGetLogs,{ id: person_id, limit: 1})
            return temp_log.data[0]
        },

        async getStaffList(params = {})
        {
            this.staff_list = await this.$_post(postGetPersons, params);
            
        }
    },
    async mounted()
    {
        await this.getStaffList({find_person: {category: 'Staff'}})        
        // console.log(this.staff_list);
        
    }

}
</script>
