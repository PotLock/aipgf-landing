import type { NextPage } from "next";

const ProposalPostSkeleton: NextPage = () => {
  return (
    <div className="flex flex-col gap-3">
      {[1, 2, 3].map((index) => (
        <div 
          key={index}
          className="w-full border-aipgf-geyser border-[1px] border-solid box-border md:h-52 rounded-lg shadow-sm p-3 md:p-5 bg-white"
        >
          <div className="flex md:flex-row flex-col gap-3 items-end md:items-center justify-between">
            <div className="flex flex-col md:flex-row md:gap-3 gap-1">
              <div className="flex flex-row gap-2 items-center md:items-start">
                {/* Avatar skeleton */}
                <div className="w-[30px] h-[30px] rounded-full bg-slate-200 animate-pulse" />
                
                {/* Mobile title skeleton */}
                <div className="md:hidden flex flex-row gap-3">
                  <div className="h-5 bg-slate-200 rounded-md w-32 animate-pulse" />
                  <div className="h-6 bg-slate-200 rounded-full w-16 animate-pulse" />
                </div>
              </div>

              <div className="flex flex-col gap-1 flex-grow">
                {/* Desktop title and tags skeleton */}
                <div className="hidden md:flex flex-col gap-3">
                  <div className="h-6 bg-slate-200 rounded-md w-48 animate-pulse" />
                  <div className="flex flex-row gap-2">
                    <div className="h-6 bg-slate-200 rounded-full w-20 animate-pulse" />
                    <div className="h-6 bg-slate-200 rounded-full w-20 animate-pulse" />
                  </div>
                </div>

                {/* Author and timestamp skeleton */}
                <div className="flex flex-col gap-2">
                  <div className="h-4 bg-slate-200 rounded-md w-36 mt-2 animate-pulse" />
                  <div className="h-4 bg-slate-200 rounded-md w-full max-w-md animate-pulse" />
                </div>

                {/* Votes and replies skeleton */}
                <div className="flex flex-row gap-5 mt-3 items-center">
                  <div className="flex flex-row gap-1 items-center">
                    <div className="w-6 h-6 bg-slate-200 rounded-md animate-pulse" />
                    <div className="h-4 bg-slate-200 rounded-md w-16 animate-pulse" />
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <div className="w-6 h-6 bg-slate-200 rounded-md animate-pulse" />
                    <div className="h-4 bg-slate-200 rounded-md w-16 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* Status button skeleton */}
            <div className="h-8 bg-slate-200 rounded-full w-24 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProposalPostSkeleton; 