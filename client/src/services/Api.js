import axios from 'axios'

// connection between client and server

export default () => {
  return axios.create({
    // change baseURL for deployment
    baseURL: `http://localhost:8081`
  })
}
