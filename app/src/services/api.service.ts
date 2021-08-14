import axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('token')

const api = axios.create({
  baseURL: 'http://localhost:3333',
})

if (token) {
  api.defaults.headers['authorization'] = token
}

export default api
