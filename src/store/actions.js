import {
  getProducts,
  getModule,
  getModules,
  getTask,
  getTasks,
  getGroup,
  getGroups,
  getSubject,
  getSubjects,
} from '../services/index'

// export function someAction (/* context */) {
// }

//PRODUCTS
export const fetchProducts = async function ({ commit }) {
  try {
    const product = await getProducts()
    commit('setProducts', product)
  } catch (err) {
    console.log('Ошибка', err)
  }
}

//MODULES
export const fetchModules = async function ({ commit }) {
  try {
    const modules = await getModules()
    commit('setModules', modules)
    console.log('modules', modules)
  } catch (err) {
    console.log('Ошибка', err)
  }
}

// export const fetchModule = async function ({ commit }, id) {
//   try {
//     const product = await getModule(id)
//     commit('', product)
//   } catch (err) {
//     console.log('Ошибка', err)
//   }
// }

//TASKS
export const fetchTasks = async function ({ commit }) {
  try {
    const tasks = await getTasks()
    commit('setTasks', tasks)
    console.log('tasks', tasks)
  } catch (err) {
    console.log('Ошибка', err)
  }
}

// export const fetchTask = async function ({ commit }, id) {
//   try {
//     const product = await getTask(id)
//     commit('', product)
//   } catch (err) {
//     console.log('Ошибка', err)
//   }
// }

//GROUPS
export const fetchGroups = async function ({ commit }) {
  try {
    const groups = await getGroups()
    commit('setGroups', groups)
  } catch (err) {
    console.log('Ошибка', err)
  }
}

export const fetchGroupResponsibles = async function ({ commit }) {
  try {
    let responsibles = await getGroup('1')
    responsibles = responsibles.subjects

    let options = []
    for (let subject of responsibles) {
      options.push(subject?.first_name + ' ' + subject?.last_name)
    }

    console.log('responsibles', responsibles)

    commit('setGroupResponsibles', { responsibles, options })
  } catch (err) {
    console.log('Ошибка', err)
  }
}

export const fetchGroupRExecutors = async function ({ commit }) {
  try {
    let executors = await getGroup('2')
    executors = executors.subjects

    let options = []
    for (let subject of executors) {
      options.push(subject?.first_name + ' ' + subject?.last_name)
    }

    console.log('executors', executors)

    commit('setGroupExecutors', { executors, options })
  } catch (err) {
    console.log('Ошибка', err)
  }
}

export const fetchGroupRExcluded = async function ({ commit }) {
  try {
    let excluded = await getGroup('3')
    excluded = excluded.subjects

    let options = []
    for (let subject of excluded) {
      options.push(subject?.first_name + ' ' + subject?.last_name)
    }

    console.log('excLUded', excluded)

    commit('setGroupExcluded', { excluded, options })
  } catch (err) {
    console.log('Ошибка', err)
  }
}

//SUBJECTS
export const fetchSubjects = async function ({ commit }) {
  try {
    const subjects = await getSubjects()
    commit('setSubjects', subjects)
  } catch (err) {
    console.log('Ошибка', err)
  }
}

// export const fetchSubject = async function ({ commit }, id) {
//   try {
//     const product = await getGroup(id)
//     commit('', product)
//   } catch (err) {
//     console.log('Ошибка', err)
//   }
// }
