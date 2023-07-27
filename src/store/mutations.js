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

export const setGroupResponsibles = (state, { responsibles, options }) => {
  state.responsibles = responsibles
  state.optionsResponsibles = options
}

export const setGroupExecutors = (state, { executors, options }) => {
  state.executors = executors
  state.optionsExecutors = options
}

export const setGroupExcluded = (state, { excluded, options }) => {
  state.excluded = excluded
  state.optionsExcluded = options
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

// CHAT
export const setRooms = (state, rooms) => {
  state.rooms = rooms
}

export const setId = (state, currentRoomId) => {
  state.currentRoomId = currentRoomId
}
