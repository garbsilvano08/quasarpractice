<template>
    <div class="account-directory">
        <div class="account-directory__header">
            <div class="header__title">BLACKLIST</div>
            <div class="header__filter">
                <q-input outlined dense placeholder="Search People...">
                    <template v-slot:append>
                        <q-icon name="mdi-magnify" />
                    </template>
                </q-input>
            </div>
        </div>
    </div>
</template>

<script>
import "./PersonalInformation.scss";

export default {

}
</script>
