<template>
   <div class="import-staff">

    <div v-if="!this.show_upload">
        <!-- <div class="absolute-center"> -->
            <!-- <q-btn class="btn-save btn-primary" flat dense no-caps label="Import"></q-btn> -->

            <!-- <q-btn @click="showUploadTable()" class="btn-save btn-primary" flat dense no-caps label="Import"></q-btn> -->
        <!-- </div> -->
    </div>

    <!-- <div v-if="this.show_upload"> -->
    <div>
        <div class="import-staff__header">
            <div class="header__title">IMPORT STAFF </div>
            <div class="header__filter">
                <q-btn class="btn-outline btn-export" flat dense no-caps>
                    Clear All
                </q-btn>
                <q-btn @click="submit" class="btn-primary btn-export" flat dense no-caps>
                    Save
                </q-btn>
            </div>
        </div>
        <div class="import-staff__header">
            <input @input="checkFile()" id='input' type='file' accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
        </div>

        <div class="table-container content__box">
            <div class="content__table">
                <table>
                    <thead>
                        <tr>
                            <th>Status/Action</th>
                            <th>Picture</th>
                            <th>Tagged to</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Middle name</th>
                            <th>Email address</th>
                            <th>Gender</th>
                            <th>Birthday</th>
                            <th>Position</th>
                            <th>Nationality</th>
                            <th>Home address</th>
                            <th>Contact number</th>
                            <th>Emergency contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr  v-for="(staff, i) in this.staff_list" :key="i">
                            <td> 
                                <!-- Loading -->
                                <q-icon v-if="staff.status === 'pending'" class="background_disable" name="fas fa-circle-notch"/> 
                                <q-icon v-if="staff.status === 'ongoing'" class="background_active loader-2" name="fas fa-circle-notch"/> 
                                <q-icon v-if="staff.status === 'error'" class="background_stop" name="fas fa-exclamation-circle"/> 
                                <q-icon v-if="staff.status === 'done'" class="background_active" name="fas fa-check"/> 

                                <!-- Play & Pause -->
                                <q-icon v-if="!is_saving && staff.status != 'ongoing'" class="background_disable" name="fas fa-stop-circle"/> 
                                <q-icon v-if="is_saving && staff.status != 'pending'" class="background_stop" name="fas fa-stop-circle"/> 
                                <q-icon v-if="is_saving && staff.status != 'ongoing'" class="background_primary" name="fas fa-play-circle"/> 

                                <!-- Delete -->
                                <q-icon v-if="staff.status === 'ongoing'" class="background_disable" name="fas fa-trash-alt"/> 
                                <q-icon v-else class="background_primary" name="fas fa-trash-alt"/> 

                                <q-icon v-if="staff.status === 'ongoing'" class="background_disable" name="fas fa-edit"/> 
                                <q-icon v-else @click="editStaffData(i)" class="background_primary" name="fas fa-edit"/>
                            </td>
                            <td>
                                <input style="display:none" :id="staff.frontdesk_person_id" accept="image/*" @change="uploadImage()" ref="uploader" type="file">
                                <q-img v-if="staff.person_img" class="content__img" :src="staff.person_img" @click="openFilemanager(i)"></q-img>
                                <q-btn v-else class="no-shadow" @click="openFilemanager(i)"><q-icon name="fas fa-upload"></q-icon></q-btn>
                            </td>
                            <td>{{staff.company_name}}</td>
                            <td>{{staff.given_name}}</td>
                            <td>{{staff.last_name}}</td>
                            <td>{{staff.middle_name}}</td>
                            <td>{{staff.email}}</td>
                            <td>{{staff.gender}}</td>
                            <td>{{staff.birthday}}</td>
                            <td>{{staff.position}}</td>
                            <td>{{staff.nationality}}</td>
                            <td>{{staff.home_address}}</td>
                            <td>{{staff.contact_number}}</td>
                            <td>{{staff.emergency_contact}}</td>
                        </tr>
                        <!-- <tr>
                            <td>
                                <q-icon class="background_disable" name="fas fa-circle-notch"/> &nbsp
                                <q-icon class="background_primary" name="fas fa-play-circle"/> &nbsp
                                <q-icon class="background_primary" name="fas fa-trash-alt"/> &nbsp
                                <q-icon @click="editStaffData" class="background_primary" name="fas fa-edit"/>
                            </td>
                            <td><q-btn class="no-shadow"><q-icon name="fas fa-upload"></q-icon></q-btn></td>
                            <td>Green Sun</td>
                            <td>Juan</td>
                            <td>Dela Cruz</td>
                            <td>Miguel</td>
                            <td>rem@gmail.com</td>
                            <td>Male</td>
                            <td>01/01/1996</td>
                            <td>Staff</td>
                            <td>Filipino</td>
                            <td>Malolos, Bulacan</td>
                            <td>09123456789</td>
                            <td>09123456789</td>
                        </tr>
                        <tr>
                            <td>
                                <q-icon class="background_active" name="fas fa-check"/> &nbsp
                                <q-icon class="background_disable" name="fas fa-stop-circle"/> &nbsp
                                <q-icon class="background_primary" name="fas fa-trash-alt"/> &nbsp
                                <q-icon @click="editStaffData" class="background_primary" name="fas fa-edit"/>
                            </td>
                            <td><q-btn class="no-shadow"><q-icon name="fas fa-upload"></q-icon></q-btn></td>
                            <td>Green Sun</td>
                            <td>Juan</td>
                            <td>Dela Cruz</td>
                            <td>Miguel</td>
                            <td>rem@gmail.com</td>
                            <td>Male</td>
                            <td>01/01/1996</td>
                            <td>Staff</td>
                            <td>Filipino</td>
                            <td>Malolos, Bulacan</td>
                            <td>09123456789</td>
                            <td>09123456789</td>
                        </tr>
                        <tr>
                            <td>
                                <q-icon class="background_stop" name="fas fa-exclamation-circle"/> &nbsp
                                <q-icon class="background_disable" name="fas fa-stop-circle"/> &nbsp
                                <q-icon class="background_primary" name="fas fa-trash-alt"/> &nbsp
                                <q-icon @click="editStaffData" class="background_primary" name="fas fa-edit"/>
                            </td>
                            <td><q-btn class="no-shadow"><q-icon name="fas fa-upload"></q-icon></q-btn></td>
                            <td>Green Sun</td>
                            <td>Juan</td>
                            <td>Dela Cruz</td>
                            <td>Miguel</td>
                            <td>rem@gmail.com</td>
                            <td>Male</td>
                            <td>01/01/1996</td>
                            <td>Staff</td>
                            <td>Filipino</td>
                            <td>Malolos, Bulacan</td>
                            <td>09123456789</td>
                            <td>09123456789</td>
                        </tr>
                        <tr>
                            <td>
                                <q-icon class="background_disable" name="fas fa-circle-notch"/> &nbsp
                                <q-icon class="background_disable" name="fas fa-play-circle"/> &nbsp
                                <q-icon class="background_disable" name="fas fa-trash-alt"/> &nbsp
                                <q-icon @click="editStaffData" class="background_primary" name="fas fa-edit"/>
                            </td>
                            <td><q-btn class="no-shadow"><q-icon name="fas fa-upload"></q-icon></q-btn></td>
                            <td>Green Sun</td>
                            <td>Juan</td>
                            <td>Dela Cruz</td>
                            <td>Miguel</td>
                            <td>rem@gmail.com</td>
                            <td>Male</td>
                            <td>01/01/1996</td>
                        </tr> -->
                    </tbody>
                </table>
            </div>
            <q-dialog v-model="edit_dialog">
               <q-card style="width: 80%; max-width: 80vw;">
                  <q-card-section>
                    <EditImportStaff :staff="this.staff_list[this.index]" @update=updateStaff ></EditImportStaff>
                  </q-card-section>

               </q-card>
            </q-dialog>
        </div>
        <div class="flex flex-center">
            <!-- <q-pagination 
                :max="5"
                :direction-links="true"
                >
            </q-pagination> -->
        </div>
    </div>
    
   </div>
</template>

<script>
// import "../../../../node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css";
import EditImportStaff from './EditImportStaff'
import { postAddPerson , postSavePerson , postGetDevice, postGetLogsSettings, postVisionSky, postPersonByCateg, postGetCompany } from '../../../references/url';
import "../../../../node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "./ImportStaff.scss";
import readXlsxFile from 'read-excel-file'
import { log } from 'util';
import { forEach } from '../../../references/nav';

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

export default
{
    components: {
        EditImportStaff,
    },
    filters: { },
    data:() =>(
    {
        show_upload : false,
        staff_list: [],
        edit_dialog: false,
        is_saving: false,
        index: 0,
        image_index: 0
    }),
    mounted() { },
    watch:
    {
        async staff_list(val)
        {
            // console.log(val, 'staff');
        }
    },
    methods: { 
        async submit()
        {
            let devices = await this.getDevices()
            // person_img:         { type: String,  required: true },
            // last_name:          { type: String,  required: true },
            // middle_name:        { type: String,  required: true },
            // given_name:         { type: String,  required: true },
            // email:              { type: String,  required: false },
            // gender:             { type: String,  required: false, default: 'Unknown'},
            // birthday:           { type: Date,    required: true},
            // nationality:        { type: String,  required: false, default: 'Unknown' },
            // home_address:       { type: String,  required: true },
            // contact_number:     { type: String,  required: true },
            // emergency_contact:  { type: String,  required: false, default: 'Unknown' },
            // date_created:       { type: Date  ,  required: true },
            // is_active:          { type: Boolean, required: false, default: true },
            // category:           { type: String,  required: true, default: 'Visitor' },
            
            // // Staff
            // position:           { type: String, required: false },
            // location:           { type: Object, required: false},
            // location_coordinates:{ type: Object, required: false},

            for (let index = 0; index < this.staff_list.length; index++) {
                this.staff_list[index].status = 'ongoing'
                if ( !this.staff_list[index].person_img
                        || !this.staff_list[index].last_name
                        || !this.staff_list[index].given_name
                        || !this.staff_list[index].birthday
                        || !this.staff_list[index].home_address
                        || !this.staff_list[index].contact_number
                )    
                {
                    this.staff_list[index].status = 'error'
                }
                else
                {
                    toDataUrl(person.person_img, async(myBase64) =>
                    {
                        devices.forEach(async device => {
                            if (device.device_type == 'vision_sky')
                            {
                                try
                                {
                                    let data = new FormData();
                                    data.append('pass', 'abc123');
                                    data.append("person", "{'id': '"+ this.staff_list[index].frontdesk_person_id +"', 'name': '" + this.staff_list[index].given_name + " " + this.staff_list[index].middle_name + " " + this.staff_list[index].last_name + "', 'idcardNum': '', 'departmentId': '1'}" );
                    
                                    let upload = await this.$axios.post("http://"+ device_ip +":8090/person/create", data).then(res => res.data);

                                    let image = new FormData();
                                    image.append('pass', 'abc123');
                                    image.append("personId", this.staff_list[index].frontdesk_person_id );
                                    image.append("faceId", this.staff_list[index].frontdesk_person_id );
                                    image.append("imgBase64", b64 );
                                    let img = await this.$axios.post("http://"+ device_ip +":8090/face/create", image).then(res => res.data);
                                }
                                catch(e){}
                            }
                            else
                            {
                                tabletFormData.append("pass", "123456");
                                tabletFormData.append("person", "{'imgBase64': '"+b64+"', 'name' : '"+this.staff_list.first_name+" "+ this.staff_list.middle_name +" "+ this.staff_list.last_name +"', 'person_id' : '"+ visitor.personal_information.id_number +"', 'sex' : "+ sex +", 'group_id' : 20, 'phone' : "+visitor.personal_information.contact_number+", 'email' : '', 'ic_card' : '', 'nation' : '', 'native_place' : '', 'birth_day' : '"+ visitor.personal_information.birth_day +"', 'address' : '"+ visitor.personal_information.home_address +"', 'vipId': '"+visitor.personal_information.frontdesk_person_id+"', 'remarks' : '', 'att_flag' : 0 , 'banci_id' : '', 'device_group_id' : '', 'device_group' : 1, 'type' : 1.1, 'reg_type' : 0, 'prescription' : '"+ expStartTime+","+expEndTime +"'}" );
                                let rsp = await this.$axios.post("http://"+device.device_ip+":8080/person/create", tabletFormData).then(res => res.data);
                            }
                        });
                    })
                    
                }
            }
        },

        async getDevices()
        {
            if (this.$user_info && this.$user_info.company)
            {
                let devices = await this.$_post(postGetDevice, {find_device: {company_id: this.$user_info.company._id}});
               return devices.data
            }
        },

        async getImageURL(type)
        {
            let oFReader = new FileReader();
            const formData = new FormData();
            formData.append('image', document.getElementById(this.staff_list[this.image_index].frontdesk_person_id).files[0]);
            return await this.$_post_file(formData);
        },
        async uploadImage()
        {
            this.$q.loading.show();
            let image = await this.getImageURL()
            this.staff_list[this.image_index].person_img = image
            this.$q.loading.hide();
        },
        openFilemanager(index)
        {
            this.image_index = index
            this.$refs.uploader[index].click();
        },
        showUploadTable()
        {
            this.show_upload = true
        },

        updateStaff(value)
        {
            console.log(this.index);
            this.staff_list[this.index] = value
            this.edit_dialog = false
        },

        async checkFile()
        {
            this.staff_list = []
            const input = document.getElementById('input')
            readXlsxFile(input.files[0]).then(async (rows) => {
                for (let index = 1; index < rows.length; index++) {

                    let result           = '';
                    let characters       = '0123456789';
                    let charactersLength = characters.length;
                    for ( let i = 0; i < 9; i++ ) {
                        result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    }
                    let company = await this.$_company({company_name: rows[index][3]})
                    this.staff_list.push({
                        status: 'pending',
                        // person_img:         { type: String,  required: true },
                        last_name:          rows[index][0],
                        given_name:         rows[index][1],
                        middle_name:        rows[index][2],

                        company_name: company[0].company_name,
                        company_id: company[0].id,
                        position: rows[index][4],
                        email: rows[index][5],
                        gender: rows[index][6],
                        birthday: new Date(rows[index][7]).toISOString().split('T')[0],
                        nationality: rows[index][8],
                        contact_number: rows[index][9],
                        emergency_contact: rows[index][10],
                        home_address: rows[index][10],

                        date_created: new Date(),
                        is_active: true,
                        category: 'Staff',
                        frontdesk_person_id: result,
                        frontdesk_person_date: new Date(),
                        saved_from: company[0].id,
                        company: company[0],

                        person_img: null,
                    })
                }
            })
        },
        editStaffData(index){
            this.index = index
            this.edit_dialog = true
        }
    },
    computed: { }
}
</script>
