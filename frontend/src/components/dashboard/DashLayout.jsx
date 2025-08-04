// layouts/DashboardLayout.jsx
import { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar';
import useOutsideClick from '../../hooks/useOutsideClick';
import {useMediaQuery} from 'react-responsive'

export default function DashLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarRef = useRef()
  const isMobile = useMediaQuery({
    query:'(max-width:750px)'
  })
   
  useOutsideClick(sidebarRef, () => setCollapsed(true), isMobile && !collapsed ? true : false)
  return (
    <div className="flex h-[calc(100vh-4rem)]"> {/* 4rem = navbar height */}
      <div ref={sidebarRef}>
        <Sidebar collapsed={collapsed} toggle={() => setCollapsed((prev) => !prev)} />
      </div>
      <main className="flex-1  overflow-y-auto bg-dash-light dark:bg-primary-dark p-2">{children}</main>
    </div>
  );
}
