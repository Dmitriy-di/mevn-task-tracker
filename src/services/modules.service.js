import { request } from './generic.service'

const getModule = async (id) =>
  await request({ url: `modulee/${id}`, method: 'get' })

const getModules = async () => await request({ url: `modulee`, method: 'get' })

const createModule = async (data) =>
  await request({ url: `modulee`, data, method: 'post' })

const deleteModule = async (id) =>
  await request({ url: `modulee/${id}`, method: 'delete' })

const updateModule = async (id, data) => {
  await request({ url: `modulee/${id}`, method: 'patch', data })
}

export { getModule, getModules, createModule, deleteModule, updateModule }
