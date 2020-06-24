<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default
{
    name: 'App',
    mounted()
    {
        if(localStorage.getItem("auth"))
        {
            console.log("auth: ", localStorage.getItem("auth"));
            this.$store.commit('user/updateUser', JSON.parse(localStorage.getItem("auth")));
        }
    }
}
</script>
