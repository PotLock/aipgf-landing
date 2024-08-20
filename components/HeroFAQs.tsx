import type { NextPage } from "next";
import Container from "./container";
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
        "Yes, building on NEAR is a requirement. If you don't have a NEAR account, create one to get started. We're excited to see what you build on our platform!",
    },
    {
      title: "Can I submit an existing product?",
      description:
        "Each product must be unique, so submitting an existing product isn't allowed. We encourage you to create something new and innovative that showcases your skills and creativity.",
    },
    {
      title: "What if I’m just building open source AI?",
      description:
        "While we appreciate open-source AI projects, our funding program is specifically designed for builders creating AI applications on the NEAR protocol. If your project aligns with our focus, we'd love to consider it for funding.",
    },
    {
      title: "How much funds are you giving to builders?",
      description:
        "The amount of funding varies based on the scope and impact of the project. We assess each proposal individually to determine the appropriate funding amount, ensuring it aligns with the project's needs and potential contributions to the ecosystem.",
    },
    {
      title: "Where can I get feedback for my proposal?",
      description:
        "Join our community forum to share your proposal and receive constructive feedback from our team and fellow builders. This is a great opportunity to refine your idea and increase its chances of being funded.",
    },
    {
      title: "Where can I get ideas to build?",
      description:
        "Explore our community forum  for inspiration and ideas from other builders. You can also reach out to our team for guidance on finding the right project to build. We're here to support your innovation journey!",
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
                onClick={() => setActive(key)}
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
                    <div className="transition-all duration-300 ease-in-out relative text-[1rem] leading-[1.5rem] mt-2 flex items-center break-words">
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
                onClick={() => setActive(key + 4)}
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
