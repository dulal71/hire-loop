'use server'

import { serverMutation } from "../service/post"



export const addCompany= async(newCompany)=>{

 return serverMutation('/api/companies',newCompany)
}