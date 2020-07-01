<template>
    <q-layout class="main" view="hHh Lpr lFf">
        <q-header>
            <q-toolbar>
                <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" />

                <q-img src="../assets/vcop-logo-white.svg"></q-img>

                <q-btn @click="$router.push('/synchronization')" flat dense rounded icon="mdi-cloud-upload" size="13px" :ripple="false" class="btn-nofitication">
                    <div class="notification-indicator" v-if="visitors.length">{{ visitors.length }}</div>
                </q-btn>

                <!-- <q-btn flat dense rounded icon="mdi-bell" size="13px" :ripple="false" class="btn-nofitication">
                    <div class="notification-indicator">1</div>
                </q-btn> -->

                <div class="user-dropdown">
                    <q-img src="https://i.pinimg.com/236x/56/fa/d0/56fad08b25cfbbe315ffe7666ef3a8c0.jpg"></q-img>

                    <q-btn-dropdown :ripple="false" flat>
                        <q-list>
                            <q-item clickable v-close-popup>
                                <q-item-section>
                                    <q-item-label>Coming Soon!</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-btn-dropdown>
                </div>

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
        await this.db.initialize();
        await this.$store.commit('sync/storeVisitors', await this.db.get("visitors"));
        await this.checkQueueSync();
        setInterval(this.checkQueueSync, 1000);
        setInterval(this.getLog, 60000);
        // this.getLog();
    },
    methods:
    {
        async checkQueueSync()
        {
            for (let visitor of this.visitors)
            {
                this.$store.commit('sync/setVisitorAsSyncing', visitor.id);
                await this.sleep();
                await this.db.delete(visitor.id, "visitors");
                this.$store.commit('sync/storeVisitors', await this.db.get("visitors"));
            }
        },
        async sleep()
        {
            return new Promise(resolve => setTimeout(() => resolve(), 1000));
        },
        async getLog()
        {
            let today= new Date()
            let timeToday= (today.getFullYear())+ '-' +(today.getMonth()+1).toString().padStart(2, "0")+'-'+today.getDate().toString().padStart(2, "0")+ " "+ today.getHours().toString().padStart(2, "0")+":"+today.getMinutes().toString().padStart(2, "0");
            
            var formData = new FormData();
            console.log("Asd")
            formData.append("pass", "123456");
            formData.append("startTime", this.lastRequestTime[this.lastRequestTime.length-1].lastRequestTime); // number 123456 is immediately converted to a string "123456"
            formData.append("endTime", timeToday); // number 123456 is immediately converted to a string "123456"
            
            // HTML file input, chosen by user
            // formData.append("userfile", fileInputElement.files[0]);

            // JavaScript file-like object
            // var content = '<a id="a"><b id="b">hey!</b></a>'; // the body of the new file...
            // var blob = new Blob([content], { type: "text/xml"});
            // Access-Control-Allow-Origin: *;
            // formData.append("webmasterfile", blob);

            var request = new XMLHttpRequest();
            request.open("POST", "http://192.168.1.177:8080/newFindRecords");
            request.onreadystatechange = function() {
                if (request.readyState == XMLHttpRequest.DONE) {
                    console.log(JSON.parse(request.responseText));
                }
            }
            request.send(formData);
            await this.db.add(
            {
                lastRequestTime: timeToday
            }, 
            'lastRequestTime');
            this.$store.commit('sync/storeLastRequestTime', await this.db.get("lastRequestTime"));
            console.log(this.lastRequestTime[this.lastRequestTime.length-1].lastRequestTime);
        }

    }
}
</script>
