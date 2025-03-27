import React from 'react'
import './App.css'
import Intro from './pages/Intro'

import InstituteHomeLayout from './layout/institute/InstituteHomeLayout'
import InstituteHome from './pages/institute/InstituteHome'
import InstituteCourses from './pages/institute/InstituteCourses'

import ParentHomeLayout from './layout/parent/ParentHomeLayout'
import ParentHome from './pages/parent/ParentHome'
import ParentEnrolled from './pages/parent/ParentEnrolled'

import StudentHomeLayout from './layout/student/StudentHomeLayout'
import StudentHome from './pages/student/StudentHome'
import StudentEnrolled from './pages/student/StudentEnrolled'

import TutorHomeLayout from './layout/tutor/TutorHomeLayout'
import TutorHome from './pages/tutor/TutorHome'
import TutorCourses from './pages/tutor/TutorCourses'
import TutorCreateCourse from "./components/tutorcompo/TutorCreateCourse.jsx";

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

import TutorCreateCourse from "./components/tutorcompo/TutorCreateCourse.jsx";
import ParentRegisterLayout from './layout/parent/ParentRegisterLayout'
import ParentLogin from './components/parentcompo/ParentLogin'
import ParentSignup from './components/parentcompo/ParentSignup'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Intro />} />

{/* USERS REGISTER ROUTES */}
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
{/* USERS HOME ROUES */}
        <Route path='studenthome' element={<StudentHomeLayout />}>
          <Route index element={<StudentHome />}/>
          <Route path='studentenrolled' element={<StudentEnrolled />}/> 
        </Route>

        <Route path='parenthome' element={<ParentHomeLayout />}>
          <Route index element={<ParentHome />}/>
          <Route path='parentenrolled' element={<ParentEnrolled />}/> 
        </Route>

        <Route path='tutorhome' element={<TutorHomeLayout />}>
          <Route index element={<TutorHome />}/>
          <Route path='tutorcourses' element={<TutorCourses />}/> 
          <Route path='tutorcreatecourse' element={<TutorCreateCourse />}/>
        </Route>

        <Route path='institutehome' element={<InstituteHomeLayout />}>
          <Route index element={<InstituteHome />}/>
          <Route path='institutecourses' element={<InstituteCourses />}/> 
        </Route>
        
      </>
    )
  )

  return (
    
      <RouterProvider router={router}/>
    
  )
}

export default App
