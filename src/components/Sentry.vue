<template>
  <div class="Rcontainer">
    <table>
      <thead class="thead">
        <tr>
          <th scope="col">
            <h2>Projects</h2>
          </th>
          <th class="table--left" scope="col">
            <h2>Events</h2>
          </th>
        </tr>
      </thead>
      <tbody class="tbody" v-for="event in updateSentry" :key="event.componentKey">
        <tr>
          <td>
            <div>
              <h5 class="merge--head">
                <strong></strong>
              </h5>
            </div>
            <div class="merge--body">
              <h2>{{ event.name.replace(/-/g, " ") }}</h2>
            </div>
          </td>

          <td>
            <div>
              <h2 class="merge--head table--left">
                <h2 class="events-number">{{ event.events }}</h2>
              </h2>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import Pusher from "pusher-js";

export default {
  name: "Sentrys",
  props: {
    msg: String
  },
  data() {
    return {
      componentKey: 0,
      contentStyle: {
        backgroundColor: "#1aaa55",
        borderradius: "4px"
      }
    };
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    }
  },
  computed: {
    ...mapGetters({
      updateSentry: "sentryFeed"
    })
  },
  created() {
    var pusher = new Pusher("", {
      cluster: "eu",
      forceTLS: true,
      authEndpoint:
        "https://api-dashboard.incendiaryblue.com/broadcasting/auth",
      auth: {
        headers: {
          "dashboard-auth": "GGhSdPe8WcPFdztwbYabvl2uOTtno"
        }
      }
    });

    var channel = pusher.subscribe("private-dashboard");
    channel.bind(
      "App\\Events\\SentryIssuesEvent",
      function(data) {
        let sentryData = [];

        for (let issue of data.issues) {
          sentryData.push(issue);
          this.$store.dispatch("updateSentry", sentryData);
        }
      },
      this
    );
  }
};
</script>

<style scoped>
.Rcontainer {
  padding: 0 1rem;
}

table {
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
}

table caption {
  margin: 0.5rem 0 0.75rem;
}

table tr {
  background-color: #23272f;
  padding: 0.35em;
}

table th,
table td {
  text-align: left;
}

table th {
  padding: 1.2rem 0;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
}

.thead {
  border-bottom: 1px solid #555555;
}
.tbody {
  border-bottom: 1px solid #555555;
  color: #fff;
}

.merge--body {
  display: flex;
  align-items: center;
}

/* Styling */
.trigger--avatat {
  height: 3.5rem;
  border-radius: 50%;
}

/* STATUS */
.status-current {
  padding: 0 8px;
  font-size: 1.2rem;
  line-height: 16px;
  border-radius: 4px;
  color: #fff;
  background-color: #1aaa55;
}
.status-success {
  color: #1aaa55;
  border-color: #1aaa55;
}
.status-failed {
  color: #db3b21;
  border-color: #db3b21;
}
.status-running {
  color: #fff;
  border-color: #1b69b6;
  background-color: #1b69b6;
}
.status-running--animation {
  height: 2.5rem;
  width: fit-content;
  border-radius: 4px;
  /* border: 1px solid #1b69b6; */
  background-color: #01d2ff;

  white-space: nowrap;
}

/* COMMIT */
.Rtable-commit--top {
  display: flex;
}
.Rtable-commit--bottom {
  display: flex;
}
.Rtable-commit--img {
  height: 2.5rem;
  border-radius: 50%;
}
.commit--number {
  color: #1b69b6;
}
.commit--message {
  padding-left: 0.5rem;
}

/* TABLE */
.stages--table {
  display: flex;
}
.table--left {
  text-align: right;
}
.merge--color {
  color: #96ccff;
  padding: 0 1rem;
  min-width: 160px;
}
.merge--head {
  color: #ffb700;
}
/* TIME */
.time {
  text-align: right;
}

/* FLICKER */
@keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-o-keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-moz-keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-webkit-keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.animate-flicker {
  -webkit-animation: flickerAnimation 1s infinite;
  -moz-animation: flickerAnimation 1s infinite;
  -o-animation: flickerAnimation 1s infinite;
  animation: flickerAnimation 1s infinite;
}
</style>
