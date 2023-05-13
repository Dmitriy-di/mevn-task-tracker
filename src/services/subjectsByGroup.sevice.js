import { request } from './generic.service'

const getSubject = async (id) =>
  await request({ url: `subjects_/${id}`, method: 'get' })

const getSubjects = async () =>
  await request({ url: `subjects_`, method: 'get' })

export { getSubject, getSubjects }
