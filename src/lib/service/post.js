'use server'

import { getUserToken } from "../api/session"



const baseUrl=process.env.SERVER_URL

export const authHeader=async()=>{
    const token = await getUserToken()
    const header = token ? 
    {
        authorization : `Bearer ${token}`
    } : {}
    return header;

}
export const serverMutation= async(path, data , method = 'POST')=>{

    const res = await fetch(`${baseUrl}${path}`,{
     method:method,
     headers:{
      'Content-type':'application/json',
      ...await authHeader()
     } ,
     body:JSON.stringify(data)
    })
 
 return res.json()
}