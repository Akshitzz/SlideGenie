"use client"
import {motion} from 'framer-motion'
import usePromptStore from '@/store/usePromptStore'
import React from 'react'
import { containerVairants, itemVariants } from '@/lib/constants'
import { Card } from '@/components/ui/card'
type Props = {}

const RecentPrompts = (props:Props)=> {
    const {prompts,setPage} = usePromptStore()
    return <motion.div
    variants={containerVairants}
    className="space-y-4 !mt-20"
    >
        <motion.h2
        variants={containerVairants}
        className='text-2xl font-semibold text-center'
        >
            Your Recent Project
        </motion.h2>
        <motion.div
        variants={itemVariants}
        className='space-y-2 w-full lg:max-w-[80%] mx-auto'
        >
                {prompts.map((prompt, i) => (
                    <motion.div
                    key={i}
                    variants={itemVariants}
                    >
                        <Card
                        className='p-4 flex items-center justify-between hover:bg-accent/50 transition-colors duration-300'
                        >
                            <div className='max-w-[70%]'>
                                <h3 className='font-semibold text-xl line-clamp-1'>
                                    {prompt.title}
                                </h3>
                            </div>
                        </Card>
                    </motion.div>
                ))}
        </motion.div>
    </motion.div>
}
export default RecentPrompts;