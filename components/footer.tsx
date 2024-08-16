import type { NextPage } from "next";
import { useCallback } from "react";

export type FooterType = {
  className?: string;
};

const Footer: NextPage<FooterType> = ({ className = "" }) => {
  const onSocialsIconClick = useCallback(() => {
    window.open("https://twitter.com/ai_pgf");
  }, []);

  const onVectorIconClick = useCallback(() => {
    window.open("https://aipgf.com/telegram");
  }, []);

  const onFrameContainerClick = useCallback(() => {
    window.open("https://bento.me/potlock");
  }, []);

  const onTagClick = useCallback(() => {
    window.open("https://subscribe.potlock.org");
  }, []);

  return (
    <footer
      className={`self-stretch flex flex-row items-start justify-start max-w-full z-[1] text-center text-[1.044rem] text-aipgf-white font-aipgf-manrope-semibold-1356 ${className}`}
    >
      <div className="flex-1 bg-aipgf-shark1 flex flex-row items-center justify-start py-[1.937rem] px-[5rem] box-border [row-gap:20px] max-w-full lg:flex-wrap mq825:pl-[2.5rem] mq825:pr-[2.5rem] mq825:box-border">
        <div className="flex-[0.3512] flex flex-row items-center justify-between py-[1rem] pl-[0.5rem] pr-[22rem] box-border min-w-[18.813rem] max-w-full gap-[1.25rem] lg:flex-1 mq450:pr-[11rem] mq450:box-border mq825:flex-wrap mq825:justify-center">
          <img
            className="h-[1rem] w-[1rem] relative min-h-[1rem] cursor-pointer mq825:w-full"
            alt=""
            src="/vector-45.svg"
            onClick={onSocialsIconClick}
          />
          <img
            className="h-[0.938rem] w-[1.25rem] relative"
            alt=""
            src="/vector-46.svg"
          />
          <img
            className="h-[1rem] w-[1.194rem] relative min-h-[1rem] cursor-pointer"
            alt=""
            src="/vector-47.svg"
            onClick={onVectorIconClick}
          />
        </div>
        <div
          className="flex flex-row items-center justify-center py-[0.718rem] px-[0rem] box-border gap-[0.4rem] max-w-full cursor-pointer mq450:flex-wrap"
          onClick={onFrameContainerClick}
        >
          <div className="relative leading-[1.563rem] font-extrabold inline-block min-w-[5.625rem]">
            Part of the 
          </div>
          <img
            className="h-[1.106rem] w-[5.769rem] relative"
            alt=""
            src="/-potlock-1.svg"
          />
          <div className="relative leading-[1.562rem] font-extrabold">
            open funding stack
          </div>
        </div>
        <div className="flex-1 flex flex-row items-center justify-center py-[0.5rem] pl-[10.062rem] pr-[0.5rem] box-border gap-[0.5rem] min-w-[18.813rem] max-w-full text-left text-[0.963rem] lg:flex-1 mq450:pl-[5rem] mq450:box-border mq825:flex-wrap">
          <div className="relative leading-[2rem]">
            Subscribe to our newsletter
          </div>
          <button
            className="cursor-pointer border-aipgf-white border-[1px] border-solid py-[0.062rem] px-[0.437rem] bg-[transparent] w-[5.625rem] rounded-3xl box-border flex flex-row items-center justify-center"
            onClick={onTagClick}
          >
            <div className="h-[1.5rem] flex flex-row items-center justify-start py-[0rem] px-[0.25rem] box-border">
              <div className="relative text-[0.85rem] leading-[2.5rem] font-semibold font-aipgf-manrope-semibold-1356 text-aipgf-white text-center inline-block min-w-[4.125rem]">
                Subscribe
              </div>
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
