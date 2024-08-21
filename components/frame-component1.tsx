import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@mui/material";
import Button1 from "./button1";
import Link from "next/link";

export type EligibilityCheckerType = {
  className?: string;
};

const EligibilityChecker: NextPage<EligibilityCheckerType> = ({
  className = "",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [predictedData, setPredictedData] = useState("");

  const onButtonClick = useCallback(() => {
    window.open(
      "https://potlock.notion.site/What-AI-PGF-Actually-Looks-Like-dc04c784b11e474aacb6e0f27f91cb40?pvs=4"
    );
  }, []);

  const onButtonClick1 = useCallback(() => {
    window.open("https://forum.aipgf.com");
  }, []);

  const handleCheck = () => {
    setPredictedData("");
    if (!inputValue) return;
    setLoading(true);
    fetch("/api/predict", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        input: inputValue,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setLoading(false);
        setPredictedData(data.prediction);
        console.log(data.prediction);
        setInputValue("");
      })
      .catch((error) => setPredictedData("Something went wrong"));
  };

  return (
    <section
      className={`self-stretch flex flex-row items-start justify-start py-[0rem] px-[5rem] box-border max-w-full text-left text-[3.75rem] text-grays-black font-p mq825:pl-[2.5rem] mq825:pr-[2.5rem] mq825:box-border ${className}`}
    >
      <div className="flex-1 flex flex-row items-start justify-start gap-[4.5rem] max-w-full sm:gap-[1.125rem] mq825:gap-[2.25rem] mq1425:flex-wrap">
        <div className="flex-1 flex flex-col items-start justify-start pt-[2.125rem] px-[0rem] pb-[0rem] box-border min-w-[27.75rem] max-w-full mq825:min-w-full">
          <div className="self-stretch flex flex-col items-start justify-start gap-[2.187rem] max-w-full mq825:gap-[1.063rem]">
            <h1 className="m-0 sm:text-center text-left self-stretch relative text-inherit font-medium font-[inherit] sm:text-[2.25rem] mq825:text-[2rem]">
              AI /powered/ Public Goods Funding
            </h1>
            <h1 className="m-0 w-[38.625rem] relative text-[1.5rem] leading-[2.063rem] inline-block max-w-full font-[inherit] sm:text-[1.188rem] sm:leading-[1.625rem]">
              <span>{`AI-PGF: A Proactive Grants Program and Movement to Build towards a `}</span>
              <b>Funding AGI</b>
            </h1>
            <div className="self-stretch sm:mb-20 flex flex-row items-center justify-start sm:justify-center py-[0rem] pl-[0rem] pr-[21.125rem] gap-[0.75rem] sm:pr-[1.25rem] sm:box-border mq825:flex-wrap mq825:pr-[10.563rem] mq825:box-border">
              <Link target="_blank" href={"https://forum.aipgf.com/"}>
                <Button
                  className="sm:h-[3.25rem] hover:opacity-70 transition-all ease-in-out duration-400 h-[4.25rem] mq825:w-[177px] sm:text-[13px] sm:w-[max-content] font-bold text-[20px] min-w-[2.375rem] cursor-pointer"
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    color: "#fff",
                    fontSize: "20",
                    background: "#0057ff",
                    borderRadius: "41px",
                    "&:hover": { background: "#0057ff" },
                    height: 68,
                    width: 177,
                  }}
                  onClick={onButtonClick1}
                >
                  Get Funded
                </Button>
              </Link>
              <Link
                target="_blank"
                href={
                  "https://potlock.notion.site/What-AI-PGF-Actually-Looks-Like-dc04c784b11e474aacb6e0f27f91cb40?pvs=4"
                }
              >
                <Button1
                  button="Learn More"
                  onButtonClick3={onButtonClick}
                  buttonFlex="unset"
                  className="font-bold hover:opacity-50 transition-all ease-in-out duration-400 text-[20px] sm:h-[3.25rem] h-[4.25rem] mq825:w-[177px] sm:text-[13px] sm:w-[max-content]"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="w-[32.813rem] rounded-3xs bg-aipgf-white border-aipgf-geyser border-[1px] border-solid box-border overflow-hidden shrink-0 flex flex-col items-start justify-start pt-[1.062rem] pb-[0.812rem] pl-[1.5rem] pr-[1.375rem] gap-[1.25rem] min-w-[32.813rem] max-w-full text-[1.5rem] mq825:min-w-full mq1425:flex-1">
          <div className="flex items-start flex-row">
            <div className="self-stretch flex flex-col items-start justify-start gap-[0.562rem]">
              <h1 className="m-0 self-stretch relative text-inherit leading-[143%] font-bold font-[inherit] sm:text-[1.188rem] sm:leading-[1.688rem]">
                Eligibility Assessment Agent
              </h1>
              <div className="self-stretch relative text-[1rem] leading-[143%]">
                The AI will do an assessment of the project's{" "}
                <a
                  style={{ textDecoration: "none" }}
                  href="https://potlock.notion.site/a246c8d932ff46f69b49dcd4144e1188?v=6110401a3e1e49a1a59fb3b359e07a4e"
                  target="_blank"
                >
                  eligibility
                </a>{" "}
                for the AI-PGF grants program. Just type about your project.
              </div>
            </div>
            <img
              src="/ArrowsClockwise.svg"
              className="w-7 cursor-pointer hover:opacity-60 transition-all duration-300 ease-in-out"
              alt=""
              role="button"
              onClick={() => {
                setPredictedData("");
                setInputValue("");
              }}
            />
          </div>
          {!loading && !predictedData ? (
            <textarea
              className="border-aipgf-geyser p-3 border-[1.5px] border-solid bg-[transparent] h-[9.313rem] w-auto [outline:none] self-stretch relative rounded-[7.36px] box-border overflow-hidden shrink-0"
              rows={7}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              cols={24}
            />
          ) : (
            <div className="min-h-[149px] max-h-auto overflow-auto flex items-center justify-center">
              {loading ? (
                <div className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-8 w-8 mr-4 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  <p className="text-sm">Checking Eligibility...</p>
                </div>
              ) : (
                <p
                  className="text-sm whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{
                    __html: predictedData
                      .replace(
                        "Status: Not Eligible",
                        '<b>Status:</b> <span class="text-red-500 font-bold">Not Eligible</span>'
                      )
                      .replace(
                        "Status: Eligible",
                        '<b>Status:</b> <span class="text-green-500 font-bold">Eligible</span>'
                      )
                      .replace("Reasons:", "<b>Reasons</b>"),
                  }}
                />
              )}
            </div>
          )}

          <div className="w-[19.306rem]  flex flex-col items-end justify-start gap-[3.4rem] text-[0.825rem] text-aipgf-shark1 font-aipgf-manrope-semibold-1356 sm:gap-[1.688rem]">
            <div className="self-stretch flex flex-row items-start justify-start">
              <div className="flex flex-row items-center justify-start gap-[0.437rem]">
                <button
                  onClick={handleCheck}
                  disabled={(!inputValue && !predictedData) || loading}
                  className="[border:none] cursor-pointer disabled:opacity-35 transition-all ease-in-out duration-500 py-[0.468rem] px-[1.125rem] bg-communityintercomcom-blue-ribbon shadow-[0px_0px_0px_1.09px_#0057ff_inset] rounded-[22.31px] overflow-hidden flex flex-row items-center justify-center box-border min-w-[2.381rem]"
                >
                  <div className="flex flex-col items-center justify-start">
                    <b className="w-[5.313rem] relative text-[0.681rem] leading-[1.375rem] flex font-p text-aipgf-white text-center items-center justify-center">
                      Check Eligibility
                    </b>
                  </div>
                </button>
              </div>
            </div>
            {false && (
              <div className="flex sm:self-stretch flex-row sm:w[100%] items-start sm:items-center sm:justify-center justify-start gap-[0.237rem]">
                <div className="relative leading-[1.438rem] font-light inline-block min-w-[3.188rem]">{`Made by `}</div>
                <div className="h-[1.431rem] w-[1.431rem] relative">
                  <div className="absolute top-[0rem] left-[0rem] rounded-[50%] bg-gainsboro w-full h-full" />
                  <img
                    className="absolute top-[calc(50%_-_7.65px)] left-[calc(50%_-_7.65px)] w-[0.956rem] h-[0.956rem] object-cover z-[1]"
                    loading="lazy"
                    alt=""
                    src="/4@2x.png"
                  />
                </div>
                <div className="relative leading-[1.438rem] font-light inline-block min-w-[3.813rem]">{`Boris.near `}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EligibilityChecker;
