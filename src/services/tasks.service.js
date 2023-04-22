import { request } from './generic.service'

const getTask = (id) => request({ url: `tasks/${id}`, method: 'get' })

const getTasks = () => request({ url: `tasks`, method: 'get' })

export { getTask, getTasks }
