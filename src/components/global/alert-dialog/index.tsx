import { AlertDialog, AlertDialogCancel, AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from '@radix-ui/react-alert-dialog'
import { Loader2 } from 'lucide-react'
import React from 'react'

type Props = {
    children :React.ReactNode
    className ?: string,
    description :string,
    loading?: boolean,
    onClick?:()=>void
    open:boolean
    handleOpen:()=>void
}

const AlertDialogueBox = ({
    children,
    className,
    description,
    loading = false,
    onClick,
    open,
    handleOpen
} :Props) =>{
        return (
          <AlertDialog
          open={open}
          onOpenChange={handleOpen}
          >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure ?</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                    variant={'destructive'}
                    className={`${className}`}
                    onClick={onClick}
                    >
                        {loading ?(
                            <>
                            <Loader2 className='animate-spin'/>
                            Loading ...
                            </>
                        ) :(
                            'Continue'
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )
}

export  default AlertDialogueBox;