import type { NextPage } from "next";

const RFPsCardSkeleton: NextPage = () => {
  return (
    <div className="flex flex-row gap-3">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="flex flex-col gap-3 min-w-[350px] md:w-[550px] p-3 md:p-4 border-aipgf-geyser border-[1px] border-solid box-border rounded-lg shadow-sm bg-white"
        >
          <div className="flex gap-3 flex-col md:flex-col justify-between items-start">
            {/* Avatar and Title */}
            <div className="flex flex-row gap-3 items-center w-full">
              <div className="w-[41px] h-[41px] rounded-full bg-slate-200 animate-pulse" />
              <div className="h-6 bg-slate-200 rounded-md w-3/4 animate-pulse" />
            </div>

            {/* Tags */}
            <div className="flex flex-row gap-1">
              <div className="h-6 bg-slate-200 rounded-full w-20 animate-pulse" />
              <div className="h-6 bg-slate-200 rounded-full w-24 animate-pulse" />
              <div className="h-6 bg-slate-200 rounded-full w-16 animate-pulse" />
            </div>
          </div>

          {/* Summary */}
          <div className="h-4 bg-slate-200 rounded-md w-full animate-pulse mt-2" />
          <div className="h-4 bg-slate-200 rounded-md w-3/4 animate-pulse" />

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 md:gap-0 mt-3">
            {/* Deadline */}
            <div className="flex flex-row gap-3 items-center md:items-start md:gap-2 md:flex-col">
              <div className="h-4 bg-slate-200 rounded-md w-32 animate-pulse" />
              <div className="h-4 bg-slate-200 rounded-md w-24 animate-pulse" />
            </div>

            {/* Author info */}
            <div className="flex flex-row gap-2 items-center">
              <div className="p-1 border-aipgf-geyser border-[1px] border-solid box-border rounded-full md:h-5 md:w-8 h-7 w-10 bg-slate-200 animate-pulse" />
              <div className="h-4 bg-slate-200 rounded-md w-48 animate-pulse" />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between bg-aipgf-geyser bg-opacity-25 items-center p-3 mt-3">
            <div className="flex flex-row gap-5 items-center">
              <div className="flex flex-row gap-1 items-center">
                <div className="w-4 h-4 bg-slate-200 rounded-md animate-pulse" />
                <div className="h-4 bg-slate-200 rounded-md w-20 animate-pulse" />
              </div>
              <div className="flex flex-row gap-1 items-center">
                <div className="w-4 h-4 bg-slate-200 rounded-md animate-pulse" />
                <div className="h-4 bg-slate-200 rounded-md w-20 animate-pulse" />
              </div>
            </div>

            {/* Status button */}
            <div className="h-8 bg-slate-200 rounded-full w-24 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RFPsCardSkeleton; 