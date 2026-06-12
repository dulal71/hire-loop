import AddNewJob from "@/components/AddNewJob";
import { getLoggedInRecruiterCompany } from "@/lib/api/data";
import { div } from "motion/react-client";


const  PostJobPage = async()=> {
    // Mock configuration for recruiter's authenticated state
    
const company = await getLoggedInRecruiterCompany()
   console.log(company);
return (
      <div>
       <AddNewJob company={company}></AddNewJob> 
      </div>  
    );
}
export default PostJobPage