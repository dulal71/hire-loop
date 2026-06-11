'use server'

import { serverMutation } from "../service/post"



export const addSubscription= async(subInfo)=>{

 return serverMutation('/api/subscriptions',subInfo)
}