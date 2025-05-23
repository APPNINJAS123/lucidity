import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Replicate from 'replicate'
import { increaseApiLimit,checkApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const replicate = new Replicate({
   auth:process.env.REPLICATE_API_TOKEN!
  
  });

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const {prompt} = body;
  

    if (!prompt) {
      return new NextResponse("prompt is required", { status: 400 });
    }
    const freeTrial=await checkApiLimit();
    const isPro=await checkSubscription();

    if(!freeTrial && !isPro){
      return new NextResponse("Free trial has expired",{status:403})
    }


    const input = {
      fps: 24,
      width: 1024,
      height: 576,
      prompt: prompt,
      guidance_scale: 17.5,
      //negative_prompt: "very blue, dust, noisy, washed out, ugly, distorted, broken"
  };
  
  const response = await replicate.run("anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351", { input });
  if(!isPro){
    await increaseApiLimit();
  }
  

  
  return NextResponse.json(response);


  } catch (error) {
    
      console.log("[VIDEO ERROR]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }
    