<template>
  <div ref="mapContainer" class="map-wrap"></div>
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
    createMapInstance() {
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
      this.setMapInstance(this.createMapInstance());
    },
    removeMarkers() {
      if (this.mapInstance) {
        for (const marker of this.markers) {
          this.mapInstance.removeLayer(marker)
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
        const group = L.featureGroup(this.markers)
        this.mapInstance.fitBounds(group.getBounds())
      }
    }
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
