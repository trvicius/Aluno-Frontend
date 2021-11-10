import axios from 'axios'
 
const api = axios.create({
    baseURL: 'https://backendaluno.herokuapp.com/'
})
 
export default api;