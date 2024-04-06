"use client"

import { useEffect } from "react"
import {Crisp} from 'crisp-sdk-web'


export const CrispChat=()=>{
    useEffect(()=>{
        Crisp.configure("4b86fb79-33cb-49d5-bf2b-bb991bd51aef")

    },[])

    return null
}