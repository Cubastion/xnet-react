import React from 'react'
import { Outlet } from 'react-router-dom'
import SideNavbar from '../Side-NavBar/SideNavbar'

const Home = () => {
  return (
    <div>
    <SideNavbar/>
    <Outlet/>
    </div>
  )
}

export default Home