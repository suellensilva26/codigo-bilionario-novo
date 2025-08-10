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
import Layout from './components/layout/Layout'

function App() {
  console.log('🎯 App carregado - PROJETO NOVO FUNCIONANDO!')
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Navigate to="/courses" replace />} />
        <Route path="/landing" element={<Layout><Landing /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/courses" element={<Layout><Courses /></Layout>} />
        <Route path="/course/:courseId" element={<Layout><CourseDetail /></Layout>} />

        {/* Privadas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout><Dashboard /></Layout>
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
              <Layout><Subscription /></Layout>
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </div>
  )
}

export default App