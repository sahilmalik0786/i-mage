import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSelector } from "react-redux";
const Modal = () => {
  const isOpen = useSelector((state) => state.menu.value);
  return (
    // <AnimatePresence initial={false}>
    //   {isOpen ? (
    //     <motion.div
    //     key='modal'
    //       initial={{ width: 0, height: 0, borderBottomLeftRadius: "40px" }}
    //     animate={{ width: "100%", height: "100%", borderRadius: "0px" }}
    //     exit={{width:0,height:0}}
    //     transition={{ duration: 0.5 }}
    //       className="fixed top-16 right-0 z-100 bg-red-900 p-1 "
    //     >
    //       Modal
    //     </motion.div> 
    //   ):null}
    // </AnimatePresence>
      <motion.div
        key='modal'
          initial={{ width: 0, height: 0, borderBottomLeftRadius: 40  ,}}
        animate={{ width: "100%", height: "100%", borderRadius: "0px"  ,}}
        exit={{width:0,height:0 , borderBottomLeftRadius: 40  }}
        transition={{ duration: 0.3 }}
          className="fixed top-16 right-0 z-100 bg-red-900 p-1 "
        >
          Modal
        </motion.div> 
  );
};

export default Modal;
