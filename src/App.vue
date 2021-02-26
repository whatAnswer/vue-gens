<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  mounted() {
    this.resize();
    window.onresize = this.resize;
  },
  methods: {
    resize() {
      var htmlEle = document.documentElement;
      var htmlWidth = window.innerWidth && window.innerWidth
      || document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth;
      htmlEle.style.fontSize = (21.25 / 750) * htmlWidth + 'px';
    }
  }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
}
html, body{
    margin: 0;
    padding: 0;
    background-color: #ffffff;
    tap-highlight-color:rgba(0,0,0,0);
    -webkit-tap-highlight-color:rgba(0,0,0,0);
}
</style>
