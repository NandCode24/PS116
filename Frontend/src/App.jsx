import React from 'react'
import './App.css'
import Intro from './pages/Intro'
import InstituteHome from './pages/institute/InstituteHome'
import ParentHome from './pages/parent/ParentHome'
import StudentHome from './pages/student/StudentHome'
import TutorHome from './pages/tutor/TutorHome'
import StudentRegister from './pages/student/StudentRegister'
import TutorRegister from './pages/tutor/TutorRegister'
import ParentRegister from './pages/parent/ParentRegister'
import InstituteRegister from './pages/institute/InstituteRegister'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

import InstituteRegisterLayout from './layout/institute/InstituteRegisterLayout'
import InstituteLogin from './components/institutecompo/InstituteLogin'
import InstituteSignup from './components/institutecompo/InstituteSignup'

import StudentRegisterLayout from './layout/student/StudentRegisterLayout'
import StudentLogin from './components/studentcompo/StudentLogin'
import StudentSignup from './components/studentcompo/StudentSignup'

import TutorRegisterLayout from './layout/tutor/TutorRegisterLayout'
import TutorLogin from './components/tutorcompo/TutorLogin'
import TutorSignup from './components/tutorcompo/TutorSignup'

import ParentRegisterLayout from './layout/parent/ParentRegisterLayout'
import ParentLogin from './components/parentcompo/ParentLogin'
import ParentSignup from './components/parentcompo/ParentSignup'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Intro />} />
        <Route path='studentregister' element={<StudentRegisterLayout />}>
          <Route path='studentlogin' element={<StudentLogin />}/>
          <Route path='studentsignup' element={<StudentSignup />}/>
        </Route>

        <Route path='tutorregister' element={<TutorRegisterLayout />}>
          <Route path='tutorlogin' element={<TutorLogin />}/>
          <Route path='tutorsignup' element={<TutorSignup />}/>
        </Route>

        <Route path='parentregister' element={<ParentRegisterLayout />}>
          <Route path='parentlogin' element={<ParentLogin />}/>
          <Route path='parentsignup' element={<ParentSignup />}/>
        </Route>

        <Route path='instituteregister' element={<InstituteRegisterLayout />}>
          <Route path='institutelogin' element={<InstituteLogin />}/>
          <Route path='institutesignup' element={<InstituteSignup />}/>
        </Route>

      </>
    )
  )

  return (
    
      <RouterProvider router={router}/>
    
  )
}

export default App
