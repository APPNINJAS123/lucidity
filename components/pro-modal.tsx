'use client'

import { useProModal } from "@/hooks/use-pro-model";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Badge } from "./ui/badge";
import { Check, Code, ImageIcon, MessageSquare, Music, VideoIcon, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const tools=[{

    label:"conversation",
    icon: MessageSquare,
    color:"text-violet-500",
    bgColor:"bg-violet-500/10",
    //href: "/conversation"
  },
  {
  
    label:"Music Generator",
    icon: Music,
    color:"text-green-700",
    bgColor:"bg-green-700/10",
    //href: "/music"
  },
  {
  
    label:"Image Generator",
    icon: ImageIcon,
    color:"text-pink-700",
    bgColor:"bg-pink-700/10",
    //href: "/image"
  },
  {
  
    label:"Video Generator",
    icon: VideoIcon,
    color:"text-orange-700",
    bgColor:"bg-orange-700/10",
    //href: "/video"
  },
  {
  
    label:"Code Generator",
    icon: Code,
    color:"text-green-700",
    bgColor:"bg-green-700/10",
    //href: "/code"
  }
  ]

export const ProModal=()=>{

    const ProModal=useProModal();
    const[loading,SetLoading]=useState(false)

    const onSubscribe=async()=>{
      try {
        const response=axios.get('/api/stripe')
        SetLoading(true)


        window.location.href=(await response).data.url
      } catch (error) {
        //console.log(error,"STRIPE_CLIENT_ERROR")
        toast.error('something went wrong')
      }finally{
        SetLoading(false)
      }

    }

 return(
    <Dialog open={ProModal.isOpen} onOpenChange={ProModal.onClose}>
      <DialogContent>
        <DialogHeader>
            <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                <div className="flex items-center gap-x-2 font-bold py-1">
                Upgrade to Lucidity
                <Badge variant='premium'className="uppercase text-sm py-1">
                    pro
                </Badge>
                </div>
            </DialogTitle>
            <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
               {tools.map((tools)=>(
                <Card
                key={tools.label}
                className="p-3 border-black/5 flex items-center justify-between"
                >
                    <div className="flex items-center gap-x-4">
                        <div className={cn('p-2 w-fit rounded-md',tools.bgColor)}>
                            <tools.icon className={cn('w-6 h-6',tools.color)}/>

                        </div>
                        <div className="font-semibold text-sm">
                            {tools.label}
                        </div>

                    </div>
                    <Check className="text-primary w-5 h-5"/>

                </Card>
               ))}
            </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <Button disabled={loading} onClick={onSubscribe}
            size='lg'
            variant='prem'
            className="w-full "
            >
                Upgrade
                <Zap className="w-4 h-4 ml-2 fill-white "/>
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
 )
}