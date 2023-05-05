// export const setModules = (state, { modules, refetch, optionsModules }) => {
// 	state.refetchModules = refetch
// 	state.modules = modules
// 	state.optionsModules = optionsModules
// }

export const setProducts = (state, products) => {
  state.products = products
}

//MODULES
export const setModules = (state, modules) => {
  state.modules = modules
}

// export const setModule = (state, products) => {
//   state.products = products
// }

//TASKS
export const setTasks = (state, tasks) => {
  state.tasks = tasks
}

// export const setTask = (state, products) => {
//   state.products = products
// }

//GROUPS
export const setGroups = (state, groups) => {
  state.groups = groups
}

export const setGroupResponsibles = (state, { responsible, options }) => {
  state.responsible = responsible
  state.optionsResponsibles = options
}

export const setGroupExecutors = (state, { executors, options }) => {
  state.executors = executors
  state.optionsExecutors = options
}

//SUBJECTS
export const setSubjects = (state, subjects) => {
  state.subjects = subjects
}

// export const setSubject = (state, products) => {
//   state.products = products
// }

//=====================
export const setModuleIndex = (state, index) => {
  state.module_index = index
}
