import type { NextPage } from "next";
import { useCallback } from "react";

export type buildcta = {
  className?: string;
};

const Container1: NextPage<buildcta> = ({ className = "" }) => {
  const onActionsClick = useCallback(() => {
    window.open("https://t.me/+uG4R0N5SuP03MWEx");
  }, []);

  return (
    <div
      className={`self-stretch bg-aipgf-science-blue flex flex-row items-start justify-start py-[0rem] px-[5rem] box-border max-w-full text-center text-[1.5rem] text-aipgf-white font-p mq825:gap-[1rem] mq825:pl-[2.5rem] mq825:pr-[2.5rem] mq825:box-border ${className}`}
    >
      <div className="flex-1 rounded-2xl flex flex-col items-center justify-start py-[2rem] px-[0rem] box-border gap-[2rem] max-w-full sm:gap-[1rem]">
        <div className="w-[48rem] flex flex-row items-start justify-center py-[0rem] px-[1.25rem] box-border max-w-full">
          {/* <div className="h-[3.5rem] w-[7.5rem] relative">
            <img
              className="absolute top-[0.5rem] left-[0rem] rounded-181xl w-[3rem] h-[3rem] object-cover"
              alt=""
              src="/avatar@2x.png"
            />
            <img
              className="absolute top-[0.5rem] left-[4.5rem] rounded-181xl w-[3rem] h-[3rem] object-cover"
              alt=""
              src="/avatar-1@2x.png"
            />
            <img
              className="absolute h-full top-[0rem] bottom-[0rem] left-[2rem] rounded-181xl max-h-full w-[3.5rem] object-cover z-[1]"
              alt=""
              src="/avatar-2@2x.png"
            />
          </div> */}
        </div>
        <div className="w-[48rem] flex flex-col items-start justify-start gap-[0.5rem] max-w-full">
          <h1 className="m-0 self-stretch relative text-inherit leading-[1.875rem] font-bold font-[inherit] sm:text-[1.188rem] sm:leading-[1.5rem]">
            Build today
          </h1>
          <h3 className="m-0 self-stretch relative text-[1.125rem] leading-[1.75rem] font-normal font-[inherit] text-transparent !bg-clip-text [background:linear-gradient(#f6f8fa,_#f6f8fa),_linear-gradient(#f6f8fa,_#f6f8fa),_#f6f8fa] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
            Want to build out your own AI-PGF agent? Get support from our ecosystemt today!
          </h3>
        </div>
        <div className="w-[48rem] h-[2.75rem] flex flex-row items-start justify-center py-[0rem] px-[1.25rem] box-border max-w-full">
          <a
            href="https://t.me/+uG4R0N5SuP03MWEx"
            target="_blank"
            rel="noopener noreferrer"
            className="self-stretch w-[8.438rem] cursor-pointer hover:opacity-50 transition-all ease-in-out duration-400 inline-flex items-center justify-center"
            style={{
              textTransform: "none",
              color: "#fff",
              fontSize: "16px",
              background: "#0969da",
              border: "#fff solid 1px",
              borderRadius: "39px",
              width: "135px",
              padding: "0.5rem 1rem",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none", // Remove underline
            }}
          >
            <img
              width="20px"
              height="20px"
              src="/TelegramLogo.svg"
              style={{ marginRight: '0.5rem' }}
              alt="Telegram Logo"
            />
            Build
          </a>
        </div>
      </div>
    </div>
  );
};

export default Container1;