import React from 'react'
import ParentNavbar from '../../components/parentcompo/ParentNavbar'
import { Outlet } from 'react-router-dom'

function ParentHomeLayout() {
  return (
    <div>
        <ParentNavbar />
        <Outlet />
    </div>
  )
}

export default ParentHomeLayout