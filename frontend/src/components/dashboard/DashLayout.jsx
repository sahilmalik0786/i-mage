// layouts/DashboardLayout.jsx
import { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar';
import useOutsideClick from '../../hooks/useOutsideClick';
import {useMediaQuery} from 'react-responsive'

export default function DashLayout({ children }) {
  const sidebarRef = useRef()
  const isMobile = useMediaQuery({
    query:'(max-width:750px)'
  })
  const [collapsed, setCollapsed] = useState(isMobile?true:false);
   
  useOutsideClick(sidebarRef, () => setCollapsed(true), isMobile && !collapsed ? true : false)
  return (
    <div className="flex max-h-[calc(100vh-4rem)] overflow-x-hidden"> {/* 4rem = navbar height */}
      <div ref={sidebarRef}>
        <Sidebar collapsed={collapsed} toggle={() => setCollapsed((prev) => !prev)} />
      </div>
      <main className=" overflow-y-auto  md:flex-1 w-full flex-grow flex-shrink-0   bg-dash-light dark:bg-primary-dark p-2">{children}</main>
    </div>
  );
}
