import { createStore } from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

export const state = {
  products: [],
  modules: [],
  tasks: [],
  groups: [],
  subjects: [],
  executors: [],
  responsibles: [],
  excluded: [],
  optionsResponsibles: [],
  optionsExecutors: [],
  optionsExcluded: [],
  module_index: -1,
}

const store = createStore({
  state,
  getters,
  actions,
  mutations,
})

if (module.hot) {
  module.hot.accept(['./getters', './actions', './mutations'], () => {
    store.hotUpdate({
      getters: require('./getters'),
      actions: require('./actions'),
      mutations: require('./mutations'),
    })
  })
}

export default store
