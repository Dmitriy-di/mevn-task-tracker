import { request } from './generic.service'
import axios from 'axios'

const getFile = (id) => request({ url: `files/${id}`, method: 'get' })

const getFiles = () => request({ url: `files`, method: 'get' })

const uploadFile = (file, taskId) => {
  console.log(file)
  const formData = new FormData()
  formData.append('file', file)

  axios
    .post('http://localhost:3000/api/v1/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        taskId: taskId,
      },
    })
    .then((response) => {
      console.log('File uploaded successfully')
    })
    .catch((error) => {
      console.error('Error uploading file:', error)
    })
}

const deleteFile = (id) => request({ url: `files/${id}`, method: 'delete' })

const bytesToSize = function (bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (!bytes) {
    return '0 Byte'
  }
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
}

const getPreviewFile = async (id) => {
  return await axios
    .get(`http://localhost:3000/api/v1/files/${id}/preview`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error)
    })
}
export {
  getFile,
  getFiles,
  uploadFile,
  deleteFile,
  bytesToSize,
  getPreviewFile,
}
