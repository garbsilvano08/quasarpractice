<template>
    <div class="device-add">
        <div class="header__title">ADD DEVICE</div>
        <div class="device-add__content content__box">
            <div class="header__title">Installation</div>
            <div class="device-add__content-info">
                <div class="content__select">
                    <div class="content__select-label">Tag a Company</div>
                    <com-picker @select=getCompanyData></com-picker>
                    <!-- <q-select v-model="select_company" :options="options_company" outlined dense></q-select> -->
                </div>
            </div>
            <div class="device-add__content-info device-add__content-grid">
                <div class="content__input">
                    <div class="content__input-label">Date Installed</div>
                    <q-input type="date" v-model="input_date_installed" outlined dense></q-input>
                </div>
                <div class="content__input">
                    <div class="content__input-label">Device ID</div>
                    <q-input v-model="input_device_id" outlined dense></q-input>
                </div>
            </div>
            <div class="device-add__content-info device-add__content-grid">
                <div class="content__input">
                    <div class="content__input-label">Device IP Address</div>
                    <q-input v-model="input_device_ip" outlined dense></q-input>
                </div>
                <div class="content__input">
                    <div class="content__input-label">Device Log Type</div>
                    <q-select v-model="log_type" :options="log_type_options" outlined dense></q-select>
                </div>
            </div>
            <div class="device-add__btn">
                <q-btn @click="submit" class="btn-install btn-primary" flat dense no-caps label="Install"></q-btn>
                <q-btn class="btn-save btn-primary" flat dense no-caps label="Success" @click="is_success_dialog = true"></q-btn>
            </div>
        </div>

        <!-- SUCCESS DIALOG -->
        <q-dialog v-model="is_success_dialog">
            <div>
                <SuccessDialog></SuccessDialog>
            </div>
        </q-dialog>
    </div>
</template>

<script>
import "./DeviceManagement.scss";
import { postGetCompanies, postAddDevice} from '../../../references/url';

// Component
import  SuccessDialog from "../../../components/SuccessDialog/SuccessDialog"
import  ComPicker from "../../../components/companyPicker/ComPicker"

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

export default {
    components: {
        ComPicker,
        SuccessDialog
    },
    data: () => ({
            is_success_dialog: 'false',
            input_date_installed: '',
            input_device_id: '',
            select_company: '',
            input_device_ip: '',
            log_type_options: ['Public', 'In', 'Out'],
            log_type: 'Public'
    }),

    methods:
    {
        async submit()
        {

            try
            {
                if (isEmpty(this.select_company)){
                    throw new Error("Company is required.");
                }

                else if (isNaN(Date.parse(this.input_date_installed)) == true ){
                    throw new Error("Install Date is required.");
                }
                else if (this.input_device_id.length<=0 ){
                    throw new Error("Device ID is required.");
                }
                else if (this.input_device_ip.length< 11){
                    throw new Error("Invalid IP Address.");
                }
                else{
                    this.$q.loading.show();

                    let device_info = {
                        company_info: this.select_company,
                        device_id: this.input_device_id,
                        device_ip: this.input_device_ip,
                        date_installed: new Date(this.input_date_installed),
                        date_created: new Date(),
                        company_name: this.select_company.company_name,
                        company_id: this.select_company._id,
                        log_type: this.log_type
                    }
                    await this.$_post(postAddDevice, {device_info: device_info});
                    this.select_company = ''
                    this.input_device_id = ''
                    this.input_date_installed = ''
                    this.input_device_ip = ''
                    this.$q.loading.hide();

                }
            }
            catch (e)
            {
                this.$q.loading.hide();
                this.$q.notify(
                {
                    color: 'red',
                    message: e.message
                });
            }

        },
        getCompanyData(value)
        {
            this.select_company = value;
            // console.log(value)
        },


    },

    async mounted()
    {

    },

}
</script>
