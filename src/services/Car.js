
import axios from "axios";

const baseUrl = "REMOVED"

const getAll = () => {
   const request = axios.get(baseUrl)
return request.then(Response=>Response.data) }

const getOne = (id) => {
   const request = axios.get(baseUrl + "/id/" + id)
   return request.then(Response=> Response.data)
}

const create = (newCar) =>{
   
   return axios.post(baseUrl,newCar)
}

const editcar = (editCar) =>{
   
   return axios.put(baseUrl + "/"+ editCar.carId,editCar)
}

const deletecar = (id) =>{
   return axios.delete(baseUrl + "/" + id)
}

export default {getAll, getOne , create, editcar, deletecar}
