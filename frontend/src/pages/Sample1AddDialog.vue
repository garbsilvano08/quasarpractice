<template>
      <q-card style="width: 600px">
	    <q-bar class="bg-primary text-white q-pa-lg">
	      <q-icon class="q-mr-sm" name='fa fa-heart'></q-icon>
	      <b>Add New User</b>
	      <q-space />
	      <q-btn dense flat icon='close' v-close-popup><q-tooltip content-class='bg-white text-primary'>Close</q-tooltip></q-btn>
	    </q-bar>
	    <!-- content -->
	    <q-card-section class='content'>
	    	<q-form @submit="saveUser()">
		       <div class="field">
		       		<label>Full Name</label>
		       		<div><q-input v-model="form_data.fullname" placeholder="Enter Full Name" outlined dense></q-input></div>
		       </div>

		       <div class="field q-mt-md">
		       		<label>Username</label>
		       		<div><q-input v-model="form_data.username" placeholder="Enter Username" outlined dense></q-input></div>
		       </div>

		        <div class="field q-mt-md">
		       		<label>Password</label>
		       		<div><q-input v-model="form_data.password" type="password" placeholder="Enter Password" outlined dense></q-input></div>
		       </div>
		       <div class="q-mt-lg"><q-btn type="submit" color="primary" unelevated class="full-width">Save</q-btn></div>
		       <div class="q-mt-sm"><q-btn type="button" v-close-popup color="primary" outline class="full-width">Cancel</q-btn></div>
	   		</q-form>
	    </q-card-section>
  	</q-card>
</template>

<script>
import { postRegisterUser }  from '../references/url';

	export default{
		data:() =>({
		  form_data: {
	          fullname: 'asdasd',
	          username: 'asdasd',
	          password: 'asds',
        	},
		}),
		mounted(){
			
		},
		methods:{
			async saveUser(){
				this.$q.loading.show();
				await this.$axios.post(postRegisterUser, this.form_data);
				this.$q.loading.hide();

				this.$emit('success');
			}
		}
	}
</script>