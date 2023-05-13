import { request } from './generic.service'

const getGroup = async (id) =>
  await request({ url: `groups/${id}`, method: 'get' })

const getGroups = async () => await request({ url: `groups`, method: 'get' })

export { getGroup, getGroups }
