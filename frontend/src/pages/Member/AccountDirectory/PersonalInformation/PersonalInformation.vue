<template>
    <div class="personal-info">
        <div class="personal-info__header">
            <q-btn @click="back" class="btn-back btn-primary" flat dense no-caps label="Back"></q-btn>
            <div class="personal-info__header-btn">
                <q-btn @click="removeAccount()" class="btn-outline btn-remove" flat dense no-caps label="Remove"></q-btn>
                <q-btn @click="editAccount()" class="btn-primary btn-edit" flat dense no-caps label="Edit"></q-btn>
            </div>
        </div>
        <div v-if="account_info" class="personal-info__container content__box">
            <div class="personal-info__holder">
                <div class="personal-info__content-header">
                    <q-icon name="mdi-apple-icloud" size="30px"></q-icon>
                    <div class="content__title">Healthcloud Information</div>
                </div>
                <div class="personal-info__content">
                    <div class="personal-info__grid">
                        <q-img :src="account_info.type == 'Visitor' ? account_info.personal_information.account_img : account_info.account_img ? account_info.account_img : ''">
                            <q-btn flat dense rounded icon="mdi-magnify" size="13px"></q-btn>
                        </q-img>
                        <div class="personal-info__item-content">
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">First Name:</div>
                                <div class="personal-info__item-info">{{account_info.given_name ? account_info.given_name : account_info.personal_information.first_name}}</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Last Name:</div>
                                <div class="personal-info__item-info">{{account_info.last_name ? account_info.last_name : account_info.personal_information.last_name}}</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Middle Name:</div>
                                <div class="personal-info__item-info">{{account_info.middle_name ? account_info.middle_name : account_info.personal_information.middle_name}}</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Gender:</div>
                                <div class="personal-info__item-info">{{account_info.gender ? account_info.gender : account_info.personal_information.gender}}</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Birth Date:</div>
                                <div class="personal-info__item-info">{{ account_info.birthday ? new Date(account_info.birthday).getFullYear() + 
                                    "/" + new Date(account_info.birthday).getDay() + 
                                    "/" +new Date(account_info.birthday).getMonth() : 
                                    new Date(account_info.personal_information.birth_date).getFullYear() + 
                                    "/" + new Date(account_info.personal_information.birth_date).getDay() + 
                                    "/" +new Date(account_info.personal_information.birth_date).getMonth()}}</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Age:</div>
                                <div class="personal-info__item-info">{{ account_info.birthday ? 
                                    new Date().getFullYear() - new Date(account_info.birthday).getFullYear():
                                    new Date().getFullYear() - new Date(account_info.personal_information.birth_date).getFullYear()}}</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Nationality:</div>
                                <div class="personal-info__item-info">{{account_info.nationality ? account_info.nationality : account_info.personal_information.nationality}}</div>
                            </div>
                        </div>
                        <div class="personal-info__item-content">
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Home Address:</div>
                                <div class="personal-info__item-info">{{account_info.home_address ? account_info.home_address : account_info.personal_information.home_address}}</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Contact Number:</div>
                                <div class="personal-info__item-info">{{account_info.contact_number ? account_info.contact_number : account_info.personal_information.contact_number}}</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Emergency Contact Number:</div>
                                <div class="personal-info__item-info">{{account_info.emergency_contact ? account_info.emergency_contact : account_info.personal_information.emergency_contact_number}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="account_info.type == 'Staff'" class="personal-info__holder">
                <div class="personal-info__content-header content-header__grey">
                    <q-icon name="mdi-briefcase" size="20px"></q-icon>
                    <div class="content__title">Data Source</div>
                </div>
                <div class="personal-info__content">
                    <div class="personal-info__grid">
                        <q-img :src="getImgUrl(account_info.company_details.company_info.logo_filename)"></q-img>
                        <div class="personal-info__item-content">
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Company Name:</div>
                                <div class="personal-info__item-info">{{account_info.company_details.company_info.company_name ? account_info.company_details.company_info.company_name : account_info.company}}</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Parent:</div>
                                <div class="personal-info__item-info">{{account_info.company_details.company_info.parent ? account_info.company_details.company_info.parent : ''}}</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label"> {{account_info.date_created ? 'Date Registered:' : 'Date Blaclisted'}}</div>
                                <div class="personal-info__item-info">{{ 
                                    account_info.date_created ?
                                    new Date(account_info.date_created).getFullYear() + "/" + new Date(account_info.date_created).getDay() + "/" +new Date(account_info.date_created).getMonth(): 
                                    new Date(account_info.date_blacklisted).getFullYear() + "/" + new Date(account_info.date_blacklisted).getDay() + "/" +new Date(account_info.date_blacklisted).getMonth()}}</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Total Registered:</div>
                                <div class="personal-info__item-info">32</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Devices:</div>
                                <div class="personal-info__item-info">2</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="account_info.type != 'Blacklist'" class="personal-info__holder">
                <div class="personal-info__content-header content-header__grey">
                    <q-icon name="mdi-card-account-details" size="20px"></q-icon>
                    <div class="content__title">Registered Identification Card</div>
                </div>
                <div class="personal-info__content">
                    <div class="personal-info__grid">
                        <q-img :src="account_info.type == 'Visitor' ? account_info.personal_information.id_image : account_info.id_img ? account_info.id_img : ''"></q-img>
                        <div class="personal-info__item-content">
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">ID Type:</div>
                                <div v-if="account_info.type == 'Staff'" class="personal-info__item-info">{{account_info.id_type ? account_info.id_type : 'N/A'}}</div>
                                <div v-else class="personal-info__item-info">{{account_info.personal_information.id_type ? account_info.personal_information.id_type : 'N/A'}}</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">ID Number:</div>
                                <div v-if="account_info.type == 'Staff'" class="personal-info__item-info">{{account_info.id_num ? account_info.id_num : 'N/A'}}</div>
                                <div v-else class="personal-info__item-info">{{account_info.personal_information.id_number ? account_info.personal_information.id_number : 'N/A'}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="personal-info__container content__box" style="margin-top: 30px">
            <div class="personal-info__content-header">
                <q-icon name="mdi-face-recognition" size="22px"></q-icon>
                <div class="content__title">User Logs</div>
            </div>
            <div class="content__table">
                <table>
                    <thead>
                        <tr>
                            <th>Date & Time</th>
                            <th>Body Temperature</th>
                            <th>Device ID</th>
                            <th>Company/Location Scanned</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>6/24/2020 8:00 AM</td>
                            <td class="td-green">36.5°C</td>
                            <td>D1ABC123</td>
                            <td>Green Sun Hotel</td>
                        </tr>
                        <tr>
                            <td>6/24/2020 8:00 AM</td>
                            <td class="td-green">36.5°C</td>
                            <td>D1ABC123</td>
                            <td>Green Sun Hotel</td>
                        </tr>
                        <tr>
                            <td>6/24/2020 8:00 AM</td>
                            <td class="td-red">38.5°C</td>
                            <td>D1ABC123</td>
                            <td>Green Sun Hotel</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { Notify } from 'quasar';
import "./PersonalInformation.scss";
import { postRemoveAccount , postGetCompany} from '../../../../references/url';

export default {
     data: () => ({
        account_info: {},
    }),

    methods:
    {
        back()
        {
            if (this.account_info.type == 'Staff') this.$router.push({name: "member_accountdirectory_staff"})
            else if (this.account_info.type == 'Blacklist') this.$router.push({name: "member_accountdirectory_blacklist"})
            else if (this.account_info.type == 'Visitor') this.$router.push({name: "member_accountdirectory_visitor"})
        },
        getImgUrl(path){

            return "http://localhost:4001/images/"+path;
        },
        async removeAccount()
        {
            await this.$_post(postRemoveAccount, {id: this.$route.params.account_info._id , type: this.account_info.type});
            
            if (this.account_info.type == 'Staff') this.$router.push({name: "member_accountdirectory_staff"})
            else this.$router.push({name: "member_accountdirectory_blacklist"})

             Notify.create({
                color: 'green',
                message: 'Successfully removed from ' + this.account_info.type
            }); 
        },
        editAccount()
        {
            let name = ''

            if (this.account_info.type == 'Staff') name = 'member_frontdesk_staff'
            else if (this.account_info.type == 'Blacklist') name = 'member_frontdesk_blacklist'
            else if (this.account_info.type == 'Visitor') name = 'member_frontdesk_visitor'

            this.$router.push({
                name: name,
                params: {
                    account_info: this.account_info,
                    is_edit: 'edit'
                }
            })
        }
    },

    async mounted()
    {
        this.account_info = this.$route.params.account_info
        console.log(this.account_info);
        
    }

}
</script>
