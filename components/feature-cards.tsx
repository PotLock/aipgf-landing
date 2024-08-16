import type { NextPage } from "next";
import { useCallback } from "react";
import { Button } from "@mui/material";

export type FeatureCardsType = {
  className?: string;
};

const FeatureCards: NextPage<FeatureCardsType> = ({ className = "" }) => {
  const onButtonClick = useCallback(() => {
    window.open("https://forum.aipgf.com");
  }, []);

  const onButtonContainerClick = useCallback(() => {
    window.open("https://aipgf.com/ideas");
  }, []);

  return (
    <div
      className={`self-stretch flex flex-row items-start justify-start py-[0rem] px-[5rem] box-border max-w-full text-left text-[2.375rem] text-aipgf-shark1 font-p mq825:pl-[2.5rem] mq825:pr-[2.5rem] mq825:box-border ${className}`}
    >
      <div className="flex-1 flex flex-row flex-wrap items-start justify-start gap-[1.5rem] max-w-full">
        <div className="flex-1 rounded-6xl bg-aipgf-white border-aipgf-geyser border-[1px] border-solid box-border overflow-hidden flex flex-row items-start justify-start pt-[4.437rem] pb-[4.062rem] pl-[2rem] pr-[1.75rem] relative gap-[1.375rem] min-w-[25.5rem] max-w-full mq825:flex-wrap mq825:min-w-full">
          <div className="flex-1 flex flex-col items-start justify-start gap-[3.812rem] min-w-[11.875rem] mq450:gap-[1.875rem]">
            <h1 className="m-0 self-stretch relative text-inherit font-medium font-[inherit] mq450:text-[1.438rem] mq825:text-[1.875rem]">
              Proactive Grants Program
            </h1>
            <Button
              className="w-[9.663rem] h-[2.594rem] cursor-pointer"
              endIcon={
                <img width="18.4px" height="18.4px" src="/arrowupright-2.svg" />
              }
              disableElevation
              variant="outlined"
              sx={{
                textTransform: "none",
                color: "#1c1c1e",
                fontSize: "16.1",
                borderColor: "#dadadd",
                borderRadius: "48.42px",
                "&:hover": { borderColor: "#dadadd" },
                width: 154.6,
                height: 41.5,
              }}
              onClick={onButtonClick}
            >
              Get Funded
            </Button>
          </div>
          <div className="w-[15.713rem] flex flex-col items-start justify-start pt-[0.656rem] px-[0rem] pb-[0rem] box-border min-w-[15.713rem] mq825:flex-1">
            <div className="self-stretch rounded-[10.77px] bg-aipgf-white border-grays-black border-[1.8px] border-solid overflow-hidden flex flex-col items-end justify-start pt-[0.375rem] px-[0rem] pb-[0.687rem] gap-[0.618rem]">
              <div className="self-stretch flex flex-col items-start justify-start gap-[0.25rem]">
                <div className="flex flex-row items-start justify-start py-[0rem] px-[0.562rem]">
                  <div className="flex flex-row items-center justify-start gap-[0.112rem] shrink-0">
                    <div className="h-[0.675rem] w-[0.675rem] relative rounded-[50%] bg-aipgf-shark1" />
                    <div className="h-[0.675rem] w-[0.675rem] relative rounded-[50%] bg-aipgf-shark1" />
                    <div className="h-[0.675rem] w-[0.675rem] relative rounded-[50%] bg-aipgf-shark1" />
                  </div>
                </div>
                <div className="self-stretch h-[0.113rem] relative bg-aipgf-shark1 shrink-0" />
              </div>
              <div className="self-stretch flex flex-row items-start justify-end py-[0rem] pl-[3.437rem] pr-[3.375rem] mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:box-border">
                <div className="h-[7.763rem] flex-1 relative">
                  <div className="absolute h-full top-[0rem] bottom-[0rem] left-[calc(50%_-_70.85px)] w-[7.763rem] overflow-hidden">
                    <div className="absolute top-[0rem] left-[0rem] w-full h-full">
                      <img
                        className="absolute w-[calc(100%_-_14.9px)] top-[0.431rem] right-[0.488rem] left-[0.444rem] max-w-full overflow-hidden h-[6.456rem]"
                        alt=""
                        src="/vector-6.svg"
                      />
                      <img
                        className="absolute top-[0rem] left-[0rem] w-full h-full z-[1]"
                        alt=""
                      />
                    </div>
                    <div className="absolute top-[4.475rem] left-[2.888rem] flex flex-col items-start justify-start z-[2]">
                      <img
                        className="w-[1.794rem] h-[1.694rem] relative"
                        alt=""
                        src="/vector-8.svg"
                      />
                      <img
                        className="w-[1.794rem] h-[0.956rem] relative z-[1] mt-[-0.1rem]"
                        alt=""
                        src="/vector-9.svg"
                      />
                    </div>
                    <div className="absolute top-[5.375rem] left-[4.975rem] flex flex-col items-start justify-start z-[2]">
                      <img
                        className="w-[1.794rem] h-[1.694rem] relative"
                        alt=""
                        src="/vector-8.svg"
                      />
                    </div>
                  </div>
                  <div className="absolute top-[5.775rem] left-[7.069rem] flex flex-col items-start justify-start z-[3]">
                    <img
                      className="w-[1.794rem] h-[1.231rem] relative"
                      alt=""
                      src="/vector-11.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            className="h-[2.938rem] w-[2.938rem] absolute !m-[0] right-[16rem] bottom-[7rem] z-[1]"
            loading="lazy"
            alt=""
            src="/sealcheck.svg"
          />
        </div>
        <div className="flex-1 rounded-6xl bg-aipgf-white border-aipgf-geyser border-[1px] border-solid box-border overflow-hidden flex flex-row items-end justify-start pt-[2.625rem] px-[2rem] pb-[2.75rem] min-w-[25.5rem] max-w-full [row-gap:20px] mq825:flex-wrap mq825:min-w-full">
          <div className="h-[12.425rem] w-[18.25rem] flex flex-col items-start justify-start min-w-[18.25rem] mq825:flex-1">
            <div className="self-stretch flex flex-col items-start justify-start gap-[3.812rem] mq450:gap-[1.875rem]">
              <h1 className="m-0 self-stretch relative text-inherit font-medium font-[inherit] mq450:text-[1.438rem] mq825:text-[1.875rem]">
                Funding AGI
              </h1>
              <div
                className="rounded-[48.42px] border-neutral-neutral-200 border-[1.2px] border-solid flex flex-row items-start justify-start py-[0.5rem] pl-[1.125rem] pr-[1.062rem] gap-[0.581rem] cursor-pointer text-[1.006rem] text-base-base-black font-inter"
                onClick={onButtonContainerClick}
              >
                <div className="relative leading-[143%] font-medium inline-block min-w-[2.438rem]">
                  Build
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
          </div>
          <div className="w-[15.563rem] overflow-hidden shrink-0 flex flex-col items-start justify-start pt-[1.512rem] pb-[5rem] pl-[1.25rem] pr-[1rem] box-border relative min-w-[15.563rem] min-h-[15.563rem] mq825:flex-1">
            <div className="w-[0.538rem] h-[0.538rem] absolute !m-[0] right-[7.394rem] bottom-[1.25rem] rounded-[50%] bg-gainsboro border-grays-black border-[0px] border-solid box-border" />
            <div className="self-stretch flex flex-col items-start justify-start gap-[0.375rem]">
              <div className="self-stretch flex flex-row items-start justify-between gap-[1.25rem] mq450:flex-wrap">
                <div className="h-[5.463rem] w-[4.469rem] relative">
                  <img
                    className="absolute top-[0rem] left-[0rem] w-full h-full"
                    alt=""
                    src="/vector-12.svg"
                  />
                  <div className="absolute top-[1.481rem] left-[1.394rem] flex flex-row items-center justify-start gap-[0.206rem] z-[1]">
                    <img
                      className="self-stretch w-[0.431rem] relative max-h-full min-h-[1.563rem]"
                      alt=""
                      src="/vector-13.svg"
                    />
                    <img
                      className="self-stretch w-[0.431rem] relative max-h-full min-h-[1.563rem]"
                      alt=""
                      src="/vector-14.svg"
                    />
                    <img
                      className="self-stretch w-[0.431rem] relative max-h-full min-h-[1.563rem]"
                      alt=""
                      src="/vector-15.svg"
                    />
                    <div className="h-[11.888rem] w-[11.706rem] absolute !m-[0] right-[-9.256rem] bottom-[-9.187rem]">
                      <div className="absolute top-[5.481rem] left-[0rem] rounded-[50%] bg-gainsboro border-grays-black border-[0px] border-solid box-border w-[0.538rem] h-[0.538rem]" />
                      <div className="absolute top-[6.088rem] left-[0.025rem] rounded-[50%] bg-gainsboro border-grays-black border-[0px] border-solid box-border w-[0.538rem] h-[0.538rem]" />
                      <div className="absolute top-[5.675rem] left-[0.469rem] bg-grays-black w-[2.606rem] h-[0.138rem] z-[1]" />
                      <div className="absolute top-[6.281rem] left-[0.5rem] bg-grays-black w-[2.644rem] h-[0.138rem] z-[1]" />
                      <img
                        className="absolute top-[7.694rem] left-[9.069rem] w-[1.931rem] h-[0.144rem]"
                        alt=""
                        src="/vector-16.svg"
                      />
                      <img
                        className="absolute top-[8.55rem] left-[8.613rem] w-[2.394rem] h-[0.244rem]"
                        alt=""
                        src="/vector-17.svg"
                      />
                      <div className="absolute top-[8.438rem] left-[11.169rem] rounded-[50%] bg-gainsboro border-grays-black border-[0px] border-solid box-border w-[0.538rem] h-[0.538rem]" />
                      <div className="absolute top-[7.469rem] left-[11.144rem] rounded-[50%] bg-gainsboro border-grays-black border-[0px] border-solid box-border w-[0.538rem] h-[0.538rem]" />
                      <img
                        className="absolute top-[8.338rem] left-[5.869rem] w-[0.163rem] h-[3.55rem]"
                        alt=""
                        src="/vector-18.svg"
                      />
                      <img
                        className="absolute top-[8.738rem] left-[7.094rem] w-[4.463rem] h-[2.781rem] z-[1]"
                        alt=""
                        src="/frame-52.svg"
                      />
                      <img
                        className="absolute top-[8.675rem] left-[0.35rem] w-[4.463rem] h-[2.781rem] object-contain"
                        alt=""
                        src="/frame-53.svg"
                      />
                      <div className="absolute top-[0rem] left-[0.85rem] w-[8.869rem] h-[11.281rem]">
                        <img
                          className="absolute top-[0rem] left-[0rem] w-full h-full z-[2]"
                          alt=""
                        />
                        <div className="absolute top-[2.213rem] left-[1.444rem] w-[7.338rem] h-[6.375rem]">
                          <img
                            className="absolute top-[0rem] left-[0rem] w-full h-full z-[3]"
                            alt=""
                            src="/vector-20.svg"
                          />
                          <div className="absolute top-[4.844rem] left-[3.894rem] w-[2.675rem] h-[1.425rem]">
                            <img
                              className="absolute top-[0rem] left-[0rem] w-full h-full z-[4]"
                              alt=""
                              src="/vector-21.svg"
                            />
                            <div className="absolute top-[0.15rem] left-[0.238rem] w-[2.419rem] h-[1.069rem]">
                              <img
                                className="absolute top-[0rem] left-[0rem] w-full h-full z-[5]"
                                alt=""
                                src="/vector-22.svg"
                              />
                              <div className="absolute top-[0.088rem] left-[0.363rem] flex flex-col items-start justify-start gap-[0.043rem] z-[6]">
                                <img
                                  className="w-[1.631rem] h-[0.131rem] relative"
                                  alt=""
                                  src="/vector-23.svg"
                                />
                                <img
                                  className="w-[1.638rem] h-[0.131rem] relative"
                                  alt=""
                                  src="/vector-24.svg"
                                />
                                <img
                                  className="w-[1.638rem] h-[0.138rem] relative"
                                  alt=""
                                  src="/vector-25.svg"
                                />
                                <img
                                  className="w-[1.644rem] h-[0.131rem] relative"
                                  alt=""
                                  src="/vector-26.svg"
                                />
                                <img
                                  className="w-[1.644rem] h-[0.131rem] relative"
                                  alt=""
                                  src="/vector-27.svg"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="absolute h-[calc(100%_-_6.4px)] top-[0.138rem] bottom-[0.263rem] left-[0.313rem] w-[3.463rem]">
                            <img
                              className="absolute top-[0rem] left-[2.075rem] w-[0.556rem] h-[0.825rem] z-[4]"
                              alt=""
                              src="/vector-28.svg"
                            />
                            <img
                              className="absolute top-[0rem] left-[0rem] w-full h-full"
                              alt=""
                              src="/group-116.svg"
                            />
                            <img
                              className="absolute top-[2.038rem] left-[2.644rem] w-[0.619rem] h-[0.25rem] z-[6]"
                              alt=""
                              src="/vector-29.svg"
                            />
                          </div>
                          <div className="absolute top-[0.138rem] left-[3.831rem] w-[3.363rem] h-[4.638rem]">
                            <img
                              className="absolute top-[3.55rem] left-[1.488rem] w-[0.413rem] h-[0.419rem] z-[4]"
                              alt=""
                              src="/vector-30.svg"
                            />
                            <img
                              className="absolute top-[3.213rem] left-[1.875rem] w-[1.088rem] h-[1.225rem] z-[5]"
                              alt=""
                              src="/vector-31.svg"
                            />
                            <img
                              className="absolute top-[3.644rem] left-[2.1rem] w-[0.644rem] h-[0.65rem] z-[6]"
                              alt=""
                              src="/vector-32.svg"
                            />
                            <img
                              className="absolute top-[0rem] left-[0rem] w-full h-full"
                              alt=""
                              src="/group-118.svg"
                            />
                            <img
                              className="absolute top-[1.869rem] left-[0.638rem] w-[0.525rem] h-[0.525rem] z-[8]"
                              alt=""
                              src="/vector-33.svg"
                            />
                            <div className="absolute top-[0.538rem] left-[0.725rem] w-[1.288rem] h-[1.288rem]">
                              <img
                                className="absolute top-[0rem] left-[0rem] w-full h-full z-[8]"
                                alt=""
                                src="/vector-34.svg"
                              />
                              <img
                                className="absolute top-[0.156rem] left-[0.144rem] w-[1rem] h-[0.994rem] z-[9]"
                                alt=""
                                src="/vector-35.svg"
                              />
                            </div>
                          </div>
                          <div className="absolute h-[calc(100%_-_17.1px)] top-[0.5rem] bottom-[0.569rem] left-[0.131rem] w-[3.356rem]">
                            <img
                              className="absolute top-[4.444rem] left-[1.169rem] w-[0.9rem] h-[0.35rem] z-[4]"
                              alt=""
                              src="/vector-36.svg"
                            />
                            <img
                              className="absolute top-[0rem] left-[0rem] w-full h-full"
                              alt=""
                              src="/group-117.svg"
                            />
                            <img
                              className="absolute top-[2.044rem] left-[2.213rem] w-[0.638rem] h-[0.663rem] z-[8]"
                              alt=""
                              src="/vector-37.svg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[5.463rem] w-[4.469rem] relative">
                  <img
                    className="absolute top-[0rem] left-[0rem] w-full h-full object-contain"
                    alt=""
                    src="/vector-38.svg"
                  />
                  <div className="absolute top-[3.031rem] left-[3.069rem] flex flex-row items-center justify-start gap-[0.206rem] [transform:_rotate(180deg)] [transform-origin:0_0] z-[1]">
                    <img
                      className="self-stretch w-[0.431rem] relative max-h-full [transform:_rotate(-180deg)] min-h-[1.563rem]"
                      alt=""
                      src="/vector-13.svg"
                    />
                    <img
                      className="self-stretch w-[0.431rem] relative max-h-full [transform:_rotate(-180deg)] min-h-[1.563rem]"
                      alt=""
                      src="/vector-14.svg"
                    />
                    <img
                      className="self-stretch w-[0.431rem] relative max-h-full [transform:_rotate(-180deg)] min-h-[1.563rem]"
                      alt=""
                      src="/vector-15.svg"
                    />
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pl-[0.687rem] pr-[0.75rem]">
                <div className="flex-1 flex flex-col items-end justify-start gap-[0.656rem]">
                  <div className="flex flex-col items-start justify-start gap-[0.106rem]">
                    <div className="flex flex-row items-center justify-start shrink-0 z-[4]">
                      <img
                        className="h-[0.363rem] w-[0.369rem] relative"
                        alt=""
                      />
                      <img
                        className="h-[0.169rem] w-[1.581rem] relative"
                        alt=""
                        src="/vector-43.svg"
                      />
                      <div className="h-[0.538rem] w-[0.538rem] relative rounded-[50%] bg-gainsboro border-grays-black border-[0px] border-solid box-border" />
                    </div>
                    <div className="flex flex-row items-center justify-start py-[0rem] pl-[0rem] pr-[0.125rem] shrink-0 z-[4]">
                      <img
                        className="h-[0.169rem] w-[1.575rem] relative"
                        alt=""
                        src="/vector-44.svg"
                      />
                      <div className="h-[0.538rem] w-[0.538rem] relative rounded-[50%] bg-gainsboro border-grays-black border-[0px] border-solid box-border" />
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-start">
                    <div className="w-[3.981rem] flex flex-col items-start justify-start gap-[0.275rem]">
                      <div className="w-[3.231rem] h-[0.538rem] relative shrink-0 z-[8]">
                        <div className="absolute top-[0rem] left-[0rem] rounded-[50%] bg-gainsboro border-grays-black border-[0px] border-solid box-border w-[0.538rem] h-[0.538rem]" />
                        <div className="absolute top-[0.2rem] left-[0.475rem] bg-grays-black w-[2.65rem] h-[0.138rem] z-[1]" />
                      </div>
                      <div className="self-stretch h-[0.538rem] relative shrink-0 z-[6]">
                        <div className="absolute top-[0rem] left-[0rem] rounded-[50%] bg-gainsboro border-grays-black border-[0px] border-solid box-border w-[0.538rem] h-[0.538rem]" />
                        <div className="absolute top-[0.194rem] left-[0.463rem] bg-grays-black w-[3.519rem] h-[0.138rem] z-[1]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
