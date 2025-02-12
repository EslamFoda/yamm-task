import type React from "react";

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Sidebar from "../Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMidScreen = useMediaQuery({ query: "(max-width: 1207px)" });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    setIsSidebarOpen(!isMidScreen);
  }, [isMidScreen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex h-screen ">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
