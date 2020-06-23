<template>
   <div> 
       <div>
           <router-view />
       </div>
   </div>
</template>

<script>
import { postLoginUser } from '../references/url';

export default
{
   data:() =>
   ({

   }),
   mounted()
   {
   },
   methods: { },
}
</script>

<style lang="scss">
body {
    background-color: #eee;
    color: #333;
}
</style>