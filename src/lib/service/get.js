'use server'

import { authHeader } from "./post"

const baseUrl=process.env.SERVER_URL

export const serverFetch=async(path)=>{
    const res = await fetch(`${baseUrl}${path}`)
    return res.json()
}
export const protectedFetch=async(path)=>{
    const res = await fetch(`${baseUrl}${path}`,{
        headers: await authHeader()
    })
    return res.json()
}