import axios from "axios";

const baseUrl = "REMOVED"

let token = null

const setToken = (newToken) =>
token = `bearer ${newToken}`

const getAll = () => {
    const config = {
        headers:{Authorization: token},
    }
    const request = axios.get(baseUrl, config)
    return request.then(Response => Response.data)
}
//voi olla myös ilman sulkeita..newuser on parametri.
 const create = (newUser) => {
     const config = {
         headers:{Authorization: token},
     }
    return axios.post(baseUrl,  newUser, config)
}

const deleteUser = (id) => {
    const config = {
        headers:{Authorization: token},
    }
    return axios.delete(baseUrl + "/" + id, config)
    //return axios.delete(`${baseUrl}/${id}`)
}

const modifyUser = (newdata) => {
    const config = {
        headers:{Authorization: token},
    }
    return axios.put(baseUrl + "/" + newdata.userId,newdata, config)
}

const getUser = (id) => {
    const config = {
        headers:{Authorization: token},
    }
    return axios.get(baseUrl + "/id" + "/" + id, config)
}

export default {getAll, create, deleteUser, modifyUser, getUser, setToken}