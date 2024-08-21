import type { NextPage } from "next";
import { useCallback } from "react";
import { Button } from "@mui/material";

export type FeatureCardsType = {
  className?: string;
};

const FeatureCards: NextPage<FeatureCardsType> = ({ className = "" }) => {
  const onButtonClick = useCallback(() => {
    window.open("https://forum.aipgf.com");
  }, []);

  const onButtonContainerClick = useCallback(() => {
    window.open("https://potlock.notion.site/Ai-PGF-Ideas-19544cbfa45949c082811e3bff206455");
  }, []);

  return (
    <div
      className={`self-stretch flex flex-row items-start justify-start py-[0rem] px-[5rem] box-border max-w-full text-left text-[2.375rem] text-aipgf-shark1 font-p mq825:pl-[2.5rem] mq825:pr-[2.5rem] mq825:box-border ${className}`}
    >
      <div className="flex-1 flex flex-row flex-wrap items-start justify-start gap-[1.5rem] max-w-full">
        <div className="flex-1 rounded-6xl bg-aipgf-white border-aipgf-geyser border-[1px] border-solid box-border overflow-hidden flex flex-row items-start justify-start pt-[4.437rem] pb-[4.062rem] pl-[2rem] pr-[1.75rem] relative gap-[1.375rem] min-w-[25.5rem] max-w-full mq825:flex-wrap mq825:min-w-full">
          <div className="flex-1 flex flex-col items-start justify-start gap-[3.812rem] min-w-[11.875rem] sm:gap-[1.875rem] ">
            <h1 className="m-0 self-stretch relative text-inherit font-medium font-[inherit] sm:text-[1.438rem] mq825:text-[1.875rem]">
              Proactive Grants Program
            </h1>
            <Button
              className="w-[8.5rem] h-[2.594rem]"
              endIcon={
                <img width="18.4px" height="18.4px" src="/arrowupright-3.svg" />
              }
              disableElevation
              variant="outlined"
              sx={{
                textTransform: "none",
                color: "#1c1c1e",
                fontSize: "16.1",
                borderColor: "#dadadd",
                borderRadius: "48.42px",
                "&:hover": { borderColor: "#dadadd" },
                width: 120.6,
                height: 41.5,
              }}
              onClick={onButtonClick}
            >
              Get Funded
            </Button>
          </div>
          <div className="w-[15.713rem] flex flex-col items-start justify-start pt-[0.656rem] px-[0rem] pb-[0rem] box-border min-w-[15.713rem] mq825:flex-1">
            <div className="self-stretch rounded-[10.77px] bg-aipgf-white border-grays-black border-[1.8px] border-solid overflow-hidden flex flex-col items-end justify-start pt-[0.375rem] px-[0rem] pb-[0.687rem] gap-[0.618rem]">
              <div className="self-stretch flex flex-col items-start justify-start gap-[0.25rem]">
                <div className="flex flex-row items-start justify-start py-[0rem] px-[0.562rem]">
                  <div className="flex flex-row items-center justify-start gap-[0.112rem] shrink-0">
                    <div className="h-[0.675rem] w-[0.675rem] relative rounded-[50%] bg-aipgf-shark1" />
                    <div className="h-[0.675rem] w-[0.675rem] relative rounded-[50%] bg-aipgf-shark1" />
                    <div className="h-[0.675rem] w-[0.675rem] relative rounded-[50%] bg-aipgf-shark1" />
                  </div>
                </div>
                <div className="self-stretch h-[0.113rem] relative bg-aipgf-shark1 shrink-0" />
              </div>
              <div className="self-stretch flex flex-row items-start justify-end py-[0rem] pl-[3.437rem] pr-[3.375rem] sm:pl-[1.25rem] sm:pr-[1.25rem] sm:box-border">
                <div className="h-[7.763rem] flex-1 relative">
                  <div className="absolute h-full top-[0rem] bottom-[0rem] left-[calc(50%_-_70.85px)] w-[7.763rem] overflow-hidden">
                    <div className="absolute top-[0rem] left-[0rem] w-full h-full">
                      <img
                        className="absolute w-[calc(100%_-_14.9px)] top-[0.431rem] right-[0.488rem] left-[0.444rem] max-w-full overflow-hidden h-[6.456rem]"
                        alt=""
                        src="/vector-6.svg"
                      />
                      <img
                        className="absolute top-[0rem] left-[0rem] w-full h-full z-[1]"
                        alt=""
                      />
                    </div>
                    <div className="absolute top-[4.475rem] left-[2.888rem] flex flex-col items-start justify-start z-[2]">
                      <img
                        className="w-[1.794rem] h-[1.694rem] relative"
                        alt=""
                        src="/vector-8.svg"
                      />
                      <img
                        className="w-[1.794rem] h-[0.956rem] relative z-[1] mt-[-0.1rem]"
                        alt=""
                        src="/vector-9.svg"
                      />
                    </div>
                    <div className="absolute top-[5.375rem] left-[4.975rem] flex flex-col items-start justify-start z-[2]">
                      <img
                        className="w-[1.794rem] h-[1.694rem] relative"
                        alt=""
                        src="/vector-8.svg"
                      />
                    </div>
                  </div>
                  <div className="absolute top-[5.775rem] left-[7.069rem] flex flex-col items-start justify-start z-[3]">
                    <img
                      className="w-[1.794rem] h-[1.231rem] relative"
                      alt=""
                      src="/vector-11.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            className="h-[2.938rem] w-[2.938rem] absolute !m-[0] right-[16rem] bottom-[7rem] z-[1]"
            loading="lazy"
            alt=""
            src="/sealcheck.svg"
          />
        </div>
        <div className="flex-1 rounded-6xl  bg-aipgf-white border-aipgf-geyser border-[1px] border-solid box-border overflow-hidden flex flex-row items-end justify-between pt-[2.625rem] px-[2rem] pb-[2.75rem] min-w-[25.5rem] max-w-full [row-gap:20px] mq825:flex-wrap mq825:min-w-full">
          <div className="h-[12.425rem] sm:h-max  w-[18.25rem] flex flex-col items-start justify-start min-w-[18.25rem] mq825:flex-1">
            <div className="self-stretch flex flex-col items-start justify-start gap-[3.812rem] sm:gap-[1.875rem]">
              <h1 className="m-0 self-stretch relative text-inherit font-medium font-[inherit] sm:text-[1.438rem] mq825:text-[1.875rem]">
                Funding AGI{" "}
              </h1>

              <div
                className="rounded-[48.42px] border-neutral-neutral-200 border-[1.2px]  border-solid flex flex-row items-start justify-start py-[0.5rem] pl-[1.125rem] pr-[1.062rem] gap-[0.581rem] cursor-pointer text-[1.006rem] text-base-base-black font-inter"
                onClick={onButtonContainerClick}
              >
                <div className="relative leading-[143%] font-medium inline-block min-w-[2.438rem]">
                  Build
                </div>
                <div className="flex flex-col items-start justify-start pt-[0.143rem] px-[0rem] pb-[0rem]">
                  <img
                    className="w-[1.15rem] h-[1.15rem] relative"
                    alt=""
                    src="/arrowupright-3.svg"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <img src="/FundingAGI.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
