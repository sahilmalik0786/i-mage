import React from 'react'

const HistorySection = ({data}) => {
    
  return (
      <div>
          
       
           <div className='flex  h-10 w-full px-2 py-1 border-b text-black  dark:text-white justify-between items-center '>
           <h1 className='text-xs bg-accent-dark px-1 dark:bg-accent-light rounded '>
           {data.tag}
           </h1>
           <span className='h-full w-1/6'>
           <img className='h-full w-full object-cover' src={data.post.image} alt="image" />
           </span>
           </div>
        
    
      </div>
  )
}

export default HistorySection