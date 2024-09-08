import type { NextPage } from "next";
import Button1 from "./button1";
import FrameComponent from "./agent-card";
import AgentCard from "./agent-card";
import agentsData from "../data/agents.json";

export type FundingAgentsType = {
  className?: string;
};

const FundingAgents: NextPage<FundingAgentsType> = ({ className = "" }) => {
  // Sort agentsData by order and slice the first 3
  const sortedAgents = agentsData
    .sort((a, b) => a.order - b.order)
    .slice(0, 3);

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
          <Button1 button="Explore" onButtonClick3={() => window.open("/explore", "_blank")} />
        </div> 
        <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[1.5rem] max-w-full text-[0.869rem] text-aipgf-shark1 font-aipgf-manrope-semibold-1356">
          {sortedAgents.map((agent, index) => (
            <AgentCard key={index} {...agent} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FundingAgents;