import type { NextPage } from "next";
import { useCallback } from "react";
import { Button } from "@mui/material";
import Button1 from "./button1";
import Link from "next/link";

export type FrameComponent1Type = {
  className?: string;
};

const FrameComponent1: NextPage<FrameComponent1Type> = ({ className = "" }) => {
  const onButtonClick = useCallback(() => {
    window.open("https://aipgf.com/about");
  }, []);

  const onButtonClick1 = useCallback(() => {
    window.open("https://forum.aipgf.com");
  }, []);

  return (
    <section
      className={`self-stretch flex flex-row items-start justify-start py-[0rem] px-[5rem] box-border max-w-full text-left text-[3.75rem] text-grays-black font-p mq825:pl-[2.5rem] mq825:pr-[2.5rem] mq825:box-border ${className}`}
    >
      <div className="flex-1 flex flex-row items-start justify-start gap-[4.5rem] max-w-full mq450:gap-[1.125rem] mq825:gap-[2.25rem] mq1425:flex-wrap">
        <div className="flex-1 flex flex-col items-start justify-start pt-[2.125rem] px-[0rem] pb-[0rem] box-border min-w-[27.75rem] max-w-full mq825:min-w-full">
          <div className="self-stretch flex flex-col items-start justify-start gap-[2.187rem] max-w-full mq825:gap-[1.063rem]">
            <h1 className="m-0 self-stretch relative text-inherit font-medium font-[inherit] mq450:text-[2.25rem] mq825:text-[3rem]">
              AI /powered/ Public Goods Funding
            </h1>
            <h1 className="m-0 w-[38.625rem] relative text-[1.5rem] leading-[2.063rem] inline-block max-w-full font-[inherit] mq450:text-[1.188rem] mq450:leading-[1.625rem]">
              <span>{`AI-PGF: A Proactive Grants Program and Movement to Build towards a `}</span>
              <b>Funding AGI</b>
            </h1>
            <div className="self-stretch flex flex-row items-center justify-start py-[0rem] pl-[0rem] pr-[21.125rem] gap-[0.75rem] mq450:pr-[1.25rem] mq450:box-border mq825:flex-wrap mq825:pr-[10.563rem] mq825:box-border">
              <Link target="_blank" href={"https://forum.aipgf.com/"}>
                <Button
                  className="h-[4.25rem] font-bold text-[20px] shadow-[0px_0px_0px_2px_#0057ff_inset] min-w-[4.375rem] cursor-pointer"
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    color: "#fff",
                    fontSize: "20",
                    background: "#0057ff",
                    borderRadius: "41px",
                    "&:hover": { background: "#0057ff" },
                    height: 68,
                    width: 177,
                  }}
                  onClick={onButtonClick1}
                >
                  Get Funded
                </Button>
              </Link>
              <Link target="_blank" href={"https://aipgf.com/about"}>
                <Button1
                  button="Learn More"
                  onButtonClick3={onButtonClick}
                  propHeight="4.25rem"
                  propWidth="9.75rem"
                  buttonFlex="unset"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="w-[32.813rem] rounded-3xs bg-aipgf-white border-aipgf-geyser border-[1px] border-solid box-border overflow-hidden shrink-0 flex flex-col items-start justify-start pt-[1.062rem] pb-[0.812rem] pl-[1.5rem] pr-[1.375rem] gap-[1.25rem] min-w-[32.813rem] max-w-full text-[1.5rem] mq825:min-w-full mq1425:flex-1">
          <div className="self-stretch flex flex-col items-start justify-start gap-[0.562rem]">
            <h1 className="m-0 self-stretch relative text-inherit leading-[143%] font-bold font-[inherit] mq450:text-[1.188rem] mq450:leading-[1.688rem]">
              Eligibility Assesment Agent
            </h1>
            <div className="self-stretch relative text-[1rem] leading-[143%]">
              The AI will do an assessment of the project's eligibility against
              the criteria you provide.
            </div>
          </div>
          <textarea
            className="border-aipgf-geyser border-[1.5px] border-solid bg-[transparent] h-[9.313rem] w-auto [outline:none] self-stretch relative rounded-[7.36px] box-border overflow-hidden shrink-0"
            rows={7}
            cols={24}
          />
          <div className="w-[19.306rem] flex flex-col items-end justify-start gap-[3.4rem] text-[0.825rem] text-aipgf-shark1 font-aipgf-manrope-semibold-1356 mq450:gap-[1.688rem]">
            <div className="self-stretch flex flex-row items-start justify-start">
              <div className="flex flex-row items-center justify-start gap-[0.437rem]">
                <button className="cursor-pointer [border:none] py-[0.468rem] px-[1.125rem] bg-communityintercomcom-blue-ribbon shadow-[0px_0px_0px_1.09px_#0057ff_inset] rounded-[22.31px] overflow-hidden flex flex-row items-center justify-center box-border min-w-[2.381rem]">
                  <div className="flex flex-col items-center justify-start">
                    <b className="w-[5.313rem] relative text-[0.681rem] leading-[1.375rem] flex font-p text-aipgf-white text-center items-center justify-center">
                      Check Eligibility
                    </b>
                  </div>
                </button>
                <Button1
                  button="Attach files"
                  propHeight="2.313rem"
                  propWidth="7.25rem"
                  buttonFlex="unset"
                />
              </div>
            </div>
            <div className="flex flex-row items-start justify-start gap-[0.237rem]">
              <div className="relative leading-[1.438rem] font-light inline-block min-w-[3.188rem]">{`Made by `}</div>
              <div className="h-[1.431rem] w-[1.431rem] relative">
                <div className="absolute top-[0rem] left-[0rem] rounded-[50%] bg-gainsboro w-full h-full" />
                <img
                  className="absolute top-[calc(50%_-_7.65px)] left-[calc(50%_-_7.65px)] w-[0.956rem] h-[0.956rem] object-cover z-[1]"
                  loading="lazy"
                  alt=""
                  src="/4@2x.png"
                />
              </div>
              <div className="relative leading-[1.438rem] font-light inline-block min-w-[3.813rem]">{`Boris.near `}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent1;
