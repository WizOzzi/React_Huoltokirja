
import './App.css';
import React,{useState} from 'react';
import LoginService from './services/Auth'
import md5 from 'md5';


//<h2 onClick={() => setShowCustomers(!showCustomers)}>Customers</h2>

const Login = ({ setIsPositive, setShowMessage, setMessage,setLoggedInUser, setAccessLevel2 ,setAccessLevel3})  =>{

 
  const [username,setUsername] = useState('')
  const [password, setPassword] = useState('')
 

  //const [value2,setValue2] = useState('')                               //Only 0-9 allowed
  //pattern="[0-9]*"  value2={value2}  onChange={(e) => setValue2((v) =>
   //  (e.target.validity.valid ? e.target.value2 : v))}
  
const handleSubmit = (event) => {
event.preventDefault()
var user = {
 
  username: username,
  password: md5(password),  //salataan salasana md5:lla.
  
}
LoginService.authenticate(user)
.then(response => {
  if(response.status===200){
    localStorage.setItem("username", response.data.username)
    localStorage.setItem("AccesslevelId", response.data.accesslevelId)
    localStorage.setItem("token", response.data.token)
    setLoggedInUser(response.data.username)
    
    if(response.data.accesslevelId >= 2){    //AccessLevel2
      setAccessLevel2(true)}

   if(response.data.accesslevelId === 3){    //AccessLevel3
      
      setAccessLevel3(true)}
    
    console.log("Kirjautuminen onnistui") 
    console.log(response)


    setMessage("Logged in as: " + user.username)
    setIsPositive(true)
    setShowMessage(true)
   
    setTimeout(() => {
setShowMessage(false)
    },3000)

    
    
  }else{
    setMessage("Väärä käyttäjänimi tai salasana!")
    setIsPositive(false)
    setShowMessage(true)
    
    setTimeout(() =>{
    setShowMessage(false)
       },3000)
  }

}).catch(error => {
 setMessage("Väärä käyttäjänimi tai salasana!")
 setIsPositive(false)
 setShowMessage(true)
 
 setTimeout(() =>{
 setShowMessage(false)
    },3000)
   
})


}
//Kenttien tyhjennys
const emptyFields = () =>{
  setUsername("")
  setPassword("")
}

  return (
    <>
     <h2 style={{color:"white",position:'fixed', top:'10px', left:'40%'}}>Welcome to car maintenance database.</h2>
       <div id="login">
           
           <form id="loginForm" onSubmit={handleSubmit}>
          
           <h2 style={{color:"white"}}>User login</h2>          
           
       
       <div style={{fontSize:20}}>    <input type='text' id="username" placeholder='Username' value={username} onChange={({target})=> setUsername(target.value)}/></div>
       <div style={{fontSize:20}}>    <input type='password' id="password" placeholder='Password'  value={password} onChange={({target})=> setPassword(target.value)}/></div>
      <input style={{fontSize:20}} id="loginSubmit" type='submit' value="Login"/>
      <input style={{fontSize:20}} type='button' value='Clear' onClick={emptyFields}/>
      <h3></h3>   
      
           </form>
          
       </div>
     </>
  );
}

export default Login;
