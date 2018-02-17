import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { isLoggedIn } from '../api/auth';

// https://medium.com/wdstack/vue-vuex-getting-started-f78c03d9f65
// https://blog.pusher.com/getting-started-vuex-state-management-vuejs/

Vue.use(Vuex)

const state = {
  stands: [],
  townshipSummary: [],
  filteredStands: [],
  isLoggedIn: isLoggedIn()
}

const mutations = {
  SET_STANDS_LIST: (state, { list }) => {
    state.stands = list
  },
  SET_TOWNSHIP_SUMMARY: (state, { list }) => {
    state.townshipSummary = list
  },
  SET_FILTERED_STANDS: (state, filter) => {
    console.log('received mutation')
    console.log(filter)
    state.filteredStands = filter
  },
  SET_AUTH_STATUS: (state, status) => {
    state.isLoggedIn = status
  }
}

const getters = {
  filteredStands: state => state.filteredStands,
  stands: state => state.stands,
  townshipSummary: state => {
     const townshipCounter = {} // e.g { kaguvi: 34 }
     let townshipSummary = []
     Object.assign(townshipSummary, state.townshipSummary)
     let summary = townshipSummary.filter(township => {
        // initial state
        if (state.filteredStands.length === 0) return true

        // return true only if the stand is in the township
        if (state.filteredStands.filter(stand => {
          const isStandInTownship = stand.township_name === township.township_name
          if (isStandInTownship) {
            if (townshipCounter[township.township_name]) {
              townshipCounter[township.township_name]++
            } else {
              townshipCounter[township.township_name] = 1
            }
          }
          return  isStandInTownship
        }).length > 0) {
          return true
        } else {
          return false
        }
      })
      // convert to format required by the chart
      .map(township => {
        let innerArray = [township.township_name, townshipCounter[township.township_name] ||  township.stands_count]
        return innerArray
      })
     return summary
  },
  isLoggedIn: statue => state.isLoggedIn

}

const actions = {
  LOAD_STANDS_LIST: function ({ commit }) {
    axios.get('http://localhost:3000/api/cadastre').then((response) => {
      commit('SET_STANDS_LIST', { list: response.data.topojson })
      commit('SET_TOWNSHIP_SUMMARY', { list: response.data.townshipSummary })
    }, (err) => {
      console.log(err)
    })
  }
}

const store = new Vuex.Store({ state, mutations,  getters, actions })

export default store
