import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gitlabFeed:[],
    sentryFeed:[],
    instagramFeed:[],
    gitPushState:[],
    gitIssue:[],
    mergeRequest:[],
    sitesState:[],
    buildsState:[]
  },

// NOTE 
  getters: {
/* STATE
================================== */
    stateChange: state => {
      return state.sitesState
    },
    checkIfStatusChanged: (state) => (stateStatus) => {
      return state.sitesState.filter((state) => {
        return state.status === stateStatus;
      })
    },
    stateChangeWatcher: state => () => {
      return state.sitesState
    },
/* PIPELINE
================================== */
    gitlabFeed: state => {
        return state.gitlabFeed.slice().reverse();
    },
    checkIfPipelineExists: (state) => (pipelineID) => {
      return state.gitlabFeed.filter((pipeline) => {
        return pipeline.object_attributes.pipeline_id === pipelineID;
      })
    },
    createdMoment: state => {
      return state.gitlabFeed.slice().reverse();
    },
    gitlabFeedWatcher: state => () => {
      return state.gitlabFeed
    },
    gitlabBuilds: state => {
      return state.buildsState
    },
/* SENTRY
 */
    sentryFeed: state => {
      return state.sentryFeed.sort((a, b) => (a.events < b.events) ? 1 : -1)
    },

/* INSTAGRAM
 */
    checkIfIGExists: (state) => (instagramID) => {
      return state.instagramFeed.filter((instagram) => {
        return instagram.instagramFeeds.recent_posted_picture.id === instagramID;
      })
    },
    instagramFeed: state => {
      return state.instagramFeed.slice().reverse();
    },
/* PUSH
 */
    gitPushState : state => state.gitPushState,
    pushWatcher : state => () => {
      return state.gitPushState
    },
/* ISSUE
 */    
    checkIfIssueExists: (state) => (issueId) => {
      return state.gitIssue.filter((issue) => {
        return issue.object_attributes.id === issueId;
      })
    },
    gitIssue: state => {
      return state.gitIssue.slice().reverse();
    },
/* MERGE
 */    
    checkIfMergeExists: (state) => (mergeId) => {
      return state.mergeRequest.filter((newMerge) => {
        return newMerge.last_commit.id === mergeId;
      })
    },
    mergeGetter: state => {
      return state.mergeRequest.slice().reverse();
    },
  },

// NOTE 
  mutations: {
/* STATUS
================================== */
    STATUS_ONLINE: (state, stateData) => {
      state.sitesState = [];
      state.sitesState.push(stateData);
    },

    STATUS_OFFLINE: (state, newState) => {
      // Find the pipline in store with the same id as the updated pipeline (newPipline) 
      const currentState = state.sitesState.find(
        currentState => currentState.status === newState.status
      );
      // Clone and replace currentState with newPipeline
      Object.assign(currentState, newState);
    },
/* PIPELINE
================================== */
    ADD_GIT: (state, gitData) => {
      state.gitlabFeed.push(gitData);
    },
    UPDATE_GIT: (state, newPipeline) => {
      // Find the pipline in store with the same id as the updated pipeline (newPipline) 
      const storePipeline = state.gitlabFeed.find(
        storePipeline => storePipeline.object_attributes.pipeline_id === newPipeline.object_attributes.pipeline_id
      );
      // Clone and replace storePipeline with newPipeline
      Object.assign(storePipeline, newPipeline);
    },
    BUILDS_GIT: (state, buildsData) => {
      state.buildsState.push(buildsData);
      
    },
/* SENTRY
 */   
    UPDATE_SENTRY: (state, sentryData) => {
      Vue.set(state, 'sentryFeed', [...sentryData]);
    },

/* ISTAGRAM
 */
    ADD_IG: (state, instagramData) => {
      state.instagramFeed.push(instagramData)
    },
    UPDATE_IG: (state, instagramData) => {
      const instagramPipe = state.instagramFeed.find(
        instagramPipe => instagramPipe.instagramFeeds.recent_posted_picture.id === instagramData.instagramFeeds.recent_posted_picture.id
      );
      Object.assign(instagramPipe, instagramData);
    },
/* PUSH
 */
    UPDATE_PUSH: (state, data) => {
      state.gitPushState = data
    },
/* ISSUE
 */
    ADD_ISSUE: (state, data) => {
      state.gitIssue.push(data)
    },
    UPDATE_ISSUE: (state, data) => {
      const issuePipe = state.gitIssue.find(issuePipe => issuePipe.object_attributes.id === data.object_attributes.id);
      Object.assign(issuePipe, data);
    },
/* MERGE
 */
    ADD_MERGE: (state, mergeData) => {
      state.mergeRequest.push(mergeData)
    },
    UPDATE_MERGE: (state, mergeData) => {
      const mergePipe = state.mergeRequest.find(mergePipe => mergePipe.last_commit.id === mergeData.last_commit.id);
      Object.assign(mergePipe, mergeData);
    }
  },

// NOTE 
  actions: {
/* SITESSTATE
================================== */
    updateState: ({commit, getters}, stateData) => {
      if (getters.checkIfStatusChanged(stateData.status) === 'offline') {
        commit('STATUS_OFFLINE', stateData);
      } else {
        commit('STATUS_ONLINE', stateData);
      }
    },
/* PIPELINE
================================== */
    updateGit: ({commit,getters}, gitData) => {
      if(getters.checkIfPipelineExists(gitData.object_attributes.pipeline_id).length > 0){
        // Yes , So we need to update the existing record with newer info E.G running -> complete
        commit('UPDATE_GIT', gitData)
      }else{
        // No, this is a new Pipline we dont have a record for so we add it to store
        commit('ADD_GIT', gitData)
      }    
    },
/* SENTRY
*/
    updateSentry: (context, sentryData) => {
      context.commit('UPDATE_SENTRY', sentryData)
    },
/* INSTAGRAM
*/
    updateInstagram: ({commit, getters}, instagramData) => {
      if(getters.checkIfIGExists(
        instagramData.instagramFeeds.recent_posted_picture.id).length > 0){
        commit('UPDATE_IG', instagramData)
      }else{
        commit('ADD_IG', instagramData)
      }
    },
/* PUSH
*/
    updateGitPush: (context, data) => {
      context.commit('UPDATE_PUSH', data)
    },
/* ISSUE
*/
    gitlabIssue: ({commit,getters}, data) => {
      if(getters.checkIfIssueExists(data.object_attributes.id).length > 0){
        commit('UPDATE_ISSUE', data)
      }else{
        commit('ADD_ISSUE', data)
      }    
    },
/* ISSUE
*/
    mergeReq: ({commit,getters}, mergeData) => {
      if(getters.checkIfMergeExists(mergeData.last_commit.id).length > 0){
        commit('UPDATE_MERGE', mergeData)
      }else{
        commit('ADD_MERGE', mergeData)
      }    
    },

  }
})

