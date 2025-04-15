import React from 'react'
import StudentNavbar from '../../components/studentcompo/StudentNavbar'
import { Outlet } from 'react-router-dom'

function StudentHomeLayout() {
  return (
    <div>
        <StudentNavbar />
        <Outlet />
    </div>
  )
}

export default StudentHomeLayout