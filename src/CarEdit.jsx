
import './App.css';
import React,{useState} from 'react';
import CarService from './services/Car'



//<h2 onClick={() => setShowCustomers(!showCustomers)}>Customers</h2>

const CarEdit = ({setReloadEdit,reloadEdit, setShowEditCar, setIsPositive, setShowMessage, setMessage, modifiedCar,reloadMaintenance,setReloadMaintenance})  =>{

  //const [newCarId, setNewCarId] = useState('')
  
  const [newLicensePlate, setNewLicensePlate] = useState(modifiedCar.licensePlate)
  const [newBrand, setNewBrand] = useState(modifiedCar.brand)
  const [newModel,setNewModel] = useState(modifiedCar.model)
  const [newYear, setNewYear] = useState(modifiedCar.year)
  const [newKm, setNewKm] = useState(modifiedCar.km)
  const [newOwner, setNewOwner] = useState(modifiedCar.owner)
 

  //const [value2,setValue2] = useState('')                               //Only 0-9 allowed
  //pattern="[0-9]*"  value2={value2}  onChange={(e) => setValue2((v) =>
   //  (e.target.validity.valid ? e.target.value2 : v))}
const handleSubmit = (event) => {
event.preventDefault()
var editCar = {
  carId:modifiedCar.carId,
  licensePlate: newLicensePlate,
  brand: newBrand,
  model: newModel,
  year: newYear,
  km: newKm,
  owner: newOwner
  
}
CarService.editcar(editCar)
.then(response => {
  if(response.status===200){
    
    setShowEditCar(false)
    setReloadMaintenance(!reloadMaintenance)
    setReloadEdit(!reloadEdit)

    setIsPositive(true)
    setMessage("Edited Car: " + editCar.licensePlate)
   
    setShowMessage(true)
   
    setTimeout(() => {
setShowMessage(false)

    },3000)
   
    
  }

}).catch((error) => {
  if (error.response){
 setMessage("Edit failed!")
 setIsPositive(false)
 setShowMessage(true)
 setTimeout(() =>{
 setShowMessage(false)
    },3000)
    setShowEditCar(false)
}})



}
const back=()=>{
  setShowEditCar(false)
  setReloadMaintenance(!reloadMaintenance)
  setReloadEdit(!reloadEdit)
}
  return (
    <>
       <div id="editCars">
           <h2>Edit car</h2>
           <form id="editCar" onSubmit={handleSubmit}>
      
       <div>    <input type='text' placeholder='License Plate'  value={newLicensePlate} onChange={({target})=> setNewLicensePlate(target.value)}/></div>
       <div>     <input type='text' placeholder='Brand'  value={newBrand} onChange={({target})=> setNewBrand(target.value)}/></div>
       <div>    <input type='text' placeholder='Model' value={newModel} onChange={({target})=> setNewModel(target.value)}/></div>
       <div>    <input type='text' placeholder='Year' value={newYear} onChange={({target})=> setNewYear(target.value)}/></div>
       <div>   <input type='text' placeholder='Km' value={newKm} onChange={({target})=> setNewKm(target.value)}/></div>
       <div>    <input type='text' placeholder='Owner' value={newOwner} onChange={({target})=> setNewOwner(target.value)}/></div>
      
      
          <input type='submit' value="Submit"/>
          <input type="button" value="back" onClick={back}/>
           </form>
       </div>
     </>
  );
}

export default CarEdit;
