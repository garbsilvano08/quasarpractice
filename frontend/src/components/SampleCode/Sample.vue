<template>
    <div class="q-mt-xl q-pa-lg">
        <div class="text-center fz-14">Sample Data
            <div>
                
            </div>
        </div>

    </div>
</template>

<script>
import { postLoginUser } from '../../references/url';

	export default{
		data:() =>({
		}),
		mounted(){
			
		},
		methods:{
			async findUser(){
				this.$q.loading.show();
				await this.$axios.post(postLoginUser, this.form_data);
				this.$q.loading.hide();

				this.$emit('success');
			}
		}
	}
</script>