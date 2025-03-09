"use client"
import React from "react"
import { Project ,User } from "@prisma/client"
import { Sidebar ,SidebarContent,SidebarHeader, SidebarMenuButton } from "@/components/ui/sidebar"
import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar"
import NavMain from "./nav-main"
import {data} from '@/lib/constants'
type Props = {
recentProjects: Project[]
user: User
}

const AppSidebar = ({
    recentProjects,
    user,
    ...props
}: Props & React.ComponentProps<typeof Sidebar>) => {
  return <Sidebar {...props} collapsible="icon" className="max-w-[212px] bg-background-90">
    <SidebarHeader className="pt-6 px-3 pb-0">
        <SidebarMenuButton className="data-[state=open]:text-sidebar-accent-foreground"
        size="lg"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
          <Avatar className="h-10 w-10 rounded-lg">
          <AvatarImage src={"/vivi.png"} alt={"genieai"}/>
          <AvatarFallback className="rounded-lg">VI</AvatarFallback>
          </Avatar>
          </div>
          <span className="truncate text-primary text-3xl font-semibold"></span>
        </SidebarMenuButton> 
    </SidebarHeader>
    <SidebarContent className="px-3 mt-10 gap-y-6">
       <NavMain items={data.navMain}/>
    </SidebarContent>
  </Sidebar>
}
export default AppSidebar
