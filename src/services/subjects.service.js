import { request, requestAuth } from './generic.service'

const getSubject = async (id) => {
  await request({ url: `subject/${id}`, method: 'get' })
}
const getSubjects = async () => await request({ url: `subject`, method: 'get' })

const register = async (data) =>
  await requestAuth({ url: `register`, method: 'post', data })

const deleteSubject = async (id) => {
  await request({ url: `subject/${id}`, method: 'delete' })
}

export { getSubject, getSubjects, register, deleteSubject }
