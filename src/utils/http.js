const axios = require('axios')


const http = axios.create({
  timeout: 3000
})

module.exports = {
  http,
  axios
}
