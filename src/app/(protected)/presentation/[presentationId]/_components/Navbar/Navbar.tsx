'use client'
import { useSlideStore } from '@/store/useSlideStore';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Play, Share } from 'lucide-react';
import {toast} from 'sonner'
import PresentationMode from './PresentationMode';

type Props={
presentationId :string
}
const Navbar = ({presentationId}:Props) =>{
    const {currentTheme} = useSlideStore()
    const [isPresentationMode,setIsPresentationMode]=useState(false)

    const handleCopy = ()=>{
        navigator.clipboard.writeText(
            `${window.location.origin}/share/${presentationId}`
        )
        toast.success('Link Copied',{
            description:"The link has been copied"
        })
    }


    return <nav className='fixed top-0 right-0 z-50 w-full h-20 flex justify-between items-center py-4 px-7 border-b'
    style={{
        backgroundColor:
        currentTheme.navbarColor || currentTheme.backgroundColor,
        color: currentTheme.accentColor
    }}
    >
        <Link
        href={'dashboard'}
        passHref
        >
            <Button variant='outline'
            className={`flex items-center gap-2`}
            style={{
                backgroundColor:currentTheme.backgroundColor
            }}
            >
              <Home/>  
              <span className='hidden sm:inline'>Return Home</span>
            </Button>
        </Link>

        <Link
        href="/presentation/template-market"
        className='text-lg font-semibold hidden sm:block'
//render title as a prop
>

            Presentation Editor 
        </Link>
        <div className='flex items-center gap-4'>
            <Button
            style={{
                backgroundColor :currentTheme.backgroundColor,
            }}
            onClick={handleCopy}
            variant='outline'
            >
                <Share/>
            </Button>
            {/* 
                wip: add lemonsqueezy sell templates 
                Sell templete
             */}
             <Button
             variant={"default"}
             className='flex items-center gap-2'
            onClick={()=>setIsPresentationMode(true)}
             >
                <Play/>
                <span className='hidden sm:inline'>Present</span>
             </Button>
        </div>

                {isPresentationMode && (
                    <PresentationMode onClose={()=>setIsPresentationMode(false)}/>
                )}

    </nav>
}
export default Navbar;