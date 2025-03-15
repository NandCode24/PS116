import React from 'react'
import TutorRegister from '../../pages/tutor/TutorRegister'
import { Outlet } from 'react-router-dom'

function TutorRegisterLayout() {
  return (
    <div className='commonLayout'>
        <TutorRegister />
        <div className='commonLayoutInfo'><Outlet /></div>
    </div>
  )
}

export default TutorRegisterLayout