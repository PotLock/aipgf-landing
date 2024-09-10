import type { NextPage } from "next";
import AgentCard from "./agent-card";

export interface AgentData {
  name: string;
  icon: string;
  description: string;
  url: string;
  tags: string[];
  team: string;
  order: number;
  github?: string;
}

export interface AgentsExploreProps {
  agents: AgentData[];
  className?: string;
}

const AgentsExplore: NextPage<AgentsExploreProps> = ({ agents, className = "" }) => {
  return (
    <section
      className={`self-stretch flex flex-row items-start justify-start pt-[0rem] px-[5rem] pb-[1.062rem] box-border max-w-full text-left text-[2.894rem] text-aipgf-shark font-p mq825:pl-[2.5rem] mq825:pr-[2.5rem] mq825:box-border ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-start gap-[2rem] max-w-full mq825:gap-[1rem]">
        <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[1.5rem] max-w-full text-[0.869rem] text-aipgf-shark1 font-aipgf-manrope-semibold-1356">
          {agents.map((data, index) => (
            <AgentCard
              key={index}
              url={data.url}
              icon={data.icon}
              name={data.name}
              description={data.description}
              tags={data.tags}
              github={data.github}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentsExplore;