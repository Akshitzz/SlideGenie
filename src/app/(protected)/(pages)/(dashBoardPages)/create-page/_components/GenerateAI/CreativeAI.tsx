import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { containerVairants, itemVariants } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Loader2, RotateCcw } from "lucide-react"
import { Input } from "@/components/ui/input"
import useCreativeAIStore from "@/store/useCreativeAIStore"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {  useState } from "react"
import CardList from "../Common/CardList"
type Props = {
    onBack:()=>void
}

const CreateAI =({onBack}:Props) =>{
    const router = useRouter()
  
    const [editingCard,setEditingCard] =useState<string |null>(null)
    const {currentAiPrompt ,setCurrentAiPrompt,outlines,resetOutlines} =useCreativeAIStore()
    const[noOfCards,setnoOfCards] = useState(0)
    const [selectedCard ,setSelectedCard] = useState<string | null>(null)
    const [editText,setEditText] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)

        const handleBack = ()=>{
            onBack()
        }
        const resetCards = ()=>{
            setEditingCard(null)
            setSelectedCard(null)
            setEditText('')
            setCurrentAiPrompt('')
            resetOutlines()

        }
        //  WIP in progress it genrates outlines for the Slides
        const generateOutlines = ()=>{}
        return <motion.div
        className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVairants}
        initial="hidden"
        animate="visible"
        >
            <Button
            onClick={handleBack}
            variant="outline"
            className="mb-4"
            >
                <ChevronLeft className="mr-2 h-4 w-4"/>
                Back
            </Button>
            <motion.div
            variants={itemVariants}
            className="text-center space-y-2"
            >
                <h1 className="text-4xl font-bold text-primary">
                    Generate wtih <span className="text-vivd">
                        Creative AI
                    </span>
                </h1>
                <p className="text-secondary"> What would like to create today?</p>
            </motion.div>
            <motion.div
            className="bg-primary/10 p-4 rounded-xl"
            variants={itemVariants}
            >
                <div className="flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl">
                    <Input
                    value={currentAiPrompt || ''}
                    onChange={(e)=>setCurrentAiPrompt(e.target.value)}
                    placeholder="Enter your prompt and add to the cards"
                    className="text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow"
                    required
                    />
                    <div className="flex items-center gap-3">
                        <Select value={noOfCards.toString()}
                        onValueChange={(value)=> setnoOfCards(parseInt(value))}
                        >
                            <SelectTrigger className="w-fit gap-2 font-semibold shadow-xl">
                             <SelectValue placeholder="Select no of cards" />    
                            </SelectTrigger>
                            <SelectContent className="w-fit">
                                {outlines.length === 0 ? (
                                    <SelectItem  className="font-semibold"
                                    value="0">
                                        No Cards
                                        </SelectItem>
                                ): (
                                    Array.from({length:outlines.length},(_,idx)=>idx +1                                    
                                    ).map((item)=>(
                                        <SelectItem
                                        key={item}
                                        value={item.toString()}
                                        className="font-semibold"
                                        >
                                            {item} {item === 1 ? 'Card' : 'Cards'}
                                        </SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
                        <Button
                        variant="destructive"
                        onClick={resetCards}
                        size="icon"
                        aria-label="Reset Cards"
                        >
                            <RotateCcw className="h-4  w-4"/>
                        </Button>
                    </div>
                </div>

            </motion.div>
            <div className="w-full flex justify-center items-center">
                <Button className="font-medium text-lg flex gap-2 items-center"
                // onClick={generateOutlines}
                disabled={isGenerating}
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="mr-2 animate-spin"/>
                            Generating ...
                        </>
                    ) : (
                        'Generate Outlines'
                    )}
                </Button>
            </div>
            <CardList/>
        </motion.div>
}

export default CreateAI;