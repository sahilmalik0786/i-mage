import React, { useState } from 'react'
import { AnimatePresence, motion } from "motion/react";
import { RiCollapseDiagonal2Line, RiCollapseDiagonalLine } from '@remixicon/react';

const Sidebar = ({collapsed , toggle}) => {
   
  return (
    <motion.div className=' h-[calc(100vh-64px)] sticky left-0 bg-primary-light dark:bg-dash-dark p-1' initial={{width:'280px'}} animate={collapsed?{width:'50px'}:{width:'280px'}}>
        <div className='flex gap-3 flex-col h-full '>
           <div className={`head  flex ${!collapsed ? 'justify-end p-2' :' p-2 justify-center '} items-center`}>
            <AnimatePresence initial={false} >
                {collapsed ? <motion.div key='no-collapse'onTap={toggle} initial={{opacity:0,scale:0}} exit={{opacity:0,scale:0 }}  animate={{opacity:1,scale:1 }} transition={{duration:0.1}}
                    className='cursor-pointer '
                    >
                    <RiCollapseDiagonal2Line size={20} />
                </motion.div> : <motion.div key='collapse' onTap={toggle} initial={{opacity:0,scale:0 }} exit={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:0.4}}
                      className='cursor-pointer '
                    >
                    <RiCollapseDiagonalLine size={20} />
                    </motion.div>}
                </AnimatePresence>      
             
           </div>
         {!collapsed &&   <div className='mt-4 p-4 '>
            <h1 className='truncate'>
              Ohh hey! there
            </h1>
             
           </div>}
           <div className='flex justify-between  flex-1 items-end  w-full h-15 p-1 '>
          {!collapsed && <div className='flex infoSec flex-col truncate  p-1 ' >
              username 
              <span className='text-sm'>
                email@email.com
              </span>
            </div>}
           <div className={`${collapsed ? 'w-full': 'w-10'} h-10 rounded-full flex '`}>
            <img src="/images/ima.png" className='w-full h-full object-cover' alt="" />

           </div>
           </div>
        </div>
    </motion.div>
  )
}

export default Sidebar