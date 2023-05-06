import { request } from './generic.service'

const getModule = (id) => request({ url: `modules/${id}`, method: 'get' })

const getModules = () => request({ url: `modules`, method: 'get' })

const createModule = (data) => request({ url: `modules`, data, method: 'post' })

const deleteModule = (id) => request({ url: `modules/${id}`, method: 'delete' })

const updateModule = (id, data) => {
  request({ url: `modules/${id}`, method: 'put', data })
}

export { getModule, getModules, createModule, deleteModule, updateModule }
