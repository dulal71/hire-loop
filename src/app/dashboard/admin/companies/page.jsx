import { CompaniesTable, CompanyStats } from '@/components/admin/CompanyStats';
import { getCompanies } from '@/lib/api/data';
import React from 'react';

const Companies = async () => {
    const companies = await getCompanies() || [];
    console.log(companies);
    
    return (
        <div className="bg-[#121214] min-h-screen text-gray-300 p-6 font-sans">
            <div className="max-w-7xl mx-auto">
                
              
                <CompanyStats data={companies} />

               
                <CompaniesTable data={companies} />
                
            </div>
        </div>
    );
};

export default Companies;