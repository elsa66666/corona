<template>
  <div id="nav">
    <router-link to="/" class="router1">Home</router-link>
    <router-link to="/about" class="router1">About</router-link>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped lang="scss">
@import "src/assets/typography";
@import "src/assets/colors";
.router1 {
  color: $green;
  font-size: x-large;
  margin-right: 20px;
}
</style>
