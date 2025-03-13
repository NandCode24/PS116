import { useState } from 'react'
import React from 'react'
import './App.css'
import Intro from './pages/Intro'
import InstituteHome from './pages/institute/InstituteHome'
import ParentHome from './pages/parent/ParentHome'
import StudentHome from './pages/student/StudentHome'
import TutorHome from './pages/tutor/TutorHome'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'



function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Intro />} />
        <Route path='student' element={<StudentHome />}/>
        <Route path='tutor' element={<TutorHome />}/>
        <Route path='parent' element={<ParentHome />}/>
        <Route path='institute' element={<InstituteHome />}/>
      </>
    )
  )

  return (
    
      <RouterProvider router={router}/>
    
  )
}

export default App
