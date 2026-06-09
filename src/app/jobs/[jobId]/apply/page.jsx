import { getSession } from '@/lib/api/session';
import { p } from 'motion/react-client';
import { redirect } from 'next/navigation';
import React from 'react';

const ApplyJob =async ({params}) => {
    const {jobId}=await params
    console.log(jobId);
  const user = await getSession()  
   if (!user) {
        redirect(`/signin?redirect=/jobs/${jobId}/apply`);
    }
    if (user.role !== "seeker") {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className='p-5 border border-red-700'>
        <p className='text-red-700 font-semibold text-2xl'>Only job seekers can apply for this job</p>
      </div>
     
    </div>
  );
}
    return (
        <div>
        <h1>Hi</h1>    
        </div>
    );
};

export default ApplyJob;