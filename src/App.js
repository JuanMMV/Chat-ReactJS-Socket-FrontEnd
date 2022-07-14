import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChatScreen from './pages/ChatScreen'
import LoginScreen from './pages/LoginScreen'
import RegisterScreen from './pages/RegisterScreen'
import SetAvatarScreen from './pages/SetAvatarScreen'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/setAvatar' element={<SetAvatarScreen />} />
        <Route path='/' element={<ChatScreen />} />
      </Routes>
    </BrowserRouter>
  )
}