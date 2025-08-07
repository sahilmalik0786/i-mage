import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { isVisible } from "../store/features/menuSlice";
const Modal = () => {
   const dispatch = useDispatch()
   const {isAuthenticated} = useSelector((state)=>state.user)
  const handleModalVisible = ()=>{
      dispatch(isVisible())
   }
  return (
 
      <motion.div
        key='modal'
          initial={{ width: 0, height: 0, borderBottomLeftRadius: 40  ,}}
        animate={{ width: "100%", height: "100%", borderRadius: "0px"  ,}}
        exit={{width:0,height:0 , borderBottomLeftRadius: 40  }}
        transition={{ duration: 0.3 }}
          className="fixed top-16 right-0 z-100  bg-primary-light  p-1 "
        >
          <motion.div 
            key='modal'
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
          className="w-full h-full flex items-start justify-center ">
             <div className="h-1/3 flex flex-col text-lg gap-1 justify-center">
                <NavLink to={'/'} onClick={handleModalVisible}>
            Home 
            </NavLink>
             {isAuthenticated ?  <NavLink to={'/dashboard'} onClick={handleModalVisible} >
              Dashboard
            </NavLink> :  <NavLink to={'/auth/login'} onClick={handleModalVisible} >
              Get Started
            </NavLink>}
             </div>
          </motion.div>
          
        </motion.div> 
  );
};

export default Modal;
