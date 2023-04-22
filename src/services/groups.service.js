import { request } from './generic.service'

const getGroup = (id) => request({ url: `groups/${id}`, method: 'get' })

const getGroups = () => request({ url: `groups`, method: 'get' })

export { getGroup, getGroups }
