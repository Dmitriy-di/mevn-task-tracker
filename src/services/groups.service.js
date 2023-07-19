import { request } from './generic.service'

const getGroup = async (id) =>
  await request({ url: `group/${id}`, method: 'get' })

const getGroups = async () => await request({ url: `group`, method: 'get' })

export { getGroup, getGroups }
