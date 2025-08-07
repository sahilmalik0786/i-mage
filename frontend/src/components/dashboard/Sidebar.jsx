import React, { useState } from 'react'
import { AnimatePresence, motion } from "motion/react";
import { RiCollapseDiagonal2Line, RiCollapseDiagonalLine } from '@remixicon/react';
import {useDispatch, useSelector} from 'react-redux'
import { verfifyEmail } from '../../store/features/userSlice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { userHistory } from '../../store/features/userHistorySlice';
import HistorySection from '../HistorySection';

const Sidebar = ({collapsed , toggle}) => {
  const dispatch = useDispatch()
  const {user , status , mailinitialized} = useSelector((state)=>state.user)
  const {userhistory , loading , error} = useSelector((state)=>state.history)
  
  useEffect(()=>{
       const fetchHistory = async()=>{
       await dispatch(userHistory()).unwrap()
       }
       fetchHistory()
  },[])

  const handleEmailVerify = async()=>{
    
      try {
        const data = {email:user.email}
        await dispatch(verfifyEmail(data)).unwrap()
        toast.success(status)
        
      } catch (error) {
        toast.error(status)
      }
  }
  return (
    <motion.div className=' h-[calc(100vh-64px)] sticky left-0 bg-primary-light dark:bg-dash-dark p-1' initial={{width:'280px'}} animate={collapsed?{width:'50px'}:{width:'280px'}}>
        <div className='flex ga flex-col h-full  justify-end'>
           <div className={`head flex ${!collapsed ? 'justify-end p-2' :' p-2 justify-end '} items-center`}>
            
                <motion.div key='no-collapse' onTap={toggle}  initial={{opacity:0,scale:0}} exit={{opacity:0,scale:0 }}  animate={{opacity:1,scale:1 }} transition={{duration:0.1}}
                    className='cursor-pointer '
                    >
                    <RiCollapseDiagonal2Line size={20} />
                </motion.div> 
                   
                    
             
           </div>
         {!collapsed &&   <div className=' p-4 '>
            <h1 className='truncate'>
              Ohh hey! there
            </h1>
            <div className='mt-1 bg-secondary-light dark:bg-secondary-dark p-1 rounded h-8/12 pb-5'> history
<div className=' mt-2 rounded p-1 flex i gap-1 flex-col h-11/12 overflow-y-auto scrollbar-hide'>
              
              {Array.isArray(userhistory) && userhistory.length > 0 ?  userhistory.map((el,i)=>{
               return <HistorySection data={el} />
              })
               : 'there is no usage'}
             </div>
            </div>
             {!user.isVerified ? <div className='p-1 mt-2 h-fit bg-dash-dark dark:bg-dash-light dark:text-black text-white rounded'>
                <h2 className='text-sm   '>
                  your email is not verified ! please verify your email to use the application
                </h2> {mailinitialized ? 'mail has been sent' : <button className='bg-accent-dark dark:bg-accent-light text-black dark:text-white px-2 mt-1 rounded animate-pulse  cursor-pointer transition-all duration-700' onClick={handleEmailVerify}>
                 {'verify'}
                </button>}
              </div> : ''}
           </div>}
           <div className=' justify-between  flex flex-1 items-end   h-fit p-1  '>
          {!collapsed && <div className='flex infoSec flex-col truncate  p-1 ' >
              {user.username}
              <span className='text-sm truncate'>
                {user.email}
              </span>
            </div>}
           <div className={' h-10 rounded-full flex '}>
            <img src={user.avatar} className='w-full h-full object-cover' alt="" />
            
           </div>
           </div>
        </div>
    </motion.div>
  )
}

export default Sidebar