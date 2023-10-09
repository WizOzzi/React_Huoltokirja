import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import CarList from './CarList';
import Message from './Message';
import CarAdd from './CarAdd';
import background from "./img/garage.jpg";

import MaintenanceAdd from './MaintenanceAdd';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
//import { Navbar, Nav } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login';
import Users from './Users';


function App() {

  const [addCar, setAddCar] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [isPositive, setIsPositive] = useState(false)
  
  const [cid,setCid]=useState('')
  const [showMaintenance, setShowMaintenance] = useState(false)
  const [reload, setReload] = useState('')
  const [reloadMaintenance, setReloadMaintenance] = useState('')
  const [maintenance, setMaintenance] = useState([])
  const [loggedInUser, setLoggedInUser] = useState('')
  const [accessLevel3,setAccessLevel3] = useState(false)
  const [accessLevel2,setAccessLevel2] = useState(false)
 

  useEffect(()=> {
    let storedUser = localStorage.getItem("username")
    if (storedUser!=null){
      setLoggedInUser(storedUser)
    }
  })

  const logOut = ()=>{
    localStorage.setItem("username","");
    setLoggedInUser("")
  }

  return (
    <div id="appMain" style={{height:'100%' , width:'100%' ,backgroundImage: `url(${background})` }}  >
     {/* <div style={{ backgroundImage: `url(${background})` }}>
      Hello World
    </div> */}

{/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">My App</a>
      <a className="navbar-brand" href="#">My Second App</a>
      </nav> */}

{!loggedInUser && <Login setMessage={setMessage} setIsPositive={setIsPositive}
        setShowMessage={setShowMessage} setLoggedInUser={setLoggedInUser} 
        setAccessLevel2={setAccessLevel2} setAccessLevel3={setAccessLevel3} />}
    {showMessage && <Message message={message} isPositive={isPositive} />}

    {loggedInUser &&  <Router>
    <Navbar bg="dark" variant="dark">
    <Nav className='link'>
    <Nav.Link href='/Carlist' className='nav-link'>Näytä autot</Nav.Link>
     {/* <button className='nav-link' onClick={()=>setAddCar(!addCar)}>Lisää auto</button> */}
     <Nav.Link href='/Users' className='nav-link'>Käyttäjät</Nav.Link>
     <button className='nav-link' onClick={logOut}>Kirjaudu ulos</button>  
    </Nav>
    </Navbar>
    <Routes>
        <Route exact path="/Carlist" element={ <CarList addcar={addCar} setAddCar={setAddCar}  setIsPositive={setIsPositive} message={message} setMessage={setMessage} setShowMessage={setShowMessage} showMessage={showMessage}  setCid={setCid} cid={cid} showMaintenance={showMaintenance} setShowMaintenance={setShowMaintenance} reloadMaintenance={reloadMaintenance} setReloadMaintenance={setReloadMaintenance} setMaintenance={setMaintenance} maintenance={maintenance} reload={reload} setReload={setReload} />}></Route>
        <Route exact path="/Users" element={<Users  />}></Route>
    </Routes>
         
        {addCar && <CarAdd setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage} setAddCar={setAddCar} />}
    </Router>}
        {/* <NavBar addCar={addCar} setAddCar={setAddCar}/>
    
       {showMessage && <Message message={message} isPositive={isPositive}  />}
     {!addCar &&  <CarList setAddCar={setAddCar}  setIsPositive={setIsPositive} message={message} setMessage={setMessage} setShowMessage={setShowMessage} showMessage={showMessage}  setCid={setCid} cid={cid} showMaintenance={showMaintenance} setShowMaintenance={setShowMaintenance} reloadMaintenance={reloadMaintenance} setReloadMaintenance={setReloadMaintenance} setMaintenance={setMaintenance} maintenance={maintenance} reload={reload} setReload={setReload} />}
     {addCar && <CarAdd setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage} setAddCar={setAddCar} />}
     
    {/* <img src={background} width={700}/> */}
    
    </div>
  );
}

export default App;
