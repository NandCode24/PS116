import React from 'react'
import InstituteRegister from '../../pages/institute/InstituteRegister'
import { Outlet } from 'react-router-dom'

function InstituteRegisterLayout() {
  return (
    <div className='commonLayout'>
      <InstituteRegister />  
      <div className='commonLayoutInfo'><Outlet /></div>
    </div>
  )
}

export default InstituteRegisterLayout