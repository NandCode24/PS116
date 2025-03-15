import React from 'react'
import StudentRegister from '../../pages/student/StudentRegister'
import { Outlet } from 'react-router-dom'

function StudentRegisterLayout() {
  return (
    <div>
        <StudentRegister />
        <Outlet />
    </div>
  )
}

export default StudentRegisterLayout