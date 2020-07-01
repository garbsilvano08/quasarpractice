<template>
    <div class="synchronization">
        <div class="synchronization__header">
            HEALTH CLOUD SYNCHRONIZATION (60)
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
                <q-tab name="info" label="User Information (30)" />
                <q-tab name="logs" label="User Logs (30)" />
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
                                <td v-if="visitor.syncing"><q-icon name="mdi-refresh" /> Syncing...</td>
                                <td v-else>Queue</td>
                            </tr>
                        </tbody>
                    </table>
                </q-tab-panel>
                <q-tab-panel name="logs">
                    
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
        }
    },
    async created()
    {
        await this.db.initialize();
    }
}
</script>

<style lang="scss">

</style>