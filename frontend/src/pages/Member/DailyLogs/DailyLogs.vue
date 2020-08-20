<template>
    <div class="daily-logs">
        <div class="daily-logs__header">
            <div class="header__title">DAILY LOGS</div>
            <div class="header__filter">
                <!-- <q-select class="select-lg" v-model="select__id_type" :options="options_company" outlined dense></q-select> -->
                <com-picker class="btn-choose"></com-picker>
                <q-btn class="btn-outline btn-export" flat dense no-caps>
                    Export &nbsp;<q-icon name="mdi-export"></q-icon>
                </q-btn>
            </div>
        </div>

        <div class="daily-logs__content">
            <div class="content__filter-1">
                <div class="content__filter-item">
                    <div class="content__filter-label">Account Type</div>
                    <q-select v-model="select__account_type" :options="options_account_type" outlined dense></q-select>
                </div>
                <div class="content__filter-item">
                    <div class="content__filter-label">Date from</div>
                    <q-input type='date' v-model="select__date" outlined dense></q-input>
                </div>
                <div class="content__filter-item">
                    <div class="content__filter-label">Date to</div>
                    <q-input type='date' v-model="select__date" outlined dense></q-input>
                </div>
                <div class="content__filter-item">
                    <div class="content__filter-label">Time from</div>
                    <q-input type='time' v-model="select__date" outlined dense></q-input>
                </div>
                <div class="content__filter-item">
                    <div class="content__filter-label">Time to</div>
                    <q-input type='time' v-model="select__date" outlined dense></q-input>
                </div>
                <div class="content__filter-item">
                    <div class="content__filter-label">Device Name</div>
                    <q-select v-model="select__device_name" :options="options_device_name" outlined dense></q-select>
                </div>
                <div class="content__filter-item">
                    <div class="content__filter-label">Tagged to</div>
                    <q-select v-model="select__tagged_to" :options="options_tagged_to" outlined dense></q-select>
                </div>
                <div class="content__filter-item">
                    <div class="content__filter-label">Body Temperature</div>
                    <q-select v-model="select__body_temperature" :options="options_body_temperature" outlined dense></q-select>
                </div>
                <div class="content__filter-item">
                    <q-btn class="btn-primary btn-generate" flat dense no-caps>
                        Generate
                    </q-btn>
                </div>



            </div>
            <div class="content__filter-2">
                <div class="content__filter-item">
                    <q-btn-dropdown class="btn-dropdown__primary" label="Sort By" flat dense no-caps>
                        <q-list>
                            <q-item clickable v-close-popup>
                                <q-item-section>
                                    <q-radio dense label="Ascending" />
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup>
                                <q-item-section>
                                    <q-radio dense label="Descending" />
                                </q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item clickable v-close-popup>
                                <q-item-section>
                                    <q-checkbox v-model="checkbox_date_saved" dense label="Date Saved" />
                                </q-item-section>
                            </q-item>
                             <q-item clickable v-close-popup>
                                <q-item-section>
                                    <q-checkbox v-model="checkbox_name" dense label="Name" />
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup>
                                <q-item-section>
                                    <q-checkbox v-model="checkbox_temperature" dense label="Temperature" />
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-btn-dropdown>
                </div>

                <div class="content__filter-people content__filter-item">
                    <q-input outlined dense v-model="input__people" class="search-people" placeholder="Search People...">
                        <template v-slot:append>
                            <q-icon name="mdi-magnify" />
                        </template>
                    </q-input>
                </div>
            </div>
            <div class="content__view">
                <div class="content__view-item">
                    <div class="content__view-label">All</div>
                </div>
                <div class="content__view-item">
                    <div class="content__view-color color-violet"></div>
                    <div class="content__view-label">Staff (1)</div>
                </div>
                <div class="content__view-item">
                    <div class="content__view-color color-orange"></div>
                    <div class="content__view-label">Visitor (1)</div>
                </div>
                <div class="content__view-item">
                    <div class="content__view-color color-red"></div>
                    <div class="content__view-label">Stranger (1)</div>
                </div>
            </div>

            <div class="daily-logs__content-body content__grid-4x4">
                <DailyLogCards></DailyLogCards>
                <DailyLogCards></DailyLogCards>
                <DailyLogCards></DailyLogCards>
                <DailyLogCards></DailyLogCards>
            </div>
        </div>
    </div>
</template>

<script>
import "./DailyLogs.scss";

// Components
import DailyLogCards from "components/DailyLogCards/DailyLogCards"
import  ComPicker from "../../../components/companyPicker/ComPicker"

export default {
    components: {
        DailyLogCards,
        ComPicker
    },
    data: () => ({
        select__account_type: '',
        options_account_type: [
            'All'
        ],
        select__device_name: '',
        options_device_name: [
            'All'
        ],
        select__tagged_to: '',
        options_tagged_to: [
            'All'
        ],
        select__body_temperature: '',
        options_body_temperature: [
            'Normal', 'Fever', 'Custom Temperature'
        ],
        checkbox_date_saved: '',
        checkbox_name: '',
        checkbox_temperature: ''

    }),
}
</script>
