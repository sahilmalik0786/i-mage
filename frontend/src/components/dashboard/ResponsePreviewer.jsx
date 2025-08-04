import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {motion} from "motion/react"
import {  RiCheckFill, RiFileCopy2Line } from '@remixicon/react'
import { toast } from 'react-toastify'

const ResponsePreviewer = () => {
    const {loading , res , error} = useSelector((state)=>state.post)
    const [copied , setCopied] = useState(false)
    const handleClick = ()=>{
       !copied &&  navigator.clipboard.writeText(res).then(()=>{
        toast('copied successfully')
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
        }, 3000);
      })
      console.log('hlelo')
    }

  return (
    <div className='w-full  h-fit p-2'>
       Response
       {!loading && error==null && <motion.div className='w-full border rounded p-2 relative' animate={{opacity:1,scale:1}} initial={{opacity:0,scale:0}}>
           <button className='absolute top-1 right-1 cursor-pointer' onClick={handleClick}>
            {!copied ? <RiFileCopy2Line size={20} /> : <RiCheckFill color='green'/>}
           </button>
         <h1 className='text-lg '>
            {res}
         </h1>
        
        </motion.div>}
         {loading && <div className='space-y-2 p-2 border rounded'>
             <div className='w-full h-4 animate-pulse bg-black/60'></div>
             <div className='w-full h-4 animate-pulse bg-black/60'></div>
             <div className='w-full h-4 animate-pulse bg-black/60'></div>
         </div> }
    </div>
  )
}

export default ResponsePreviewer