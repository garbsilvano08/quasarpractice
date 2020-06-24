<template>
   <div>
       <div class="q-pa-md">Hello! <b>{{ $user_info.full_name }}</b></div>
   </div>
</template>

<script>
import { postUserList } from '../../references/url';

export default
{
    data:() =>
    ({

    }),
    mounted()
    {
        this.getUserList();
    },
    methods:
    {
        async getUserList()
        {
            let res = await this.$_post(postUserList);
            console.log(res);
        }
    },
}
</script>