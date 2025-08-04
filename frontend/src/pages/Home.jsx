import oval from "/images/oval1.png";
import styles from "../cssModule/before.module.css";
import { AnimatePresence, motion, press } from "motion/react";
import { useEffect, useState } from "react";
import { HoverArrowBtn } from "../components/HoverArrowBtn";
import { useSelector } from "react-redux";
import arrowpng from '/images/arrow.png'

const Home = () => {
const {isAuthenticated} = useSelector((state)=>state.user)

  return (
    <div className=" bg-primary-light dark:bg-primary-dark w-full p-1  overflow-hidden transition-colors duration-150">
   
      <motion.div
        // animate={{ opacity: 0.4, animationDuration: 10 }}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        // exit={{ opacity: 0, scale: 0 }}
        transition={{ duration:0.5 }} 
        className=" w-full p-2 h-[calc(100vh-72px)] gap-4  flex flex-col items-center justify-center "
      >
        <div className="xl:w-4xl select-none h-fit  flex items-center justify-center mx-auto ">
          <h1 className="xl:text-4xl text-2xl xl:leading-12 mb-5 leading-10 text-center">
            ARE YOU TIRED OF GIVING LONG PROMPTS FOR YOUR {" "}
            <span className={styles.span}>Images?</span> <br /> NOT ANYMORE
          </h1>
        </div>
         {isAuthenticated ? <HoverArrowBtn children={"Go to Dashboard"} desti={'/dashboard'}/> : <HoverArrowBtn children={"get started"} desti={'/auth/login'}/>}
           <motion.div whileHover={{rotate:6 }} transition={{duration:0.3 , ease:'backOut'}} className="w-14  h-26 mt-4">
        <img className="w-full h-full object-fit dark:invert" src={arrowpng} alt="" />
      </motion.div>
      </motion.div>   

    

     
    
    </div>
  );
};

export default Home;
