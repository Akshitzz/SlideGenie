'use client '

import { useSlideStore } from "@/store/useSlideStore"
import {  useAnimation } from "framer-motion"
import { redirect, useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Theme } from "@/lib/types"
import { Button } from "@/components/ui/button"
const ThemePreview =()=>{

    const params = useParams()
    const router = useRouter()
    const controls = useAnimation()
    const {currentTheme,setCurrentTheme,project} = useSlideStore()
    const [selectedTheme,setSelectedTheme] =useState<Theme>(currentTheme)
        useEffect(()=>{
            if(project?.slides){
                redirect(`/presentation/${params.presentationId}`)
            }
        },[project])


useEffect(()=>{
    controls.start('visible')
},[controls,selectedTheme])

   const leftCardContent = (
    <div className="space-y-4">
    <div className="rounded-xl p-6" style={{color :selectedTheme.accentColor +"10"}}>
        <h3
        className="text-xl font-semibold mb-4"
        style={{color:selectedTheme.accentColor}}
        >   
            Quick Start Guide
        </h3>
      <ol
      className="list-decimal list-inside space-y-2"
      style={{color:selectedTheme.accentColor}}
      >
          <li>Choose a theme</li>
        <li>Customize colors and theme</li>
        <li>Add your color</li>
        <li>Preview and publish</li>
      </ol>
    </div>
    <Button
    className="w-full h-12 text-lg font-medium"
    style={{
        backgroundColor : selectedTheme.accentColor,
        color :selectedTheme.accentColor
    }}
    >
        Get Started

    </Button>
   </div>
   )
   const mainCardContent = (
    <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl p-6"
                style={{backgroundColor:selectedTheme.accentColor + "10"}}
                >   
                    <p style={{color:selectedTheme.accentColor}}>
                            This is a smart layout :it acts as a textbook
                    </p>
                </div>
                <div
                className="rounded-xl p-6"
                style={{backgroundColor:selectedTheme.accentColor + "10"}}
                >
                      <p style={{color:selectedTheme.accentColor}}>
                          You can get these by typing /smart
                    </p>
                </div>
            </div>
            <div className="flex flex-wrap gap-4">
                    <Button
                    className="h-12 px-6 text-lg font-medium"
                    style={{
                        backgroundColor:selectedTheme.accentColor,
                        color:selectedTheme.fontColor
                    }}
                    >
                        Priamry button
                    </Button>
                    <Button
                    variant="outline"
                    className="h-12 px-6 text-lg font-medium"
                    style={{
                        borderColor :selectedTheme.accentColor,
                        color:selectedTheme.fontColor
                    }}
                    >
                        Secondary Button
                    </Button>
            </div>
    </div>
   )
}

export default ThemePreview