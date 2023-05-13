import { request } from './generic.service'

const getTask = (id) => request({ url: `tasks/${id}`, method: 'get' })

const getTasks = () => request({ url: `tasks`, method: 'get' })

const createTask = (data) => request({ url: `tasks`, data, method: 'post' })

const deleteTask = (id) => request({ url: `tasks/${id}`, method: 'delete' })

const updateTask = async (id, data) => {
  await request({ url: `tasks/${id}`, method: 'put', data })
}

export { getTask, getTasks, createTask, deleteTask, updateTask }
