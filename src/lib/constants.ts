import { BookTemplate, Home, Settings, Trash } from "lucide-react";

export const data = {
    user :{
        name:"John Doe",
        email:"john.doe@example.com",
        avatar:"/avatars/shadcn.png",
    },
    navMain :[
        {
            title:"Home",
            url:"/dashboard",
            icon:Home,
        },
        {
            title:"Templates",
            url:"/templates",
            icon:BookTemplate,
        },
        {
            title:"Trash",
            url:"/trash",
            icon:Trash,
        },
        {
            title:"Settings",
            url:"/settings",
            icon:Settings,
        },
    ]
}