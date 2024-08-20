import type { NextPage } from "next";
import { useCallback } from "react";

export type CompanyLogoType = {
  className?: string;
};

const CompanyLogo: NextPage<CompanyLogoType> = ({ className = "" }) => {
  const onPotLockClick = useCallback(() => {
    window.open("https://potlock.org");
  }, []);

  const onNEARFoundation1ImageClick = useCallback(() => {
    window.open("https://near.foundation");
  }, []);

  const onWhiteLogo56effa5f1ImageClick = useCallback(() => {
    window.open("https://masa.ai");
  }, []);

  const onFrameContainerClick = useCallback(() => {
    window.open("https://gitcoin.co");
  }, []);

  return (
    <div
      className={`self-stretch mt-24 sm:mt-5 flex flex-col items-center justify-center py-[3.5rem] px-[3.75rem] gap-[2rem] text-center text-[1.25rem] text-gray-900 font-p mq825:gap-[1rem] mq825:pl-[1.875rem] mq825:pr-[1.875rem] mq825:box-border ${className}`}
    >
      <h2 className="m-0 self-stretch relative text-inherit tracking-[-0.01em] leading-[1.75rem] font-bold font-[inherit] sm:text-[1rem] sm:leading-[1.375rem]">
        Building with the Best
      </h2>
      <div className="self-stretch sm:flex-col sm:space-y-6 flex flex-row items-center justify-evenly py-[0rem] px-[14.125rem] gap-[1.25rem] sm:pl-[1.25rem] sm:pr-[1.25rem] sm:box-border mq825:pl-[3.5rem] mq825:pr-[3.5rem] mq825:box-border mq1425:flex-wrap mq1425:pl-[7.063rem] mq1425:pr-[7.063rem] mq1425:box-border">
        <img
          className="h-[2.344rem] w-[12.219rem] relative cursor-pointer"
          loading="lazy"
          alt=""
          src="/-potlock.svg"
          onClick={onPotLockClick}
        />
        <img
          className="h-[2.969rem] w-[7.25rem] relative object-cover cursor-pointer"
          loading="lazy"
          alt=""
          src="/nearfoundation-1@2x.png"
          onClick={onNEARFoundation1ImageClick}
        />
        {/* <img
          className="h-[1.956rem] w-[9.563rem] relative overflow-hidden shrink-0 object-cover cursor-pointer"
          loading="lazy"
          alt=""
          src="/white-logo56effa5f-1@2x.png"
          onClick={onWhiteLogo56effa5f1ImageClick}
        /> */}
        {/* <div
          className="flex flex-row items-center justify-start gap-[0.537rem] cursor-pointer"
          onClick={onFrameContainerClick}
        >
          <img
            className="h-[2.369rem] w-[1.969rem] relative overflow-hidden shrink-0"
            loading="lazy"
            alt=""
            src="/642c2b9f9cb98d610d7661e6-gtciconlight-1.svg"
          />
          <img
            className="h-[1.669rem] w-[9.369rem] relative overflow-hidden shrink-0"
            loading="lazy"
            alt=""
            src="/6433c5d029c6bb20c5f00bf8-gtclogotypedark-1.svg"
          />
        </div> */}
      </div>
    </div>
  );
};

export default CompanyLogo;
