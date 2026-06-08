import JobCard from '@/components/job/JobCard';
import { getJobs } from '@/lib/api/data';


const Jobs =async () => {
    const jobs=await getJobs()
    
    return (
        <div className="container mx-auto p-4 bg-black min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
     
      {
        jobs.map(job=> <JobCard key={job._id} job={job}></JobCard>)
      }
    </div>
    );
};

export default Jobs;