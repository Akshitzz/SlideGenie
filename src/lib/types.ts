export interface Slide {
    id: string,
    slideName : string,
    content :ContentItem,
    slideOrder:number,
    className?:string,

}

export interface ContentItem {
    id:string,
    type :ContentType,
    name  :string,
    content :ContentItem[] | string | string[] | string[][]
    initialRows?: number,
    initialColumns?: number,
    restrictToDrop?:boolean,
    columns?: number,
    placeholder?: string,
    className?: string,
    alt?: string,
    callOutType?: 'success' | 'warning' | 'info' | 'question' | 'caution',
    link?: string,
    code?:string,
    language?: string,
    byColor?: string,
    isTransparent ?:boolean
}


export type ContentType = 
| 'column'
|'resizable-column'
|'text'
| 'paragraph'
| 'image'
|'table'
| 'multiColumn'
| 'blank'
| 'imageAndText'
| 'heading1'
| 'heading2'
| 'heading3'
| 'heading4'
| 'title'
| 'heading'
| 'table'
| 'blockquote'
| 'numberedList'
| 'bulletedList'
| 'code'
| 'link'
| 'quote'
| 'divider'
| 'calloutBox'
| 'todoList'
| 'bulletList'
| 'codeBlock'
| 'customButton'
| 'table'
| 'tableOfContents'


export interface Theme{
    name:string;
    fontFamily:string;
    fontColor :string;
    backgroundColor:string;
    slideBackgroundColor:string;
    accentColor:string;
    gradientBackground?:string;
    sidebarColor?:string;
    navbarColor?:string;
    type:'light' | 'dark';
}

export interface OutlineCard {
    title:string,
    id:string,
    order:number
}

export interface LayoutSlides {
    slideName :string,
    content : ContentItem,
    className?:string,
    type:string
}


export interface Layout {
   name :string
   icon : React.FC
   type :string
   component:LayoutSlides
   layoutType :string
}

export interface LayoutGroup {
    
    name :string 
    layouts : Layout[]
}

interface Component {
    name :string
    icon :string
    type :string
    component :ContentItem
    componentType :string
}



export interface ComponentGroup {
    name :string
    components :Component[]
}