<template>
    <div class="synchronization">
        <div class="header__title">HEALTH CLOUD SYNCHRONIZATION <span>(1,080)</span></div>

        <div class="content__grid-2x2">
            <div class="synchronization__content content__box">
                <div class="sync-btn">
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
        async deleteAllTabletPerson()
        {
            this.$q.loading.show();
            this.device_list.forEach(async (device) => {
                let tabletFormData = new FormData();
                tabletFormData.append("pass", "123456");
                let rsp = await this.$axios.post("http://"+device.device_ip+":8080/initialization", tabletFormData).then(res => res.data);
                setTimeout(() => this.createAll(), 2000);
           })
        },
        async createAll()
        {
                this.persons_list = await this.$_post(postGetPersons);
                this.persons_list = this.persons_list.data;
                // console.log(this.persons_list[0].category);
                
                
                this.persons_list.forEach(async (person) => {
                    // console.log(person)
                

                let expStart = (new Date(person.frontdesk_person_date).getFullYear())+ '-' +(new Date(person.frontdesk_person_date).getMonth()+1).toString().padStart(2, "0")+'-'+new Date(person.frontdesk_person_date).getDate().toString().padStart(2, "0")+ " "+ new Date(person.frontdesk_person_date).getHours().toString().padStart(2, "0")+":"+new Date(person.frontdesk_person_date).getMinutes().toString().padStart(2, "0");
                let expEnd =  (new Date(person.frontdesk_person_date).getFullYear())+ '-' +(new Date(person.frontdesk_person_date).getMonth()+1).toString().padStart(2, "0")+'-'+(new Date(person.frontdesk_person_date).getDate()+1).toString().padStart(2, "0")+ " "+ new Date(person.frontdesk_person_date).getHours().toString().padStart(2, "0")+":"+new Date(person.frontdesk_person_date).getMinutes().toString().padStart(2, "0");
                // console.log(expStart);
                let prescription = "";
                let type = "";
                

        //***************************SENDING DATA TO TABLET HTML POST REQUEST************************************************************
                toDataUrl(person.person_img, async (myBase64)=> {

                let sex="";
                if (person.gender=="Female")
                {
                    sex=0;
                }
                else if (person.gender=="Male")
                {
                    sex=1;
                }
                let tabletFormData = new FormData();
                let b64 = myBase64.replace(/^data:image\/[a-z]+;base64,/, "");
                tabletFormData.append("pass", "123456");

                if (person.category == "Visitors") 
                {
                    prescription = "'"+ expStart +","+ expEnd+"'";
                    type= 1.1;
                    tabletFormData.append("person", "{'imgBase64': '"+b64+"', 'name' : '"+ person.given_name+" "+ person.middle_name +" "+ person.last_name +"', 'person_id' : '1234', 'sex' : "+ sex +", 'group_id' : 20, 'phone' : "+person.contact_number+",  'address' : '"+ person.home_address +"', 'vipId': '"+person.frontdesk_person_id+"',  'att_flag' : 0 , 'banci_id' : '',  'device_group' : 1, 'type' : "+type+", 'reg_type' : 0, 'prescription' : "+ prescription +"}" );
                }
                else if (person.category == "Staff")
                {
                    type = 3;
                    tabletFormData.append("person", "{'imgBase64': '"+b64+"', 'name' : '"+ person.given_name+" "+ person.middle_name +" "+ person.last_name +"', 'person_id' : '1234', 'sex' : "+ sex +", 'group_id' : 20, 'phone' : "+person.contact_number+",  'address' : '"+ person.home_address +"', 'vipId': '"+person.frontdesk_person_id+"',  'att_flag' : 0 , 'banci_id' : '',  'device_group' : 1, 'type' : "+type+", 'reg_type' : 0}" );
                }
                
                this.device_list.forEach(async (device) => {                  
                let createRes = await this.$axios.post("http://"+device.device_ip+":8080/person/create", tabletFormData).then(res => res.data);
               })
                
                });
//*********************************************************************************************************************************
        })
         this.$q.loading.hide();
        }

    }
}
</script>
