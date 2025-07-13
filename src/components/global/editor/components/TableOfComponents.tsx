import { useSlideStore } from "@/store/useSlideStore";
import React from "react";
import { cn } from "@/lib/utils";

type Props ={
    items :string[]
    onItemClick :(id:string)=>void
    className?: string
}

const TableOfComponents=({items,onItemClick,className}:Props)=>{
    const {currentTheme} = useSlideStore()
    return (
        <nav
        className={cn('space-y-2',className)}
        style={{color:currentTheme.fontColor}}
        >
            {items.map((items,idx)=>(
                <div
                key={idx}
                className={cn('cursor-pointer hover:underline')}
                // onClick={()=>onItemClick(item)}
                >
                    {items}
                </div>
            ))}
        </nav>
    )
}


export default TableOfComponents