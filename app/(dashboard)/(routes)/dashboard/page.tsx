"use client";

import { ArrowRight, Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

//import { tools } from "@/constants";

const tools=[{

  label:"conversation",
  icon: MessageSquare,
  color:"text-violet-500",
  bgColor:"bg-violet-500/10",
  href: "/conversation"
},
{

  label:"Music Generator",
  icon: Music,
  color:"text-green-700",
  bgColor:"bg-green-700/10",
  href: "/music"
},
{

  label:"Image Generator",
  icon: ImageIcon,
  color:"text-pink-700",
  bgColor:"bg-pink-700/10",
  href: "/image"
},
{

  label:"Video Generator",
  icon: VideoIcon,
  color:"text-orange-700",
  bgColor:"bg-orange-700/10",
  href: "/video"
},
{

  label:"Code Generator",
  icon: Code,
  color:"text-green-700",
  bgColor:"bg-green-700/10",
  href: "/code"
}
]

export default function HomePage() {
  const router = useRouter();

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Feel the Magic of AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Ai for all your needs-from image to video generation
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card onClick={() => router.push(tool.href)} key={tool.href} className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
}