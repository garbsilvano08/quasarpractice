<template>
    <div class="synchronization">
        <div class="header__title">HEALTH CLOUD SYNCHRONIZATION <span>({{ visitors.length + passLogs.length }})</span></div>

        <q-tabs
            v-model="sync_tab"
            dense
            class="full-width"
            indicator-color="primary"
            align="justify"
            no-caps
            inline-label
        >
            <q-tab active name="user_info" icon="mdi-card-account-details" :label="'User Information ('+visitors.length+')'"></q-tab>
            <q-tab name="user_logs" icon="mdi-clock" :label="'User Logs ('+passLogs.length+')'"></q-tab>
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
                            <tr v-for="(visitor, index) in visitors" :key="index">
                                <td>{{ visitor.id }}</td>
                                <td>{{ visitor.personal_information.first_name }} {{ visitor.personal_information.middle_name }} {{ visitor.personal_information.last_name }}</td>
                                <td v-if="index === 0"><q-icon name="mdi-refresh" /> Syncing...</td>
                                <td v-else>Queue</td>
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
                            <tr v-for="(log, index) in passLogs" :key="index">
                                <td>{{ log.name }}</td>
                                <td>{{ convertToDate(log.currentTime) }}</td>
                                <td>{{ log.tempratrue }}</td>
                                <td v-if="index === 0"><q-icon name="mdi-refresh" /> Syncing...</td>
                                <td v-else>Queue</td>
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
import Model from "../../../models/Model";

export default {
    data: () => ({
        sync_tab: 'user_info',
        db: new Model(),
        d : new Date(0),
    }),
    computed:
    {
        visitors()
        {
            return this.$store.state.sync.visitors;
        },
        passLogs()
        {
            return this.$store.state.sync.passLogs;
        }
    },
    async created()
    {
        await this.db.initialize();
    },
    methods:
    {
        convertToDate(timestamp){
            let date = new Date(timestamp);
            return date.getDate().toString().padStart(2, "0")+'-'+(date.getMonth()+1).toString().padStart(2, "0")+ '-' +date.getFullYear();
        }
    }

}
</script>
