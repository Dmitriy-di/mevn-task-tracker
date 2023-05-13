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

const uploadFile = (file) => {
  console.log(file)
  const formData = new FormData()
  formData.append('file', file)
  axios
    .post('http://localhost:3000/api/v1/files', formData)
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

const filesApi = {
  getFiles,
  getFileById,
  uploadFile,
  deleteFileById,
}

export { filesApi }
