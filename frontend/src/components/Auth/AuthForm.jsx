import React from 'react'
import { useParams } from 'react-router-dom'
import SignUp from './SignUp'
import Login from './Login'


const AuthForm = () => {
    const {type} = useParams()
    
  return (
    <div className='h-full w-full'>
        
            {type=='signup' ? <SignUp/> : <Login/>}
        
    </div>
  )
}

export default AuthForm