import { onAuthenticateUser } from '@/actions/user'
import React from 'react'
type Props = {}



const Page = async(props :Props)=>{
    const checkUser = await onAuthenticateUser()
        // WIP : Setup the awesome challenge
    return <div className='flex flex-col gap-6 relative'>
        <div className='flex justify-between items-center'>
                <div className=' flex flex-col items-start'>
                        <h1 className='text-2xl font-semibold dark:text-primary backdrop-blur-lg'>
                            Settings
                        </h1>
                        <p className=' text-base font-nromal dark:text-secondary'>
                            All your settings 
                        </p>
                </div>
        </div>
         </div>
}



export default Page;