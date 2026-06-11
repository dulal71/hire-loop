import { requireRole } from "@/lib/api/session";


const RecruiterLayout =async ({children}) => {
    await requireRole('recruiter')
    return children;
}

export default RecruiterLayout;