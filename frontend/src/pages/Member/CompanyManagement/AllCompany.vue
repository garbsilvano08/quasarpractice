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
                <div class="company-management__info-logo">
                    <img src="https://1.bp.blogspot.com/-3SfIxwKwBHU/WtBgYxhabXI/AAAAAAAADdU/FcfJHnvCNisKZ-zgMbm_pY4U-iqUmRWzwCLcBGAs/s1600/myphone%2Bmya8%2Bdtv.jpg">
                </div>
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

            <div class="company-management__content content__card">
                <div class="company-management__info-logo">
                    <img src="https://www.smsupermalls.com/data/uploads/2019/02/SM-FB-OG.jpg">
                </div>
                <div class="company-management__info-content">
                    <div class="company-management__info-name">
                        SM Super Malls
                    </div>
                    <div class="company-management__info-number">
                        Owned 3 Establishment(s)
                    </div>
                    <div class="company-management__info-people">
                        5 People Registered Here
                    </div>
                </div>
            </div>

            <div class="company-management__content content__card">
                <div class="company-management__info-logo">
                    <img src="https://www.philretailers.com/wp-content/uploads/2015/07/Ayala_Malls_Logo.png">
                </div>
                <div class="company-management__info-content">
                    <div class="company-management__info-name">
                        Ayala Malls
                    </div>
                    <div class="company-management__info-number">
                        Owned 3 Establishment(s)
                    </div>
                    <div class="company-management__info-people">
                        200 People Registered Here
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
