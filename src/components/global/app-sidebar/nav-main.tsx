"use client"
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Clock } from "lucide-react"
import { data } from "@/lib/constants"
const NavMain = ({
    items,
}:{
    items:{
        title:string,
        url:string,
        icon:React.FC<React.SVGProps<SVGSVGElement>>,
        isActive?:boolean,
        items?:{
            title:string,
            url:string,
        }[]
    }[]
}) => {
    const pathname = usePathname()
    return <SidebarGroup className="p-0">
            <SidebarMenu>
              {items.map((item)=>(
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                    asChild
                    tooltip={item.url}
                    className={`${pathname.includes(item.url) && 'bg-background-80'}`}
                    >
                        <Link href={item.url} className={`${pathname.includes(item.url) && 'font-bold'}`}>
                        <item.icon className="text-lg"></item.icon>
                        <span>{item.title}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
    </SidebarGroup>
}

export default NavMain