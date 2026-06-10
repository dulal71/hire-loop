'use server'

import { serverMutation } from "../service/post"



export const addJobApplication= async(newApplication)=>{

 return serverMutation('/api/application',newApplication)
}