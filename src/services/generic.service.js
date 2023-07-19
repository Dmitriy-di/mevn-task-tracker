import axios from 'axios'

const API_URL = 'http://localhost:3000'

export const request = async ({ url, method, data = {} }) => {
  const token = localStorage.getItem('token')

  const headers = {
    Authorization: `Bearer ${token}`, // Добавление токена в заголовок Authorization
    'Content-Type': 'application/json', // Пример другого заголовка, если необходимо
  }

  const options = {
    url: `${API_URL}/${url}`,
    method,
    headers,
    data,
  }

  try {
    const response = await axios(options)
    return response.data
  } catch (error) {
    // Обработка ошибок
    console.error('Ошибка запроса:', error)
    throw error
  }

  return response.data
}

const API_URL_AUTH = 'http://localhost:3000/auth'

export const requestAuth = async ({ url, method, data = {} }) => {
  const response = await axios[method](`${API_URL_AUTH}/${url}`, data)
  return response.data
}
