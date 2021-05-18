<template>
  <div id="nav">
    <div class="nav-1" :class="{'nav-light': !isDarkMode, 'nav-dark': isDarkMode}">
      <label class="title1">Corona</label>
      <router-link to="/">Home</router-link>
      <router-link to="/Predict">Predict</router-link>
    </div>
  </div>
</template>

<script>
import store1 from '@/store'

export default {
  name: 'Header',
  computed: {
    isDarkMode () {
      return store1.getters.getIsDarkMode
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/typography";
@import "src/assets/colors";
#nav {

}
.title1 {
  position: absolute;
  left: 30px;
  font-size: 30px;
  margin-right: 20px;
  font-weight: 800;
  color: white;
}
.nav-1 {
  display: flex;
  justify-content: center;
  align-items: center;
  background: $super-dark-blue;
  box-sizing: border-box;
  width: 100%;
  padding: 20px 15%;
  a {
    font-size: 20px;
    margin-right: 50px;
    margin-left: 50px;
    font-weight: 600;
    margin-top: 4px;
  }
}
.nav-light {
  a {
    color: black;
    &.router-link-exact-active {
      color: $middle-blue;
    }
  }
}
.nav-dark {
  a {
    color: $dark-gray;
    &.router-link-exact-active {
      color: $page-highlighted;
    }
  }
}
</style>
