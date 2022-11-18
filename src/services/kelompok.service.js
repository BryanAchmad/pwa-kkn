const axios = require("../api/axios")

exports.getByid = (id) => {
    return axios.get(`/kelompok/${id}`)
}