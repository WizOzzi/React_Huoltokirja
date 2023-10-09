import React from "react";
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



const NavBar = ({addCar, setAddCar}) => {

return(
    <>
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">My App</a>
      <a className="navbar-brand" href="#">My Second App</a>
      </nav>
    <Navbar bg="dark" variant="dark">
    <Nav className='link'>
    <Nav.Link href='/Carlist' id="customerLink" className='nav-link'>Lisää auto</Nav.Link>
     <button className='nav-link' onClick={()=>setAddCar(!addCar)}>Lisää auto</button> 
    </Nav>
    </Navbar>
    {/* <Routes>
        <Route exact path="/Carlist" element={ <CarList setAddCar={setAddCar}  setIsPositive={setIsPositive} message={message} setMessage={setMessage} setShowMessage={setShowMessage} showMessage={showMessage}  setCid={setCid} cid={cid} showMaintenance={showMaintenance} setShowMaintenance={setShowMaintenance} reloadMaintenance={reloadMaintenance} setReloadMaintenance={setReloadMaintenance} setMaintenance={setMaintenance} maintenance={maintenance} reload={reload} setReload={setReload} />}></Route>
        </Routes> */}
</>
)
}
export default NavBar;