import type { NextPage } from "next";
import Container from "./container";

export type FrameComponent5Type = {
  className?: string;
};

const FrameComponent5: NextPage<FrameComponent5Type> = ({ className = "" }) => {
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
            <div className="self-stretch bg-aipgf-science-blue flex flex-row items-start justify-start pt-[1.5rem] pb-[1.312rem] pl-[2rem] pr-[0.437rem] box-border gap-[0.687rem] max-w-full mq825:flex-wrap">
              <div className="flex-1 flex flex-col items-start justify-start gap-[1.437rem] min-w-[22.688rem] max-w-full mq825:min-w-full">
                <h1 className="m-0 self-stretch relative text-inherit tracking-[-0.2px] font-medium font-[inherit] sm:text-[1.375rem] mq825:text-[1.813rem]">
                  What if I’m building closed source?
                </h1>
                <div className="w-[28.938rem] relative text-[1rem] leading-[1.5rem] font-pt-serif flex items-center max-w-full">
                  We are only funding open source builders.
                </div>
              </div>
              <img
                className="h-[2rem] w-[2rem] relative"
                alt=""
                src="/minus.svg"
              />
            </div>
            <Container
              doINeedToBuildOnNEAR="Do I need to build on NEAR?"
              canISubmitAnExistingProduct="Can I submit an existing product?"
              whatIfImJustBuildingOpenSour="What if I’m just building open source AI?"
            />
          </div>
          <Container
            propAlignSelf="unset"
            propFlex="1"
            // propMinWidth="26rem"
            propGap="4.187rem"
            doINeedToBuildOnNEAR="How much funds are you giving to builders?"
            propDisplay="inline-block"
            propGap1="4.75rem"
            canISubmitAnExistingProduct="Where can I get feedback for my proposal?"
            whatIfImJustBuildingOpenSour="Where can I get ideas to build?"
            question03Padding="1.437rem 0.437rem 1.375rem 1.937rem"
            question5Padding="1.437rem 0.437rem 1.375rem 1.937rem"
          />
        </div>
      </div>
    </section>
  );
};

export default FrameComponent5;
