import type { NextPage } from "next";
import { useState, useCallback } from "react";
import { TextField, Icon } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Button1 from "./button1";
import Tag from "./tag";

export type FrameComponent3Type = {
  className?: string;
};

const FrameComponent3: NextPage<FrameComponent3Type> = ({ className = "" }) => {
  const [
    authorDetailsDateTimePickerValue,
    setAuthorDetailsDateTimePickerValue,
  ] = useState(new Date("2024-04-15"));

  const onButtonClick = useCallback(() => {
    window.open("https://forum.aipgf.com");
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <section
        className={`self-stretch flex flex-row items-start justify-start pt-[0rem] px-[5rem] pb-[1.062rem] box-border max-w-full text-left text-[2.894rem] text-aipgf-shark font-p mq825:pl-[2.5rem] mq825:pr-[2.5rem] mq825:box-border ${className}`}
      >
        <div className="flex-1 flex flex-col items-start justify-start gap-[2rem] max-w-full mq825:gap-[1rem]">
          <div className="self-stretch rounded-4xs border-aipgf-geyser border-[1px] border-solid box-border overflow-hidden flex flex-row items-start justify-between py-[0.687rem] pl-[0.937rem] pr-[1.062rem] max-w-full gap-[1.25rem] mq1425:flex-wrap">
            <div className="w-[55.844rem] flex flex-col items-start justify-start pt-[0.625rem] px-[0rem] pb-[0rem] box-border max-w-full">
              <div className="self-stretch flex flex-row items-start justify-start gap-[2.5rem] max-w-full lg:flex-wrap sm:gap-[1.25rem]">
                <div className="w-[17.094rem] relative tracking-[-1px] leading-[3rem] font-medium flex items-center shrink-0 sm:text-[1.75rem] sm:leading-[1.813rem] mq825:text-[2.313rem] mq825:leading-[2.375rem]">
                  Active RFPs
                </div>
                <div className="flex-1 flex flex-col items-start justify-start pt-[0.062rem] px-[0rem] pb-[0rem] box-border min-w-[23.563rem] max-w-full text-[1.125rem] mq825:min-w-full">
                  <h3 className="m-0 self-stretch relative text-inherit font-normal font-[inherit]">
                    Discover funding opportunities currently available for
                    innovative projects.
                  </h3>
                </div>
              </div>
            </div>
            <Button1
              button="View All"
              onButtonClick3={onButtonClick}
              propHeight="4.25rem"
              propWidth="9.75rem"
              buttonFlex="unset"
            />
          </div>
          <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[1.5rem] max-w-full text-[1.375rem] text-aipgf-shark1 font-aipgf-manrope-semibold-1356">
            <div className="flex-1 rounded-md bg-aipgf-regent-gray border-aipgf-geyser border-[1px] border-solid box-border overflow-hidden flex flex-row items-start justify-start pt-[3.25rem] pb-[0rem] pl-[0.062rem] pr-[0rem] min-w-[19.25rem] max-w-full">
              <div className="flex-1 bg-aipgf-white flex flex-col items-start justify-start pt-[1.312rem] px-[0rem] pb-[0rem] box-border relative gap-[1.112rem] max-w-full">
                <div className="w-[2.563rem] h-[2.563rem] absolute !m-[0] top-[-1.506rem] left-[1rem] rounded-[12811.22px] bg-aipgf-white border-aipgf-white border-[2px] border-solid box-border overflow-hidden shrink-0">
                  <img
                    className="absolute top-[0.013rem] left-[0rem] rounded-181xl w-full h-full overflow-hidden object-cover"
                    loading="lazy"
                    alt=""
                    src="/memoji--male-14@2x.png"
                  />
                </div>
                <div className="self-stretch flex flex-row items-start justify-start py-[0rem] px-[1rem] box-border max-w-full font-p">
                  <div className="flex-1 flex flex-col items-start justify-start gap-[1.343rem] max-w-full">
                    <div className="self-stretch overflow-hidden flex flex-row items-start justify-start gap-[3.687rem] sm:flex-wrap sm:gap-[1.813rem]">
                      <h2 className="m-0 flex-1 relative text-inherit leading-[1.563rem] font-bold font-[inherit] inline-block min-w-[9.563rem] sm:text-[1.125rem] sm:leading-[1.25rem]">{`Lorem ipsum dolor sit amet consectetur. `}</h2>
                      <Tag
                        propBackgroundColor="#b7b7b7"
                        propWidth="5.125rem"
                        x="/icon.svg"
                        cancel="Bounty"
                        propFontWeight="unset"
                        propColor="#24292f"
                        cancelFontSize="0.75rem"
                      />
                    </div>
                    <div className="self-stretch h-[3.063rem] overflow-hidden shrink-0 flex flex-row items-start justify-start py-[0rem] pl-[0rem] pr-[1.625rem] box-border max-w-full text-[0.844rem] font-aipgf-manrope-semibold-1356">
                      <div className="flex-1 relative leading-[1.5rem] font-light [display:-webkit-inline-box] items-center overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical] max-w-full">{`Lorem ipsum dolor sit amet consectetur. Neque quam mattis in non condimentum. Mauris morbi volutpat ac vitae curabitur purus enim pellentesque. `}</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-start justify-start py-[0rem] px-[1rem] box-border max-w-full text-center text-[0.875rem] text-grays-black">
                  <div className="flex flex-row items-start justify-start py-[0rem] pl-[0rem] pr-[10rem] box-border gap-[1.25rem] max-w-full sm:flex-wrap sm:pr-[1.25rem] sm:box-border">
                    <div className="flex flex-row items-center justify-start gap-[0.5rem]">
                      <div className="flex flex-col items-start justify-center py-[0.093rem] px-[0rem]">
                        <img
                          className="w-[1rem] h-[1rem] relative"
                          alt=""
                          src="/icon-1.svg"
                        />
                      </div>
                      <div className="flex flex-col items-center justify-start">
                        <div className="relative inline-block min-w-[4.688rem]">
                          3 Proposals
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-start py-[0.156rem] px-[0rem]">
                      <div className="flex flex-row items-center justify-start py-[0rem] px-[0rem] gap-[0.5rem]">
                        <div className="flex flex-col items-start justify-center py-[0.093rem] px-[0rem]">
                          <img
                            className="w-[1rem] h-[1rem] relative"
                            alt=""
                            src="/icon-2.svg"
                          />
                        </div>
                        <div className="flex flex-col items-center justify-start">
                          <div className="relative inline-block min-w-[3.375rem]">
                            3 replies
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch bg-aipgf-aqua-haze flex flex-row items-start justify-start pt-[0.687rem] px-[1rem] pb-[0.625rem] box-border max-w-full z-[1] text-[0.75rem] text-gray-100">
                  <div className="flex-1 flex flex-row items-start justify-start gap-[0.5rem] max-w-full sm:flex-wrap">
                    <div className="flex flex-col items-start justify-start pt-[0.375rem] px-[0rem] pb-[0rem]">
                      <div className="relative leading-[0.938rem] font-light inline-block min-w-[7.063rem]">
                        Submission Deadline
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-start pt-[0.375rem] pb-[0rem] pl-[0rem] pr-[1.25rem] box-border min-w-[7.375rem] text-black">
                      <div className="h-[0.875rem] relative leading-[3rem] font-semibold flex items-center shrink-0 min-w-[4.75rem]">
                        April 15, 2024
                      </div>
                    </div>
                    <button className="cursor-pointer border-aipgf-shark1 border-[1px] border-solid py-[0.187rem] px-[0.437rem] bg-aipgf-white w-[3.938rem] rounded-3xl box-border flex flex-row items-start justify-start gap-[0.187rem]">
                      <div className="flex flex-col items-start justify-start relative">
                        <img
                          className="w-[1rem] h-[1rem] relative"
                          alt=""
                          src="/pencilsimpleline.svg"
                        />
                        <div className="w-[1rem] h-[0.063rem] absolute !m-[0] top-[1rem] left-[0rem] hidden" />
                      </div>
                      <div className="relative text-[0.75rem] font-aipgf-manrope-semibold-1356 text-aipgf-shark1 text-center inline-block min-w-[1.75rem]">
                        Draft
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 rounded-md bg-aipgf-regent-gray border-aipgf-geyser border-[1px] border-solid box-border overflow-hidden flex flex-row items-start justify-start pt-[3.25rem] pb-[0rem] pl-[0.062rem] pr-[0rem] min-w-[19.25rem] max-w-full">
              <div className="flex-1 bg-aipgf-white flex flex-col items-start justify-start pt-[1.312rem] px-[0rem] pb-[0rem] box-border relative gap-[1.112rem] max-w-full">
                <div className="w-[2.563rem] h-[2.563rem] absolute !m-[0] top-[-1.506rem] left-[1.019rem] rounded-[12811.22px] bg-aipgf-white border-aipgf-white border-[2px] border-solid box-border overflow-hidden shrink-0">
                  <img
                    className="absolute top-[0.013rem] left-[0rem] rounded-181xl w-full h-full overflow-hidden object-cover"
                    alt=""
                    src="/memoji--male-14@2x.png"
                  />
                </div>
                <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pl-[0.937rem] pr-[1rem] box-border max-w-full font-p">
                  <div className="flex-1 flex flex-col items-start justify-start gap-[1.343rem] max-w-full">
                    <div className="self-stretch overflow-hidden flex flex-row items-start justify-between gap-[1.25rem] sm:flex-wrap">
                      <h2 className="m-0 w-[14.75rem] relative text-inherit leading-[1.563rem] font-bold font-[inherit] flex items-center shrink-0 sm:text-[1.125rem] sm:leading-[1.25rem]">{`Lorem ipsum dolor sit amet consectetur. `}</h2>
                      <div className="w-[3.938rem] rounded-3xl bg-aipgf-manhattan flex flex-row items-start justify-start py-[0.312rem] px-[0.5rem] box-border gap-[0.187rem] text-center text-[0.75rem] font-aipgf-manrope-semibold-1356">
                        <div className="flex flex-col items-start justify-start relative">
                          <img
                            className="w-[1rem] h-[1rem] relative overflow-hidden shrink-0"
                            alt=""
                            src="/solarcrownbroken.svg"
                          />
                          <div className="w-[1rem] h-[0.063rem] absolute !m-[0] top-[1rem] left-[0rem] hidden" />
                        </div>
                        <div className="flex-1 relative inline-block min-w-[1.75rem]">
                          MVP
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch h-[3.063rem] overflow-hidden shrink-0 flex flex-row items-start justify-start py-[0rem] pl-[0rem] pr-[1.625rem] box-border max-w-full text-[0.844rem] font-aipgf-manrope-semibold-1356">
                      <div className="flex-1 relative leading-[1.5rem] font-light [display:-webkit-inline-box] items-center overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical] max-w-full">{`Lorem ipsum dolor sit amet consectetur. Neque quam mattis in non condimentum. Mauris morbi volutpat ac vitae curabitur purus enim pellentesque. `}</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-start justify-start py-[0rem] px-[0.937rem] box-border max-w-full text-center text-[0.875rem] text-grays-black">
                  <div className="flex flex-row items-start justify-start py-[0rem] pl-[0rem] pr-[10rem] box-border gap-[1.25rem] max-w-full sm:flex-wrap sm:pr-[1.25rem] sm:box-border">
                    <div className="flex flex-row items-center justify-start gap-[0.5rem]">
                      <div className="flex flex-col items-start justify-center py-[0.093rem] px-[0rem]">
                        <img
                          className="w-[1rem] h-[1rem] relative"
                          alt=""
                          src="/icon-1.svg"
                        />
                      </div>
                      <div className="flex flex-col items-center justify-start">
                        <div className="relative inline-block min-w-[4.688rem]">
                          3 Proposals
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-start py-[0.156rem] px-[0rem]">
                      <div className="flex flex-row items-center justify-start py-[0rem] px-[0rem] gap-[0.5rem]">
                        <div className="flex flex-col items-start justify-center py-[0.093rem] px-[0rem]">
                          <img
                            className="w-[1rem] h-[1rem] relative"
                            alt=""
                            src="/icon-2.svg"
                          />
                        </div>
                        <div className="flex flex-col items-center justify-start">
                          <div className="relative inline-block min-w-[3.375rem]">
                            3 replies
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch bg-aipgf-aqua-haze flex flex-row items-start justify-start pt-[0.687rem] px-[1rem] pb-[0.625rem] box-border gap-[5.75rem] max-w-full z-[1] text-[0.75rem] text-gray-100 sm:gap-[1.438rem] mq825:flex-wrap mq825:gap-[2.875rem]">
                  <div className="w-[23.313rem] flex flex-row items-start justify-start gap-[0.5rem] shrink-0 max-w-full sm:flex-wrap">
                    <div className="flex flex-col items-start justify-start pt-[0.375rem] px-[0rem] pb-[0rem]">
                      <div className="relative leading-[0.938rem] font-light inline-block min-w-[7.063rem]">
                        Submission Deadline
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-start pt-[0.375rem] pb-[0rem] pl-[0rem] pr-[1.25rem] box-border min-w-[7.375rem] text-black">
                      <div className="h-[0.875rem] relative leading-[3rem] font-semibold flex items-center shrink-0 min-w-[4.75rem]">
                        April 15, 2024
                      </div>
                    </div>
                    <button className="cursor-pointer border-aipgf-shark1 border-[1px] border-solid py-[0.187rem] px-[0.437rem] bg-aipgf-white w-[3.938rem] rounded-3xl box-border flex flex-row items-start justify-start gap-[0.187rem]">
                      <div className="flex flex-col items-start justify-start relative">
                        <img
                          className="w-[1rem] h-[1rem] relative"
                          alt=""
                          src="/pencilsimpleline.svg"
                        />
                        <div className="w-[1rem] h-[0.063rem] absolute !m-[0] top-[1rem] left-[0rem] hidden" />
                      </div>
                      <div className="relative text-[0.75rem] font-aipgf-manrope-semibold-1356 text-aipgf-shark1 text-center inline-block min-w-[1.75rem]">
                        Draft
                      </div>
                    </button>
                  </div>
                  <div className="flex flex-col items-start justify-start pt-[0.125rem] px-[0rem] pb-[0rem] text-[0.725rem] text-grays-black">
                    <div className="rounded-[20.44px] bg-aipgf-manhattan flex flex-row items-start justify-start pt-[0.268rem] px-[0.375rem] pb-[0.262rem] gap-[0.256rem] shrink-0">
                      <img
                        className="h-[0.85rem] w-[0.85rem] relative"
                        alt=""
                        src="/spinner.svg"
                      />
                      <div className="h-[0.906rem] w-[3.688rem] relative leading-[2.129rem] font-semibold flex items-center shrink-0">
                        Evaluation
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 rounded-md bg-aipgf-regent-gray border-aipgf-geyser border-[1px] border-solid box-border overflow-hidden flex flex-row items-start justify-start pt-[3.25rem] pb-[0rem] pl-[0.062rem] pr-[0rem] min-w-[19.25rem] max-w-full font-p">
              <div className="flex-1 bg-aipgf-white flex flex-col items-end justify-start pt-[1.312rem] px-[0rem] pb-[0rem] box-border relative gap-[1.062rem] max-w-full">
                <div className="w-[2.563rem] h-[2.563rem] absolute !m-[0] top-[-1.506rem] left-[1.025rem] rounded-[12811.22px] bg-aipgf-white border-aipgf-white border-[2px] border-solid box-border overflow-hidden shrink-0">
                  <img
                    className="absolute top-[0.013rem] left-[0rem] rounded-181xl w-full h-full overflow-hidden object-cover"
                    alt=""
                    src="/memoji--male-14-2@2x.png"
                  />
                </div>
                <div className="self-stretch flex flex-row items-start justify-end py-[0rem] pl-[1.062rem] pr-[0.937rem] box-border max-w-full">
                  <div className="flex-1 flex flex-col items-start justify-start gap-[1.343rem] max-w-full">
                    <div className="self-stretch overflow-hidden flex flex-row items-start justify-between gap-[1.25rem] sm:flex-wrap">
                      <h2 className="m-0 w-[14.75rem] relative text-inherit leading-[1.563rem] font-bold font-[inherit] flex items-center shrink-0 sm:text-[1.125rem] sm:leading-[1.25rem]">{`Lorem ipsum dolor sit amet consectetur. `}</h2>
                      <div className="w-[3.938rem] rounded-3xl bg-aipgf-manhattan flex flex-row items-start justify-start py-[0.312rem] px-[0.5rem] box-border gap-[0.187rem] text-center text-[0.75rem] font-aipgf-manrope-semibold-1356">
                        <div className="flex flex-col items-start justify-start relative">
                          <img
                            className="w-[1rem] h-[1rem] relative overflow-hidden shrink-0"
                            alt=""
                            src="/solarcrownbroken.svg"
                          />
                          <div className="w-[1rem] h-[0.063rem] absolute !m-[0] top-[1rem] left-[0rem] hidden" />
                        </div>
                        <div className="flex-1 relative inline-block min-w-[1.75rem]">
                          MVP
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-start justify-start gap-[1.156rem] max-w-full text-[0.844rem] font-aipgf-manrope-semibold-1356">
                      <div className="self-stretch h-[3.063rem] overflow-hidden shrink-0 flex flex-row items-start justify-start py-[0rem] pl-[0rem] pr-[1.625rem] box-border max-w-full">
                        <div className="flex-1 relative leading-[1.5rem] font-light [display:-webkit-inline-box] items-center overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical] max-w-full">{`Lorem ipsum dolor sit amet consectetur. Neque quam mattis in non condimentum. Mauris morbi volutpat ac vitae curabitur purus enim pellentesque. `}</div>
                      </div>
                      <div className="flex flex-row items-start justify-start py-[0rem] pl-[0rem] pr-[10rem] box-border gap-[1.25rem] max-w-full text-center text-[0.875rem] text-grays-black sm:flex-wrap sm:pr-[1.25rem] sm:box-border">
                        <div className="flex flex-row items-center justify-start gap-[0.5rem]">
                          <div className="flex flex-col items-start justify-center py-[0.093rem] px-[0rem]">
                            <img
                              className="w-[1rem] h-[1rem] relative"
                              alt=""
                              src="/icon-1.svg"
                            />
                          </div>
                          <div className="flex flex-col items-center justify-start">
                            <div className="relative inline-block min-w-[4.688rem]">
                              3 Proposals
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-start py-[0.156rem] px-[0rem]">
                          <div className="flex flex-row items-center justify-start py-[0rem] px-[0rem] gap-[0.5rem]">
                            <div className="flex flex-col items-start justify-center py-[0.093rem] px-[0rem]">
                              <img
                                className="w-[1rem] h-[1rem] relative"
                                alt=""
                                src="/icon-2.svg"
                              />
                            </div>
                            <div className="flex flex-col items-center justify-start">
                              <div className="relative inline-block min-w-[3.375rem]">
                                3 replies
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch bg-aipgf-aqua-haze flex flex-row items-start justify-start pt-[0.718rem] px-[1rem] pb-[0.656rem] box-border max-w-full z-[1] text-[0.75rem] text-gray-100 font-aipgf-manrope-semibold-1356">
                  <div className="w-[23.25rem] flex flex-row items-center justify-start py-[0rem] px-[0rem] box-border gap-[5.75rem] max-w-full sm:gap-[1.438rem] mq825:flex-wrap mq825:gap-[2.875rem]">
                    <div className="w-[23.313rem] flex flex-row items-center justify-between max-w-full gap-[1.25rem] shrink-0 sm:flex-wrap">
                      <div className="flex flex-row items-start justify-start gap-[0.25rem]">
                        <div className="flex flex-row items-center justify-start py-[0rem] pl-[0rem] pr-[0.25rem]">
                          <div className="relative leading-[0.938rem] font-light inline-block min-w-[7.063rem]">
                            Submission Deadline
                          </div>
                        </div>
                        <div className="h-[0.875rem] w-[4.75rem]">
                          <DatePicker
                            value={authorDetailsDateTimePickerValue}
                            onChange={(newValue: any) => {
                              setAuthorDetailsDateTimePickerValue(newValue);
                            }}
                            sx={{
                              fieldset: {
                                borderColor: "transparent",
                                borderTopWidth: 1,
                                borderRightWidth: 1,
                                borderBottomWidth: 1,
                                borderLeftWidth: 1,
                              },
                              "&:hover": {
                                fieldset: { borderColor: "transparent" },
                                ".MuiOutlinedInput-notchedOutline": {
                                  borderColor: "transparent",
                                },
                              },
                              "& input::placeholder": {
                                textColor: "#151515",
                                fontSize: 12,
                              },
                              input: {
                                color: "#151515",
                                fontSize: 12,
                                textAlign: "left",
                                fontWeight: "600",
                              },
                              "& .MuiInputBase-root": {
                                height: 14,
                                gap: "8px",
                                flexDirection: { flexDirection: "row" },
                              },
                            }}
                            slotProps={{
                              textField: {
                                size: "medium",
                                fullWidth: true,
                                required: false,
                                autoFocus: false,
                                error: false,
                              },
                              openPickerIcon: {
                                component: () => <></>,
                              },
                            }}
                          />
                        </div>
                      </div>
                      <Tag x="/x.svg" cancel="Cancel" />
                    </div>
                    <div className="rounded-[20.44px] bg-aipgf-manhattan flex flex-row items-center justify-start pt-[0.268rem] px-[0.375rem] pb-[0.262rem] gap-[0.256rem] text-[0.725rem] text-grays-black">
                      <div className="flex flex-col items-start justify-start">
                        <img
                          className="w-[0.85rem] h-[0.85rem] relative"
                          alt=""
                          src="/spinner.svg"
                        />
                      </div>
                      <div className="h-[0.906rem] w-[3.688rem] relative leading-[2.129rem] font-semibold flex items-center shrink-0">
                        Evaluation
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LocalizationProvider>
  );
};

export default FrameComponent3;
