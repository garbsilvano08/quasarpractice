<template>
    <div class="synchronization">
        <div class="header__title">HEALTH CLOUD SYNCHRONIZATION <span>(1,080)</span></div>

        <div class="content__grid-2x2">
            <div class="synchronization__content content__box">
                <div class="sync-btn" @click="sync">
                    <q-img src="../../../assets/Member/cloud-sync.svg"></q-img>
                    <div class="sync-btn__name">SYNC</div>
                </div>
                <div class="synchronization__content-details">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, sapiente laborum labore eum blanditiis iste unde laudantium, voluptatem, pariatur qui ratione corrupti non iure tenetur! Earum ipsam harum rem enim?
                </div>
            </div>
            <div class="synchronization__content content__box">
                <div class="sync-btn" @click="syncAll">
                    <q-img src="../../../assets/Member/cloud-sync.svg"></q-img>
                    <div class="sync-btn__name">SYNC ALL</div>
                </div>
                <div class="synchronization__content-details">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, sapiente laborum labore eum blanditiis iste unde laudantium, voluptatem, pariatur qui ratione corrupti non iure tenetur! Earum ipsam harum rem enim?
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import './Synchronization.scss';
import { postGetDevice, postGetPersons } from '../../../references/url';


function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}


export default {
    data: () =>
	({
        device_list : [],
        persons_list : [],
    }),
    async mounted()
    {
        await this.getAllDevice(this.$user_info.company._id);
        this.persons_list = await this.$_post(postGetPersons);
        this.persons_list = this.persons_list.data;
        
    },
    methods:
    {
        async getAllDevice(company)
        {
           this.device_list = await this.$_post(postGetDevice, {find_device: {company_id: company}});
           this.device_list = this.device_list.data;
        },
        async syncAll()
        {      
            this.deleteAllTabletPerson();
        },
        sync()
        {
            this.singlecreate();
        },
        async deleteAllTabletPerson()
        {
            this.$q.loading.show();
            this.device_list.forEach(async (device) => {
                let tabletFormData = new FormData();
                tabletFormData.append("pass", "123456");
                let rsp = await this.$axios.post("http://"+device.device_ip+":8080/initialization", tabletFormData).then(res => res.data);
                setTimeout(() => this.createAll(this.persons_list), 2000);
           })
        },
        async createAll(personToTablet , device_ip)
        {
            console.log(personToTablet)
            for (let person of personToTablet)
            {
                let expStart = (new Date(person.frontdesk_person_date).getFullYear()) + '-' + (new Date(person.frontdesk_person_date).getMonth() + 1).toString().padStart(2, "0") + '-' + new Date(person.frontdesk_person_date).getDate().toString().padStart(2, "0") + " " + new Date(person.frontdesk_person_date).getHours().toString().padStart(2, "0") + ":" + new Date(person.frontdesk_person_date).getMinutes().toString().padStart(2, "0");
                let expEnd = (new Date(person.frontdesk_person_date).getFullYear()) + '-' + (new Date(person.frontdesk_person_date).getMonth() + 1).toString().padStart(2, "0") + '-' + (new Date(person.frontdesk_person_date).getDate() + 1).toString().padStart(2, "0") + " " + new Date(person.frontdesk_person_date).getHours().toString().padStart(2, "0") + ":" + new Date(person.frontdesk_person_date).getMinutes().toString().padStart(2, "0");
                let prescription = "";
                let type = "";

                //***************************SENDING DATA TO TABLET HTML POST REQUEST************************************************************
                await new Promise(resolve =>
                {
                    toDataUrl(person.person_img, async(myBase64) =>
                    {
                        let sex = "";
                        if (person.gender == "Female")
                        {
                            sex = 0;
                        }
                        else if (person.gender == "Male")
                        {
                            sex = 1;
                        }
                        let tabletFormData = new FormData();
                        let b64 = myBase64.replace(/^data:image\/[a-z]+;base64,/, "");
                        tabletFormData.append("pass", "123456");

                        if (person.category == "Visitors")
                        {
                            prescription = "'" + expStart + "," + expEnd + "'";
                            type = 1.1;
                            tabletFormData.append("person", "{'imgBase64': '" + b64 + "', 'name' : '" + person.given_name + " " + person.middle_name + " " + person.last_name + "', 'person_id' : '1234', 'sex' : " + sex + ", 'group_id' : 20, 'phone' : " + person.contact_number + ",  'address' : '" + person.home_address + "', 'vipId': '" + person.frontdesk_person_id + "',  'att_flag' : 0 , 'banci_id' : '',  'device_group' : 1, 'type' : " + type + ", 'reg_type' : 0, 'prescription' : " + prescription + "}");
                        }
                        else if (person.category == "Staff")
                        {
                            type = 3;
                            tabletFormData.append("person", "{'imgBase64': '" + b64 + "', 'name' : '" + person.given_name + " " + person.middle_name + " " + person.last_name + "', 'person_id' : '1234', 'sex' : " + sex + ", 'group_id' : 20, 'phone' : " + person.contact_number + ",  'address' : '" + person.home_address + "', 'vipId': '" + person.frontdesk_person_id + "',  'att_flag' : 0 , 'banci_id' : '',  'device_group' : 1, 'type' : " + type + ", 'reg_type' : 0}");
                        }

                       
                            let createRes = await this.$axios.post("http://" + device_ip + ":8080/person/create", tabletFormData).then(res => res.data);
                        

                        resolve();
                    });
                });
                //*********************************************************************************************************************************
            }

            this.$q.loading.hide();
            this.persons_list = await this.$_post(postGetPersons);
            this.persons_list = this.persons_list.data;
        },
        async singlecreate(){
            this.$q.loading.show();
            let personCloud = this.persons_list;
            
            
            // console.log("cloud",personCloud);
            
            for (let device of this.device_list) 
            {
            let ctr=0;
            let totalTabletRecord = [];
            let totalTabletRecordCount = 0;
            while(1)
            {
                let getFormData = new FormData();
                getFormData.append("pass", "123456");
                getFormData.append("index", ""+ctr+"");
                getFormData.append("length", "50");
                let rsp = await this.$axios.post("http://"+device.device_ip+":8080/person/findByPage", getFormData).then(res => res.data);
                totalTabletRecordCount = JSON.parse(rsp.data).pageInfo.total
                // console.log(JSON.parse(rsp.data).pageInfo)
                rsp = JSON.parse(rsp.data).records;
                // console.log(rsp)
                if (ctr===1) rsp.splice(0, 1);
                totalTabletRecord=totalTabletRecord.concat(rsp);
                ctr++;
                if (totalTabletRecord.length===totalTabletRecordCount)
                {
                    break;
                }
                // console.log( ctr)
            }
        // console.log(device.device_ip,totalTabletRecord)
            // let personCloud
            // console.log("cloud",personCloud)
                let newRegistered = [];
                personCloud.forEach(async (person, i) => 
                {
                    let is = false;

                    totalTabletRecord.forEach(tabletRegistered => 
                    {
                        if (person.frontdesk_person_id == tabletRegistered.vipID) is = true;
                    });

                    if (!is)
                    {
                        newRegistered.push(person);
                    }
                });

                // console.log("walang kamuka",newRegistered);
                if (newRegistered.length >0)
                {
                    // console.log(device.device_ip);
                    // console.log(newRegistered)
                    this.createAll(newRegistered, device.device_ip);
                }
                else 
                {
                    this.$q.loading.hide();
                }
            };
        },

    }
}
</script>
