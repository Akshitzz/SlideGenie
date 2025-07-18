import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { themes } from '@/lib/constants'
import { useSlideStore } from '@/store/useSlideStore'
import { useTheme } from 'next-themes'
import React from 'react'




type Props = {}



const ThemeChooser =()=>{
        const {currentTheme,setCurrentSlide,project} = useSlideStore()
    const {setTheme}  = useTheme()

            return (
                <ScrollArea className='h-[400px]'>
                        <div className='mb-4 text-center'>
                            Themes
                        </div>
                        <div className='flex flex-col space-y-4'>
                            {themes.map((theme)=>(
                                <Button
                                key={theme.name}
                                variant={currentTheme.name === theme.name ? 'default' : 'outline' }
                                className='flex flex-cols items-center justify-start px-4 w-full h-auto'
                                style={{
                                    fontFamily:currentTheme.fontFamily,
                                    color :currentTheme.fontColor,
                                    background :theme.
                                    gradientBackground || theme.backgroundColor,
                                }}
                                >
                                    <div className='w-full flex items-center justify-between'>
                                        <span className='text-xl font-bold'></span>
                                        <div className='space-y-1 w-full'>
                                            <div className='text-2xl font-bold'
                                            style={{
                                                color :currentTheme.accentColor
                                            }}  
                                            >       
                                                        Title
                                            </div>
                                            <div className='text-base opacity-80'
                                            
                                            >
                                                Body & <span
                                                style={{ color :currentTheme.accentColor}}
                                                >link</span>
                                            </div>
                                        </div>
                                    </div>
                                </Button>
                            ))}
                        </div>
                </ScrollArea>
            )
}


export default ThemeChooser;