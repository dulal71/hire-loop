import CompanyProfile from '@/components/recruiter/CompanyProfile';
import { getRecruiterCompany } from '@/lib/api/data';
import { getSession } from '@/lib/api/session';


const RecruiterCompany =async () => {
    const user = await getSession()
   
   const company = await getRecruiterCompany(user?.id)
   console.log(company);

    return (
        <div>
          <CompanyProfile recruiter={user} recruiterCompany={company}></CompanyProfile>  
        </div>
    );
};

export default RecruiterCompany;