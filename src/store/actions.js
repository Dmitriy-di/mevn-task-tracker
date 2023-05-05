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
    const responsibles = await getSubjects('6454a1b713681c3e308f8e6f')

    let options = []
    for (let subject of responsibles) {
      options.push(
        subject.fullname?.first_name + ' ' + subject.fullname?.last_name,
      )
    }

    commit('setGroupResponsibles', { responsibles, options })
  } catch (err) {
    console.log('Ошибка', err)
  }
}

export const fetchGroupRExecutors = async function ({ commit }) {
  try {
    const executors = await getSubjects('6454a1cf13681c3e308f8e70')

    let options = []
    for (let subject of executors) {
      options.push(
        subject.fullname?.first_name + ' ' + subject.fullname?.last_name,
      )
    }

    commit('setGroupExecutors', { executors, options })
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
