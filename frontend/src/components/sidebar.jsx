import {
  LayoutDashboard,
  ListTodo,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";

const mainMenu = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Task",
    url: "/tasks",
    icon: ListTodo,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function onLogout() {
    logout();
  }
  
  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarContent className="px-2">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 px-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ListTodo className="h-5 w-5" />
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold">TaskFlow</span>

            <span className="text-xs text-muted-foreground">
              Task Management
            </span>
          </div>
        </div>

        {/* Main */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="h-10 px-3"
                  >
                    <NavLink to={item.url} className="flex gap-2">
                      <item.icon className="h-4 w-4 " />

                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="h-10 px-3 text-muted-foreground hover:text-destructive"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4" />

              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
