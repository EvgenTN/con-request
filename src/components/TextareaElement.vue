<template>
  <textarea class="form-input" :value="model" @input="$emit('changeval', $event)"></textarea>
</template>

<script>
export default {
  name: 'textarea-element',
    props: ['model']  
  // props: {
  //   model
  // }
}
</script>

<style lang="scss" scoped>

</style>