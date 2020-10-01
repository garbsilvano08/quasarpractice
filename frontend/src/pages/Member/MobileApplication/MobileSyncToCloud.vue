<template>
    <div class="frontdesk">
        <div class="frontdesk__container">
                <div class="content__grid">
                    <div class="frontdesk__content">
                        <div class="header__title">Health Cloud Synchronization</div>
                            <div class="table-container">
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
                                            <tr class="syncing">
                                                <td>0974812374123</td>
                                                <td>Juan Dela Cruz</td>
                                                <td class="background_primary"><q-icon class="loader-2" name="fas fa-sync-alt"/> Syncing </td>
                                            </tr>
                                            <tr>
                                                <td class="background_disable">0974812374123</td>
                                                <td class="background_disable">Juan Dela Cruz</td>
                                                <td class="background_disable">In Queue</td>
                                            </tr>
                                            <tr>
                                                <td class="background_disable">0974812374123</td>
                                                <td class="background_disable">Juan Dela Cruz</td>
                                                <td class="background_disable">In Queue</td>
                                            </tr>
                                            <tr>
                                                <td class="background_disable">0974812374123</td>
                                                <td class="background_disable">Juan Dela Cruz</td>
                                                <td class="background_disable">In Queue</td>
                                            </tr>
                                            <tr>
                                                <td class="background_disable">0974812374123</td>
                                                <td class="background_disable">Juan Dela Cruz</td>
                                                <td class="background_disable">In Queue</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "./MobileSyncToCloud.scss";
// Classes
import OpticalReadClass from '../../../classes/OpticalReadClass';
import { postGetDevice } from '../../../references/url';
import { log } from 'util';
import {base64StringToBlob} from 'blob-util';

export default {
    data:() =>
    ({  
        
    }),
    watch:
    {

    },
    async mounted()
    {
        
    },
    methods:
    {
        
    },
}
</script>
