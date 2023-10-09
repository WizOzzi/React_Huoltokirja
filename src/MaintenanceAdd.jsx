import axios from "axios";
import React, { useState } from "react";
import Maintenance from "./services/Maintenance";

const MaintenanceAdd = ({setIsPositive,setMessage,setShowMessage, setAddJob,cid, setShowMaintenance,showMaintenance, setReloadMaintenance,reloadMaintenance, setMaintenance }) =>{
 
  
    const [newCarId, setNewCarId] = useState('')
    const [newJob, setNewJob] = useState('')
    const [newParts,setNewParts] = useState('')
    const [newPrice, setNewPrice] = useState('')
    const [newDate, setNewDate] = useState('')
    const [newKm, setNewKm] = useState('')
    const [newPicture, setNewPicture] = useState('')
    const [images, setImages] = useState([])
   const [imageUrl, setImageUrl] = useState('')
  
    //const [value2,setValue2] = useState('')                               //Only 0-9 allowed
    //pattern="[0-9]*"  value2={value2}  onChange={(e) => setValue2((v) =>
     //  (e.target.validity.valid ? e.target.value2 : v))}
  const handleSubmit = async(event) => {
  event.preventDefault()
  var newJobs = {
    
    
    carId: cid,
    job: newJob,
    parts: newParts,
    price: newPrice,
    date: new Date().toISOString().substring(0,21),
    km: newKm,
    picture: imageUrl
    
  }
  event.preventDefault()
    const url = "https://localhost:7118/api/maintenance/upload";
    const formData = new FormData();
    formData.append('formFile', images[0]);
    formData.append('fileName', images[0].name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
     await axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });




  Maintenance.create(newJobs)
  .then(response => {
    if(response.status===200){
      setIsPositive(true)
      setMessage("Added new Job to CarId: " + cid)
     
      setShowMessage(true)
     setReloadMaintenance(!reloadMaintenance)
    
      setTimeout(() => {
  setShowMessage(false)
  //setShowMaintenance(!showMaintenance)
  
      },3000)
      
      setAddJob(false)
      
    }
  
  }).catch((error) => {
    if (error.response){
   setMessage("Lisäys epäonnistui!")
   setIsPositive(false)
   setShowMessage(true)
   setTimeout(() =>{
   setShowMessage(false)
      },3000)
      setAddJob(false)
  }})
  
  
}
  const onImageChange=(event) =>{
    setImages(event.target.files)
    console.log(event.target.files[0])
    setImageUrl(event.target.files[0].name)
   // setTimeout(()=>{setImageUrl(URL.createObjectURL(event.target.files[0]))},1000)
    console.log(imageUrl.toString())
       
  }

 
    return (
      <>
         <div id="addNewJ">
             <h2 style={{backgroundColor:"lightblue",width:105}}>Add Job</h2>
             <form id="addNewJob" onSubmit={handleSubmit}>
        
         <div>    <input type='text' placeholder='Car Id' disabled value={cid} onChange={({target})=> setNewCarId(target.value)}/></div>
         <div>     <input type='text' placeholder='Job'  value={newJob} onChange={({target})=> setNewJob(target.value)}/></div>
         <div>    <input type='text' placeholder='Parts' value={newParts} onChange={({target})=> setNewParts(target.value)}/></div>
         <div>    <input type='text' placeholder='Price' value={newPrice} onChange={({target})=> setNewPrice(target.value)}/></div>
         {/* <div>   <input type='datetime-local'  placeholder='date' value={new Date().toISOString().substring(0,21)} onChange={({target})=> setNewDate(target.value)}/></div> */}
         <div>    <input type='text' placeholder='Km' value={newKm} onChange={({target})=> setNewKm(target.value)}/></div>
         <div>    <input type='text' placeholder='Picture Url' value={newPicture} onChange={({target})=> setNewPicture(target.value)}/></div>
        <div style={{backgroundColor:"white",width:185}}>     <input type="file" multiple accept="image/*" onChange={onImageChange}/> </div>
        
            <input type='submit' value="Submit"/>
            <input type="button" value="back" onClick={()=> setAddJob(false)}></input>
             </form>
         </div>
       </>
    );
  
}
export default MaintenanceAdd