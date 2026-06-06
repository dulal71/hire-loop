'use server'

const baseUrl=process.env.SERVER_URL
export const createJob= async(newJobData)=>{

    const res = await fetch(`${baseUrl}/api/jobs`,{
     method:"POST",
     headers:{
      'Content-type':'application/json',
     } ,
     body:JSON.stringify(newJobData)
    })
 const data = await res.json()
 return data;
}