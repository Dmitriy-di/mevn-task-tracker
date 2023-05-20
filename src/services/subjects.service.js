import { request } from './generic.service'

const getSubject = async (id) =>
  await request({ url: `subjects/${id}`, method: 'get' })

const getSubjects = async () =>
  await request({ url: `subjects`, method: 'get' })

const createSubject = async (data) =>
  await request({ url: `subjects`, method: 'post', data })

export { getSubject, getSubjects, createSubject }
