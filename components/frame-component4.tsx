import type { NextPage } from "next";
import { useCallback } from "react";
import Button1 from "./button1";
import FrameComponent from "./frame-component";

export type FrameComponent4Type = {
  className?: string;
};

const FrameComponent4: NextPage<FrameComponent4Type> = ({ className = "" }) => {
  const onButtonClick = useCallback(() => {
    window.open("https://aipgf.com");
  }, []);

  return (
    <section
      className={`self-stretch flex flex-row items-start justify-start pt-[0rem] px-[5rem] pb-[1.062rem] box-border max-w-full text-left text-[2.894rem] text-aipgf-shark font-p mq825:pl-[2.5rem] mq825:pr-[2.5rem] mq825:box-border ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-start gap-[2rem] max-w-full mq825:gap-[1rem]">
        <div className="self-stretch rounded-4xs border-aipgf-geyser border-[1px] border-solid box-border overflow-hidden flex flex-row items-start justify-start py-[0.687rem] px-[0.937rem] gap-[2.5rem] max-w-full mq825:gap-[1.25rem] mq1425:flex-wrap">
          <div className="w-[23.813rem] flex flex-col items-start justify-start pt-[0.625rem] px-[0rem] pb-[0rem] box-border max-w-full">
            <div className="self-stretch relative tracking-[-1px] leading-[3rem] font-medium sm:text-[1.75rem] sm:leading-[1.813rem] mq825:text-[2.313rem] mq825:leading-[2.375rem]">
              Funding Agents
            </div>
          </div>
          <div className="w-[39.438rem] flex flex-col items-start justify-start pt-[1.406rem] pb-[0rem] pl-[0rem] pr-[1.25rem] box-border max-w-full text-[1.125rem]">
            <h3 className="m-0 w-[36.25rem] relative text-inherit font-normal font-[inherit] whitespace-pre-wrap inline-block max-w-full">{`Explore   funding agents designed to streamline grant workflows `}</h3>
          </div>
          
          {false && <Button1 button="Explore" onButtonClick3={onButtonClick} />}
        </div>
        <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[1.5rem] max-w-full text-[0.869rem] text-aipgf-shark1 font-aipgf-manrope-semibold-1356">
          <div className="flex-1 rounded-lg bg-aipgf-white border-aipgf-geyser border-[1px] border-solid box-border overflow-hidden flex flex-col items-start justify-start gap-[0.9rem] min-w-[19.25rem] max-w-full">
            <div className="self-stretch flex flex-col items-start justify-center pt-[1.35rem] px-[1.312rem] pb-[0.725rem]">
              <div className="self-stretch flex flex-row items-center justify-start">
                <div className="flex flex-row items-center justify-start">
                  <div className="flex flex-row items-center justify-start">
                    <img
                      className="h-[2rem] w-[2rem] relative overflow-hidden shrink-0"
                      loading="lazy"
                      alt=""
                      src="/monochrome-regularpng.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <FrameComponent
              rFPProposalGenerator="RFP Proposal Generator"
              prop="/4-1@2x.png"
            />
          </div>
          <div className="flex-1 rounded-lg bg-aipgf-white border-aipgf-geyser border-[1px] border-solid box-border overflow-hidden flex flex-col items-start justify-start gap-[0.9rem] min-w-[19.25rem] max-w-full">
            <div className="self-stretch flex flex-col items-start justify-center pt-[1.35rem] px-[1.312rem] pb-[0.725rem]">
              <div className="self-stretch flex flex-row items-center justify-start">
                <img className="flex flex-row items-center justify-start" />
              </div>
            </div>
            <FrameComponent
              rFPProposalGenerator="Project Reccomendation"
              prop="/4-2@2x.png"
            />
          </div>
          <div className="flex-1 rounded-lg bg-aipgf-white border-aipgf-geyser border-[1px] border-solid box-border overflow-hidden flex flex-col items-start justify-start pt-[1.25rem] px-[0rem] pb-[0rem] gap-[1.275rem] min-w-[19.25rem] max-w-full text-[1.625rem]">
            <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pl-[1.312rem] pr-[1.375rem] box-border max-w-full">
              <div className="flex-1 flex flex-col items-start justify-start gap-[1.625rem] max-w-full">
                <img
                  className="w-[2rem] h-[2rem] relative overflow-hidden shrink-0 object-contain"
                  loading="lazy"
                  alt=""
                  src="/copy-giving@2x.png"
                />
                <div className="self-stretch flex flex-col items-start justify-start gap-[1.25rem]">
                  <h1 className="m-0 self-stretch relative text-inherit tracking-[-0.02em] leading-[2rem] font-bold font-[inherit] sm:text-[1.313rem] sm:leading-[1.625rem]">
                    CopyGiving
                  </h1>
                  <div className="self-stretch relative text-[0.869rem] leading-[1.25rem] font-inter text-aipgf-nevada whitespace-pre-wrap">{`Loreum Ipsum Dolor  Loreum Ipsum Dolor  Loreum Ipsum Dolor  Loreum Ipsum Dolor  Loreum Ipsum Dolor  Loreum Ipsum Dolor  `}</div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-[5.863rem] relative text-[0.869rem]">
              <b className="absolute top-[0rem] left-[1.375rem] leading-[1.5rem] flex items-center min-w-[1.063rem]">{`By `}</b>
              <div className="absolute top-[0rem] left-[2.688rem] w-[1.5rem] h-[1.5rem]">
                <div className="absolute top-[0rem] left-[0rem] rounded-[50%] bg-gainsboro w-full h-full" />
                <img
                  className="absolute top-[calc(50%_-_8px)] left-[calc(50%_-_8px)] w-[1rem] h-[1rem] object-cover z-[1]"
                  alt=""
                  src="/4-3@2x.png"
                />
              </div>
              <div className="absolute top-[0rem] left-[4.438rem] leading-[1.5rem] flex items-center">
                <span className="w-full">
                  <b>{`Boris.near `}</b>
                  <span className="font-light">|</span>
                  <b>{` `}</b>
                  <span className="font-light">2 hours ago</span>
                </span>
              </div>
              <div className="absolute top-[1.475rem] left-[0rem] rounded-t-none rounded-b-3xs w-full flex flex-row items-start justify-start py-[1.35rem] pl-[1.312rem] pr-[13.062rem] box-border gap-[0.5rem] min-h-[2.813rem] z-[2] text-center text-[0.75rem] sm:pr-[1.25rem] sm:box-border">
                <div className="flex-1 rounded-lg bg-aipgf-iron-50 flex flex-row items-center justify-start py-[0.093rem] px-[0rem]">
                  <div className="flex-1 flex flex-col items-start justify-center py-[0.031rem] px-[0.375rem]">
                    <div className="self-stretch h-[1.438rem] relative flex items-center justify-center shrink-0">
                      Project Tag
                    </div>
                  </div>
                </div>
                <div className="flex-1 rounded-lg bg-aipgf-jungle-mist flex flex-row items-center justify-start py-[0.093rem] px-[0rem]">
                  <div className="flex-1 flex flex-col items-start justify-center py-[0.031rem] px-[0.375rem]">
                    <div className="self-stretch h-[1.438rem] relative flex items-center justify-center shrink-0">
                      Project Tag
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent4;
