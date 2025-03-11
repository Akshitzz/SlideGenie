import React from "react"
import {onAuthenticateUser} from "@/actions/user"
import { redirect } from "next/navigation"
import { getRecentProjects } from "@/actions/project"
import AppSidebar from "@/components/global/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
  type Props = {
  children: React.ReactNode
}

const Layout = async ({children}: Props) => {
  const recentProjects = await getRecentProjects()
  const checkUser = await onAuthenticateUser()
  if(!checkUser?.user){
    redirect("/sign-in")
  }
  return <SidebarProvider>
    <AppSidebar  user ={checkUser.user} recentProjects={recentProjects.projects || []} >
    </AppSidebar>
  </SidebarProvider>
}

export default Layout