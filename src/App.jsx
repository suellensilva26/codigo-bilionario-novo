import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'

function App() {
  console.log('🎯 App carregado - PROJETO NOVO FUNCIONANDO!')
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
      </Routes>
    </div>
  )
}

export default App