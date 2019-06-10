<template>
  <div>
    <div ref="mapContainer" class="map-wrap"></div>
  </div>
</template>

<script>
import L from "leaflet";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "map-component",
  data() {
    return {
      markers: []
    };
  },
  computed: {
    ...mapGetters(["mapInstance", "locations"])
  },
  methods: {
    ...mapMutations(["setMapInstance"]),
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
        // const sss = new Promise(resolve => crd)
        // console.log('sss', sss);
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
        L.marker([47.8342018, 35.1099049]).addTo(map);
        // console.log('latlng', map.)
        map.on('click', function(e) {
          console.log('e', e)
          this.$store.dispatch('getAddress', e.latlng)
        })
        // this.posit = crd
        // return crd
      };

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      // console.log('nav', navigator.geolocation.getCurrentPosition(pos => pos.coords))
      navigator.geolocation.getCurrentPosition(success, error);
      // console.log('posit', this.posit)
    },
    // getCurrentPosition() {
    //   const pos = this.getPosition();
    //   // console.log("if", this.getPosition());

    //   if (pos) {
    //     return [pos.latitude, pos.longitude];
    //   } else return [51.505, -0.09];
    // },
    createMapInstance() {
      // console.log('aaaa', this.getCurrentPosition())
      const map = L.map(this.$refs.mapContainer, {
        preferCanvas: true
      }).setView([51.505, -0.09], 13);

      const mapLayer = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
      );
      map.addLayer(mapLayer);
      return map;
    },
    renderMap() {
      console.log("renderMap", L);
      this.setMapInstance(this.getPosition());
    },
    removeMarkers() {
      if (this.mapInstance) {
        for (const marker of this.markers) {
          this.mapInstance.removeLayer(marker);
        }
      }
    },
    addMarkers() {
      if (this.mapInstance) {
        for (const loc of this.locations) {
          if (loc.lan && loc.lon) {
            const marker = L.marker(new L.LatLng(loc.lan, loc.lon), {
              title: loc.title
            });
            this.mapInstance.addLayer(marker);
            this.markers.push(marker);
          }
        }
      }
    },
    fitAllMarkers() {
      if (this.mapInstance && this.markers.length) {
        const group = L.featureGroup(this.markers);
        this.mapInstance.fitBounds(group.getBounds());
      }
    },
    // addMark() {
    //   L.marker([47.8342018, 35.1099049]).addTo(map);
    // }
  },
  watch: {
    locations(inTo, inFrom) {
      console.log(inTo, inFrom);
      this.removeMarkers();
      this.addMarkers();
      this.fitAllMarkers();
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
