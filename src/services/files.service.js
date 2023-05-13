import { request } from './generic.service'

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

export const request = async ({ url, method, data = {} }) => {
  const response = await axios[method](`${API_URL}/${url}`, data)
  return response.data
}

export { getFile, getFiles, uploadFile, deleteFile }
