import { request } from './generic.service'

const getTask = (id) => request({ url: `tasks/${id}`, method: 'get' })

const getTasks = () => request({ url: `tasks`, method: 'get' })

const createTask = (data) =>
  request({ url: `tasks`, data: data, method: 'post' })

const deleteTask = (id) => request({ url: `tasks/${id}`, method: 'delete' })

export { getTask, getTasks, createTask, deleteTask }
