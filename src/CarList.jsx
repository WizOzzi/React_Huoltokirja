
import { useState,useEffect } from "react";
import CarService from "./services/Car";
import MaintenanceAdd from "./MaintenanceAdd";
import MaintenanceService from "./services/Maintenance";
import CarEdit from "./CarEdit";

const CarList = ({addcar,setAddCar, setMessage,setShowMessage, showMessage , setIsPositive, setCid,cid, showMaintenance, setShowMaintenance, reloadMaintenance,setReloadMaintenance, maintenance, setMaintenance,reload,setReload}) => {
    
    const [reloadEdit,setReloadEdit]=useState(false)
    const [modifiedCar, setModifiedCar]=useState([])
    const [showEditCar, setShowEditCar]= useState(false)
    const [addJob, setAddJob] = useState(false)
    const [carList, setCarList] = useState([])
   const [car, setCar] = useState([])
   const [search, setSearch] = useState("")
   // const [maintenance, setMaintenance] = useState([])
   // const [showMaintenance, setShowMaintenance] = useState(false)
    

const DeleteCar = (c) =>{
    let confirm = window.confirm("Delete car: " + c.licensePlate)
    if(confirm===true){

    CarService.deletecar(c.carId)
    .then(Response => {
        if(Response.status===200){
            setMessage("Car:" + c.licensePlate + " Deleted")
            setShowMessage(true)
            setIsPositive(true)
            setReload(!reload)
            
setTimeout(()=>{
    
setShowMessage(false)
},3000)
}})

    }}

const EditCar = (c) =>{
setShowMaintenance(false)
//    setReloadEdit(!reloadEdit)
setModifiedCar(c)

 setShowEditCar(true)
 CarService.getOne(c.carId)
 .then(data => setCar(data))

}



const carMaintenances = (c) =>{
    setCid(c.carId)
    setShowMaintenance(!showMaintenance)
    setMaintenance('')
       MaintenanceService.getOne(c.carId)
       .then(data => {setMaintenance(data)})

       CarService.getOne(c.carId)
       .then(data => setCar(data))
       setTimeout(()=>{
        setShowMaintenance(true)
       },200)
       

}

   //Hakukentän onChange tapahtumakäsittelijä
   const handleSearchInputChange = (event) => {
    
    
    setSearch(event.target.value.toLowerCase())
   }
const deleteMaintenance = (c) => {
    let confirm = window.confirm("Delete maintenance Id:" + c.maintenanceId)
    if(confirm===true){
        setShowMessage(!showMessage)
        setMessage("Maintenance Id:" + c.maintenanceId + " deleted")
MaintenanceService.deleteJob(c.maintenanceId)
setTimeout(()=>{
    setReloadMaintenance(!reloadMaintenance)
},100)
setTimeout(()=>{
    setShowMessage(false)
},3000)



}}

const hide =()=>{
    setShowMaintenance(!showMaintenance)
    setAddJob(false)
}

useEffect(()=>{
    CarService.getAll()
    .then(data => {
        setCarList(data)})
},[reload,reloadEdit])

//  useEffect(() => {
//     MaintenanceService.getOne(cid)
//     .then(data=>{setMaintenance(data)})
// },[reloadMaintenance])




return(
    <>
     { (showEditCar || showMaintenance) && <h3 style={{paddingTop:10,width:480,backgroundColor:"lightblue"}} >--------------------CAR----------------------</h3>}
    {  (showEditCar || showMaintenance) && car && car.map(car=> {return (
        <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>License plate</th>
                <th className="th">Brand</th>
                <th className="th">Model</th>
                <th className="th">Year</th>
                <th className="th">Km</th>
                <th className="th">Owner</th>
                
            </tr>
        </thead>
        <tbody>
            <tr key={car.carId}>
                <td>{car.carId}</td>
                <td className="carList">{car.licensePlate}</td>
                <td className="th">{car.brand}</td>
                <td className="th">{car.model}</td>
                <td className="th">{car.year}</td>
                <td className="th">{car.km}</td>
                <td className="th">{car.owner}</td>
                
            </tr>
        </tbody>
        
       
       
       
       </table>
       
    )})}
    {showMaintenance && <h3 style={{width:480,backgroundColor:"lightblue"}}>-------------------MAINTENANCE------------------------</h3>}
    {showMaintenance && maintenance && maintenance.map(c =>{return(
         <table>
         <thead>
             <tr>
                 <th className="maintenance">Maintenance Id</th>
                 <th className="carid">Car Id</th>
                 <th className="job">Job</th>
                 <th className="parts">Parts</th>
                 <th className="price">Price</th>
                 <th className="km">Km</th>
                 <th className="date">Date</th>
                 <th className="picture">Picture</th>
             </tr>
         </thead>
         <tbody>
             <tr key={c.maintenanceId}>
                 <td className="maintenance">{c.maintenanceId}</td>
                 <td className="carid">{c.carId}</td>
                 <td className="job">{c.job}</td>
                 <td className="parts">{c.parts}</td>
                 <td className="price">{c.price}</td>
                 <td className="km">{c.km}</td>
                 <td className="date">{c.date}</td>
                 <td className="picture"><img  width="50" src={c.picture}/></td>
                 <td><button type="button" id="delmainte" onClick={() => deleteMaintenance(c)}>Delete</button></td>
             </tr>
         </tbody>
         
        
    
     
     </table>
     
    )})}
    {showMaintenance && <button onClick={()=> setAddJob(true)} id="addJob">Add</button>}
    {showMaintenance && <button id="hideMaintenance" onClick={hide} >Hide</button>}
    {addJob && <MaintenanceAdd setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage} addJob={addJob} setAddJob={setAddJob} cid={cid} setShowMaintenance={setShowMaintenance} showMaintenance={showMaintenance} setReloadMaintenance={setReloadMaintenance} reloadMaintenance={reloadMaintenance} setMaintenance={setMaintenance} maintenance={maintenance}/>}
    { !showMaintenance &&  !showEditCar && <h3 style={{width:55,backgroundColor:"lightblue",position: "relative",top:5,left:200}}>Cars</h3>} 
    {!showMaintenance && !showEditCar &&<input style={{position: "relative",top:5,left:145}} placeholder='Search by license plate' value ={search} onChange={handleSearchInputChange}></input>}
    {!showMaintenance && !showEditCar &&carList.map(c =>  { const lowerCaseName = c.licensePlate.toLowerCase()
                        if (lowerCaseName.indexOf(search) !== -1) {
                        return( <table style={{position:"relative", top:15}}>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>License plate</th>
                                    <th>Brand</th>
                                    <th>Model</th>
                                    <th>Year</th>
                                    <th>Km</th>
                                    <th>Owner</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={c.carId}>
                                    <td>{c.carId}</td>
                                    <td className="carList">{c.licensePlate}</td>
                                    <td>{c.brand}</td>
                                    <td className="carList">{c.model}</td>
                                    <td>{c.year}</td>
                                    <td>{c.km}</td>
                                    <td>{c.owner}</td>
                                    <td><button onClick= {() =>DeleteCar(c)}>Delete</button></td>
                                    <td><button onClick= {() =>EditCar(c)}>Edit</button></td>
                                    <td><button onClick= {() =>carMaintenances(c)}>Maintenance</button></td>
                                </tr>
                            </tbody>
                            
                           
                           
                           
                           </table>

                        )}})}
      {showEditCar && <CarEdit reloadMaintenance={reloadMaintenance} setReloadMaintenance={setReloadMaintenance} setReloadEdit={setReloadEdit} reloadEdit={reloadEdit} setShowEditCar={setShowEditCar} showEditCar={showEditCar} modifiedCar={modifiedCar} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}
      {!showMaintenance &&  !showEditCar && !addcar && <h3 style={{width:117,position: "relative",top:30,left:200}}><button  onClick={()=> setAddCar(true)}>Add</button></h3>}                   
      { !showMaintenance && !showEditCar && addcar && <h3 style={{width:117,position: "relative",top:30,left:200}}><button  onClick={()=> setAddCar(false)}>Hide</button></h3>}   
    </>
)

}
export default CarList;
