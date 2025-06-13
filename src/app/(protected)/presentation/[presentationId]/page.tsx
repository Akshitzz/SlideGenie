'use client'
import { getProjectById } from "@/actions/project";
import { useSlideStore } from "@/store/useSlideStore";
import { useTheme } from "next-themes";
import { redirect, useParams } from "next/navigation";
import React, {  useEffect, useState } from "react";
import { Toaster,toast } from "sonner";
import { themes } from "@/lib/constants";
import { Loader2 } from "lucide-react";
import {DndProvider} from 'react-dnd'
type Props = {}

const Page = (props:Props)=>{
    // WIP : create the presentatino view
    const params = useParams()
    const {setTheme}= useTheme()
    const [isLoading,setIsLoading] = useState(false)
    const {setSlides,setProject,currentTheme,setCurrentTheme}= useSlideStore()
        useEffect(()=>{
            (async()=>{
                try{
                    const res = await getProjectById(params.presentationId as string)
                    if(res.status !==200 || !res.data){
                        toast.error('Error',{
                            description : 'Unable to fetch project'
                        })
                        redirect('/dashboard')
                    }
                    const findTheme = themes.find(
                        (theme)=>theme.name === res.data.themeName
                    )
                    setCurrentTheme(findTheme || themes[0])
                    setProject(res.data)
                    setSlides(JSON.parse(JSON.stringify(res.data.slides)))
                }catch(error){
                    toast.error('Error',{
                        description:'An expected error occcur'
                    })
                } finally {
                    setIsLoading(false)
                }
            })()
        },[])
        if(isLoading){
            return(
                <div className="flex items-center justify-center h-screen ">
                    <Loader2 className="w-8 h-8 aniamte-spin text-primary"/>
                </div>
            )
        }
return <DndProvider></DndProvider>

}

export default Page