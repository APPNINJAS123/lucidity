import * as z from "zod"

export const formSchema=z.object({
    prompt:z.string().min(1,{
        message:"Image Prompt is required"
    }),
    amount:z.string().min(1),
    width:z.string().min(1),
    height:z.string().min(1)
})


export const amountOptions=[
    {
        value:'1',
        label:'1 photo'
    },
    {
        value:'2',
        label:'2 photo'
    },
    {
        value:'3',
        label:'3 photo'
    },
    {
        value:'4',
        label:'4 photo'
    },
    {
        value:'5',
        label:'5 photo'
    }
]

export const widthOptions=[
    {
        value:'320',
        label:'320'
    },
    {
        value:'512',
        label:'512'
    },
    {
        value:'768',
        label:'768'
    },
    {
        value:'960',
        label:'960'
    },
]

    export const heightOptions=[
        {
            value:'320',
            label:'320'
        },
        {
            value:'512',
            label:'512'
        },
        {
            value:'768',
            label:'768'
        },
        {
            value:'960',
            label:'960'
        },
];