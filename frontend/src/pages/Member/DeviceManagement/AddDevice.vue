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
                    <q-input v-model="input_date_installed" outlined dense></q-input>
                </div>
                <div class="content__input">
                    <div class="content__input-label">Device ID</div>
                    <q-input v-model="input_device_id" outlined dense></q-input>
                </div>
            </div>
            <div class="device-add__btn">
                <q-btn class="btn-install btn-primary" flat dense no-caps label="Install"></q-btn>
            </div>
        </div>
    </div>
</template>

<script>
import "./DeviceManagement.scss";

export default {
    data: () => ({
        input_date_installed: '',
        input_device_id: '',
        select_company: '',
        options_company: [
            'Green Sun Hotel'
        ]
    }),
}
</script>
