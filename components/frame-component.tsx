import type { NextPage } from "next";

export type FrameComponentType = {
  className?: string;
  rFPProposalGenerator?: string;
  prop?: string;
  description?: string;
  tags?: string[]; // Add tags as a prop
};

const FrameComponent: NextPage<FrameComponentType> = ({
  className = "",
  rFPProposalGenerator,
  description,
  tags = [], // Default to an empty array if no tags are provided
  prop,
}) => {
  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start gap-[1.262rem] max-w-full text-left text-[0.869rem] text-aipgf-shark1 font-aipgf-manrope-semibold-1356 ${className}`}
    >
      <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pl-[1.312rem] pr-[1.375rem] box-border max-w-full text-[1.625rem]">
        <h1 className="m-0 flex-1 relative text-inherit tracking-[-0.02em] leading-[2rem] font-bold font-[inherit] inline-block max-w-full sm:text-[1.313rem] sm:leading-[1.625rem]">
          {rFPProposalGenerator}
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
                <div className="self-stretch h-[1.438rem] relative flex items-center justify-center shrink-0">
                  {tag}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;