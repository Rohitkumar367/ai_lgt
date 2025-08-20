import { NextResponse } from "next/server";
import { generateIdeas } from "@/configs/AiModel";  // Fixed import path

export async function POST(req) {
    try {
        const { prompt } = await req.json();
        
        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        const ideas = await generateIdeas(prompt);
        return NextResponse.json({ ideas });
    } catch (error) {
        console.error("API Route Error:", error);
        return NextResponse.json(
            { error: error.message || "Something went wrong" }, 
            { status: 500 }
        );
    }
}
