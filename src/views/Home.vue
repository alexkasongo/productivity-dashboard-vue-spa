<template>
  <div class="home">
    <Dashboard />
    <div class="overlay" v-show="overlayShown">
      <Overlay/>
    </div>
  </div>
</template>

<script>
import Dashboard from '@/components/Dashboard'
import Overlay from '@/components/Overlay'

export default {
  name: 'home',
  components: {
    Dashboard,
    Overlay
  },
  data() {
    return {
      overlayShown: false,
      overlayTimer: null,
    }
  },
  mounted () {
    // Set interval to run show overlay function every 30 mins
    // setInterval duration should be double the animation duratioin to compensate for setTimeOut
    this.overlayTimer = setInterval(()=>{
      this.showOverlay();
    }, 3600000)
    // Overlay function should set interval to hide overlay after x 
  },
  beforeDestroy () {
    this.overlayTimer = null
  },
  methods: {
    // setTimeOut should be same duration as animation
    showOverlay: function () {
      this.overlayShown = true;
      setTimeout(()=>{
        this.overlayShown = false;
      },30000)
    }

  }
}
</script>

<style >
.overlay {
    animation: fadeinout 30s linear forwards;
}

@keyframes fadeinout {
  0% { opacity: 0; }
  25% { opacity: 1; }
  85% { opacity: 1; }
  100% { opacity: 0; }
}
</style>
