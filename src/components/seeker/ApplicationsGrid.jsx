import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // ১. Next.js Image কম্পোনেন্ট ইমপোর্ট করা হলো

// 1. Status Pill Sub-component
const StatusPill = ({ status }) => {
    const statusMap = {
        applied: 'border-gray-600 text-gray-300 bg-gray-800/40',
        review: 'border-amber-600 text-amber-500 bg-amber-950/20',
        shortlisted: 'border-emerald-600 text-emerald-500 bg-emerald-950/20',
        rejected: 'border-red-600 text-red-500 bg-red-950/20',
        offered: 'border-indigo-400 text-indigo-300 bg-indigo-950/20',
    };

    const style = statusMap[status?.toLowerCase()] || 'border-gray-600 text-gray-400';

    return (
        <span className={`inline-block px-3 py-0.5 rounded-full border text-xs font-medium tracking-wide capitalize ${style}`}>
            {status || 'Applied'}
        </span>
    );
};

// 2. Individual Row Sub-component
const ApplicationRow = ({ app, index }) => {
    // লোগো না থাকলে ব্যাকআপ ব্যাকগ্রাউন্ড কালার
    const iconBgs = [
        'bg-gray-700 text-gray-300',
        'bg-zinc-800 text-zinc-400',
        'bg-zinc-700 text-zinc-300',
        'bg-red-950/80 text-red-500',
        'bg-neutral-800 text-neutral-400'
    ];
    const bgStyle = iconBgs[index % iconBgs.length];

    // Format the "2026-06-11T17:53:01.520Z" date to something like "Jun 11, 2026"
    const formatDate = (dateString) => {
        if (!dateString) return 'Recent';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <tr className="hover:bg-zinc-800/20 transition-colors">
            {/* Job Title & Company Logo */}
            <td className="py-4 px-6 flex items-center gap-4">
                {/* ২. লোগো কন্টেইনার যেখানে ডাইনামিক Image ট্যাগ ব্যবহার করা হয়েছে */}
                <div className={`w-10 h-10 rounded-lg overflow-hidden bg-zinc-800 border border-zinc-700/50 flex items-center justify-center shrink-0 relative ${!app.companyLogo ? bgStyle : ''}`}>
                    {app.companyLogo ? (
                        <Image 
                            src={app.companyLogo} 
                            alt={`${app.companyName || 'Company'} logo`}
                            width={40}
                            height={40}
                            className="object-contain p-1 w-full h-full" 
                        />
                    ) : (
                        // ব্যাকআপ: যদি লোগো না থাকে তবে কোম্পানির নামের প্রথম অক্ষর দেখাবে
                        <span className="font-bold text-sm uppercase">
                            {app.companyName ? app.companyName.charAt(0) : 'J'}
                        </span>
                    )}
                </div>
                
                <div>
                    <h3 className="font-semibold text-white text-[15px] leading-tight">
                        {app.jobTitle || 'Untitled Position'}
                    </h3>
                    <span className="text-xs text-zinc-500 block mt-0.5">
                        Full-time • Remote
                    </span>
                </div>
            </td>

            {/* Company Name */}
            <td className="py-4 px-6 text-[15px] text-zinc-400 align-middle">
                {app.companyName || 'Unknown Company'}
            </td>

            {/* Created At Date */}
            <td className="py-4 px-6 text-[15px] text-zinc-400 align-middle">
                {formatDate(app.createAt)}
            </td>

            {/* Status Pill */}
            <td className="py-4 px-6 align-middle">
                <StatusPill status={app.status} />
            </td>

            {/* Action */}
            <td className="py-4 px-6 text-right sm:text-left align-middle">
                <Link 
                    href={`/applications/${app._id}`} 
                    className="text-sm font-medium text-zinc-300 hover:text-white hover:underline transition-colors"
                >
                    Details
                </Link>
            </td>
        </tr>
    );
};

// 3. Main Table Wrapper
export const ApplicationsGrid = ({ jobs = [] }) => {
    if (!jobs || jobs.length === 0) {
        return (
            <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl bg-[#161618]">
                <p className="text-zinc-500">No applications found.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-[#161618]">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-zinc-800 text-zinc-400 text-sm font-medium">
                        <th className="py-4 px-6">Job Title</th>
                        <th className="py-4 px-6">Company</th>
                        <th className="py-4 px-6">Applied</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6 text-right sm:text-left">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900/60">
                    {jobs.map((app, index) => (
                        <ApplicationRow key={app._id || index} app={app} index={index} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};