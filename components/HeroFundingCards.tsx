import type { NextPage } from "next";
import { useCallback } from "react";
import { Button } from "@mui/material";

export type HeroFundingCardsType = {
  className?: string;
};

const HeroFundingCards: NextPage<HeroFundingCardsType> = ({
  className = "",
}) => {
  const onButtonClick = useCallback(() => {
    window.open("https://aipgf.com/telegram");
  }, []);

  const onButtonClick1 = useCallback(() => {
    window.open("https://app.aipgf.com");
  }, []);

  return (
    <div
      className={`self-stretch flex flex-row items-start justify-start py-[0rem] px-[5rem] box-border max-w-full text-left text-[2.375rem] text-aipgf-shark1 font-p mq825:pl-[2.5rem] mq825:pr-[2.5rem] mq825:box-border ${className}`}
    >
      <div className="flex-1 flex flex-row items-start justify-start gap-[1.5rem] max-w-full mq1425:flex-wrap">
        <div className="flex-[0.9894] rounded-6xl bg-aipgf-white border-aipgf-geyser border-[1px] border-solid box-border overflow-hidden flex flex-row items-end justify-between pt-[3rem] px-[2rem] pb-[2.687rem] gap-[1.437rem] min-w-[25.5rem] max-w-full mq825:flex-wrap mq825:min-w-full mq1425:flex-1">
          <div className="w-50 flex flex-col items-start justify-start gap-[3.812rem] min-w-[18.313rem] sm:gap-[1.875rem] mq825:flex-1">
            <h1 className="m-0 self-stretch relative text-inherit font-medium font-[inherit] sm:text-[1.438rem] mq825:text-[1.875rem]">
              Funding Innovation Community
            </h1>

            <Button
              className="w-[6.1rem] h-[2.594rem]"
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
                cursor: "not-allowed",
                borderRadius: "48.42px",
                "&:hover": { borderColor: "#dadadd" },
                width: 97.6,
                height: 41.5,
              }}
              // onClick={onButtonClick}
            >
              Join
            </Button>
          </div>
          <div className="h-max w-[13.319rem] flex flex-col items-start justify-start min-w-[13.319rem] mq825:flex-1">
            <img src="/InnovativeIcon.svg" loading="lazy" />
          </div>
        </div>
        <div className="flex-1 opacity-50 rounded-6xl bg-aipgf-white border-aipgf-geyser border-[1px] border-solid box-border overflow-hidden flex flex-row items-start justify-start pt-[2.625rem] pb-[3rem] pl-[2rem] pr-[1.625rem] min-w-[25.5rem] max-w-full [row-gap:20px] mq825:flex-wrap mq825:min-w-full mq1425:flex-1">
          <div className="flex-1  flex flex-col items-start justify-start pt-[0.387rem] px-[0rem] pb-[0rem] box-border min-w-[11.875rem]">
            <div className=" self-stretch flex flex-col items-start justify-start gap-[3.812rem] sm:gap-[1.875rem]">
              <h1 className="m-0 self-stretch relative text-inherit font-medium font-[inherit] sm:text-[1.438rem] mq825:text-[1.875rem]">
                Grant Agent Portal + Playground{" "}
              </h1>
              <span className="bg-yellow-400 ml-2 px-2 py-1 rounded-xl text-sm text-gray-500">
                Coming Soon
              </span>
              <Button
                className="w-[7.663rem] h-[2.594rem] cursor-not-allowed"
                endIcon={
                  <img
                    width="18.4px"
                    height="18.4px"
                    src="/arrowupright-3.svg"
                  />
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
                  cursor: "not-allowed",
                  width: 122.6,
                  height: 41.5,
                }}
                // onClick={onButtonClick1}
              >
                Explore
              </Button>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-end justify-end pt-[7.25rem] px-[0rem] pb-[0rem] box-border relative min-w-[11.688rem] ml-[-0.775rem] text-center text-[0.506rem] text-grays-black sm:ml-0">
            <div className="w-[11.731rem] !m-[0] absolute bottom-[2.056rem] left-[0.275rem] rounded-[8.06px] border-grays-black border-[1.3px] border-solid box-border overflow-hidden flex flex-col items-end justify-start pt-[0.25rem] pb-[0.025rem] pl-[0rem] pr-[0.062rem] gap-[0.1rem]">
              <div className="self-stretch flex flex-row items-start justify-start py-[0rem] px-[0.437rem]">
                <div className="flex flex-row items-center justify-start gap-[0.081rem]">
                  <div className="h-[0.506rem] w-[0.506rem] relative rounded-[50%] bg-aipgf-shark1" />
                  <div className="h-[0.506rem] w-[0.506rem] relative rounded-[50%] bg-aipgf-shark1" />
                  <div className="h-[0.506rem] w-[0.506rem] relative rounded-[50%] bg-aipgf-shark1" />
                </div>
              </div>
              <div className="mr-[-0.082rem] self-stretch h-[0.081rem] relative bg-aipgf-shark1" />
              <div className="w-[10.575rem] flex flex-row items-start justify-start gap-[0.925rem]">
                <div className="flex-1 flex flex-col items-start justify-start pt-[0.587rem] px-[0rem] pb-[0rem]">
                  <div className="self-stretch flex flex-row items-start justify-start gap-[0.331rem] shrink-0">
                    <div className="flex-[0.8422] rounded-[12.09px] border-grays-black border-[1.3px] border-solid overflow-hidden flex flex-row items-start justify-start py-[0rem] pl-[0.5rem] pr-[0.437rem] shrink-0">
                      <div className="relative leading-[1rem] font-medium inline-block min-w-[2rem]">
                        Internet
                      </div>
                    </div>
                    <div className="flex-1 rounded-[12.09px] bg-grays-black border-grays-black border-[1.3px] border-solid overflow-hidden flex flex-row items-start justify-start py-[0rem] pl-[0.312rem] pr-[0.25rem] shrink-0 whitespace-nowrap text-aipgf-white">
                      <div className="relative leading-[1rem] font-medium inline-block min-w-[2.375rem]">
                        User Data
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[2.35rem] w-[3.106rem] relative rounded-t-none rounded-br-[8.06px] rounded-bl-none bg-grays-black shrink-0" />
              </div>
            </div>
            <div className="w-full h-[7.594rem] absolute !m-[0] top-[0rem] right-[0rem] left-[0rem]">
              <img
                className="absolute top-[2.931rem] left-[0rem] rounded-[8.06px] w-[12.019rem] h-[4.663rem] overflow-hidden object-contain"
                alt=""
                src="/frame-1410068537@2x.png"
              />
              <img
                className="absolute top-[0rem] left-[5.713rem] rounded-[8.06px] w-[12.263rem] h-[6.744rem] overflow-hidden object-contain z-[1]"
                loading="lazy"
                alt=""
                src="/frame-1410068541@2x.png"
              />
            </div>
            <div className="w-[9.063rem] rounded-3xs-1 bg-aipgf-white border-grays-black border-[1.5px] border-solid box-border overflow-hidden flex flex-col items-end justify-start pt-[0.312rem] pb-[0.687rem] pl-[0rem] pr-[0.437rem] gap-[0.562rem] z-[1] text-left text-[0.381rem] text-gray-200 font-aipgf-manrope-semibold-1356">
              <div className="mr-[-4.663rem] w-[13.275rem] flex flex-col items-start justify-start gap-[0.218rem]">
                <div className="flex flex-row items-start justify-start py-[0rem] px-[0.5rem]">
                  <div className="flex flex-row items-center justify-start gap-[0.093rem] shrink-0">
                    <div className="h-[0.569rem] w-[0.569rem] relative rounded-[50%] bg-aipgf-shark1" />
                    <div className="h-[0.569rem] w-[0.569rem] relative rounded-[50%] bg-aipgf-shark1" />
                    <div className="h-[0.569rem] w-[0.569rem] relative rounded-[50%] bg-aipgf-shark1" />
                  </div>
                </div>
                <div className="self-stretch h-[0.094rem] relative bg-aipgf-shark1 shrink-0" />
              </div>
              <div className="w-[8.156rem] flex flex-col items-start justify-start gap-[0.187rem]">
                <div className="self-stretch relative leading-[150%] font-medium">
                  Context Length
                </div>
                <div className="self-stretch h-[0.213rem] rounded-[385.11px] bg-aipgf-geyser flex flex-row items-end justify-start">
                  <div className="mb-[-0.125rem] h-[0.481rem] w-[3.694rem] relative">
                    <div className="absolute top-[0.144rem] left-[0rem] rounded-[385.11px] bg-aipgf-shark1 w-[3.438rem] h-[0.213rem] overflow-hidden" />
                    <div className="absolute top-[0rem] left-[3.213rem] rounded-[385.11px] bg-aipgf-white border-aipgf-shark1 border-[0.8px] border-solid box-border w-[0.481rem] h-[0.481rem] overflow-hidden z-[1]" />
                  </div>
                </div>
              </div>
              <div className="w-[8.156rem] flex flex-col items-start justify-start gap-[0.187rem]">
                <div className="self-stretch relative leading-[150%] font-medium">
                  Temperature
                </div>
                <div className="self-stretch h-[0.213rem] rounded-[385.11px] bg-aipgf-geyser flex flex-row items-end justify-start">
                  <div className="mb-[-0.125rem] h-[0.481rem] w-[3.694rem] relative">
                    <div className="absolute top-[0.144rem] left-[0rem] rounded-[385.11px] bg-aipgf-shark1 w-[3.438rem] h-[0.213rem] overflow-hidden" />
                    <div className="absolute top-[0rem] left-[3.213rem] rounded-[385.11px] bg-aipgf-white border-aipgf-shark1 border-[0.8px] border-solid box-border w-[0.481rem] h-[0.481rem] overflow-hidden z-[1]" />
                  </div>
                </div>
              </div>
              <div className="w-[8.156rem] flex flex-col items-start justify-start gap-[0.187rem]">
                <div className="self-stretch relative leading-[150%] font-medium">{`Max `}</div>
                <div className="self-stretch h-[0.213rem] rounded-[385.11px] bg-aipgf-geyser flex flex-row items-end justify-start">
                  <div className="mb-[-0.125rem] h-[0.481rem] w-[3.694rem] relative">
                    <div className="absolute top-[0.144rem] left-[0rem] rounded-[385.11px] bg-aipgf-shark1 w-[3.438rem] h-[0.213rem] overflow-hidden" />
                    <div className="absolute top-[0rem] left-[3.213rem] rounded-[385.11px] bg-aipgf-white border-aipgf-shark1 border-[0.8px] border-solid box-border w-[0.481rem] h-[0.481rem] overflow-hidden z-[1]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroFundingCards;
