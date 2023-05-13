import { request } from './generic.service'

const getTask = async (id) =>
  await request({ url: `tasks/${id}`, method: 'get' })

const getTasks = async () => await request({ url: `tasks`, method: 'get' })

const createTask = async (data) =>
  await request({ url: `tasks`, data, method: 'post' })

const deleteTask = async (id) =>
  await request({ url: `tasks/${id}`, method: 'delete' })

const updateTask = async (id, data) => {
  await request({ url: `tasks/${id}`, method: 'put', data })
}

export { getTask, getTasks, createTask, deleteTask, updateTask }
