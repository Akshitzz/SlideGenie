'use server'
import OpenAI from 'openai'
export const generateCreativePrompt = async (userPrompt :string)=>{
    const openai = new OpenAI({
        apiKey :process.env.OPENAI_API_KEY,
    })
const finalPrompt = `
Create a coherent and relevent outline for the following prompt : ${userPrompt}.
The outline should should consist of at least 6 points , with eachh point written as a single sentence.
Ensure the outline is well-structured and directly related to the topic.
Return the output in thr following JSON format :
    {
        "outlines": [
        "Point 1",
        "Point 2",
        "Point 3",
        "Point 4",
        "Point 5",
        "Point 6",
        ]
    }
    Ensure that the the JSON format is valid and properly formatted . Do not include any other text or explanations outside the JSON.
`

try {
const completion = await openai.chat.completions.create({
    model :'chatgpt-4o-latest',
    messages:[
        {
            role:'system',
            content:'You are a helpful AI that genrates outlines for presentations',
        },
        {
            role:'user',
            content:finalPrompt,
        }
    ],
    max_tokens :1000,
    temperature :0.0
})

const responseContent = completion.choices[0].message?.content
if(responseContent){
    try{
    const jsonresponse = JSON.parse(responseContent)
    return {status:200 ,data:jsonresponse}
    }catch(error){
        console.error('Invalid JSON received',responseContent,error)
        return {status:500 ,error:'Invalid JSON format recieved from AI'}
    }
}
return {status:4000,error:'No content generated'}
} catch(error){
    console.error('ERROR',error)
    return {status:500,error:'Internal server error'}
}
}