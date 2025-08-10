import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Subscription from './pages/Subscription'
import NotFound from './pages/NotFound'
import Admin from './pages/Admin'
import Profile from './pages/Profile'
import Landing from './pages/Landing'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  console.log('🎯 App carregado - PROJETO NOVO FUNCIONANDO!')
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Navigate to="/courses" replace />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:courseId" element={<CourseDetail />} />

        {/* Privadas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subscription"
          element={
            <ProtectedRoute>
              <Subscription />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App