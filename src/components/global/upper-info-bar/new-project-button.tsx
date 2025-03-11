'use client'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { User } from "@prisma/client"
const NewProjectButton =({user}:{user:User})=>{
    const router =useRouter()
    return (
    // WIP :handle click need completion
        <Button
        className="rounded-lg font-semibold"
        disabled={!user.subscription}
        // onClick={()=>}
        >
            <Plus/>
            New Project
        </Button>
    )
}

export default NewProjectButton