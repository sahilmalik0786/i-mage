import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { isVisible } from "../store/features/menuSlice";
import { logout } from "../store/features/userSlice";
import { toast } from "react-toastify";
import { RiMoonLine, RiSunLine } from "@remixicon/react";
import { toggleTheme } from "../utils/themetoggler";

const Modal = () => {
   const dispatch = useDispatch()
  const islight = useSelector((state)=>state.theme.value)
 const handleTheme = ()=>{
         dispatch(toggleTheme())
   }
   const {isAuthenticated,status} = useSelector((state)=>state.user)
   const navigate = useNavigate()
  const handleModalVisible = ()=>{
      dispatch(isVisible())
   }
   const handleLogout = async()=>{
    try {
       await dispatch(logout()).unwrap()
       toast.success(status)
       navigate('/')
    } catch (error) {
      toast.error(status)
    }
   }
  return (
 
      <motion.div
        key='modal'
          initial={{ width: 0, height: 0, borderBottomLeftRadius: 40  ,}}
        animate={{ width: "100%", height: "100%", borderRadius: "0px"  ,}}
        exit={{width:0,height:0 , borderBottomLeftRadius: 40  }}
        transition={{ duration: 0.3 }}
          className="fixed top-16 right-0 z-100 dark:bg-primary-dark bg-primary-light  p-1 "
        >
          <motion.div 
            key='modal'
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
          className="w-full h-full bg-red- flex items-start justify-center ">
             <div className="h-1/3 w-full flex flex-col text-lg gap-3 justify-center ">
                <NavLink to={'/'} onClick={handleModalVisible}>
            Home 
            </NavLink>
             {isAuthenticated ?  <NavLink to={'/dashboard'} onClick={handleModalVisible} >
              Dashboard
            </NavLink> :  <NavLink to={'/auth/login'} onClick={handleModalVisible} >
              Get Started
            </NavLink>}
           {isAuthenticated &&  <button className="bg-accent-light w-fit dark:bg-accent-dark rounded text-white dark:text-black px-1 text-lg" onClick={handleLogout}>
              logout
            </button>}
             </div>
             <div className="h-1/3 flex items-center p-5 w-full justify-end">
                  <span className="cursor-pointer">
                  <AnimatePresence initial={false}>
                 
    {islight ? <motion.div key="moon" onTap={handleTheme} whileHover={{rotate:-20}} initial={{ opacity: 0 ,scale:0}}  exit={{ opacity: 0, scale: 0,y:-10}} animate={{ opacity: 1,  y: 0 ,scale:1}} transition={{ duration: 0.2 ,ease:"linear"}}  >
      <RiMoonLine size={20}/>
    </motion.div> : <motion.div key="sun" onTap={handleTheme} whileHover={{rotate:20}} initial={{ opacity: 0,scale:0 }}  exit={{ opacity: 0, scale: 0 ,y:-10}} animate={{ opacity: 1,  y: 0 ,scale:1}} transition={{ duration: 0.2 ,ease:"linear"}}  >
      <RiSunLine size={20}/>
      </motion.div>}
  </AnimatePresence>
           </span>

             </div>
          </motion.div>
          
        </motion.div> 
  );
};

export default Modal;
