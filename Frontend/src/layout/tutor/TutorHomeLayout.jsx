import React from 'react'
import TutorNavbar from '../../components/tutorcompo/TutorNavbar'
import { Outlet } from 'react-router-dom'

function TutorHomeLayout() {
  return (
    <div>
        <TutorNavbar />
        <Outlet />
    </div>
  )
}

export default TutorHomeLayout