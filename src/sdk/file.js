import axios from 'axios'

const getFileById = (id, preview = '') => {
  axios
    .get(`http://localhost:3000/api/v1/files/${id}/${preview}`)
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.error(error)
    })
}

const getFiles = () => {
  axios
    .get('http://localhost:3000/api/v1/files')
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.error(error)
    })
}

const uploadFile = async (file, idTask) => {
  const formData = new FormData()
  formData.append('file', file)
  await axios
    .post('http://localhost:3000/api/v1/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        taskId: idTask,
      },
    })
    .then((response) => {
      console.log('File uploaded successfully')
    })
    .catch((error) => {
      console.error('Error uploading file:', error)
    })
}

const deleteFileById = (id) => {
  axios
    .delete(`http://localhost:3000/api/v1/files/${id}`)
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
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

const bytesToSize = function (bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (!bytes) {
    return '0 Byte'
  }
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
}

export {
  getFiles,
  getFileById,
  uploadFile,
  deleteFileById,
  getPreviewFile,
  bytesToSize,
}
