import { request } from './generic.service'

const getModule = (id) => request({ url: `modules/${id}`, method: 'get' })

const getModules = () => request({ url: `modules`, method: 'get' })

const createModule = (data) =>
  request({ url: `modules`, data: data, method: 'post' })

const deleteModule = (id) => request({ url: `modules/${id}`, method: 'delete' })

export { getModule, getModules, createModule, deleteModule }
