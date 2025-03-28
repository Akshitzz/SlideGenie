'use client'
import { motion } from "framer-motion";
import { JsonValue } from "@prisma/client/runtime/library";
import { itemVariants ,themes} from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { useRouter } from "next/navigation";
import ThumbnailPreview from "./thumbnail-previe";
import { timeAgo } from "@/lib/utils";
import AlertDialogueBox from "../alert-dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import { deleteProject, RecoverProject } from "@/actions/project";
type Props ={

    projectId :string,
    title :string,
    createdAt :string,
    isDelete?:boolean,
    slideData:JsonValue
    themeName :string
}
const ProjectCard = ({
    createdAt,
    projectId,
    slideData,
    title,
    isDelete,
    themeName
}:Props) =>{
    const [loading,setLoading] = useState(false)
    const [open,setOpen] = useState(false)
    const {setSlides} = useSlideStore()
    const router = useRouter()
    const handleRecover = async () => {
        setLoading(true)
        if (!projectId) {
            setLoading(false)
            toast.error("Error!",{
                description:'Project not found',
            })
            return
        }
        try {
            const res= await deleteProject(projectId)
            if(res.status !==200){
                  toast.error('Oopsie',{
                    description :res.error || 'Failed to delete the project'
                  })
                  return
                }
                setOpen(false)
                router.refresh();
                toast.success('Success',{
                    description : 'Project recoverd successfully'
                })
            } catch(error){
                toast.error('Error',{
                    description : 'Something went wrong .Please contact support'
                })

        }
    }
const handleNavigation=()=>{
    setSlides(JSON.parse(JSON.stringify(slideData)))
    router.push(`/presentation/${projectId}`)
}

const theme = themes.find((theme)=> theme.name ===themeName) || themes[0]
        const  handleDelete =async()=>{
            setLoading(true)
            if (!projectId) {
                setLoading(false)
                toast("Error!",{
                    description:'Project not found',
                })
                return
            }
            try {
                const res= await RecoverProject(projectId)
                if(res.status !==200){
                      toast.error('Oopsie',{
                        description :res.error || 'Something went wrong'
                      })
                      return
                    }
                    setOpen(false)
                    router.refresh();
                    toast.success('Success',{
                        description : 'Project recoverd successfully'
                    })
                } catch(error){
                    toast.error('Error',{
                        description : 'Something went wrong .Please contact support'
                    })
    
            }
        }


    return (
        <motion.div
        className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${
            !isDelete && 'hover:bg-muted/50'} `}
        variants={itemVariants}
        >
            <div
            className="relative aspect-[16-10] overflow-hidden rounded-lg cursor-pointer"
            onClick={handleNavigation}
            >
                {/* <ThumbnailPreview theme={theme}
                //  WIP : Add the slide
                slide={JSON.parse(JSON.stringify(slideData))?.[0]}
                /> */}
            </div>
            <div className="w-full">
                <div className="space-y-1">
                    <h3 className="font-semibold text-base text-primary line-clamp-2">{title}</h3>
                    <div className="flex w-full justify-between items-center gap-2">
                        <p
                        className="text-sm text-muted-foreground"
                        suppressHydrationWarning
                        >
                            {timeAgo(createdAt)}
                        </p>
                        {
                          isDelete ? (
                            <AlertDialogueBox
                          description="This will recover your project and restore data"
                          className="bg-green-500 text-white dark:bg-green-600 hover:bg-green-600"
                          loading={loading}
                          open={open}
                          onClick={handleRecover}
                          handleOpen={()=>setOpen(!open)}
                          >
                                <Button
                                size="sm"
                                variant="ghost"
                                className="bg-background-80 dark:hover:bg-background-90"
                                disabled={loading}
                                >
                                        Recover
                                </Button>
                          </AlertDialogueBox>  
                          ) :(
                            <AlertDialogueBox
                            description="This will delete your project and sent to trash "
                            className="bg-red-500 text-white dark:bg-red-500 hover:bg-red-600 dark:hover:bg-red-700"
                            loading={loading}
                            open={open}
                            onClick={handleDelete}
                            handleOpen={()=>setOpen(!open)}
                            >
                                  <Button
                                  size="sm"
                                  variant="ghost"
                                  className="bg-background-80 dark:hover:bg-background-90"
                                  disabled={loading}
                                  >
                                        Delete
                                  </Button>
                            </AlertDialogueBox>  
                          )
                        }
                    </div>
                </div>
            </div>

        </motion.div>
    )
}

export default ProjectCard;