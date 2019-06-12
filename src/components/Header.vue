<template>
  <div>
    <div id="nav">
      <router-link to="/">Map</router-link> |
      <router-link to="/form">Form</router-link>
    </div>
    <h1>{{ company_name }}</h1>
    <p>Заявка на подключение к интернет</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      company_name: "UserNet"
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
