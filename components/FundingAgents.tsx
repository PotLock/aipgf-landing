import type { NextPage } from "next";
import { useCallback } from "react";
import Button1 from "./button1";
import FrameComponent from "./frame-component";

export type FundingAgentsType = {
  className?: string;
};

const FundingAgents: NextPage<FundingAgentsType> = ({ className = "" }) => {
  const onButtonClick = useCallback(() => {
    window.open("https://app.aipgf.com");
  }, []);

  const agents = [
    {
      name: "Bitte Donation Agent",
      icon: "monochrome-regularpng.svg",
      description:
        "Potlock donations built directly as agent within Bitte Wallet.",
      url: "https://wallet.bitte.ai/smart-actions/Jv-wyATX7O0575hJw_1dL?mode=debug&agentId=potlock-agent-mintbase.vercel.app,
    },
    {
      name: "Eligibility Check Agent",
      icon: "ProjectRecommend.svg",
      description:
        "Verifies project eligibility for funding for the AI-PGF Program.",
      url: "https://aipgf.com",
    },
    {
      name: "Funding AI",
      icon: "4-3@2x.png",
      description:
        "Multi-agent framework for donation and discovery of public goods projects.",
      url: "https://potlock-donation-agent.vercel.app/potlock",
    },
  ];
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
          <Button1 button="Explore" onButtonClick3={onButtonClick} />
        </div>
        <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[1.5rem] max-w-full text-[0.869rem] text-aipgf-shark1 font-aipgf-manrope-semibold-1356">
          {agents.map((data, index) => (
            <div
              key={index}
              onClick={() => window.open(data.url, "_blank")}
              className="flex-1 rounded-lg bg-aipgf-white border-aipgf-geyser border-[1px] border-solid box-border overflow-hidden flex flex-col items-start justify-start gap-[0.9rem] transition-all ease-in-out duration-500 min-w-[19.25rem] max-w-full hover:opacity-60 cursor-pointer"
            >
              <div className="self-stretch flex flex-col items-start justify-center pt-[1.35rem] px-[1.312rem] pb-[0.725rem]">
                <div className="self-stretch flex flex-row items-center justify-start">
                  <img
                    loading="lazy"
                    src={`/${data.icon}`}
                    alt=""
                    className="flex flex-row items-center justify-start"
                  />
                </div>
              </div>
              <FrameComponent
                description={data.description}
                rFPProposalGenerator={data.name}
                prop="ProjectRecommend.svg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FundingAgents;
