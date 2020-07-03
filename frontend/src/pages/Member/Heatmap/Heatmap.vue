<template>
    <div class="heatmap">
        <vue-google-heatmap v-if="points" :points="points"
                        :lat="points[0].lat"
                        :lng="points[0].lng"
                      :width="'100%'"
                      :height="'calc(100vh - 60px)'" />
    </div>
</template>

<script>
export default 
{
    name: 'Heatmap',
    data: () => 
    ({
        points: null
    }),
    async created()
    {
        let { data: visitors } = await this.$_post('member/get/visitors');
        this.points = visitors.filter(visitor => visitor && visitor.personal_information && visitor.personal_information.location_coordinates).map(visitor =>
        {
            let coordinates = visitor.personal_information.location_coordinates;
            return { lat: coordinates.lat, lng: coordinates.lon };
        });
        console.log(this.points);
    }
}
</script>