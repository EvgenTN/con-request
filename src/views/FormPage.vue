<template>
  <div>
    <div class="main-div">
      <div class="arrow-left"></div>
      <router-link class="r-link" to="/">Назад</router-link>
    </div>
    <Form></Form>
  </div>
</template>

<script>
import Form from "@/components/Form";

export default {
  components: {
    Form
  }
};
</script>

<style lang="scss" scoped>
.main-div {
  display: flex;
  justify-content: center;
  align-items: center;
}
.arrow-left {
  width: 1px;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 8px solid #4c98e4;
  margin-right: 5px;
}
.r-link {
  text-decoration: none;
  color: black;
}
</style>
