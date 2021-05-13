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
body {
  background: $dark-blue;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $white;
  // background: $dark-blue;
  height: 100vh;
}

h1 {
  @include headings-1;
}

p {
  @include large-text;
}
</style>
