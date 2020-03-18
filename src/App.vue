<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view/>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {

  },
  data() {
    return {
      componentKey: 0,
    }
  },
  mounted() {
    axios.post("https://api-dashboard.incendiaryblue.com/api")
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;  
    },
  },
  
  computed: {
    stateChange() {
      return this.$store.getters.stateChange;
    },
    ...mapGetters({
      updateState: "stateChange"
    })
  },
  
};
</script>

<style lang="scss">
*,
*::before,
*::after {
    box-sizing: inherit;
}
html {
  height: 100%;
  font-size: 82.5%;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 
  "Segoe UI", Roboto, "Noto Sans", Ubuntu, Cantarell, 
  "Helvetica Neue", sans-serif, "Apple Color Emoji", 
  "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-weight: 400;
  line-height: 1.7;
  overflow-y: auto;
  scroll-behavior: smooth;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  -o-font-smoothing: antialiased;
  color: #fff;
}

#app {
  background-color: #0c1221;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

p, h1, h2, h3, h4, h5, h6 {
  margin: 0;
}

@media (max-width : 1824px) {
  body {
    font-size: 95%;
  }
}

</style>
