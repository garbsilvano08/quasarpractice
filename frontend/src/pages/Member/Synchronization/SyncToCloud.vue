<template>
    <div class="synchronization">
        <div class="header__title">HEALTH CLOUD SYNCHRONIZATION <span>(60)</span></div>

        <q-tabs
            v-model="sync_tab"
            dense
            class="full-width"
            indicator-color="primary"
            align="justify"
            no-caps
            inline-label
        >
            <q-tab active name="user_info" icon="mdi-card-account-details" label="User Information"></q-tab>
            <q-tab name="user_logs" icon="mdi-clock" label="User Logs"></q-tab>
        </q-tabs>
        <q-tab-panels v-model="sync_tab" animated>
            <q-tab-panel name="user_info">
                <div class="content__table">
                    <table>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="td-active">1A2B3CDE</td>
                                <td class="td-active">Adda M. Hope</td>
                                <td class="td-active"><q-icon size="20px" name="mdi-sync"></q-icon> Syncing...</td>
                            </tr>
                            <tr>
                                <td>1A2B3CDE</td>
                                <td>Adda M. Hope</td>
                                <td>Queue</td>
                            </tr>
                            <tr>
                                <td>1A2B3CDE</td>
                                <td>Adda M. Hope</td>
                                <td>Queue</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </q-tab-panel>
            <q-tab-panel name="user_logs">
                <div class="content__table">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Last Scanned</th>
                                <th>Body Temperature</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="td-active">Adda M. Hope</td>
                                <td class="td-active">6/24/2020 8:00 AM</td>
                                <td class="td-active">36.5°C</td>
                                <td class="td-active"><q-icon size="20px" name="mdi-sync"></q-icon> Syncing...</td>
                            </tr>
                            <tr>
                                <td>Adda M. Hope</td>
                                <td>6/24/2020 8:00 AM</td>
                                <td>36.5°C</td>
                                <td>Queue</td>
                            </tr>
                            <tr>
                                <td>Adda M. Hope</td>
                                <td>6/24/2020 8:00 AM</td>
                                <td>36.5°C</td>
                                <td>Queue</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </q-tab-panel>
        </q-tab-panels>
    </div>
</template>

<script>
import './Synchronization.scss';

export default {
    data: () => ({
        sync_tab: 'user_info'
    })
}
</script>
