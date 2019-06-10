<template>
  <div class="map-page">
    <h1>This is a map page</h1>
    <MapComponent></MapComponent>
  </div>
</template>

<script>
import MapComponent from '@/components/MapComponent'

export default {
  name: 'map-page',
  components: {
    MapComponent
  },
  mounted() {
    this.$store.dispatch('fethcLocations')
  }
}
</script>

<style lang="scss" scoped>

</style>
