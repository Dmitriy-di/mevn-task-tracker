import { request } from './generic.service'

const getTask = async (id) =>
  await request({ url: `task/${id}`, method: 'get' })

const getTasks = async () => await request({ url: `task`, method: 'get' })

const createTask = async (data) =>
  await request({ url: `task`, data, method: 'post' })

const deleteTask = async (id) =>
  await request({ url: `task/${id}`, method: 'delete' })

const updateTask = async (id, data) => {
  await request({ url: `task/${id}`, method: 'put', data })
}

export { getTask, getTasks, createTask, deleteTask, updateTask }
