<template>
    <div class="device-management">
        <div class="device-management__header">
            <div class="header__title">
                DEVICE MANAGEMENT <br>
                <span>{{this.device_list.data.length ? this.device_list.data.length : 0}} DEVICES INSTALLED</span></div>
            <div class="header__filter">
                <q-btn @click="addDevice" class="btn-primary btn-add" flat dense no-caps>
                    Add Device
                </q-btn>
            </div>
        </div>
        <div class="device-management__container content__box">
            <div class="content__table">
                <table>
                    <thead>
                        <tr>
                            <th>Device ID</th>
                            <th>Device Name</th>
                            <th>Company</th>
                            <th>IP Address</th>
                            <th>Date Installed</th>
                            <th>Device Removal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(device, index) in this.device_list.data" :key="index">
                            <td>{{ device.device_id }}</td>
                            <td>{{ device.device_name }}</td>
                            <td>{{ device.company_name }}</td>
                            <td>{{ device.device_ip ? device.device_ip : 'N/A' }}</td>
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
        device_list: {data:[]},
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
        async pingDevice(host)
        {
            // console.log(host);
            // let getFormData = new FormData();
            // getFormData.append("pass", "123456");
            //  let logs = await this.$axios.get("http://192.168.254.147:8080").then(res => res.data);
            //  console.log(logs);
            // var ping = require ("net-ping");
            // var session = ping.createSession ();

            // session.pingHost (host, function (error, host) {
            //     if (error)
            //         console.log (host + ": " + error.toString ());
            //     else
            //         console.log (host + ": Alive");
            // });
        },
        addDevice()
        {
            this.$router.push({ name: 'member_adddevice' });
        },
        async deleteDevice(id)
        {
            await this.$_post(postDeleteDevice, {id: id});
            // if (this.select__company == 'All Companies') await this.getAllDevice()
            // else await this.getAllDevice(this.select__company)
            await this.getAllDevice()
        },
        async getAllDevice()
        {
            let params = {}
            if (this.$user_info.company)
            {
                let company_id = []
                company_id.push(this.$user_info.company._id)

                for (let index = 0; index < this.$user_info.company.subcompanies.length; index++) {
                    if (this.$user_info.company.subcompanies[index]) company_id.push(this.$user_info.company.subcompanies[index])
                }
                console.log(this.$user_info.company);
                params = {find_device: { company_id: {$in: company_id}}}
            }
           this.device_list =await this.$_post(postGetDevice, params);
        //    console.log(devices);
        //     for (let i = 0; i < devices.length; i++) {
        //         console.log(devices[i].device_ip);
        //         if (devices[i].device_ip) await this.pingDevice(devices[i].device_ip)
        //     }
            // this.device_list = devices
            
        },
        convertToDate(timestamp){
            let date = new Date(timestamp);
            return date.getDate().toString().padStart(2, "0")+'-'+(date.getMonth()+1).toString().padStart(2, "0")+ '-' +date.getFullYear();
        }
    },

    async mounted()
    {
        await this.getAllDevice();
        await this.pingDevice()
    }
}
</script>
