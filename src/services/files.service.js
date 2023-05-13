import { request } from './generic.service'

const getFile = (id) => request({ url: `files/${id}`, method: 'get' })

const getFiles = () => request({ url: `files`, method: 'get' })

const uploadFile = (file) => {
  console.log(file)
  const formData = new FormData()
  formData.append('file', file)
  request({ url: `files`, formData, method: 'post' })
}

const deleteFile = (id) => request({ url: `files/${id}`, method: 'delete' })

export const request = async ({ url, method, data = {} }) => {
  const response = await axios[method](`${API_URL}/${url}`, data)
  return response.data
}

export { getFile, getFiles, uploadFile, deleteFile }
