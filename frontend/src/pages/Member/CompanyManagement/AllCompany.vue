<template>
    <div class="company-management">
        <div class="company-management__header">
            <div class="header__title">COMPANY MANAGEMENT</div>
            <div class="header__filter">
                <q-input outlined dense placeholder="Search Company...">
                    <template v-slot:append>
                        <q-icon name="mdi-magnify" />
                    </template>
                </q-input>
            </div>
        </div>
        <div class="company-management__container content__grid-3x3">
            <div class="company-management__content content__card">
                <div class="company-management__logo"></div>
                <div class="company-management__info-content">
                    <div class="company-management__info-name">
                        MySolid Tech & Devices Corp.
                    </div>
                    <div class="company-management__info-number">
                        Owned 2 Establishment(s)
                    </div>
                    <div class="company-management__info-people">
                        300 People Registered Here
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "./CompanyManagement.scss";

export default {

}
</script>
