<template>
   <div class="flex flex-center">
       <q-spinner></q-spinner>
   </div>
</template>

<script>
export default
{
   data:() =>
   ({
   }),
   mounted()
   {
       this.$_logout();
       this.$router.push({ name: 'front_login' });
   },
   methods:
   {
   },
}
</script>