<template>
  <select class="form-input" v-model="model">
    <option v-for="(opt, i) in selectOptions" :key="i">{{ opt }}</option>
  </select>
</template>

<script>
export default {
  name: 'input-element',
  props: ['model', 'selectOptions']  
  // props: {
  //   model,
  //   selectOptions: Array
  // }
  
}
</script>

<style lang="scss" scoped>

</style>