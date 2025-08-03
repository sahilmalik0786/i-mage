import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "motion/react";
import { toast, ToastContainer } from "react-toastify";
import { useCallback, useEffect } from "react";
import { verifyAuth } from "./store/features/userSlice";

const App = () => {
const dispatch = useDispatch()
  const menu = useSelector((state) => state.menu.value);
   useEffect(()=>{
      const verify = async()=>{
        try {
          await dispatch(verifyAuth()).unwrap()
        } catch (error) {
          console.log(error)
        }
      }
      verify()
   },[dispatch])
  return (
    <div className="font-mono w-full scrollbar-hide transition-colors duration-150 dark:text-white">
      <Navbar />
      <AnimatePresence>{menu && <Modal key="modal" />}</AnimatePresence>
      <Outlet />
      <ToastContainer/>
    </div>
  );
};

export default App;
