<template>
    <div class="frontdesk">
        <div class="frontdesk__container">
                <div class="content__grid">
                    <div class="frontdesk__content">
                        <div class="offline_note" v-if="!online">
                        <q-icon name="fas fa-exclamation-circle"></q-icon>   
                        <p>Your network is unavailable. Please make sure that you are connected to any wifi or mobile network.</p>
                        </div>
                        <div class="header__title">Health Cloud Synchronization</div>
                            <div class="table-container">
                                <div class="content__table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>User ID</th>
                                                <th>Name</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody v-for="(person, a) in this.person_list" :key="a">
                                            <tr v-if="a==0" class="syncing">
                                                <td>{{person.frontdesk_person_id}}</td>
                                                <td>{{person.given_name + " " + person.middle_name + " " + person.last_name}}</td>
                                                <td class="background_primary"><q-icon class="loader-2" name="fas fa-sync-alt"/> Syncing </td>
                                            </tr>
                                            <tr v-else>
                                                <td class="background_disable">{{person.frontdesk_person_id + " " + a}}</td>
                                                <td class="background_disable">{{person.given_name + " " + person.middle_name + " " + person.last_name}}</td>
                                                <td class="background_disable" v-if="online">In Queue</td>
                                                <td class="background_danger" v-else>Pending</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "./MobileSyncToCloud.scss";
// Classes
import OpticalReadClass from '../../../classes/OpticalReadClass';
import { postGetDevice } from '../../../references/url';
import { log } from 'util';
import {base64StringToBlob} from 'blob-util';
import MobileModel from "../../../models/MobileModel";

export default {
    data:() =>
    ({  
        mobile_db: new MobileModel(),
        person_list: [],
        keys: [],
        online: true
    }),
    watch:
    {

    },
    async mounted()
    {
        await this.getSyncPerson()
    },
    methods:
    {
        async addPerson(id)
        {
            for (let i = 0; i < this.person_list.length; i++) {
                if (this.person_list[i].frontdesk_person_id == id) return false
            }
            return true
        },
        async getSyncPerson()
        {
            // this.person_list = []
            this.keys = await this.mobile_db.keys()
            this.check()
            for (let i = 0; i < this.keys.length; i++) {

                let is_new = await this.addPerson(this.keys[i])
                if (is_new)
                {
                    let person = await this.mobile_db.get(this.keys[i])
                    this.person_list.push(JSON.parse(person))
                }
            }
            setTimeout(() => this.getSyncPerson(), 1000);
        },
        check()
        {
            for (let i = 0; i < this.person_list.length; i++) {
                if (this.keys.length) {
                    for (let x = 0; x < this.keys.length; x++) {
                        // console.log(this.person_list[i].frontdesk_person_id !=  this.keys[x], 'remove');
                        if (this.person_list[i].frontdesk_person_id ==  this.keys[x]) return
                    }
                    this.person_list.splice(i, 1)
                    return false
                }
                else this.person_list = []
                
                
            }
        }

    },
}
</script>
