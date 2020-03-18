<template>
  <div>
    <div v-for="status in updateState" :key="status.componentKey">
    <span class="content" v-if="status.status === 'online'">
      <h2 class="work">Sites are up</h2>
    </span>
    <span class="content-offline" v-if="status.status === 'offline'">
      <h2 class="work-offline">Sites are down</h2>
    </span>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import Pusher from 'pusher-js'

export default {
    name: 'State',
    data() {
        return {
          componentKey: 0,
        }
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
    created(){
    var pusher = new Pusher('1f1f7b3fb0d8aad224ac', {
      cluster:'eu',
      forceTLS: true,
      authEndpoint: 'https://api-dashboard.incendiaryblue.com/broadcasting/auth',
      auth: {
        headers: {
          'dashboard-auth': "GGhSdPe8WcPFdztwbYabvl2uOTtno"
        }
      }
    })
  
    var channel = pusher.subscribe('private-dashboard');
    channel.bind('UptimeCheckSucceeded', function(data) { 
      this.$store.dispatch('updateState', data);
    },this)
  }
}
</script>

<style scoped>
::selection {
  background-color: salmon;
  color: white;
}

.parallax > use {
  animation: move-forever 12s linear infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
}
.parallax > use:nth-child(2) {
  animation-delay: -2s;
  animation-duration: 5s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 3s;
}

@keyframes move-forever {
  0% {
    transform: translate(-90px, 0%);
  }
  100% {
    transform: translate(85px, 0%);
  }
}
.editorial {
  display: block;
  width: 100%;
  margin: 0;
  padding-top: 8vh;
}

* {
  background-color: #20232a;
  margin: 0;
  overflow: hidden;
}

.content {
  font-family: 'Lato',sans-serif;
  text-align: center;
  background-color: #23272f;
  text-align: center;
  color: #fff;
}
.content {
  font-size: 1em;
  position: relative;
}

.content h1 {
  position: relative;
  margin-top: -1.3em;
  font-weight: 300;
  user-select: none;
  cursor: default;
  position: absolute;
  background-color: #2d55aa;
}

.work {
  background-color: #23272f;
  text-transform: uppercase;
}
.work-offline {
  text-transform: uppercase;
  color: #7f0000;
}

h1 {
  outline: none;
}

@keyframes colorAnimation {
  0% {background-color: #212221;}
  25%{background-color: #1181B2;}
  50%{background-color: #DDEDF4;}
  75%{background-color: #1181B2;}
  100% {background-color: #212221;}
}

/* OFFLINE */

.inner {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  will-change: transform;
  animation: rotator .5s linear infinite;
}

.inner:first-child {
  background-color: rgba(219, 59, 33, 1);
  transform-origin: 50% 100%;
}

.inner:nth-child(2) {
  background-color: rgba(219, 59, 33, 1);
  transform-origin: 50% 0;
}

@keyframes rotator {
  100% {
    transform: rotate(180deg);
  }
}
</style>
