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
import { postGetDevice, postGetPersons, postGetCompanies } from '../../../references/url';
import { log } from 'util';


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
        await this.getPersonList()
        
    },
    methods:
    {
        async getPersonList()
        {
            this.persons_list = []
            let companies = await this.$_post('member/get/company', {id: this.$user_info.company._id});
            if (companies.data.tenants.length)
            {
                companies = companies.data.tenants
            }
            companies.push(this.$user_info.company._id)
            for (let index = 0; index < companies.length; index++) {
                let company_registered = await this.$_post(postGetPersons, {find_person: {company_id: companies[index]}});
                for (let x = 0; x < company_registered.data.length; x++) {
                    this.persons_list.push(company_registered.data[x])
                }
            }
        },

        async getAllDevice(company)
        {
           this.device_list = await this.$_post(postGetDevice, {find_device: {company_id: company}});
           this.device_list = this.device_list.data;
        },
        async syncAll()
        {      
            if (this.device_list.length>0)
            {
            this.$q.dialog({
            title: 'Confirm',
            message: `All Data will be rewrite!`,
            color: 'negative',
            ok: `Yes, I'm sure`,
            cancel: true,
            default: 'cancel'   // <<<<
            }).onOk(async () =>{
                this.deleteAllTabletPerson();
            });
            }
            else
            {
                this.$q.dialog({
                title: 'Alert',
                message: `No device installed`,
                color: 'negative',
                ok: `Ok`,
                default: 'cancel'   // <<<<
            })
            }
            
        },
        sync()
        {
            this.singlecreate();
        },
        async deleteAllTabletPerson()
        {
            this.$q.loading.show();
            this.device_list.forEach(async (device) => {
                if (device.device_type == 'vision_sky' )
                {
                    this.persons_list.forEach(async (person) =>{
                        let tabletFormData = new FormData();
                        tabletFormData.append("pass", "abc123");
                        tabletFormData.append("id", person.frontdesk_person_id);
                        let rsp = await this.$axios.post("http://"+device.device_ip+":8090/person/delete", tabletFormData).then(res => res.data);

                        let personImage = new FormData();
                        personImage.append("pass", "abc123");
                        personImage.append("faceId", person.frontdesk_person_id);
                        let img = await this.$axios.post("http://"+device.device_ip+":8090/face/delete", personImage).then(res => res.data);
                        // console.log(rsp, img);
                    })
                }
                else
                {
                    let tabletFormData = new FormData();
                    tabletFormData.append("pass", "123456");
                    let rsp = await this.$axios.post("http://"+device.device_ip+":8080/initialization", tabletFormData).then(res => res.data);
                }
                    
                setTimeout(() => this.createAll(this.persons_list, device.device_ip, device.device_type), 2000);
           })
        },        async createAll(personToTablet , device_ip, device_type)
        {
            this.device_list.forEach(async (device) => {
                if (device.device_type != 'vision_sky')
                {
                    let settingsFormData = new FormData();
                    settingsFormData.append("pass", "123456");
                    settingsFormData.append("config", "{'isBodyTempAlarm': 1 , 'isBodyTempStart' : 1, 'isHighFeverAdopt' : 0, 'isLowFeverAdopt' : 0, 'isLowTempAdopt' : 0, 'isStandardTempAdopt' : 1,  'isWearingMask' : 1, 'standardBodyTemp': '37.3',  'isStrangerRecord' : 1 , 'isStrangerMode' : 0, 'tempCompensation' : 0.3,  'isFan' : 1, }");
                    await this.$axios.post("http://"+device.device_ip+":8080/tempAndMaskSetting", settingsFormData).then(res => res.data);
                }
            })

            if (device_type == 'smart_pass')
            {
                let data = new FormData();
                data.append('pass', '123456');
                data.append('callbackUrl', 'http://192.168.254.126:4001/api/member/visionsky/logs');
                let logs = await this.$axios.post("http://" + device_ip + ":8080/setIdentifyCallback", data).then(res => res.data);
                // console.log(logs, 'logs');
            }
            // console.log(personToTablet)
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
                        if (person.category == "Visitor")
                        {
                            prescription = "'" + expStart + "," + expEnd + "'";
                            if (device_type == 'vision_sky')
                            {
                                try
                                {
                                    let date = new Date().getFullYear() + "-" + (new Date(person.frontdesk_person_date).getMonth() + 1).toString().padStart(2, "0") + "-" + new Date(person.frontdesk_person_date).getDate().toString().padStart(2, "0") + " 23:59:59"
                                    // console.log(date, 'jhghjgjhgjhg');
                                    let image = new FormData();
                                    image.append('pass', 'abc123');
                                    image.append("personId", person.frontdesk_person_id );
                                    image.append("idcardNum", 1 );
                                    image.append("name", person.given_name + " " + person.middle_name + " " + person.last_name );
                                    image.append("imgBase64", b64 );
                                    image.append("passTime", '01:00:00, 23:59:59' );
                                    image.append("permissionTime", date);
                                    image.append("type", 1 );
                                    
                                    let img = await this.$axios.post("http://"+ device_ip +":8090/person/quickCreate", image).then(res => res.data);
                                    // console.log(img);
                                }
                                catch(e){}
                                // console.log(img);
                            }
                            else
                            {
                                type = 1.1;
                                tabletFormData.append("pass", "123456");
                                tabletFormData.append("person", "{'imgBase64': '" + b64 + "', 'name' : '" + person.given_name + " " + person.middle_name + " " + person.last_name + "', 'person_id' : '1234', 'sex' : " + sex + ", 'group_id' : 20, 'phone' : " + person.contact_number + ",  'address' : '" + person.home_address + "', 'vipId': '" + person.frontdesk_person_id + "',  'att_flag' : 0 , 'banci_id' : '',  'device_group' : 1, 'type' : " + type + ", 'reg_type' : 0, 'prescription' : " + prescription + "}");
                                let createRes = await this.$axios.post("http://" + device_ip + ":8080/person/create", tabletFormData).then(res => res.data);
                            }
                        }
                        else if (person.category == "Staff")
                        {
                            // console.log(device_type);
                            if (device_type == 'vision_sky')
                            {
                                let data = new FormData();
                                data.append('pass', 'abc123');
                                data.append("person", "{'id': '"+ person.frontdesk_person_id +"', 'name': '" + person.given_name + " " + person.middle_name + " " + person.last_name + "', 'idcardNum': '', 'departmentId': '1'}" );
                
                                let upload = await this.$axios.post("http://"+ device_ip +":8090/person/create", data).then(res => res.data);

                                let image = new FormData();
                                image.append('pass', 'abc123');
                                image.append("personId", person.frontdesk_person_id );
                                image.append("faceId", person.frontdesk_person_id );
                                image.append("imgBase64", b64 );
                                let img = await this.$axios.post("http://"+ device_ip +":8090/face/create", image).then(res => res.data);
                                // console.log(img);
                            }
                            else
                            {
                                // console.log(person);
                                type = 3;
                                tabletFormData.append("pass", "123456");
                                tabletFormData.append("person", "{'imgBase64': '" + b64 + "', 'name' : '" + person.given_name + " " + person.middle_name + " " + person.last_name + "', 'person_id' : '1234', 'sex' : " + sex + ", 'group_id' : 20, 'phone' : " + person.contact_number + ",  'address' : '" + person.home_address + "', 'vipId': '" + person.frontdesk_person_id + "',  'att_flag' : 0 , 'banci_id' : '',  'device_group' : 1, 'type' : " + type + ", 'reg_type' : 0}");
                                let createRes = await this.$axios.post("http://" + device_ip + ":8080/person/create", tabletFormData).then(res => res.data);
                                // console.log(createRes);
                            }
                        }

                       
                            
                        

                        resolve();
                    });
                });
                //*********************************************************************************************************************************
            }

            this.$q.loading.hide();
            await this.getPersonList()
            // this.persons_list = await this.$_post(postGetPersons);
            // this.persons_list = this.persons_list.data;
        },
        async singlecreate(){
            if (this.device_list.length>0)
            {
                this.$q.loading.show();
                let personCloud = this.persons_list;
                
                
                // console.log("cloud",personCloud);
                
                for (let device of this.device_list) 
                {
                    // console.log(device.device_type)
                    let ctr=0;
                    let totalTabletRecord = [];
                    let totalTabletRecordCount = 0;
                    while(1)
                    {
                        let rsp = null
                        if (device.device_type != "vision_sky")
                        {
                            let getFormData = new FormData();
                            getFormData.append("pass", "123456");
                            getFormData.append("index", ""+ctr+"");
                            getFormData.append("length", "50");
                            rsp = await this.$axios.post("http://"+device.device_ip+":8080/person/findByPage", getFormData).then(res => res.data);
                            totalTabletRecordCount = JSON.parse(rsp.data).pageInfo.total
                            // console.log(JSON.parse(rsp.data).pageInfo)
                            rsp = JSON.parse(rsp.data).records;
                            if (ctr===1) rsp.splice(0, 1);
                            totalTabletRecord=totalTabletRecord.concat(rsp);
                            ctr++;
                        }
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
                        totalTabletRecord.forEach(async tabletRegistered => 
                        {
                            if (device.device_type == 'vision_sky')
                            {
                                let VisionData = new FormData();
                                VisionData.append("pass", "abc123");
                                VisionData.append("id", person.frontdesk_person_id);
                                let vision = await this.$axios.post("http://"+device.device_ip+":8090/person/find", VisionData).then(res => res.data);
                                // vision = JSON.parse(vision)

                                // console.log(vision.msg);
                                if (vision.msg != 'personId does not exist') is = true;
                            }
                            
                            else
                            {
                                if (person.frontdesk_person_id == tabletRegistered.vipID) is = true;
                            }
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
                        this.createAll(newRegistered, device.device_ip, device.device_type);
                    }
                    else 
                    {
                        this.$q.loading.hide();
                    }
                };
            }
            else
            {
                this.$q.dialog({
                title: 'Alert',
                message: `No device installed`,
                color: 'negative',
                ok: `Ok`,
                default: 'cancel'   // <<<<
            })
            }
            
        },

    }
}
</script>
