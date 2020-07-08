<template>
    <div class="device-management">
        <div class="device-management__header">
            <div class="header__title">
                DEVICE MANAGEMENT <br>
                <span>300 DEVICES INSTALLED</span></div>
            <div class="header__filter">
                <q-select v-model="select__company" :options="options_company" outlined dense></q-select>
            </div>
        </div>
        <div class="account-directory__container content__box">
            <div class="content__table">
                <table>
                    <thead>
                        <tr>
                            <th>Device ID</th>
                            <th>Company</th>
                            <th>Date Installed</th>
                            <th>Device Removal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>D1ABC123</td>
                            <td>Green Sun Hotel</td>
                            <td>6/24/2020 8:00 AM</td>
                            <td class="td-active">Uninstall</td>
                        </tr>
                        <tr>
                            <td>D1ABC123</td>
                            <td>Green Sun Hotel</td>
                            <td>6/24/2020 8:00 AM</td>
                            <td class="td-active">Uninstall</td>
                        </tr>
                        <tr>
                            <td>D1ABC123</td>
                            <td>Green Sun Hotel</td>
                            <td>6/24/2020 8:00 AM</td>
                            <td class="td-active">Uninstall</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import "./DeviceManagement.scss";

export default {
    data: () => ({
        select__company: '',
        options_company: [
            'All Companies'
        ]
    }),
}
</script>
