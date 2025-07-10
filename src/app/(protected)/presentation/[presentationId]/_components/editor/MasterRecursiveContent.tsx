'use client'
import React, { useCallback } from 'react'
import { ContentItem } from '@/lib/types'
import {motion} from 'framer-motion'
import {Heading1} from '@/components/global/editor/components/Headers'

type MasterRecursiveComponentProps = {
    content:ContentItem
    onContentChange:(
        contentId:string,
        newContent : string | string[] |string [][]

    )=> void
    isPreview ?: boolean
    isEditable ?: boolean
    slideId : string 
    index?: number 

}


 export const ContentRenderer:React.FC<MasterRecursiveComponentProps>= React.memo(({
    content,
    onContentChange,
    slideId,
    index,
    isPreview
})=>{
    const handleChange = useCallback((e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        onContentChange(content.id,e.target.value)
    },[content.id, onContentChange])
    const commonProps = {
        placeholder: content.placeholder,
        value: content.content as string,
        onchange:  handleChange,
        isPreview: isPreview,
    }
    const animateProps = {
        initial: {opacity:0,y:20},
        animate :{opacity:1, y:20},
        transition :{duration :0.5}
    }
    //  WIP : complete types
    switch (content.type){
            case 'heading1':
                return <motion.div className='w-full h-full'>
                            <Heading1 {...commonProps}/>
                </motion.div>

            default:
    }
})



ContentRenderer.displayName ='ContentRenderer'

export const MasterRecursiveComponent :React.FC<MasterRecursiveComponentProps>=  React.memo(
    ({
    content,
    onContentChange,
    slideId,
    isPreview = false,
    index,
    isEditable = true
})=>{
if (isPreview){
    return (
     <React.Fragment>
          <ContentRenderer
        content = {content}
        onContentChange = {onContentChange}
        isPreview = {isPreview}
        isEditable = {isEditable}
        slideId = {slideId}
        index = { index}
        />
     </React.Fragment>
    )
}
})

MasterRecursiveComponent.displayName ='MasterRecursiveComponent'