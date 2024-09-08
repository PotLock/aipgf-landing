import type { NextPage } from "next";
import { useCallback } from "react";
import { Button } from "@mui/material";

export type HeroFundingCardsType = {
  className?: string;
};

interface CardData {
  title: string;
  buttonText: string;
  buttonLink: string;
  iconSrc: string;
  soon?: boolean;
  customIcon?: boolean;
}

const cardData: CardData[] = [
  {
    title: "Funding Innovation Community",
    buttonText: "Join",
    buttonLink: "https://t.me/+uG4R0N5SuP03MWEx",
    iconSrc: "/InnovativeIcon.svg",
  },
  {
    title: "Proactive Grants Program",
    buttonText: "Get Funded",
    buttonLink: "https://forum.aipgf.com",
    iconSrc: "/GrantsProgram.svg",
    customIcon: true,
  },
  {
    title: "Funding AGI",
    buttonText: "Build",
    buttonLink: "https://potlock.notion.site/Ai-PGF-Ideas-19544cbfa45949c082811e3bff206455",
    iconSrc: "/FundingAGI.svg",
  },
  {
    title: "Grant Agent Portal + Playground",
    buttonText: "Explore",
    buttonLink: "https://aipgf.com",
    iconSrc: "/GrantAgentPortal.svg",
    soon: true,
  },
];

const HeroFundingCards: NextPage<HeroFundingCardsType> = ({
  className = "",
}) => {
  const onButtonClick = useCallback((link: string) => {
    window.open(link);
  }, []);

  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start py-[0rem] px-[5rem] box-border max-w-full text-left text-[2.375rem] text-aipgf-shark1 font-p mq825:pl-[2.5rem] mq825:pr-[2.5rem] mq825:box-border ${className}`}
    >
      <div className="w-full flex flex-col gap-[1.5rem]">
        {[0, 2].map((startIndex) => (
          <div key={startIndex} className="flex flex-row gap-[1.5rem] w-full mq825:flex-col">
            {cardData.slice(startIndex, startIndex + 2).map((card, index) => (
              <div
                key={index}
                className={`flex-1 rounded-6xl bg-aipgf-white border-aipgf-geyser border-[1px] border-solid box-border overflow-hidden flex flex-row items-end justify-between pt-[3rem] px-[2rem] pb-[2.687rem] min-w-[25.5rem] w-[calc(50% - 0.75rem)] mq825:w-full ${
                  card.soon ? "opacity-50" : ""
                }`}
              >
                <div className="flex-1 flex flex-col items-start justify-start gap-[3.812rem] min-w-[11.875rem] sm:gap-[1.875rem]">
                  <h1 className="m-0 self-stretch relative text-inherit font-medium font-[inherit] sm:text-[1.438rem] mq825:text-[1.875rem]">
                    {card.title}
                  </h1>
                  {card.soon && (
                    <span className="bg-yellow-400 ml-2 px-2 py-1 rounded-xl text-sm text-gray-500">
                      Coming Soon
                    </span>
                  )}
                  <div
                    className={`rounded-[48.42px] border-neutral-neutral-200 border-[1.2px] border-solid flex flex-row items-start justify-start py-[0.5rem] pl-[1.125rem] pr-[1.062rem] gap-[0.581rem] ${
                      card.soon ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                    } text-[1.006rem] text-base-base-black font-inter`}
                    onClick={() => !card.soon && onButtonClick(card.buttonLink)}
                  >
                    <div className="relative leading-[143%] font-medium inline-block min-w-[2.438rem]">
                      {card.buttonText}
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
                <div className="w-[15.713rem] flex flex-col items-start justify-start pt-[0.656rem] px-[0rem] pb-[0rem] box-border min-w-[15.713rem] mq825:flex-1">
                  {card.customIcon ? (
                    <div className="self-stretch rounded-[10.77px] bg-aipgf-white border-solid overflow-hidden flex flex-col items-end justify-start pt-[0.375rem] px-[0rem] pb-[0.687rem] gap-[0.618rem]">
                      <img src={card.iconSrc} alt="" className="max-w-full max-h-full object-contain" />
                    </div>
                  ) : (
                    <img src={card.iconSrc} alt="" className="max-w-full max-h-full object-contain" />
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroFundingCards;
