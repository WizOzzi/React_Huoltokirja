
import axios from "axios";

const baseUrl = "REMOVED";

const getAll = () => {
   const request = axios.get(baseUrl)
return request.then(Response=>Response.data) }

const getOne = (id) =>{
   const request = axios.get(baseUrl+"/id/" + id)
   return request.then(Response=> Response.data)
}

const create = (newJob) =>{
   
   return axios.post(baseUrl,newJob)
}

const deleteJob = (id) =>{
   return axios.delete(baseUrl + "/" + id)
}

export default {getAll, create, deleteJob, getOne}
