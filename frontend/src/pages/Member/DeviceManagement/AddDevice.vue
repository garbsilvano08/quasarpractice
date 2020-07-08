<template>
    <div class="device-add">
        <div class="header__title">ADD DEVICE</div>
        <div class="device-add__content content__box">
            <div class="header__title">Installation</div>
            <div class="device-add__content-info">
                <div class="content__select">
                    <div class="content__select-label">Tag a Company</div>
                    <q-select v-model="select_company" :options="options_company" outlined dense></q-select>
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
            <div class="device-add__btn">
                <q-btn @click="submit" class="btn-install btn-primary" flat dense no-caps label="Install"></q-btn>
            </div>
        </div>
    </div>
</template>

<script>
import "./DeviceManagement.scss";
import { postGetCompanies, postAddDevice} from '../../../references/url';

export default {
    data: () => ({
        input_date_installed: '',
        input_device_id: '',
        select_company: '',
        options_company: []
    }),

    methods:
    {
        async submit()
        {
            this.$q.loading.show();
            let device_info = {
                company_name: this.select_company,
                company_info: this.getCompany(this.select_company),
                device_id: this.input_device_id,
                date_installed: new Date(this.input_date_installed),
                date_created: new Date()
            }
            await this.$_post(postAddDevice, {device_info: device_info});
            this.select_company = ''
            this.input_device_id = ''
            this.input_date_installed = ''
            this.$q.loading.hide();            
        },

        getCompany(company)
        {
            for (let comp of this.company_list.data) {
                if (comp.company_info.company_name == company)
                {
                    return comp
                }
            }
        },
    },

    async mounted()
    {
        this.company_list = await this.$_post(postGetCompanies);
        for (let company of this.company_list.data) {
            this.options_company.push(company.company_info.company_name)
        }
    }
}
</script>
