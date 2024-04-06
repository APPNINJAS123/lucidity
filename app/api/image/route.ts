import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { increaseApiLimit,checkApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';


//const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    
    const body = await req.json();
    const { prompt,amount=1,width= 768,height=768 } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }


    if (!prompt) {
      return new NextResponse("prompt are required", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("amount are required", { status: 400 });
    }
    if (!width) {
      return new NextResponse("width is required", { status: 400 });
    }
    if (!height) {
      return new NextResponse("height is required", { status: 400 });
    }
    const freeTrial=await checkApiLimit();
    const isPro=await checkSubscription();

    if(!freeTrial && !isPro){
      return new NextResponse("Free trial has expired",{status:403})
    }

    //const response = await openai.images.generate({ model: "dall-e-2", prompt:prompt,size:resolution,n: parseInt(amount, 10), });


    const output = await replicate.run(
      "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
      {
        input: {
          //width:width,
          //height: height,
          prompt: prompt,
          scheduler: "K_EULER",
          num_outputs: parseInt(amount, 10),
          guidance_scale: 7.5,
          num_inference_steps: 50
        }
      }
    );
    if(!isPro){
      await increaseApiLimit();
    }
    
      
   

    //const responseContent = output;
    //console.log(output)

    return NextResponse.json(output);
  } catch (error) {
    
    console.log("[VIDEO ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}