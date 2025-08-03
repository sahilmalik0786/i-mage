import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import AuthPage from '../pages/AuthPage'
import AuthForm from '../components/Auth/AuthForm'

import ProtectedRoute from '../components/Auth/ProtectedRoute'
import DashboradPage from '../pages/DashboradPage'

const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {index:true , Component:Home},
            {path:"about" , Component: About},
            {path:"contact", Component: Contact},
            {path:'auth' , Component:AuthPage, children:[
               
                {path:':type' , Component:AuthForm}

            ]},
            {path:'dashboard', 
            element:(
            <ProtectedRoute>
                <DashboradPage/>
            </ProtectedRoute>)}
        ],
        
    },
  
])

export default router