import { NavLink, useLocation, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import {
  RiMenu4Line,
  RiMenu5Line,
  RiMoonLine,
  RiSunLine,
} from "@remixicon/react";

import { AnimatePresence, motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { isVisible } from "../store/features/menuSlice";


import { HoverArrowBtn } from "./HoverArrowBtn";
import { toggleTheme } from "../utils/themetoggler";

const navLinks = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];

const NavBtn = ()=>{
   const {type} = useParams()
   if(type=='signup'){
    return <HoverArrowBtn children={'login'} desti={'/auth/login'} />
   }
   else if(type == 'login'){
    return <HoverArrowBtn children={'sign up'} desti={'/auth/signup'} />
   }
   else{
    return <HoverArrowBtn children={'get started'} desti={'/auth/login'} />
   }
    
}


const Navbar = () => {
  const location = useLocation()
  
  const menu = useSelector((state) => state.menu.value)
  const islight = useSelector((state)=>state.theme.value)
  const {isAuthenticated} = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const handleTheme = ()=>{
        dispatch(toggleTheme())
  }
  const handleMenuClick = () => {
  
    dispatch(isVisible())
  };
  const isMobile = useMediaQuery({
    query: "(max-width:800px)",
  });
  
  return (
    <nav className=" w-full overflow-hidden sticky top-0 h-16 flex items-center px-3 py-2 dark:text-white transition-colors duration-300 bg-secondary-light dark:bg-secondary-dark">
      <div className={`${location.pathname === '/dashboard' ? 'w-full px-3' : 'xl:w-5xl '} w-full flex items-center justify-between mx-auto`}>
        <div className="select-none ">
          <h1>I-mage.io</h1>
        </div>
        <div>
          {!isMobile ? (
            <ul className="flex gap-4 items-center">
              {navLinks.map((e, i) => {
                return (
                  <NavLink
                    key={i}
                    className={({ isActive }) =>
                      isActive
                        ? "before:w-full before:content-['']  relative before:absolute before:bg-gradient-to-l before:from-gray-500 before:to-gray-600 before:via-gray-400 before:h-[0.7px] before:bottom-0 hover:before:w-full before:transition-all befor:duration-300"
                        : "before:content-[''] before:w-0  relative before:absolute before:bg-gradient-to-l before:from-gray-500 before:to-gray-600 before:via-gray-400 before:h-[0.7px] before:bottom-0 hover:before:w-full before:transition-all befor:duration-300"
                    }
                    to={`${e.path}`}
                  >
                    {e.title}
                  </NavLink>
                );
              })}
              {
                isAuthenticated ? <HoverArrowBtn children={'Log out'} desti={'/auth/login'} />: <NavBtn/>
               
                
              }
           <span className="cursor-pointer">
                  <AnimatePresence initial={false}>
                 
    {islight ? <motion.div key="moon" onTap={handleTheme} whileHover={{rotate:-20}} initial={{ opacity: 0 ,scale:0}}  exit={{ opacity: 0, scale: 0,y:-10}} animate={{ opacity: 1,  y: 0 ,scale:1}} transition={{ duration: 0.2 ,ease:"linear"}}  >
      <RiMoonLine size={20}/>
    </motion.div> : <motion.div key="sun" onTap={handleTheme} whileHover={{rotate:20}} initial={{ opacity: 0,scale:0 }}  exit={{ opacity: 0, scale: 0 ,y:-10}} animate={{ opacity: 1,  y: 0 ,scale:1}} transition={{ duration: 0.2 ,ease:"linear"}}  >
      <RiSunLine size={20}/>
      </motion.div>}
  </AnimatePresence>
           </span>
            </ul>
          ) : (
            <AnimatePresence initial={false}>
              {menu ? (    
                <motion.div
                  key="close-icon" // Unique key for tracking
                  className="cursor-pointer"
                  onTap={handleMenuClick}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  initial={{ opacity: 0, scale: 0, y: 10 }}
                  transition={{ duration: 0.1 }}  
                  exit={{ opacity: 0, scale: 0, y: 10 }}
                >
                  <RiMenu4Line />
                </motion.div>
              ) : (
                <motion.div
                  key="open-icon" // Unique key for tracking
                  className="cursor-pointer"
                  onTap={handleMenuClick}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  initial={{ opacity: 0, scale: 0, y: 10 }}
                  transition={{ duration: 0.1 }}
                  exit={{ opacity: 0, scale: 0, y: 10 }}
                >
                  <RiMenu5Line />
                </motion.div>
              )}
            </AnimatePresence>

          )}
        
 
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
