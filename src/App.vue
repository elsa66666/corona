<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import store1 from '@/store'
export default {
  name: 'App',
  mounted () {
    const isDarkMode = store1.getters.getIsDarkMode
    document.body.style.background = isDarkMode ? '#212c4f' : '#f0f3f5'
  }
}
</script>

<style lang="scss">
@import "src/assets/colors.scss";
@import "src/assets/typography.scss";
@import "~animate.css";
* {
  transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}
body {
  background: $dark-blue;
  margin: 0;
}
line {
  stroke: $dark-gray;
  opacity: 0.4;
}
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $page-highlighted;
  // background: $dark-blue;
  height: 200vh;
}

h1 {
  @include headings-1;
}

p {
  @include large-text;
}
a {
  text-decoration: none;
}
// theme
.light-background {
  background-color: $light-gray;
}

.light-text {
  color: $page-highlighted;
}

.dark-background {
  background-color: $dark-blue;
}
.dark-text {
  color: $black;
}
</style>
