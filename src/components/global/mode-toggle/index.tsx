"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
const ThemeSwitcher =()=>{
    const [mounted,setMounted] = useState(false)
    const {theme,setTheme} = useTheme()
    useEffect(()=>{
        setMounted(true)
    },[])
    if(!mounted){
        return null
    }
    return <div>
        <Switch checked={theme==='light'}
         className="h-10 w-20 pl-1 data-[state=checked]:bg-primary-80 "
         aria-label="Toggle dark theme"
         onCheckedChange={()=>setTheme(theme==='dark'?'light':'dark')}
        />
        </div>
    
}

export default ThemeSwitcher