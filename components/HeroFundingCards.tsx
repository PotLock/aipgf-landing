import type { NextPage } from "next";
import { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

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
    <div className={`w-full px-20 mq825:px-4 ${className}`}>
      <div className="grid grid-cols-2 gap-6 mq825:grid-cols-1">
        {cardData.map((card, index) => (
          <Card 
            key={index}
            className={`relative overflow-hidden border-[1px] border-solid border-aipgf-geyser ${
              card.soon ? "opacity-50" : ""
            }`}
          >
            <CardContent className="flex items-end justify-between p-8 pt-12">
              <div className="flex-1 flex flex-col items-start justify-start gap-[3.812rem] min-w-[11.875rem] sm:gap-[1.875rem]">
                <h1 className="text-[2.375rem] font-medium sm:text-[1.25rem] mq825:text-[1.5rem] break-words">
                  {card.title}
                </h1>
                
                {card.soon && (
                  <span className="inline-flex bg-yellow-400 px-2 py-1 rounded-xl text-sm text-gray-500">
                    Coming Soon
                  </span>
                )}

                <Button
                  variant="outline"
                  onClick={() => !card.soon && onButtonClick(card.buttonLink)}
                  disabled={card.soon}
                  className="rounded-full border-aipgf-geyser border-[1px] border-solid text-base-base-black hover:text-base-base-black hover:bg-gray-50"
                >
                  {card.buttonText}
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="w-[40%] pt-[0.656rem]">
                {card.customIcon ? (
                  <div className="rounded-[10.77px] bg-white overflow-hidden pt-[0.375rem] pb-[0.687rem]">
                    <img src={card.iconSrc} alt="" className="w-full h-auto object-contain" />
                  </div>
                ) : (
                  <img src={card.iconSrc} alt="" className="w-full h-auto object-contain" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HeroFundingCards;
