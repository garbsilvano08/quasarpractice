<template>
    <div class="company-add">
        <div class="header__title">ADD COMPANY</div>
            <div class="content__box">
                <div class="header__title">Company Information</div>

                <div class="company-add__content-info">
                    <div class="content__title">Choose ID</div>
                    <div class="content__img-holder img-holder__sm">
                        <q-img class="content__img img__sm" src="../../../assets/Member/placeholder-img.jpg"></q-img>
                        <q-btn class="btn-upload btn-primary" flat dense no-caps label="Upload"></q-btn>
                    </div>
                </div>

                <div class="company-add__content-info company-add__content-grid">
                    <div class="content__input">
                        <div class="content__input-label">Company Name</div>
                        <q-input v-model="input_company_name" outlined dense></q-input>
                    </div>
                    <div class="content__input">
                        <div class="content__input-label">Location</div>
                        <q-input v-model="input_location" outlined dense></q-input>
                    </div>
                </div>

                <div class="company-add__content-info">
                    <div class="content__select">
                        <div class="content__select-label">Parent</div>
                        <q-select v-model="select_parent" :options="options_parent" outlined dense></q-select>
                    </div>
                </div>

                <div class="company-add__content-info">
                    <div class="content__title" style="font-weight: 700 !important; font-size: 16px;">Company Type</div>
                    <div class="content__title-sub">Choose what type of account are you creating.</div>
                    <div class="content__radio-grid">
                        <div class="content__radio">
                            <q-item tag="label" v-ripple dense>
                                <q-item-section avatar top dense>
                                    <q-radio v-model="radio_private" color="primary" dense/>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label class="content__radio-title">Private</q-item-label>
                                    <q-item-label class="content__radio-details" caption>
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, sint consequatur eveniet laudantium in laboriosam quas, nostrum magni quaerat, id eligendi totam nesciunt natus doloribus nemo nam. Porro, vel quis!
                                    </q-item-label>
                                </q-item-section>
                            </q-item>
                        </div>
                        <div class="content__radio">
                            <q-item tag="label" v-ripple>
                                <q-item-section avatar top dense>
                                    <q-radio v-model="radio_public" color="primary" dense/>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label class="content__radio-title">Public</q-item-label>
                                    <q-item-label class="content__radio-details" caption>
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, sint consequatur eveniet laudantium in laboriosam quas, nostrum magni quaerat, id eligendi totam nesciunt natus doloribus nemo nam. Porro, vel quis!
                                    </q-item-label>
                                </q-item-section>
                            </q-item>
                        </div>
                    </div>
                </div>

                <div class="company-add__btn">
                    <q-btn class="btn-save btn-primary" flat dense no-caps label="Save"></q-btn>
                </div>
            </div>
        </div>
</template>

<script>
import "./CompanyManagement.scss";

export default {
    data: () =>
    ({
        radio_private: '',
        radio_public: '',
        input_company_name: '',
        input_location: '',
        select_parent: '',
        options_parent: [
            'Parent'
        ],
    })
}
</script>
