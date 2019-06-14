<template>
  <input class="form-input" :type="inputType" :value="model" @input="$emit('changeval', $event)">
</template>

<script>
export default {
  name: 'input-element',
  props: ['model', 'inputType']
}
</script>

<style lang="scss" scoped>

</style>
