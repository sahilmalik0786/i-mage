import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthPage = () => {
  return (
    <div className=' h-[calc(100vh-64px)] w-full bg-primary-light dark:bg-primary-dark'>

      <Outlet/>
    </div>
  )
}

export default AuthPage