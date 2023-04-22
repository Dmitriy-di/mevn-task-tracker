import { request } from './generic.service'

const getModule = (id) => request({ url: `modules/${id}`, method: 'get' })

const getModules = () => request({ url: `modules`, method: 'get' })

export { getModule, getModules }
