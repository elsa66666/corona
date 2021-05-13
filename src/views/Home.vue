<template>
  <div class="home" :class="{'light-background': !isDarkMode, 'dark-background': isDarkMode}">
    <Header></Header>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <h4 :class="{'light-text': isDarkMode, 'dark-text': !isDarkMode}"> head 4</h4>
    <button @click="toggleDarkMode">点点</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header'
import store1 from '@/store'
export default {
  name: 'Home',
  components: {
    HelloWorld,
    Header
  },
  computed: {
    isDarkMode () {
      return store1.getters.getIsDarkMode
    }
  },
  methods: {
    toggleDarkMode () {
      store1.commit('toggleDarkMode')
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/colors.scss";
@import "../assets/typography.scss";
.home{
  width: 100%;
  height: 100vh;
}

.light-background {
  background-color: $light-gray;
}

.light-text {
  color: $white;
}

.dark-background {
  background-color: $dark-blue;
}
.dark-text {
  color: $black;
}
</style>
