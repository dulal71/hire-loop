'use server'

import { revalidatePath } from "next/cache"
import { serverMutation } from "../service/post"



export const addCompany= async(newCompany)=>{

 return serverMutation('/api/companies',newCompany)
}

export const updateCompany = async(id , data)=>{
    const result = await serverMutation(`/api/companies/${id}` , data , 'PATCH')
    revalidatePath('/dashboard/admin/companies')
    return result
}