import type { NextPage } from "next";
import { useState } from "react";

export type HeroFAQsType = {
  className?: string;
};

const HeroFAQs: NextPage<HeroFAQsType> = ({ className = "" }) => {
  const [active, setActive] = useState(0);

  const faqs = [
    {
      title: "What if I’m building closed source?",
      description: "We are only funding open source builders.",
    },
    {
      title: "Do I need to build on NEAR?",
      description:
        "For most bounties over $1000 USD, a native on-chain integration into NEAR is reccomended. However, other chains, protocols will also be sponsoring bounties so check the specific RFP for requirements. Additionaly some agents are chain agnostic. ",
    },
    {
      title: "Can I submit an existing product?",
      description:
        "We support existing products that can build a grant workflows as an open source agent. Being part of an existing product is a strength and gives us confidence that tooling has a higher likelihood to be mantained",
    },
    {
      title: "What if I’m just building open source AI?",
      description:
        "While we appreciate open-source AI projects, this program is designed for open source AI builders, who are using AI to tackle issues with funding & grant workflows. Check out NEAR's Upcoming AI Grants for info (TBA)",
    },
    {
      title: "How much funds are you giving to builders?",
      description:
        "The amount of funding varies based on the scope and impact of the project. Check program guidelines for more info. Traditionally most agents will be in the $1K-$5k, but grants can range from $1K-$20K, depending on level of integration.",
    },
    {
      title: "Where can I get feedback for my proposal?",
      description:
        "Join our community forum to share your proposal and receive constructive feedback from our team and fellow builders. This is a great opportunity to refine your idea and increase its chances of being funded. We reccomend doing this before posting on chain",
    },
    {
      title: "Where can I get ideas to build?",
      description:
        "Check out the Ideas list.",
    },
  ];

  return (
    <section
      className={`self-stretch flex flex-row items-start justify-start py-[0rem] px-[5rem] box-border max-w-full text-left text-[2.894rem] text-aipgf-shark font-p mq825:pl-[2.5rem] mq825:pr-[2.5rem] mq825:box-border ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-start gap-[2rem] max-w-full mq825:gap-[1rem]">
        <div className="self-stretch rounded-4xs border-aipgf-geyser border-[1px] border-solid overflow-hidden flex flex-row items-start justify-start py-[1.312rem] px-[1rem]">
          <div className="relative tracking-[-1px] leading-[3rem] font-medium sm:text-[1.75rem] sm:leading-[1.813rem] mq825:text-[2.313rem] mq825:leading-[2.375rem]">
            Frequently Asked Questions
          </div>
        </div>
        <div className="self-stretch flex flex-row flex-wrap items-start justify-start [row-gap:20px] max-w-full text-[2.25rem] text-aipgf-white">
          <div className="flex-1 flex flex-col items-start justify-start min-w-[26rem] max-w-full mq825:min-w-full">
            {faqs.slice(0, 4).map((data, key) => (
              <div
                style={{
                  background: key === active ? "#0768db" : "",
                }}
                onClick={() => {
                  if (key === active) return setActive(-1);
                  setActive(key);
                }}
                className={`self-stretch text-left text-[1.5rem] ${
                  active === key ? "text-white" : "text-grays-black"
                } border-aipgf-geyser cursor-pointer border-[1px] transition-all ease-in-out duration-300 border-solid flex flex-row items-start justify-between pt-[1.437rem] pb-[1.375rem] pl-[1.937rem] pr-[0.562rem] gap-[1.25rem] mq825:flex-wrap`}
                key={key}
              >
                <div className="flex-1 min-w-0">
                  <h1 className="m-0 relative text-inherit tracking-[-0.2px] leading-[1.688rem] font-medium break-words whitespace-normal font-[inherit] sm:text-[1.188rem] sm:leading-[1.313rem]">
                    {data.title}
                  </h1>
                  {active === key && (
                    <div className="relative text-[1rem] leading-[1.5rem] mt-2 flex items-center break-words">
                      {data.description}
                    </div>
                  )}
                </div>
                <img
                  className="h-[2rem] w-[2rem] relative"
                  alt=""
                  src={active === key ? "/minus.svg" : "/plus-4.svg"}
                />
              </div>
            ))}
          </div>
          <div className="self-stretch flex-1 flex flex-col items-start justify-start max-w-full z-[1] text-left text-[1.5rem]  font-p ">
            {faqs.slice(4).map((data, key) => (
              <div
                key={key + 4}
                onClick={() => {
                  if (key + 4 === active) return setActive(-1);
                  setActive(key + 4);
                }}
                style={{
                  background: key + 4 === active ? "#0768db" : "",
                }}
                className={`self-stretch ${
                  active === key + 4 ? "text-white" : "text-grays-black"
                } text-grays-black cursor-pointer transition-all ease-in-out duration-300 text-left text-[1.5rem] border-aipgf-geyser border-[1px] border-solid flex flex-row items-start justify-between pt-[1.437rem] pb-[1.375rem] pl-[1.937rem] pr-[0.562rem] gap-[1.25rem] mq825:flex-wrap`}
              >
                <div className="flex-1 min-w-0">
                  <h1 className="m-0 relative text-inherit tracking-[-0.2px] leading-[1.688rem] font-medium font-[inherit] sm:text-[1.188rem] sm:leading-[1.313rem]">
                    {data.title}
                  </h1>
                  {active === key + 4 && (
                    <div className="w-[28.938rem] relative text-[1rem] leading-[1.5rem] mt-2 flex items-center max-w-full">
                      {data.description}
                    </div>
                  )}
                </div>
                <img
                  className="h-[2rem] w-[2rem] relative"
                  alt=""
                  src={active === key + 4 ? "/minus.svg" : "/plus-4.svg"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroFAQs;
