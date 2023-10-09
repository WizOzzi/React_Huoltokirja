
import './App.css';
import React,{useState} from 'react';
import CarService from './services/Car'



//<h2 onClick={() => setShowCustomers(!showCustomers)}>Customers</h2>

const CarAdd = ({setAddCar, setIsPositive, setShowMessage, setMessage})  =>{

  //const [newCarId, setNewCarId] = useState('')
  
  const [newLicensePlate, setNewLicensePlate] = useState('')
  const [newBrand, setNewBrand] = useState('')
  const [newModel,setNewModel] = useState('')
  const [newYear, setNewYear] = useState('')
  const [newKm, setNewKm] = useState('')
  const [newOwner, setNewOwner] = useState('')
 

  //const [value2,setValue2] = useState('')                               //Only 0-9 allowed
  //pattern="[0-9]*"  value2={value2}  onChange={(e) => setValue2((v) =>
   //  (e.target.validity.valid ? e.target.value2 : v))}
const handleSubmit = (event) => {
event.preventDefault()
var newCar = {
  
  licensePlate: newLicensePlate,
  brand: newBrand,
  model: newModel,
  year: newYear,
  km: newKm,
  owner: newOwner
  
}
CarService.create(newCar)
.then(response => {
  if(response.status===200){
    setIsPositive(true)
    setMessage("Added new Car: " + newCar.licensePlate)
   
    setShowMessage(true)
   
    setTimeout(() => {
setShowMessage(false)
    },3000)

    setAddCar(false)
    
  }

}).catch((error) => {
  if (error.response){
 setMessage("Lisäys epäonnistui!")
 setIsPositive(false)
 setShowMessage(true)
 setTimeout(() =>{
 setShowMessage(false)
    },3000)
    setAddCar(false)
}})


}

  return (
    <>
       <div id="addNew">
           <h2  style={{width:150,backgroundColor:"lightblue",position: "relative",top:5,left:0}}>Add a car</h2>
           <form id="addNewCar" onSubmit={handleSubmit}>
      
       <div>    <input type='text' placeholder='License Plate'  value={newLicensePlate} onChange={({target})=> setNewLicensePlate(target.value)}/></div>
       <div>     <input type='text' placeholder='Brand'  value={newBrand} onChange={({target})=> setNewBrand(target.value)}/></div>
       <div>    <input type='text' placeholder='Model' value={newModel} onChange={({target})=> setNewModel(target.value)}/></div>
       <div>    <input type='text' placeholder='Year' value={newYear} onChange={({target})=> setNewYear(target.value)}/></div>
       <div>   <input type='text' placeholder='Km' value={newKm} onChange={({target})=> setNewKm(target.value)}/></div>
       <div>    <input type='text' placeholder='Owner' value={newOwner} onChange={({target})=> setNewOwner(target.value)}/></div>
      
      
          <input type='submit' value="Submit"/>
          <input type="button" value="back" onClick={()=> setAddCar(false)}></input>
           </form>
       </div>
     </>
  );
}

export default CarAdd;
