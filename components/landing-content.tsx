"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const Testimonials=[
    {
        name:"Sam",
        avatar:'S',
        title:'Employee',
        description:'You can get access to several ai tools for a cheap price'


    },
    {
        name:"Greg",
        avatar:'G',
        title:'Editor',
        description:'Amazing Video generation tool!'


    },
    {
        name:"Dred",
        avatar:'D',
        title:'Programmer',
        description:'Great Code Generator!'


    },
    {
        name:"Chase",
        avatar:'C',
        title:'Music Producer',
        description:'Impressed by the Music Generator tool! '


    }
    

]


export const LandingContent = () => {
    return (
      <div className="px-10 pb-20 flex flex-col items-center">
        <h2 className="text-center text-4xl text-white font-extrabold mb-10">Testimonials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Testimonials.map((item) => (
            <Card key={item.description} className="bg-[#192339] border-none text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-x-2">
                  <div>
                    <p className="text-lg">{item.name}</p>
                    <p className="text-zinc-400 text-sm">{item.title}</p>
                  </div>
                </CardTitle>
                <CardContent className="pt-4 px-0">
                  {item.description}
                </CardContent>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    )
  }