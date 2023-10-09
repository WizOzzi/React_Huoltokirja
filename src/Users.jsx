import { useState,useEffect } from "react";
import UserService from "./services/User";


const Users=()=>{

const[users,setUsers]=useState([])


useEffect(() =>{
    UserService.getAll()
    .then(data=>{setUsers(data)})
    
})


    


return(
<>    
   {users && users.map(u=>{return( 
    <table>
        <thead>
            <tr >
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Username</th>
                <th>Password</th>
                <th>Accesslevelid</th>
                
            </tr>
        </thead>
        <tbody>
            <tr key={u.userId}>
                <td>{u.firstname}</td>
                <td>{u.lastname}</td>
                <td>{u.email}</td>
                <td>{u.username}</td>
                <td>{u.password}</td>
                <td>{u.accesslevelid}</td>
                
            </tr>
        </tbody>
        
       
   
        
    </table>
   

)})

}
</>)}
export default Users