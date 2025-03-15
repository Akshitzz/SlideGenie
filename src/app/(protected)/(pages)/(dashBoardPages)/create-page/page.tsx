import React , {Suspense} from "react"
import CreatePageSkeleton from "./_components/CreatePage/CreatePageSkeleton"
type Props = {}
const Page = (props:Props) =>{
    return  <main className="w-ful h-full pt-6">
        <Suspense fallback={<CreatePageSkeleton/>}>
            
        </Suspense>
    </main>
}

export default Page