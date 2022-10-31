import React from 'react'
import { Outlet } from 'react-router-dom'
import SideNavbar from '../Side-NavBar/SideNavbar'

const Home = () => {
  return (
    <div style={{display:"flex"}}>
    <div style={{width:'20%'}}>
    <SideNavbar/>
    </div>
    <div style={{width:'80%',marginLeft:'-10px', overflowX:"scroll"}}>
    <Outlet/>
    </div>
    </div>
  )
}

export default Home