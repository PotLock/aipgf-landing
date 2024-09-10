import React from 'react';
import Link from 'next/link';

interface AgentCardProps {
  url: string;
  icon: string;
  name: string;
  description: string;
  tags: string[];
  github?: string;
}

const AgentCard: React.FC<AgentCardProps> = ({ url, icon, name, description, tags, github }) => {
  return (
    <div className="flex-1 rounded-lg bg-aipgf-white border-aipgf-geyser border-[1px] border-solid box-border overflow-hidden flex flex-col items-start justify-start gap-[0.9rem] min-w-[19.25rem] max-w-full relative">
      <div className="self-stretch flex flex-col items-start justify-center pt-[1.35rem] px-[1.312rem] pb-[0.725rem]">
        <div className="self-stretch flex flex-row items-center justify-between">
          <img
            loading="lazy"
            src={`/${icon}`}
            alt={name}
            className="flex flex-row items-center justify-start w-[33px] h-[33px]"
          />
          <div className="flex items-center space-x-2">
            <Link href={url} target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe transition-opacity duration-300 ease-in-out hover:opacity-50">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </Link>
            {github && (
              <Link href={github} target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github transition-opacity duration-300 ease-in-out hover:opacity-50">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[1.262rem] max-w-full text-left text-[0.869rem] text-aipgf-shark1 font-aipgf-manrope-semibold-1356">
        <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pl-[1.312rem] pr-[1.375rem] box-border max-w-full text-[1.625rem]">
          <h1 className="m-0 flex-1 relative text-inherit tracking-[-0.02em] leading-[2rem] font-bold font-[inherit] inline-block max-w-full sm:text-[1.313rem] sm:leading-[1.625rem]">
            {name}
          </h1>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pl-[1.312rem] pr-[1.375rem] box-border max-w-full text-aipgf-nevada font-inter">
          <div className="flex-1 relative leading-[1.25rem] whitespace-pre-wrap inline-block max-w-full">
            {description}
          </div>
        </div>
        <div className="self-stretch h-[5.863rem] relative">
          <div className="absolute top-[1.475rem] left-[0rem] rounded-t-none rounded-b-3xs w-full flex flex-row items-start justify-start py-[1.35rem] pl-[1.312rem] pr-[13.062rem] box-border gap-[0.5rem] min-h-[2.813rem] z-[2] text-center text-[0.75rem] sm:pr-[1.25rem] sm:box-border">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex-1 rounded-lg bg-aipgf-iron-50 flex flex-row items-center justify-start py-[0.093rem] px-[0rem]"
              >
                <div className="flex-1 flex flex-col items-start justify-center py-[0.031rem] px-[0.375rem]">
                  <div className="self-stretch h-[1.438rem] relative flex items-center justify-center shrink-0 whitespace-nowrap">
                    {tag}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;