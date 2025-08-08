// pages/DashboardPage.jsx

import { useSelector } from "react-redux";
import DashLayout from "../components/dashboard/DashLayout";
import FileUpload from "../components/dashboard/FileUpload";
import ResponsePreviewer from "../components/dashboard/ResponsePreviewer";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function DashboardPage() {
  const {isVerified} = useSelector((state)=>state.user)
  useEffect(()=>{
    !isVerified && toast('please verify your email to use the application')
  },[])
  const { initialized } = useSelector((state) => state.post);
  return (
    <div className="max-h-[calc(100vh-4rem)] flex flex-col">
      <DashLayout>
        <div className="">  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-2 h-full">
          <div className=" md:w-full w-10/12  bg-secondary-light dark:bg-secondary-dark rounded h-full">
            <div className="rounded-2xl  p-6  ">
              <FileUpload />         
            </div>
          </div>
         {initialized &&  <div className=" w-10/12 md:w-full bg-primary-light dark:bg-dash-dark   rounded overflow-hidden h-fit">
            <div className=" flex overflow-hidden  p-3">
              <ResponsePreviewer />  {/* {res!=null&&error==null && <ResponsePreviewer />} */}
            </div>
          </div>}
           </div>
        </div>
      </DashLayout>
    </div>
  );
}
