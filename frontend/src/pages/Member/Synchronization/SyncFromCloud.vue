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
        // console.log(this.device_list)
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
                this.persons_list = await this.$_post(postGetPersons);
                this.persons_list = this.persons_list.data;
                console.log(this.persons_list[0].category);
                
                this.persons_list.forEach(async (person) => {
                    console.log(person.category)
                })

                console.log((new Date(this.persons_list[0].frontdesk_person_date).getFullYear())+ '-' +(new Date(this.persons_list[0].frontdesk_person_date).getMonth()+1).toString().padStart(2, "0")+'-'+new Date(this.persons_list[0].frontdesk_person_date).getDate().toString().padStart(2, "0")+ " "+ new Date(this.persons_list[0].frontdesk_person_date).getHours().toString().padStart(2, "0")+":"+new Date(this.persons_list[0].frontdesk_person_date).getMinutes().toString().padStart(2, "0"));
                console.log((new Date(this.persons_list[0].frontdesk_person_date).getFullYear())+ '-' +(new Date(this.persons_list[0].frontdesk_person_date).getMonth()+1).toString().padStart(2, "0")+'-'+(new Date(this.persons_list[0].frontdesk_person_date).getDate()+1).toString().padStart(2, "0")+ " "+ new Date(this.persons_list[0].frontdesk_person_date).getHours().toString().padStart(2, "0")+":"+new Date(this.persons_list[0].frontdesk_person_date).getMinutes().toString().padStart(2, "0"));
        
        //***************************SENDING DATA TO TABLET HTML POST REQUEST************************************************************
                // toDataUrl(visitor.personal_information.account_img, async (myBase64)=> {
                // let result           = '';
                // let characters       = '0123456789';
                // let charactersLength = characters.length;
                // for ( let i = 0; i < 9; i++ ) {
                //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
                // }

                // let sex="";
                // if (visitor.personal_information.gender=="Female")
                // {
                //     sex=0;
                // }
                // else if (visitor.personal_information.gender=="Male")
                // {
                //     sex=1;
                // }
                // let today= new Date()
                // let expStartTime= (today.getFullYear())+ '-' +(today.getMonth()+1).toString().padStart(2, "0")+'-'+today.getDate().toString().padStart(2, "0")+ " "+ today.getHours().toString().padStart(2, "0")+":"+today.getMinutes().toString().padStart(2, "0");
                // let expEndTime= (today.getFullYear())+ '-' +(today.getMonth()+1).toString().padStart(2, "0")+'-'+(today.getDate()+1).toString().padStart(2, "0")+ " "+ today.getHours().toString().padStart(2, "0")+":"+today.getMinutes().toString().padStart(2, "0");

                // let tabletFormData = new FormData();
                // let b64 = myBase64.replace(/^data:image\/[a-z]+;base64,/, "");
                // tabletFormData.append("pass", "123456");
                // tabletFormData.append("person", "{'imgBase64': '"+b64+"', 'name' : '"+ visitor.personal_information.first_name+" "+ visitor.personal_information.middle_name +" "+ visitor.personal_information.last_name +"', 'person_id' : '"+ visitor.personal_information.id_number +"', 'sex' : "+ sex +", 'group_id' : 20, 'phone' : "+visitor.personal_information.contact_number+", 'email' : '', 'ic_card' : '', 'nation' : '', 'native_place' : '', 'birth_day' : '"+ visitor.personal_information.birth_day +"', 'address' : '"+ visitor.personal_information.home_address +"', 'vipId': '"+visitor.personal_information.frontdesk_person_id+"', 'remarks' : '', 'att_flag' : 0 , 'banci_id' : '', 'device_group_id' : '', 'device_group' : 1, 'type' : "+1.1+", 'reg_type' : 0, 'prescription' : '"+ expStartTime+","+expEndTime +"'}" );
                
                // this.device_list.forEach(async (device) => {

                // let rsp = await this.$axios.post("http://"+device.device_ip+":8080/person/create", tabletFormData).then(res => res.data);
                // })
                
                // });
//*********************************************************************************************************************************
        
        
        
        },
        async deleteAllTabletPerson()
        {
            this.$q.loading.show();
            let tabletFormData = new FormData();
            tabletFormData.append("pass", "123456");
            tabletFormData.append("index", 0);
            tabletFormData.append("length", 50);

                
            // deleteFormData.append("deleteId", "");
            this.device_list.forEach(async (device) => {

                let rsp = await this.$axios.post("http://"+device.device_ip+":8080/person/findByPage", tabletFormData).then(res => res.data);
                rsp= JSON.parse(rsp.data).records;
                    
                // console.log(rsp)
                rsp.forEach( async (person)=>{
                    console.log(person.vipID);
                    let deleteFormData = new FormData();
                    deleteFormData.append("pass", "123456");
                    deleteFormData.set("deleteId", ""+person.vipID+"");
                    let res= await this.$axios.post("http://"+device.device_ip+":8080/person/delete ", deleteFormData).then(res => res.data);
                    // console.log(res);
                })                    
                    if (rsp.length>0)
                    this.deleteAllTabletPerson();
            })

            this.$q.loading.hide();

        }

    }
}
</script>
