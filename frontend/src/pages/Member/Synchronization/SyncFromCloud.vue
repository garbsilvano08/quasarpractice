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
