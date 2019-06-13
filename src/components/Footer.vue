<template>
  <div class="footer">
    <hr class="h-line">
    <div class="main-info">
      <span>
        &copy; {{ new Date().getFullYear() }} - UserNet -
        <a class="link" href="https://www.userside.eu" target="_blank">https://www.userside.eu</a>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  max-width: 1170px;
  padding: 15px;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}
.main-info {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 58px;
}
.h-line {
  height: 3px;
  width: 1170px;
  border-top: 3px solid red;
  color: black;
  background-color: black;
  margin: 0 auto;
}
.link {
  text-decoration: none;
  color: #1976D2;
}
</style>