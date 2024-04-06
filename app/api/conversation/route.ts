
import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!
});

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { messages } = body;

    if (!messages) {
      return new NextResponse("messages are required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired", { status: 403 });
    }

    interface Message {
      role: "user" | "assistant";
      content: string;
    }

    const input = {
      debug: false,
      top_p: 1,
      prompt: messages.map((message: Message) => message.content).join('\n'),
      temperature: 0.5,
      system_prompt: "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.\n\nIf a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.",
      max_new_tokens: 500,
      min_new_tokens: -1,
      prompt_template: "[INST] <<SYS>>\n{system_prompt}\n<</SYS>>\n\n{prompt} [/INST]",
      repetition_penalty: 1.15
    };

    const output = await replicate.run("meta/llama-2-70b-chat", { input });
    

    if (!isPro) {
      await increaseApiLimit();
    }

    // Extract the response content from the output object
    // Update this line based on the response structure
    const responseContent = output;

    return NextResponse.json({ response: responseContent });
  } catch (error) {
    console.log("[CONVERSATION ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}