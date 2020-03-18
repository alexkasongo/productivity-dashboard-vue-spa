          
<template>
  <div class="Rcontainer">
    <div class="wrapper">
      <div class="Rtable Rtable--5cols Rtable--collapse">
        <div class="Rtable-row Rtable-row--head">
          <div class="Rtable-cell project-cell column-heading"><h2>Issues</h2></div>
          <div class="Rtable-cell pipeline-cell column-heading"><h2>Author</h2></div>
          <div class="Rtable-cell commit-cell column-heading"><h2>Task</h2></div>
          <div class="Rtable-cell stages-cell column-heading"><h2>Assignee</h2></div>
        </div>

          <div class="Rtable-container" v-for="issue in newIssue.slice(0, 8) " :key="issue.object_attributes.id">
          <div class="Rtable-row background-success">

            <div class="Rtable-cell project-cell">
              <div class="Rtable-cell--heading">Date</div>
              <div class="Rtable-cell--content date-content">
                <h2>{{issue.project_name | truncate(1)}}</h2>
              </div>
            </div>

            <div class="Rtable-cell pipeline-cell">
              <div class="Rtable-cell--content title-content">
                <h2 class="Rtable-cell--h2">{{issue.user_name | truncate(10)}}</h2>
              </div>
            </div>

            <div class="Rtable-cell commit-cell">
              <div class="commit-cell__events">
                <div class="Rtable-commit--bottom">
                  <h2 class="commit--pad">{{issue.object_attributes.issue_title | truncate(50) }}</h2>
                </div> 
              </div>  
            </div>
            <div class="Rtable-cell stages-cell">
              <div class="stages-cell__status">
                <h2>{{issue.assignee}}</h2>
              </div> 
            </div>
            
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import Pusher from 'pusher-js'

export default {
  name:'Issue',
  data() {
    return {
      componentKey: 0,
    };
  },
  computed: {
    newIssue() {
        return this.$store.getters.gitIssue;
    },
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;  
    }
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
    channel.bind('GitlabIssue', function(data) {
      console.log('->', data);
      this.$store.dispatch('gitlabIssue', data.IssueData);
    },this)
  }  
}
</script>

<style lang="scss" scoped>
$breakpoint: 750px;
$heading-color: #43BAC0;

.wrapper {
  width: 100%;
}

.is-striped { background-color: rgba(233,200,147,0.2) }


/* Table column sizing
================================== */
.project-cell  { min-width: 20%; display: flex; align-items: center; }
.pipeline-cell { min-width:30%; display: flex; align-items: center; }
.commit-cell  { min-width: 30%; display: flex; align-items: center; }
.stages-cell  { min-width: 20%; display: flex; align-items: center; }

/* Apply styles
================================== */
.Rtable {
  display: flex;
  flex-wrap: wrap;
  color: #fff;
  .Rtable-row--head {
      display: none;
    }
  
  .Rtable-row {
    width: 100%;
    display: flex;
    
    .Rtable-cell {
      box-sizing: border-box;
      flex-grow: 1;
      padding: 0.8em 1.2em;
      overflow: hidden; // Or flex might break
      list-style: none;

      &.column-heading {
        color: white;
        padding: 1em;
        text-transform: uppercase;
      }

      .Rtable-cell--heading {
        display: none;
      }

      .Rtable-cell--content {
        a {
          font-size: 2em;
          color: #333;
        }
        
        .webinar-date {
          font-weight: 700;
        }
      }
    }
  }
}

/* Responsive
==================================== */
@media all and (max-width: $breakpoint) {
  .is-striped {
    background-color: white;
  }
  
  .Rtable--collapse  {
    display: block;
    width: 100%;
    padding: 1em;
    box-shadow: none;
    
    .Rtable-row {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 2em;
      box-shadow: 0 0 40px rgba(0,0,0,0.2);
      
      .Rtable-cell {
        width: 100% !important;
        display: flex;
        align-items: center;

        .Rtable-cell--heading {
          display: inline-block;
          flex: 1;
          max-width: 120px;
          min-width: 120px;
          color: $heading-color;
          font-weight: 700;
          border-right: 1px solid #ccc;
          margin-right: 1em;
        }

        .Rtable-cell--content {
          flex: 2;
          padding-left: 1em;
        }
      }
    }
    
    .pipeline-cell{
      background-color: $heading-color;
      color: white;
      font-weight: 700;
      order: -1;
      
      .Rtable-cell--content {
        padding-left: 0 !important;
      }
    }
    
    .Rtable-row--head {
      display: none;
    }
  }
}

// Non-Flex modernizer fallback
.no-flexbox .Rtable {
  display: block;
  
  &.Rtable-cell {
    width: 100%;
  }
}

// DIrty code
.commit-cell__events {
  // background-color: #43BAC0;
  display: flex;
  color: #fff;
}

.Rtable-commit--bottom {
  display: flex;
  align-items: center;
  margin-right: 5px;
}

.Rtable-commit--img {
  height: 3.5rem;
  border-radius: 50%;
  margin-right: 5px;
}

// *********

// * SVG ICONS */
svg {
  width: 3.2rem;
  margin: 0 0.3rem;
}
.path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 0;
}
.path.circle {
  -webkit-animation: dash 0.9s ease-in-out;
  animation: dash 0.9s ease-in-out;
}
.path.line {
  stroke-dashoffset: 1000;
  -webkit-animation: dash 0.9s 0.35s ease-in-out forwards;
  animation: dash 0.9s 0.35s ease-in-out forwards;
}
.path.check {
  stroke-dashoffset: -100;
  -webkit-animation: dash-check 0.9s 0.35s ease-in-out forwards;
  animation: dash-check 0.9s 0.35s ease-in-out forwards;
}
p {
  text-align: center;
  margin: 2rem 0 6rem;
  font-size: 1.25rem;
}
p.success {
  color: #73AF55;
}
p.error {
  color: #D06079;
}
@-webkit-keyframes dash {
  0% {
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes dash {
  0% {
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
@-webkit-keyframes dash-check {
  0% {
    stroke-dashoffset: -100;
  }
  100% {
    stroke-dashoffset: 900;
  }
}
@keyframes dash-check {
  0% {
    stroke-dashoffset: -100;
  }
  100% {
    stroke-dashoffset: 900;
  }
}


.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 5s;
}

.background-success {
  background-color: rgba(36, 88, 164, .1);
  margin-bottom: 0.5rem;
}
.background-failed {
  background-color: rgba(219, 59, 33, .5);
}
.background-running {
  background-color: rgba(36, 88, 164, .5);
}
.Rtable-container {
  width: 100%;
}

/* FLICKER */
@keyframes flickerAnimation {
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}
@-o-keyframes flickerAnimation{
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}
@-moz-keyframes flickerAnimation{
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}
@-webkit-keyframes flickerAnimation{
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}
.animate-flicker {
   -webkit-animation: flickerAnimation 1s infinite;
   -moz-animation: flickerAnimation 1s infinite;
   -o-animation: flickerAnimation 1s infinite;
    animation: flickerAnimation 1s infinite;
}
</style>
