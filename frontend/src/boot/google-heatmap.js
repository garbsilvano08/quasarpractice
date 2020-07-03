import VueGoogleHeatmap from 'vue-google-heatmap';

export default async ({ Vue }) => {
  Vue.use(VueGoogleHeatmap, {
    apiKey: 'AIzaSyCWBcZojNr1NhANQB2Wjm7h0Iilih1OTzg'
  });
}
