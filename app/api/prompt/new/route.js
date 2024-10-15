
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { userId, prompt, tag } = await request.json();

    try {
        await connectToDB();     //have to do evrytime as it's a lambda fn dies after doing it's job
        const newPrompt = new Prompt({ creator: userId, prompt, tag });

        await newPrompt.save();   //to save to db
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}
 