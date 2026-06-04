
'use client'
import { Briefcase, Persons, Thunderbolt, CircleCheck } from '@gravity-ui/icons';
import DashboardStats from "@/components/dashboard/DashboardStats";
import { useSession } from "@/lib/auth-client";

const RecruiterPage = () => {
    const { data: session, isPending } = useSession();

    if (isPending) {
        return <div>Loading...</div>
    }

    const recruiterStats = [
        { title: "Total Job Posts", value: "48", icon: Briefcase },
        { title: "Total Applicants", value: "1,284", icon: Persons },
        { title: "Active Jobs", value: "18", icon: Thunderbolt },
        { title: "Jobs Closed", value: "32", icon: CircleCheck },
    ];
    const user = session?.user
    return (
        <div className="p-5">
          <h1 className="text-3xl">Welcome back,{user?.name}</h1>  
        <DashboardStats statsData={recruiterStats}></DashboardStats>
        </div>
    );
};

export default RecruiterPage;