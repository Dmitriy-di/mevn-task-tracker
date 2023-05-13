import { request } from './generic.service'

const getModule = async (id) =>
  await request({ url: `modules/${id}`, method: 'get' })

const getModules = async () => await request({ url: `modules`, method: 'get' })

const createModule = async (data) =>
  await request({ url: `modules`, data, method: 'post' })

const deleteModule = async (id) =>
  await request({ url: `modules/${id}`, method: 'delete' })

const updateModule = async (id, data) => {
  await request({ url: `modules/${id}`, method: 'put', data })
}

export { getModule, getModules, createModule, deleteModule, updateModule }
