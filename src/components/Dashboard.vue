<template>
    

  <div class="dashboard">
      
    <div class="grid-container">
        <div class="sentry grid--content">
          <Sentry />
        </div>
        <div class="sentry2 grid--content">
          <Issue />
        </div>
        <div class="spotify grid--content">
          <Merge />
        </div>
        <div class="clock grid--content">
          <Clock />
        </div>
        <div class="instagram1 grid--content">
          <Instagrams />
        </div>

        <div class="weather grid--content">
          <Push />
        </div>
        <div class="gitlab2 grid--content">
          <Pipeline />
        </div>
      </div>

    </div>

</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

import Instagrams from '@/components/Instagrams'
import Weather from '@/components/Weather'
import Sentry from '@/components/Sentry'
import Pipeline from '@/components/Pipeline'
import Issue from '@/components/Issue'
import Clock from '@/components/Clock'
import State from '@/components/State'
import Merge from '@/components/Merge'
import Push from '@/components/Push'
import Hero from '@/components/Hero'

export default {
    name:'Dashboard',
    components: {
        Instagrams,
        Weather,
        Sentry,
        Pipeline,
        Issue,
        Clock,
        State,
        Merge,
        Push,
        Hero
    },
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
}
</script>

<style scoped>
 .dashboard {
  z-index: 9999;
 }

 @keyframes colorAnimation {
  0% {background-color: #212221;}
  25%{background-color: #1181B2;}
  50%{background-color: #DDEDF4;}
  75%{background-color: #1181B2;}
  100% {background-color: #212221;}
}

.grid-container * { 
 position: relative;
}

.grid-container *:after { 
 position: absolute;
 top: 0;
 left: 0;
}

.grid-container {
  height: 100vh; 
  width: 100vw; 
  padding: .6rem .6rem 0 .6rem;
  display: grid;
  grid-template-columns: repeat(4, minmax(10rem, 1fr));
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: .6rem;
  grid-template-areas: 
    "instagram1 sentry2 sentry2 clock" 
    "spotify spotify spotify sentry" 
    "gitlab2 gitlab2 gitlab2 sentry";
}

.sentry { grid-area: sentry; }

.sentry2 { grid-area: sentry2; }

.spotify { grid-area: spotify; }

.clock { grid-area: clock; }

.downloads { grid-area: downloads; }

.instagram1 { grid-area: instagram1; }

.instagram2 { grid-area: instagram2; }

.gitlab1 { grid-area: gitlab1; }

.gitlab2 { grid-area: gitlab2; }

.gitlab3 { grid-area: gitlab3; }

.merge { grid-area: merge; }

.state { grid-area: state; }

.sentry {
  background-color: #23272f;
  overflow: auto;
}

.sentry2 {
  background-color: #23272f;
  overflow: auto;
}

.spotify {
  background-color: #23272f;
  overflow: hidden;
}

.clock {
  background-color: #23272f;
}

.merge {
  display: flex;
  align-items: center;
  overflow: auto;
  background-color: #23272f;
}

.state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #23272f;
  overflow: hidden;
}

.gitlab {
  background-color: #23272f;;
}

.gitlab3 {
  background-color: #23272f
}

.instagram1 {
  background-color: #23272f;
  overflow: hidden;
}

.instagram2 {
  background-color: #23272f;
  overflow: hidden;
}

.weather {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #23272f;
  overflow: hidden;
}

.gitlab1 {
  background-color: #23272f
}

.gitlab2 {
  background-color: #23272f;
  overflow: auto;
}

.downloads {
  background-color: #23272f;
  overflow: auto;
}

.grid--content {
  border-radius: 4px;
}

/* Large screens ----------- */

@media (max-width: 1224px) {
  .grid-container {
    height: 20%; 
    width: 100vw; 
    display: grid;
    grid-template-columns: repeat(2, minmax(10rem, 1fr));
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 10px;
    grid-template-areas: 
      "spotify spotify" 
      "clock state" 
      "merge sentry" 
      "gitlab2 gitlab2" 
      "weather sentry2"
      "instagram1 instagram1";  
  }
}

/* Desktops and laptops ----------- */
@media (max-width : 768px) {
  .grid-container {
    width: 100vw; 
    display: grid;
    grid-template-columns: repeat(1, minmax(10rem, 1fr));
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 10px;
    grid-template-areas: 
      "spotify" 
      "spotify" 
      "clock" 
      "state" 
      "merge" 
      "sentry" 
      "gitlab2" 
      "gitlab2" 
      "weather" 
      "sentry2"
      "instagram1"
      "instagram1";  
  }
}
</style>
