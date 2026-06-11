import { ApplicationsGrid } from "@/components/seeker/ApplicationsGrid";
import { getApplicationByApplicant } from "@/lib/api/data";
import { getSession } from "@/lib/api/session";


const Applications =async () => {
    const user = await getSession()
    const jobs =await getApplicationByApplicant(user?.id)

    return (
        <div>
     <ApplicationsGrid jobs={jobs}></ApplicationsGrid>
        </div>
    );
};

export default Applications;