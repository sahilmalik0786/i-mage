// pages/DashboardPage.jsx

import { useSelector } from "react-redux";
import DashLayout from "../components/dashboard/DashLayout";
import FileUpload from "../components/dashboard/FileUpload";
import ResponsePreviewer from "../components/dashboard/ResponsePreviewer";

export default function DashboardPage() {
  const { initialized } = useSelector((state) => state.post);
  return (
    <div className=" flex flex-col">
      <DashLayout>
        <div className="h-full">
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-auto gap-4 mb-6">
          <div className="rounded-2xl border bg-secondary-light dark:bg-secondary-dark p-6">Card 1</div>
          <div className="rounded-2xl border border-white p-6">Card 2</div>
          <div className="rounded-2xl border border-white p-6">Card 3</div>
        </div> */}

          {/* Bottom Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-2 h-full">
            
         
          <div className=" w-full  bg-secondary-light dark:bg-secondary-dark rounded h-full">
            <div className="rounded-2xl  p-6  ">
              <FileUpload />
              {/* {res!=null&&error==null && <ResponsePreviewer />} */}
            </div>
          </div>
         {initialized &&  <div className=" w-full bg-primary-light dark:bg-dash-dark   rounded overflow-hidden h-fit">
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
