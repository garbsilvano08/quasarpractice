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
import { postPersonByCateg }                         from '../../../references/url';
export default 
{
    name: 'Heatmap',
    data: () => 
    ({
        points: null
    }),
    async created()
    {
        let { data: visitors } = await this.$_post(postPersonByCateg, {find_by_category: {has_fever: true}});
        this.points = visitors.filter(visitor => visitor && visitor.location_coordinates).map(visitor =>
        {
            let coordinates = visitor.location_coordinates;
            return { lat: coordinates.lat, lng: coordinates.lon };
        });
    }
}
</script>