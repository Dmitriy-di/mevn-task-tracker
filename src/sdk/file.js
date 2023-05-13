import axios from 'axios'

const getFileById = (id, preview = '') => {
  axios
    .get(`http://localhost:3000/api/v1/files/${id}/${preview}`)
    .then((response) => {
      // Обработка успешного ответа
      console.log(response.data) // Здесь вы можете использовать полученные файлы
    })
    .catch((error) => {
      // Обработка ошибки
      console.error(error)
    })
}

const getFiles = () => {
  axios
    .get('http://localhost:3000/api/v1/files')
    .then((response) => {
      // Обработка успешного ответа
      console.log(response.data) // Здесь вы можете использовать полученные файлы
    })
    .catch((error) => {
      // Обработка ошибки
      console.error(error)
    })
}

const uploadFile = (file, idSubject) => {
  console.log(file)
  const formData = new FormData()
  formData.append('file', file)
  axios
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

const getPreviewFile = (id) => {
  axios
    .get(`http://localhost:3000/api/v1/files/${id}/preview`)
    .then((response) => {
      // Обработка успешного ответа
      console.log(response.data) // Здесь вы можете использовать полученные файлы
    })
    .catch((error) => {
      // Обработка ошибки
      console.error(error)
    })
}

export { getFiles, getFileById, uploadFile, deleteFileById, getPreviewFile }
