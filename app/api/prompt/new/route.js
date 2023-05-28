import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';
export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json();
    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creater: userId,
            prompt: prompt,
            tag: tag,
        })
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        console.log("Error in prompt api", error);
        return new Response("Failed to create a new prompt", { status: 500 }) 
    }
}