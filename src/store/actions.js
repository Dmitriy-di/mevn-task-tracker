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
//     commit('setProducts', product)
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
//     commit('setProducts', product)
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

// export const fetchGroup = async function ({ commit }, id) {
//   try {
//     const product = await getSubjects(id)
//     commit('setProducts', product)
//   } catch (err) {
//     console.log('Ошибка', err)
//   }
// }

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
//     commit('setProducts', product)
//   } catch (err) {
//     console.log('Ошибка', err)
//   }
// }
