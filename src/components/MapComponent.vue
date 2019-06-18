<template>
  <div>
    <div ref="mapContainer" class="map-wrap"></div>
  </div>
</template>

<script>
import L from "leaflet";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "map-component",
  data() {
    return {
      markers: []
    };
  },
  computed: {
    ...mapGetters(["mapInstance"])
  },
  methods: {
    ...mapMutations(["setMapInstance"]),
    ...mapActions(['getAddress']),
    getPosition() {
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      const success = pos => {
        const crd = pos.coords;

        // console.log("Your current position is:");
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        // console.log(`More or less ${crd.accuracy} meters.`);
        const map = L.map(this.$refs.mapContainer, {
          preferCanvas: true
        }).setView([crd.latitude, crd.longitude], 13);

        const mapLayer = L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
        );
        map.addLayer(mapLayer);
        L.marker([crd.latitude, crd.longitude]).addTo(map);
        map.on('click', (e) => {
          // console.log('e', e)
          // console.log('getaddress', this)
          this.getAddress(e.latlng)
            .then(() => this.$router.push('/form'))
        })
      };

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      navigator.geolocation.getCurrentPosition(success, error, options);
    },
    // createMapInstance() {
    //   // console.log('aaaa', this.getCurrentPosition())
    //   const map = L.map(this.$refs.mapContainer, {
    //     preferCanvas: true
    //   }).setView([51.505, -0.09], 13);

    //   const mapLayer = L.tileLayer(
    //     "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    //     {
    //       attribution:
    //         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //     }
    //   );
    //   map.addLayer(mapLayer);
    //   return map;
    // },
    renderMap() {
      // console.log("renderMap", L);
      this.setMapInstance(this.getPosition());
    }
  },
  mounted() {
    this.renderMap();
  },
  beforeDestroy() {
    if (this.mapInstance) {
      this.mapInstance.remove();
      this.setMapInstance(null);
    }
  }
};
</script>

<style lang="scss" scoped>
.map-wrap {
  margin: 20px auto;
  width: 80%;
  height: 600px;
}
</style>
