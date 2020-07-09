<template>
    <div class="device-management">
        <div class="device-management__header">
            <div class="header__title">
                DEVICE MANAGEMENT <br>
                <span>300 DEVICES INSTALLED</span></div>
            <div class="header__filter">
                <!-- <q-select v-model="select__company" :options="options_company" outlined dense></q-select> -->
            </div>
        </div>
        <div class="device-management__container content__box">
            <div class="content__table">
                <table>
                    <thead>
                        <tr>
                            <th>Device ID</th>
                            <th>Company</th>
                            <th>Date Installed</th>
                            <th>Device Removal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(device, index) in this.device_list.data" :key="index">
                            <td>{{ device.device_id }}</td>
                            <td>{{ device.company_name }}</td>
                            <td>{{ convertToDate(device.date_installed)}}</td>
                            <td @click="deleteDevice(device._id)" class="td-active">Uninstall</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import "./DeviceManagement.scss";
import { postGetDevice, postGetCompanies, postDeleteDevice } from '../../../references/url';

export default {
    data: () => ({
        select__company: 'All Companies',
        options_company: [
            'All Companies'
        ],
        device_list: [],
        company_list: []
    }),

    watch:
    {
        async select__company(val)
        {
            if (val == 'All Companies')
            {
                await this.getAllDevice()
            }
            else
            {
                await this.getAllDevice(val)
            }
        }
    },

    methods:
    {
        async deleteDevice(id)
        {
            await this.$_post(postDeleteDevice, {id: id});
            // if (this.select__company == 'All Companies') await this.getAllDevice()
            // else await this.getAllDevice(this.select__company)
            await this.getAllDevice(this.$user_info.company._id)
        },
        async getAllDevice(company)
        {
           this.device_list = await this.$_post(postGetDevice, {find_device: {company_id: company}});
        },
        convertToDate(timestamp){
            let date = new Date(timestamp);
            return date.getDate().toString().padStart(2, "0")+'-'+(date.getMonth()+1).toString().padStart(2, "0")+ '-' +date.getFullYear();
        }
    },

    async mounted()
    {
        await this.getAllDevice(this.$user_info.company._id);
        // this.company_list = await this.$_post(postGetCompanies);
        // for (let company of this.company_list.data) {
        //     console.log(this.$user_info.company._id, company._id)
        //     if(this.$user_info.company._id == company._id)
        //     this.options_company.push(company.company_name)
        // }
        // this.company_list = await this.$_post(postGetCompanies);
        // console.log(this.company_list)
    }
}
</script>
