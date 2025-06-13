import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import { Slide, Theme } from '@/lib/types'
import { Project } from '@prisma/client'

interface SlideState{
    slides :Slide[],
    project :Project | null
    setProject :(id:Project)=>void
        currentTheme : Theme
        setCurrentTheme: (theme :Theme)=> void
    setSlides : (slides:Slide[])=> void
}


const defaultTheme :Theme = {
    name : 'Default',
    fontFamily : "'Inter',sans-serif",
    fontColor : '#333333',
    backgroundColor :'#f0f0f0',
    slideBackgroundColor :'#ffffff',
    accentColor :'#3b82f6',
    type : 'light'
}




export const useSlideStore = create(
    persist<SlideState>((set)=>({
        project:null,
        slides : [],
        setSlides :(slides :Slide[]) =>set({slides}),
        setProject:(project)=>set({project}),
        currentTheme :defaultTheme,
        setCurrentTheme :(theme:Theme) => set({currentTheme:theme})
    }),

            {
                name:'slide-storage',
            }
        ),  
    
    );
