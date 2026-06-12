'use client'
import React from 'react';
import Image from 'next/image';

import { updateCompany } from '@/lib/action/company';


const StatusIndicator = ({ status }) => {
    const statusMap = {
        pending: { text: 'text-amber-500', dot: 'bg-amber-500' },
        approved: { text: 'text-emerald-500', dot: 'bg-emerald-500' },
        rejected: { text: 'text-red-500', dot: 'bg-red-500' },
    };

  
    const current = statusMap[status?.toLowerCase()] || statusMap.pending;

    return (
        <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
            <span className={`text-[14px] font-medium ${current.text} capitalize`}>
                {status || 'Pending'}
            </span>
        </div>
    );
};


export const CompanyStats = ({ data = [] }) => {
    const pendingCount = data.filter(c => c.status?.toLowerCase() === 'pending').length;
    const approvedCount = data.filter(c => c.status?.toLowerCase() === 'approved').length;
    const rejectedCount = data.filter(c => c.status?.toLowerCase() === 'rejected').length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#161618] border border-zinc-800 rounded-xl p-5">
                <div className="flex justify-between items-start text-xs font-medium mb-2">
                    <span className="text-zinc-400 tracking-wider uppercase">Pending Review</span>
                    <span className="text-emerald-500 bg-emerald-950/30 px-2 py-0.5 rounded">+12% vs last week</span>
                </div>
                <div className="text-3xl font-bold text-white">{pendingCount}</div>
            </div>

            <div className="bg-[#161618] border border-zinc-800 rounded-xl p-5">
                <div className="flex justify-between items-start text-xs font-medium mb-2">
                    <span className="text-zinc-400 tracking-wider uppercase">Approved Partners</span>
                    <span className="text-emerald-500 bg-emerald-950/30 px-2 py-0.5 rounded">+5% vs last week</span>
                </div>
                <div className="text-3xl font-bold text-white">{approvedCount}</div>
            </div>

            <div className="bg-[#161618] border border-zinc-800 rounded-xl p-5">
                <div className="flex justify-between items-start text-xs font-medium mb-2">
                    <span className="text-zinc-400 tracking-wider uppercase">Total Rejections</span>
                    <span className="text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded">Stable</span>
                </div>
                <div className="text-3xl font-bold text-white">{rejectedCount}</div>
            </div>
        </div>
    );
};


const CompanyRow = ({ company, onApprove, onReject }) => {
    const formatDate = (dateString) => {
        if (!dateString) return 'Recent';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    };

    return (
        <tr className="hover:bg-zinc-800/10 transition-colors">
            {/* Company Name with Logo */}
            <td className="py-4 px-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-zinc-800 text-zinc-400 font-bold text-xs flex items-center justify-center shrink-0 relative overflow-hidden border border-zinc-700/30">
                    {company.logo ? (
                        <Image 
                            src={company.logo} 
                            alt={company.name || 'logo'} 
                            width={32} 
                            height={32} 
                            className="object-contain p-0.5"
                        />
                    ) : (
                        <span>{company.name?.substring(0, 2).toUpperCase() || 'CO'}</span>
                    )}
                </div>
                <span className="font-medium text-white text-[15px]">{company.name || 'Untitled Company'}</span>
            </td>

            {/* Location & Size Info */}
            <td className="py-4 px-6 text-[14px] text-zinc-400 align-middle capitalize">
                {company.location ? `${company.location} (${company.employeeCount || '1-10'})` : 'N/A'}
            </td>

            {/* Industry */}
            <td className="py-4 px-6 align-middle">
                <span className="text-[12px] text-zinc-400 bg-zinc-800/60 border border-zinc-800 px-2.5 py-1 rounded-full">
                    {company.industry || 'Technology'}
                </span>
            </td>

            {/* Status Dot */}
            <td className="py-4 px-6 align-middle">
                <StatusIndicator status={company.status} />
            </td>

            {/* Date Submitted */}
            <td className="py-4 px-6 text-[14px] text-zinc-400 align-middle">
                {formatDate(company.createdAt)}
            </td>

            {/* Actions Buttons */}
            <td className="py-4 px-6 align-middle">
                <div className="flex items-center gap-2 justify-end sm:justify-start">
                    {company.status?.toLowerCase() !== 'approved' && (
                        <button
                            onClick={() => onApprove(company._id)}
                            className="text-xs font-semibold text-emerald-500 bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-900/50 px-3 py-1.5 rounded-lg transition-colors"
                        >
                            Approve
                        </button>
                    )}
                    {company.status?.toLowerCase() !== 'rejected' && (
                        <button 
                            onClick={() => onReject(company._id)}
                            className="text-xs font-semibold text-red-500 bg-red-950/10 hover:bg-red-950/20 border border-red-950/30 px-3 py-1.5 rounded-lg transition-colors"
                        >
                            Reject
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
};


export const CompaniesTable = ({ data = [] }) => {
   


    const handleReject = async (id) => {
        try {
            const result = await updateCompany(id, { status: 'Rejected' });  
            if (result.modifiedCount > 0) {
                alert('Company rejected successfully');
              
            } else {
                alert('Something went wrong');
            }
        } catch (error) {
            console.error(error);
            alert('Server error occurred');
        }
    };

    const handleApprove = async (id) => {
        try {
          
            const result = await updateCompany(id, { status: 'Approved' });  
            if (result.modifiedCount > 0) {
                alert('Company approved successfully');
               
            } else {
                alert('Something went wrong');
            }
        } catch (error) {
            console.error(error);
            alert('Server error occurred');
        }
    };

    if (!data || data.length === 0) {
        return (
            <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl bg-[#161618]">
                <p className="text-zinc-500">No company registrations found.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-[#161618]">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-zinc-800 text-zinc-400 text-xs font-medium tracking-wider uppercase bg-zinc-900/20">
                        <th className="py-4 px-6">Company Name</th>
                        <th className="py-4 px-6">Location / Size</th>
                        <th className="py-4 px-6">Industry</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6">Date Submitted</th>
                        <th className="py-4 px-6 text-right sm:text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900/40">
                    {data.map((company, index) => (
                        <CompanyRow 
                            key={company._id || index} 
                            company={company} 
                            onApprove={handleApprove}
                            onReject={handleReject}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};