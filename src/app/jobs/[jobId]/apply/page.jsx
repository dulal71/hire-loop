import JobApply from '@/components/job/JobApply';
import { getApplicationByApplicant, getJobById } from '@/lib/api/data';
import { getSession } from '@/lib/api/session';
import { redirect } from 'next/navigation';
import React from 'react';
// Importing basic Gravity UI icons if you already have them installed, or use standard SVGs
import { ShieldCheck, Briefcase,CircleDollar } from '@gravity-ui/icons';
import Link from 'next/link';
import { getPlanById } from '@/lib/api/plans';

const ApplyJob = async ({ params }) => {
  const { jobId } = await params;
  const user = await getSession();

  if (!user) {
    redirect(`/signin?redirect=/jobs/${jobId}/apply`);
  }

  // Unauthorized access state (e.g., if a Recruiter accidentally accesses this page)
  if (user.role !== "seeker") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-md w-full p-6 text-center bg-white dark:bg-zinc-900 border border-red-200 dark:border-red-950/50 rounded-2xl shadow-xl shadow-red-500/5">
          <div className="mx-auto w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 mb-4">
            <ShieldCheck width={24} height={24} />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Access Denied</h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
            Only registered <span className="font-semibold text-zinc-900 dark:text-white">Job Seekers</span> are authorized to apply for positions on this platform.
          </p>
        </div>
      </div>
    );
  }

  const applications = await getApplicationByApplicant(user.id);
  const plan = await getPlanById(user?.plan || 'seeker_free')
  const job = await getJobById(jobId);

  const applicationsLeft = plan.maxApplicationPerMonth - applications.length;
  const isLimitReached = applications.length >= plan.maxApplicationPerMonth;

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COLUMN: Job Context & Application Limit Meter */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Job Overview Card */}
          <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary-50 dark:bg-primary-950/50 text-primary rounded-xl">
                <Briefcase width={22} height={22} />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Applying for</span>
                <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mt-0.5">{job?.title || "Position Overview"}</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{job?.companyName || "Company Confidential"}</p>
              </div>
            </div>
          </div>

          {/* Monthly Limit/Plan Card */}
          <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Monthly Usage</h3>
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                {plan.name}
              </span>
            </div>

            {/* Application Progress Count */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500 dark:text-zinc-400">Applications Submitted</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {applications.length} <span className="text-zinc-400 font-normal">/ {plan.maxApplicationPerMonth}</span>
                </span>
              </div>
              
              {/* Custom Progress Bar */}
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    isLimitReached ? 'bg-red-500' : 'bg-primary'
                  }`}
                  style={{ width: `${(applications.length / plan.maxApplicationPerMonth) * 100}%` }}
                />
              </div>
            </div>

            {/* Dynamic Status Callout */}
            <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
              {isLimitReached ? (
                <p className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 p-3 rounded-xl border border-red-100 dark:border-red-900/20">
                  You have reached your limit of {plan.maxApplicationPerMonth} applications for this billing cycle. Upgrade your plan to continue applying.
                </p>
              ) : (
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  You have <span className="font-semibold text-zinc-800 dark:text-zinc-200">{applicationsLeft} application slots</span> left for this month.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Job Form Container */}
        <div className="lg:col-span-2">
          {!isLimitReached ? (
            <JobApply applicant={user} job={job} />
          ) : (
            <div className="p-8 bg-white dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-center min-h-[320px]">
              <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mb-4">
                <CircleDollar width={24} height={24} />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Application Limit Exceeded</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm mt-2">
                To submit an application for this {job?.title || 'job'}, please renew or boost your application allowances.
              </p>
              <Link href={"/plans"} className="mt-5 px-5 py-2.5 text-sm font-semibold bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 rounded-xl hover:opacity-90 active:scale-98 transition">
                Upgrade Plan
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ApplyJob;