import React from 'react'
import StudentRegister from '../../pages/student/StudentRegister'
import { Outlet } from 'react-router-dom'

function StudentRegisterLayout() {
  return (
    <div className='commonLayout'>
        <StudentRegister />
        <div className='commonLayoutInfo'><Outlet /></div>
    </div>
  )
}

export default StudentRegisterLayout