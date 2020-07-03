<template>
    <div class="synchronization">
        <div class="synchronization__header">
            HEALTH CLOUD SYNCHRONIZATION ({{ visitors.length + passLogs.length }})
        </div>
        <div class="synchronization__body">
            <q-tabs
                v-model="tab"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                narrow-indicator
            >
                <q-tab name="info" :label="'User Information ('+visitors.length+')'" />
                <q-tab name="logs" :label="'User Logs ('+passLogs.length+')'" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="info">
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
                </q-tab-panel>

                <q-tab-panel name="logs">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>temparature</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(log, index) in passLogs" :key="index">
                                <td>{{ log.idCardNum }}</td>
                                <td>{{ log.name }}</td>
                                <td>{{ log.tempratrue }}</td>
                                <!-- <td v-if="visitor.syncing"><q-icon name="mdi-refresh" /> Syncing...</td>
                                <td v-else>Queue</td> -->
                            </tr>
                        </tbody>
                    </table>
                </q-tab-panel>
            </q-tab-panels>



        </div>
    </div>
</template>

<script>
import Model from "../../../models/Model";
import './Synchronization.scss';

export default
{
    name: 'Synchronization',
    data: () => (
    {
        tab: 'info',
        db: new Model()
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
}
</script>

<style lang="scss">

</style>
