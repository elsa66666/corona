<template>
  <div @click="toggleDarkMode" class="toggle"
        :class="{'light-toggle': !isDarkMode, 'dark-toggle':isDarkMode}">
    <div class="toggle-switch"
         :class="{'toggle-left' : !isDarkMode, 'toggle-right': isDarkMode}">
      <img v-if="!isDarkMode" class="img-class" src="../assets/sun.png" />
      <img  v-if="isDarkMode" class="img-class" src="../assets/moon.png" />
    </div>
  </div>
</template>

<script>
import store1 from '@/store'

export default {
  name: 'ThemeSwitch',
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

.img-class {
  width: 20px;
  height: 20px;
}
.toggle {
  border-radius: 10px;
  width: 120px;
  box-sizing: border-box;
  display: flex;
}

.light-toggle {
  background: linear-gradient(346.78deg, #f7fcfc 0%, #fafcfa 100%);
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: inset 0px 5px 10px rgba(0, 0, 0, 0.1);
}
.dark-toggle {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: inset 0px 5px 10px rgba(255, 255, 255, 0.1);
}
.toggle-switch {
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
  margin: 2px;
  padding: 7.5px 17.5px;  //上下，左右
}
.toggle-left {
  background: #ffffff;
  transform: translateX(0);  //滑到左边
}
.toggle-right {
  background: #1b233f;
  transform: translateX(107%);  //滑到右边
}
</style>
