import React , {Suspense} from "react"
import CreatePageSkeleton from "./_components/CreatePage/CreatePageSkeleton"
import RenderPage from "./_components/RenderPage"
import { onAuthenticateUser } from "@/actions/user"
import { redirect } from "next/navigation"
type Props = {}
const Page = async(props:Props) =>{
    const Checkuser= await onAuthenticateUser()
    if(!Checkuser?.user){
        redirect('sign-in')
    }

    if(Checkuser?.user.subscription){
        redirect('/dashboard')
    }


    return  <main className="w-ful h-full pt-6">
        <Suspense fallback={<CreatePageSkeleton/>}>
            <RenderPage/>
        </Suspense>
    </main>
}

export default Page