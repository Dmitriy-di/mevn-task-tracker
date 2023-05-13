import { request } from './generic.service'

const getSubject = async (id) =>
  await request({ url: `subjects/${id}`, method: 'get' })

const getSubjects = async () =>
  await request({ url: `subjects`, method: 'get' })

export { getSubject, getSubjects }
