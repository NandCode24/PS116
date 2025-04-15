import React from 'react'
import InstituteNavbar from '../../components/institutecompo/InstituteNavbar'
import { Outlet } from 'react-router-dom'

function InstituteHomeLayout() {
  return (
    <div>
        <InstituteNavbar />
        <Outlet />
    </div>
  )
}

export default InstituteHomeLayout