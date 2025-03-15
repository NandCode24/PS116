import React from 'react'
import TutorRegister from '../../pages/tutor/TutorRegister'
import { Outlet } from 'react-router-dom'

function TutorRegisterLayout() {
  return (
    <div>
        <TutorRegister />
        <Outlet />
    </div>
  )
}

export default TutorRegisterLayout