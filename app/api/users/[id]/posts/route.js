import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';
export const GET = async (request,{params}) => {
    console.log(params.id);
    try {
        await connectToDB();
        const prompts = await Prompt.find({
            creator:params.id
        }).populate('creator');
        
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.log("Error in prompt api", error);
        return new Response("Failed to fetch all", { status: 500 }) 
    }
}