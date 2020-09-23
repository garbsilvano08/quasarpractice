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
                <q-btn class="btn-primary btn-export" flat dense no-caps>
                    Save
                </q-btn>
            </div>
        </div>
        <div class="import-staff__header">
            <input @input="checkFile()" id='input' type='file' accept="application/vnd.ms-excel"/>
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
                                <q-icon class="background_disable" name="fas fa-circle-notch"/> &nbsp
                                <q-icon class="background_active loader-2" name="fas fa-circle-notch"/> &nbsp

                                <!-- Play & Pause -->
                                <q-icon class="background_stop" name="fas fa-stop-circle"/> &nbsp
                                <q-icon class="background_primary" name="fas fa-play-circle"/> &nbsp
                                <q-icon class="background_disable" name="fas fa-stop-circle"/> &nbsp

                                <!-- Delete -->
                                <q-icon class="background_disable" name="fas fa-trash-alt"/>
                                <q-icon class="background_primary" name="fas fa-trash-alt"/>
                            </td>
                            <td>
                                <q-btn class="no-shadow"><q-icon name="fas fa-upload"></q-icon></q-btn>
                            </td>
                            <td>Green Sun</td>
                            <td>{{staff.given_name}}</td>
                            <td>{{staff.last_name}}</td>
                            <td>{{staff.middle_name}}</td>
                            <td>rem@gmail.com</td>
                            <td>Female</td>
                            <td>01/01/1996</td>
                            <td>Staff</td>
                            <td>Filipino</td>
                            <td>Malolos, Bulacan</td>
                            <td>09123456789</td>
                            <td>09123456789</td>
                        </tr>
                        <!-- <tr>
                            <td>
                                <q-icon class="background_disable" name="fas fa-circle-notch"/> &nbsp
                                <q-icon class="background_primary" name="fas fa-play-circle"/> &nbsp
                                <q-icon class="background_primary" name="fas fa-trash-alt"/>
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
                                <q-icon class="background_primary" name="fas fa-trash-alt"/>
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
                                <q-icon class="background_primary" name="fas fa-trash-alt"/>
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
                                <q-icon class="background_disable" name="fas fa-trash-alt"/>
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
        </div>
        <div class="flex flex-center">
            <q-pagination 
                :max="5"
                :direction-links="true"
                >
            </q-pagination>
        </div>
    </div>
    
   </div>
</template>

<script>
// import "../../../../node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "./ImportStaff.scss";
import readXlsxFile from 'read-excel-file'
import { log } from 'util';
export default
{
    filters: { },
    data:() =>(
    {
        show_upload : false,
        staff_list: []
    }),
    mounted() { },
    methods: { 
        showUploadTable()
        {
            this.show_upload = true
        },
        async checkFile()
        {
            const input = document.getElementById('input')
            readXlsxFile(input.files[0]).then((rows) => {
                console.log(rows, 'kjhkjhjkh');
                for (let index = 1; index < rows.length; index++) {
                    // const element = array[index];
                    // for (let i = 0; i < rows[index].length; i++) {
                        // console.log(rows[index][i], 'rows');
                        
                        this.staff_list.push({
                            last_name: rows[index][0],
                            given_name: rows[index][1],
                            middle_name: rows[index][2],
                        })
                    // }
                }
            })
        },
    },
    computed: { }
}
</script>
