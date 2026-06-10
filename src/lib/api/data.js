'use server'

import { serverFetch } from "../service/get"
import { getSession } from "./session"

const baseUrl=process.env.SERVER_URL

export const  getRecruiterJobs=async(companyId, status = "active")=>{
const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`)
const data = await res.json()
return data;
}

export const getJobs=async()=>{
    return serverFetch('/api/jobs')
}
export const getJobById=async(jobId)=>{
    return serverFetch(`/api/jobs/${jobId}`)
}


export const getRecruiterCompany=async(recruiterId)=>{
return serverFetch(`/api/my/company?recruiterId=${recruiterId}`)
}

export const getLoggedInRecruiterCompany=async()=>{
const user = await getSession()
return getRecruiterCompany(user?.id)
}

export const getApplicationByApplicant=async(applicantId)=>{
    return serverFetch(`/api/application?applicantId=${applicantId}`)
}