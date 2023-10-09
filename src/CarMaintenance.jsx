import { useState } from "react";
import Maintenance from "./services/Maintenance";


const CarMaintenance= ({showMessage,maintenance })=>{

    


return(
    
    <table>
        <thead>
            <tr>
                <th>Maintenance Id</th>
                <th>Car Id</th>
                <th>Job</th>
                <th>Parts</th>
                <th>Price</th>
                <th>Km</th>
                <th>Picture</th>
            </tr>
        </thead>
        <tbody>
            <tr key={maintenance.maintenanceId}>
                <td>{maintenance.maintenanceId}</td>
                <td>{maintenance.carId}</td>
                <td>{maintenance.job}</td>
                <td>{maintenance.parts}</td>
                <td>{maintenance.price}</td>
                <td>{maintenance.km}</td>
                <td>{maintenance.picture}</td>
            </tr>
        </tbody>
        
       
   
        
    </table>
   

)

}
export default CarMaintenance