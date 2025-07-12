'use client'
import React, { useCallback } from 'react'
import { ContentItem } from '@/lib/types'
import {motion} from 'framer-motion'
import {Heading1, Heading2, Heading3, Heading4, Title } from '@/components/global/editor/components/Headers'
import { cn } from '@/lib/utils'
import DropZone from './DropZone'
import TableComponent from '@/components/global/editor/components/Table'
import Paragraph from '@/components/global/editor/components/Paragraph'
import ColumnComponent from '@/components/global/editor/components/ColumnComponent'
 import CustomImage from '../../../../../../components/global/editor/components/ImageComponent'
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
    isPreview,
    isEditable
})=>{
    const handleChange = useCallback((e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        onContentChange(content.id,e.target.value)
    },[content.id, onContentChange])
    const commonProps = {
        placeholder: content.placeholder,
        value: content.content as string,
        onChange:  handleChange,
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
            case 'heading2':
                return <motion.div className='w-full h-full'>
                            <Heading2 {...commonProps}/>
                </motion.div>
            case 'heading3':
              
                  return <motion.div className='w-full h-full'>
                            <Heading3 {...commonProps}/>
                </motion.div>
              
            case 'heading4' :
                return <motion.div className='w-full h-full'>
                            <Heading4 {...commonProps}/>
                </motion.div>
            
            case 'title':
                return <motion.div className='w-full h-full'>
                            <Title {...commonProps}/>
                </motion.div>
                case 'paragraph' :
                    return <motion.div
                    {...animateProps}
                    className='w-full h-full'
                    >
                            <Paragraph {...commonProps}/>
                    </motion.div>
            case 'table':
                return <motion.div
                    {...animateProps}
                    className='w-full h-full'
                    >
                            <TableComponent content={content.content as string [][]}
                            onChange={(newContent)=>onContentChange(
                                content.id,newContent !== null ?newContent :" "
                            )}
                            initialRowSize={content.initialColumns}
                            initialColSize={content.initialRows}
                            />
                    </motion.div>
            case'resizable-column':
                    if(Array.isArray(content.content)){
                        return (
                            <motion.div
                            {...animateProps}
                            className='w-full h-full'
                            >
                            <ColumnComponent 
                            content={content.content as ContentItem[]}
                            className={content.className}
                            onContentChange={onContentChange}
                            slideId={slideId}
                            isPreview={isPreview}
                            isEditable={isEditable}
                            />
                            </motion.div>
                        )
                    }
                    return null
                    case "image" :
                        return <motion.div
                        {...animateProps}
                        className='h-full w-full'
                        >
                        <CustomImage
                        src={content.content as string}
                        alt= {content.alt  || 'image'}
                        className={content.className}
                        contentId={content.id}
                        isPreview={isPreview}
                        onContentChange={onContentChange}
                        isEditable={isEditable}
                        />
                        </motion.div>
            case 'column':
                if(Array.isArray(content.content)){
                    <motion.div
                    {...animateProps}
                    className={cn('w-full h-full flex flex-col',content.className)}
                    >
                    {content.content.length >0?(
                        content.content as ContentItem[]
                    ).map((subItem:ContentItem,subIndex:number)=>(
                        <React.Fragment key={subItem.id || `item-${subIndex}`}>
                        {!isPreview && !subItem.restrictToDrop && subIndex ===0 && isEditable && <DropZone
                        index ={0}
                        parentId={content.id}
                        slideId={slideId}
                        />}
                        <MasterRecursiveComponent
                        content={subItem}
                        onContentChange={onContentChange}
                        isPreview={isPreview}
                        slideId={slideId}
                        index={subIndex}
                        isEditable={isEditable}
                        />
                        {!isPreview && !subItem.restrictToDrop && isEditable && <DropZone
                        index={subIndex +1}
                        parentId={content.id}
                        slideId={slideId}
                        />}
                        </React.Fragment>
                    )):isEditable ?(
                        <DropZone
                        index={0}
                        parentId={content.id}
                        slideId={slideId}
                        />
                    ):null}

                    </motion.div>
                    
                }
                return null
            default:
                return null
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