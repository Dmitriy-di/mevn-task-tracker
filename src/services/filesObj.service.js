import { request } from './generic.service'

const getFileObj = (id) => request({ url: `filesObj/${id}`, method: 'get' })

const getFilesObj = () => request({ url: `filesObj`, method: 'get' })

// Создаётся автоматически при создании и отправке файла на сервер
// const createFileObj = (data) =>
//   request({ url: `filesObj`, data, method: 'post' })

const deleteFileObj = (id) =>
  request({ url: `filesObj/${id}`, method: 'delete' })

const updateFileObj = (id, data) => {
  request({ url: `filesObj/${id}`, method: 'put', data })
}

export { getFileObj, getFilesObj, deleteFileObj, updateFileObj }
