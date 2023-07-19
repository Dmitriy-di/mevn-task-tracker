import { request } from './generic.service'

const getSubject = async (id) =>
  await request({ url: `subject/${id}`, method: 'get' })

const getSubjects = async () => await request({ url: `subject`, method: 'get' })

const createSubject = async (data) =>
  await request({ url: `subject`, method: 'post', data })

export { getSubject, getSubjects, createSubject }
