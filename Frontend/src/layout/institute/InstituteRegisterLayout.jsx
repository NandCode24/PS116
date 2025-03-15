import React from 'react'
import InstituteRegister from '../../pages/institute/InstituteRegister'
import { Outlet } from 'react-router-dom'

function InstituteRegisterLayout() {
  return (
    <div>
        <InstituteRegister />
        <Outlet />
    </div>
  )
}

export default InstituteRegisterLayout