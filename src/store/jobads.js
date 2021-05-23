import {apiClient} from "../services/apiService";

export default {
  state: {
    jobads: [],
    search:null,
    advancedSearch:null,
  },
  getters: {
    //jobSeeker
    getAllJobads(state) {
      return state.jobads
    },
  },
  mutations: {
    //jobSeeker
    GET_ALL_JOBS(state, data) {
      state.jobads = data
    },
    CLEAR_JOBADS(state){
      state.jobads=[]
    },
    SET_SEARCH_PARAMS(state,search){
      state.search = search
    },
    SET_ADVANCED_SEARCH_PARAMS(state,advancedSearch){
      state.advancedSearch = advancedSearch
    },
    CLEAR_SEARCH_ATTRIBUTE(state){
      state.search = null
      state.advancedSearch = null
    },


    //Company

  },
  actions: {
    //jobSeeker
    getJobads({commit, state}, {params}) {
      if (!!state.search)
        params.search = state.search

      if (!!state.advancedSearch)
        params.advancedSearch = state.advancedSearch

      return new Promise((resolve, reject) => {
        apiClient.get('jobads', {
          params: params
        })
          .then(response => {
            commit('GET_ALL_JOBS', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    clearJobads({commit}){
      commit('CLEAR_JOBADS')
    }
  },
}
