import { motion, useAnimationFrame, useSpring } from 'framer-motion';
import { RiArrowDownLongLine } from '@remixicon/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function HoverArrowBtn({children, desti , onclick}) {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = (desti)=>{
       navigate(desti)
  }
  // Spring animation for the arrow
  const arrowRotation = useSpring(-90, {
    stiffness: 100,
    damping: 10
  });

 
  useAnimationFrame(() => {
    arrowRotation.set(isHovered ? 225 : -90);
  });

  return (
    <motion.button
      className="capitalize tracking-tighter flex items-center gap-2 active:scale-95 transition-transform bg-accent-light dark:bg-accent-dark dark:text-black  duration-150 select-none text-white px-2 py-1 rounded-md cursor-pointer text-sm"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        gap:'20px',
        transition: { duration: 0.2 ,ease:'linear'}
      }}
      onTap={()=>handleClick(desti)}
      onClick={onclick}
    >
      {children}
      <motion.span
        style={{ rotate: arrowRotation }}
      >
        <RiArrowDownLongLine size={15} />
      </motion.span>
    </motion.button>
  );
}