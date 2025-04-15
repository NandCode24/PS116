import React from 'react'
import ParentRegister from '../../pages/parent/ParentRegister'
import { Outlet } from 'react-router-dom'

function ParentRegisterLayout() {
  return (
    <div className='commonLayout'>
        <ParentRegister />
        <div className='commonLayoutInfo'><Outlet /></div>
    </div>
  )
}

export default ParentRegisterLayout