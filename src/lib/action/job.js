'use server'

import { serverMutation } from "../service/post"


export const createJob= async(newJobData)=>{
return serverMutation('/api/jobs',newJobData)
    
}