<template>
    <q-layout class="main" view="hHh Lpr lFf">
        <q-header>
            <q-toolbar>
                <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" />

                <q-img src="../assets/vcop-logo-white.svg"></q-img>

                <q-btn @click="$router.push('/synchronization')" flat dense rounded icon="mdi-cloud-upload" size="13px" :ripple="false" class="btn-nofitication">
                    <div class="notification-indicator" v-if="visitors.length">{{ visitors.length + passLogs.length }}</div>
                </q-btn>

                <!-- <q-btn flat dense rounded icon="mdi-bell" size="13px" :ripple="false" class="btn-nofitication">
                    <div class="notification-indicator">1</div>
                </q-btn> -->

            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen"  behavior="mobile" show-if-above bordered overlay content-class="bg-grey-1">
			<!-- <div class="nav-title">MY ACCOUNT</div> -->
			<q-list class="nav-list">
				<template v-for="nav of navigation">
					<q-item class="nav" v-if="!nav.hasOwnProperty('sub')" @click="$router.push({ name: nav.route })" clickable v-ripple :active="$route.name == nav.route">
						<q-item-section avatar>
							<q-icon :name="nav.icon" />
						</q-item-section>
						<q-item-section>{{ nav.label }}</q-item-section>
					</q-item>
					<q-expansion-item group="sidenav" v-if="nav.hasOwnProperty('sub')" expand-separator class="nav" :icon="nav.icon" :label="nav.label">
						<q-card class="nav-sub">
							<div v-for="sub in nav.sub" class="nav-item" :class="$route.name == sub.route ? 'active' : ''" @click="$router.push({ name: sub.route })">{{ sub.label }}</div>
						</q-card>
					</q-expansion-item>
				</template>
			</q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>
<script>
import EssentialLink    from 'components/EssentialLink.vue'
import Layout           from './MemberLayout.scss'
import navigation       from '../references/nav'
import Model from "../models/Model";

export default
{
    name: 'MemberLayout',
    components:
    {
        EssentialLink
    },
	data: () =>
	({
		package_data: { version: '0.0.0' },
		leftDrawerOpen: false,
        navigation: [],
        db: new Model()
    }),
    computed:
    {
        visitors()
        {
            return this.$store.state.sync.visitors;
        },
        lastRequestTime()
        {
            return this.$store.state.sync.lastRequestTime;
        },
        passLogs()
        {
            return this.$store.state.sync.passLogs;
        }
    },
    mounted()
    {
        if(!this.$user_info)
        {
            this.$router.push({ name: 'front_login' });
        }

        this.navigation = navigation;
    },
    async created()
    {
        // Edward
        await this.db.initialize();
        await this.$store.commit('sync/storeVisitors', await this.db.get("visitors"));
        await this.$store.commit('sync/storeLastRequestTime', await this.db.get("lastRequestTime"));
        await this.checkQueueSync();

        // Irish
        await this.getLog();
        setInterval(this.getLog, 60000);
    },
    methods:
    {
        async checkQueueSync()
        {
            // Info
            for (let visitor of this.visitors)
            {
                await this.$_post('member/add/visitor', visitor);
                await this.db.delete(visitor.id, "visitors");
                this.$store.commit('sync/storeVisitors', await this.db.get("visitors"));
            }

            // Logs
            for (let log of this.passLogs)
            {
                await this.$_post('member/add/pass_log', { data: log });
                await this.db.delete(log.id, "passLogs");
                this.$store.commit('sync/storePassLogs', await this.db.get("passLogs"));
            }

            setTimeout(() => this.checkQueueSync(), 1000);
        },
        async getLog()
        {
            let today= new Date()
            let timeToday= (today.getFullYear())+ '-' +(today.getMonth()+1).toString().padStart(2, "0")+'-'+today.getDate().toString().padStart(2, "0")+ " "+ today.getHours().toString().padStart(2, "0")+":"+today.getMinutes().toString().padStart(2, "0");
            let startTime= "";
            var formData = new FormData();
            if(this.$store.state.sync.lastRequestTime.length<=0){
                startTime = (today.getFullYear()-1)+ '-' +(today.getMonth()+1).toString().padStart(2, "0")+'-'+today.getDate().toString().padStart(2, "0")+ " "+ today.getHours().toString().padStart(2, "0")+":"+today.getMinutes().toString().padStart(2, "0");
            }
            else {
                startTime = this.lastRequestTime[this.lastRequestTime.length-1].lastRequestTime; 
            }

            formData.append("pass", "123456");
            formData.append("startTime", startTime)// number 123456 is immediately converted to a string "123456"
            formData.append("endTime", timeToday); // number 123456 is immediately converted to a string "123456"
            let logs= [];
            var request = new XMLHttpRequest();
            request.open("POST", "http://192.168.1.177:8080/newFindRecords");
            request.onreadystatechange = () => {
                if (request.readyState == XMLHttpRequest.DONE) {
                    let resp = request.responseText;
                    // console.log(JSON.parse(resp).data);
                    // resp = resp.replace(/{"data":"/, "")
                    // resp = resp.replace(/","result":1,"success":true}/, "")
                    // console.log(resp);
                    // console.log(JSON.parse(JSON.parse(resp).data));
                    // logs = JSON.parse(JSON.parse(resp).data);
                    this.saveLogsIndexDb(JSON.parse(JSON.parse(resp).data));
                    // this.saveLogIndex(JSON.parse(JSON.parse(resp).data));
                }
            }
            // console.log("logia",logs)
            request.send(formData);
            
            await this.db.add(
            {
                lastRequestTime: timeToday
            },
            'lastRequestTime');
            this.$store.commit('sync/storeLastRequestTime', await this.db.get("lastRequestTime"));
        },
        async saveLogsIndexDb(dat)
        {
            for (let data of dat)
            {
                await this.db.add(data, "passLogs");
            }

            this.$store.commit('sync/storePassLogs', await this.db.get("passLogs"));
        }
    }
}
</script>
