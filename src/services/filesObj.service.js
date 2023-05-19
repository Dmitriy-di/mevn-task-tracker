import { request } from './generic.service'

const getFileObj = async (id) =>
  await request({ url: `filesObj/${id}`, method: 'get' })

const getFilesObj = async () =>
  await request({ url: `filesObj`, method: 'get' })

// Создаётся автоматически при создании и отправке файла на сервер
// const createFileObj = (data) =>
//   request({ url: `filesObj`, data, method: 'post' })

const deleteFileObj = async (id) =>
  await request({ url: `filesObj/${id}`, method: 'delete' })

const updateFileObj = async (id, data) => {
  await request({ url: `filesObj/${id}`, method: 'put', data })
}

export { getFileObj, getFilesObj, deleteFileObj, updateFileObj }
