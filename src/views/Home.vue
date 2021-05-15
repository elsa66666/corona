<template>
  <div class="home" :class="{'light-background': !isDarkMode, 'dark-background': isDarkMode}">
    <el-container class="top-switch-container">
      <theme-switch class="top-switch"></theme-switch>
    </el-container>

    <el-container class="search-container">
      <label class="search-label"
             :class="{'search-label-light': isDarkMode, 'search-label-dark': !isDarkMode}">search your Country or district</label>
      <el-input class="el-input1"
        placeholder="China"
        prefix-icon="el-icon-search"
        v-model="searchDistrict">
      </el-input>
    </el-container>
    <div class="cards">
        <div class="card1" :class="{'light-card': !isDarkMode, 'dark-card': isDarkMode}" ></div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import store1 from '@/store'
import 'animate.css'
import ThemeSwitch from '@/components/ThemeSwitch'
export default {
  name: 'Home',
  components: {
    ThemeSwitch
  },
  data () {
    return {
      show1: false,
      searchDistrict: ''
    }
  },
  mounted () {
    this.show1 = true
  },
  computed: {
    isDarkMode () {
      return store1.getters.getIsDarkMode
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
.top-switch-container {
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  .top-switch {
    margin-right: 10px;
  }
}
.search-container {
  width: 50% * 0.9;
  margin-left: 55%*0.05;
  margin-bottom: 20px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  // background-color: #7b42f6;
  .search-label {
    width: 100%;
    // background-color: black;
    text-align: center;
    font-weight: 500;
    opacity: 0.6;
    margin-bottom: 20px;
  }
}
.search-label-light {
  color: #cbcdcf;
}
.search-label-dark {
  color: #404965;
}
.el-input1{

}
.cards {
  width: 50%;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  // background: white;
}
.card1 {
  width: 90%;
  height: 300px;
  background: #7b42f6;
  border-radius: 20px;
}
.light-card {
  background: $white;
  box-shadow: 5px 5px 18px rgba(0,0,0,0.15);
  &:hover {
    box-shadow: 8px 8px 18px rgba(0,0,0,0.25);
  }
}
.dark-card {
  background: $super-dark-blue;
  box-shadow: 5px 5px 18px rgba(255,255,255,0.15);
  &:hover {
    box-shadow: 8px 8px 18px rgba(255,255,255,0.25);
  }
}
</style>
