import React from 'react'
import ParentRegister from '../../pages/parent/ParentRegister'
import { Outlet } from 'react-router-dom'

function ParentRegisterLayout() {
  return (
    <div>
        <ParentRegister />
        <Outlet />
    </div>
  )
}

export default ParentRegisterLayout