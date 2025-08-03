import React, { useState } from 'react'
import { AnimatePresence, motion } from "motion/react";
import { RiCollapseDiagonal2Line, RiCollapseDiagonalLine } from '@remixicon/react';

const Sidebar = ({collapsed , toggle}) => {
   
  return (
    <motion.div className=' h-[calc(100vh-64px)] sticky left-0 bg-primary-light dark:bg-dash-dark p-1' initial={{width:'280px'}} animate={collapsed?{width:'40px'}:{width:'280px'}}>
        <div>
           <div className="head w-full justify-end flex pr-1 items-center">
            <AnimatePresence initial={false} >
                {collapsed ? <motion.div key='no-collapse'onTap={toggle} initial={{opacity:0,scale:0}} exit={{opacity:0,scale:0 }}  animate={{opacity:1,scale:1 }}
                    className='cursor-pointer'
                    >
                    <RiCollapseDiagonal2Line size={20} />
                </motion.div> : <motion.div key='collapse' onTap={toggle} initial={{opacity:0,scale:0}} exit={{opacity:0,scale:0}} animate={{opacity:1,scale:1 }}
                      className='cursor-pointer'
                    >
                    <RiCollapseDiagonalLine size={20} />
                    </motion.div>}
                </AnimatePresence>      
            
           </div>
        </div>
    </motion.div>
  )
}

export default Sidebar