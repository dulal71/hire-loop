"use client";

import React, { useState, useEffect } from "react";
import JobFilters from "./JobFilter";
import JobCard from "./JobCard";
import { useRouter } from "next/navigation";
import { PaginationSimplePrevNext, PaginationWithEllipsis, PaginationWithSummary } from "../PaginationWithSummary";




export default function JobListingContainer({ jobs,filters }) {
//  const  {jobs,total}=jobs
  const [searchQuery, setSearchQuery] = useState(filters.search);
  const [selectedType, setSelectedType] = useState(filters.jobType || "all");
  const [selectedCategory, setSelectedCategory] = useState(filters.jobCategory || "all");
  const [isRemoteOnly, setIsRemoteOnly] = useState(filters.isRemoteOnly || false);
  const [page, setPage] = useState(filters.page || 1);
  const router = useRouter()
  // Compute matched filter rows instantly
  
useEffect(()=>{
  const params=new URLSearchParams()
  if(selectedType !== 'all'){
    params.set('jobType',selectedType)
  }
  if(selectedType !== 'all'){
    params.set('jobCategory',selectedCategory)
  }
  if(isRemoteOnly){
    params.set('isRemote',isRemoteOnly)
  }
  if(searchQuery){
    params.set('search',searchQuery)
  }
  if(page){
    params.set('page',page)
  }

  const path = `?${params.toString()}`
  router.push(path)

},[router,searchQuery,selectedCategory,isRemoteOnly,selectedType,page])





  return (
    <>
      <JobFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isRemoteOnly={isRemoteOnly}
        setIsRemoteOnly={setIsRemoteOnly}
      />

      <div className="max-w-7xl mx-auto mb-6 text-sm text-zinc-500">
        Showing {jobs.length} position{jobs.length !== 1 && "s"}
      </div>

      {jobs.jobs.length > 0 ? (
        <>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {jobs.jobs.map((jobItem) => (
            <JobCard
              key={jobItem._id?.$oid || jobItem._id} 
              job={jobItem} 
            />
          ))}
        </div>
       <PaginationWithSummary jobs={jobs} total={jobs.total} page={page} setPage={setPage}></PaginationWithSummary>
        </>
      ) : (
        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-[32px] max-w-7xl mx-auto">
          <p className="text-zinc-500 text-lg">No positions match your search criteria.</p>
        </div>
      )}
    </>
  );
}