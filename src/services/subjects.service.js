import { request } from './generic.service'

const getSubject = (id) => request({ url: `subjects/${id}`, method: 'get' })

const getSubjects = () => request({ url: `subjects`, method: 'get' })

export { getSubject, getSubjects }
