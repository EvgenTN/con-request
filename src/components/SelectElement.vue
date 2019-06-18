<template>
  <select class="form-input" :value="model" @change="$emit('changeval', $event)">
    <option v-for="(opt, i) in selectOptions" :key="i">{{ opt }}</option>
  </select>
</template>

<script>
export default {
  name: 'select-element',
  props: ['model', 'selectOptions']  
  // props: {
  //   model,
  //   selectOptions: Array
  // }
  
}
</script>

<style lang="scss" scoped>

</style>