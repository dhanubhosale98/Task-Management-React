import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toast";
import { useState } from "react";

export default function Layout() {

  return (
    <div>
      <div>
        <SidebarProvider>
          <AppSidebar />

          <main className="flex-1">
            <div className=" flex justify-start xl:hidden">
              <SidebarTrigger />
            </div>
            <div className="px-4 w-dvw lg:w-6xl lg:mx-auto">
              <div className=" mt-10">
                <Outlet />
                <Toaster />
              </div>
            </div>
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
}
