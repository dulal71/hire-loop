'use server'

import { serverFetch } from "../service/get"

export const getPlanById=async(plan_id)=>{
return serverFetch(`/api/plans?plan_id=${plan_id}`)
}