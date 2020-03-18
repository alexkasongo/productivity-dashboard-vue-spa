          
<template>
 
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import Pusher from 'pusher-js'

export default {
  name:'Push',
  data() {
    return {
      componentKey: 0, 
    };
  },
  computed: {
    ...mapGetters({
      gitPush: "gitPushState",
      gitPushWatch: "pushWatcher"
    })
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;  
    },
    pushNotice(data) {
      this.$notification.success(`${data[0].pushData.user_name}` + " has made a push!", {
        title: "PUSH",  
        timer: 10, 
        showLeftIcn: false, 
        showCloseIcn: true,
        position: "topRight" 
      });
    }
  },
  
  // NOTE use getters to alter state
  mounted() {
    this.$store.watch(this.gitPushWatch,(data) => {
      
      if (data){
        this.pushNotice(data)
      }

    }) 
  },
  created() {
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
  
    var channel = pusher.subscribe('private-dashboard')
    channel.bind('GitlabPush', function(data) { 
        let gitPushData = [];
        gitPushData.push(data)
        this.$store.dispatch('updateGitPush', gitPushData);
    },this)
  }  
}
</script>

<style lang="scss" scoped>
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
  margin: .5rem 0 .75rem;
}

table tr {
  background-color: #23272f;
  padding: .35em;
}

table th,
table td {
  padding: 1.2rem 0;
  text-align: left;
}

table th {
  letter-spacing: .1rem;
  text-transform: uppercase;
}

.thead {
  border-bottom: 1px solid #555555;
  color: #fff
}
.tbody {
  border-bottom: 1px solid #555555;
  color: #fff;
}
@media screen and (max-width: 50rem) {
  table {
    border: 0;
  }
  
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 0.1rem;
    margin: -0.1rem;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 0.1rem;
  }
  
  table tr {
    display: block;
    margin-bottom: .625rem;
  }
  
  table td {
    border-bottom: 0.1rem solid #555555;
    display: block;
    text-align: right;
  }
  
  table td::before {
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  table td:last-child {
    border-bottom: 0;
  }
  .Rtable-commit--top {
    display: flex;
    justify-content: flex-end;
  }
  .Rtable-commit--bottom {
    display: flex;
    justify-content: flex-end;
  }
  .stages--table {
  display: flex;  
  justify-content: flex-end;
}
}

/* Styling */
.trigger--avatat {
  height: 3.5rem;
  border-radius: 50%;
}

/* STATUS */
.status-current {
  text-decoration: none;
  font-size: 1.5rem;
  padding: 2px 7px 4px;
  border: 1px solid #eee;
  white-space: nowrap;
  border-radius: 4px;
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
  background-color: #01D2FF;

  white-space: nowrap;
}

/* COMMIT */
.Rtable-commit--top {
  display: flex;
  /* justify-content: flex-start; */
}
.Rtable-commit--bottom {
  display: flex;
}
.Rtable-commit--img {
  height: 2.5rem;
  border-radius: 50%;
}
.commit--number {
  color: #1b69b6
}
.commit--message{
  padding-left: 0.5rem; 
}

/* TABLE */
.stages--table {
  display: flex;  
}

/* TIME */
.time {
  text-align: right;
}

</style>
