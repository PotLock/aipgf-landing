import type { NextPage } from "next";
import Button1 from "./button1";
import ProposalSteps from "./proposal-steps";
import { useState } from "react";
import Link from "next/link";

export type GrantApplicationType = {
  className?: string;
};

const GrantApplication: NextPage<GrantApplicationType> = ({
  className = "",
}) => {
  const [active, setActive] = useState(1);

  return (
    <section
      className={`self-stretch flex flex-row items-start justify-start pt-[0rem] px-[5rem] pb-[1.062rem] box-border max-w-full text-left text-[2.5rem] text-grays-black font-p mq825:pl-[2.5rem] mq825:pr-[2.5rem] mq825:box-border ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-start gap-[2rem] max-w-full mq825:gap-[1rem]">
        <div className="self-stretch rounded-4xs border-aipgf-geyser border-[1px] border-solid box-border overflow-hidden flex flex-col items-start justify-center py-[0rem] pl-[1.375rem] pr-[0rem] max-w-full">
          <div className="self-stretch overflow-hidden flex flex-col items-start justify-start py-[0.812rem] px-[0rem] box-border max-w-full">
            <div className="self-stretch flex flex-row items-center justify-between py-[0rem] px-[0.625rem] box-border max-w-full gap-[0.906rem] lg:flex-wrap sm:flex-wrap mq825:flex-wrap mq1425:flex-wrap">
              <h1 className="m-0 w-[23.75rem] relative text-inherit tracking-[-1px] leading-[3rem] font-medium font-[inherit] flex items-center shrink-0 max-w-full sm:text-[1.5rem] sm:leading-[1.813rem] mq825:text-[2rem] mq825:leading-[2.375rem]">
                Apply for Grant
              </h1>
              <h3 className="m-0 w-[41.938rem] relative text-[1.125rem] font-normal font-[inherit] text-aipgf-shark inline-block shrink-0 max-w-full">
                Building at the intersection of funding, Web3, and AI? Apply for
                a grant through our on-chain portal to build open source today!
              </h3>
              <Link target="_blank" href={"https://aipgf.com/about"}>
                <Button1
                  button="Apply Now"
                  propHeight="4.25rem"
                  propWidth="9.75rem"
                  buttonFlex="unset"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[0.062rem] max-w-full text-[3.75rem] text-aipgf-shark1">
          <div className="self-stretch h-[11.75rem] border-aipgf-geyser border-[1px] border-solid box-border overflow-hidden shrink-0 flex flex-row sm:flex-col items-start justify-start max-w-full text-aipgf-white mq1425:h-auto">
            <div className="flex-1 bg-aipgf-science-blue flex flex-row items-start justify-between pt-[1.062rem] pb-[7.662rem] pl-[1.75rem] pr-[1.687rem] box-border max-w-full shrink-0 gap-[1.25rem] mq1425:flex-wrap">
              <div className="w-[66.438rem] flex flex-col h-max items-start justify-start pt-[0.375rem] px-[0rem] pb-[0rem] box-border max-w-full">
                <div className="self-stretch flex flex-col items-start justify-start max-w-full">
                  <div className="relative font-medium inline-block min-w-[4.063rem] sm:text-[2.25rem] mq825:text-[3rem]">
                    01
                  </div>
                  <div className="self-stretch flex flex-row sm:flex-col items-start justify-between max-w-full mt-[-4.813rem] text-[2.213rem]">
                    <div className="w-[58rem] flex flex-col items-start justify-start gap-[1.462rem] max-w-full">
                      <div className="flex flex-col items-start justify-start gap-[0.787rem]">
                        <b className="relative leading-[2.5rem] sm:text-[1.313rem] sm:leading-[1.5rem] mq825:text-[1.75rem] mq825:leading-[2rem]">
                          Browse Ideas
                        </b>
                        <div className="relative text-[1rem] leading-[1.5rem] font-aipgf-manrope-semibold-1356">
                          Look at existing ideas that we are funding
                        </div>
                      </div>
                      <h2 className="m-0 self-stretch relative text-[1.25rem] leading-[1.875rem] font-normal font-aipgf-manrope-semibold-1356 sm:text-[1rem] sm:leading-[1.5rem]">
                        {`Browse the RFPs, and `}
                        <a
                          className="text-[inherit]"
                          href="https://aipgf.com/ideas"
                          target="_blank"
                        >
                          <span className="[text-decoration:underline]">
                            ideas
                          </span>
                        </a>{" "}
                        list .
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <img
                className="h-[2rem] w-[2rem] relative cursor-pointer"
                loading="lazy"
                alt=""
                role="button"
                src="/minus.svg"
              />
            </div>
          </div>
          <ProposalSteps
            emptyDraft="02"
            draftProposal="Draft Proposal"
            templateHref="https://aipgf.com/template"
            template="template"
          />
          <ProposalSteps
            propWidth="32.888rem"
            propGap="3.45rem"
            propPadding="0.212rem 0rem 0rem"
            emptyDraft="03"
            propMinWidth="4.75rem"
            propGap1="0.562rem"
            propMinWidth1="16.063rem"
            draftProposal="Get Feedback"
            propAlignSelf="stretch"
            templateHref="https://aipgf.com/telegram"
            template="telegram"
          />
          <div className="self-stretch border-aipgf-geyser border-[1px] border-solid box-border flex flex-row sm:flex-col items-start justify-start pt-[1rem] pb-[1.312rem] pl-[1.937rem] pr-[1.687rem] gap-[3.387rem] max-w-full mq825:gap-[1.688rem]">
            <div className="flex flex-col items-start justify-start pt-[0.25rem] px-[0rem] pb-[0rem]">
              <div className="relative font-medium inline-block min-w-[4.813rem] sm:text-[2.25rem] mq825:text-[3rem]">
                04
              </div>
            </div>
            <div className="w-[62.663rem] flex flex-col items-start justify-start py-[0rem] pl-[0rem] pr-[1.25rem] box-border gap-[0.6rem] sm:max-w-[100%] max-w-[calc(100%_-_217px)] sm:max-w- text-[2.25rem] text-grays-black">
              <h1 className="m-0 relative text-inherit tracking-[-0.02em] leading-[3rem] font-normal font-[inherit] whitespace-pre-wrap inline-block max-w-full sm:text-[1.375rem] sm:w-[100] sm:leading-[1.813rem] mq825:text-[1.813rem] mq825:leading-[2.375rem]">{`Create On-Chain Profile  & Submit Proposal`}</h1>
              <div className="relative text-[1rem] leading-[1.5rem] inline-block max-w-full font-aipgf-manrope-semibold-1356">
                <span>
                  {`Create an on chain profile on NEAR and submit your proposal through the AI-PGF `}
                </span>
                <a
                  className="text-[inherit]"
                  href="https://forum.aipgf.com"
                  target="_blank"
                >
                  <span>
                    <span className="[text-decoration:underline]">Forum</span>
                  </span>
                </a>
                <span>. Wait for feedback if revisions are needed.</span>
              </div>
            </div>
            <div className="flex flex-1 justify-end items-start justify-start pt-[1.687rem] px-[0rem] pb-[0rem]">
              <img
                className="w-[2rem] h-[2rem] relative"
                alt=""
                src="/plus.svg"
              />
            </div>
          </div>
          <div className="self-stretch border-aipgf-geyser border-[1px] border-solid box-border flex sm:flex-col flex-row items-start justify-start pt-[1.062rem] pb-[1.312rem] pl-[1.937rem] pr-[1.687rem] gap-[3.512rem] max-w-full mq825:gap-[1.75rem]">
            <div className="flex flex-col items-start justify-start pt-[0.225rem] px-[0rem] pb-[0rem]">
              <div className="relative font-medium inline-block min-w-[4.688rem] sm:text-[2.25rem] mq825:text-[3rem]">
                05
              </div>
            </div>
            <div className="w-[62.538rem] flex flex-col items-start justify-start py-[0rem] pl-[0rem] pr-[1.25rem] box-border gap-[0.575rem]  sm:max-w-[100%] max-w-[calc(100%_-_219px)] text-[2.25rem] text-grays-black">
              <h1 className="m-0 relative text-inherit tracking-[-0.02em] leading-[3rem] font-normal font-[inherit] sm:text-[1.375rem] sm:leading-[1.813rem] mq825:text-[1.813rem] mq825:leading-[2.375rem]">{`KYC & Payouts`}</h1>
              <div className="relative text-[1rem] leading-[1.5rem] inline-block max-w-full font-aipgf-manrope-semibold-1356">
                <a
                  className="text-[inherit]"
                  href="https://aipgf.com/kyc"
                  target="_blank"
                >
                  <span>
                    <span className="[text-decoration:underline]">KYC</span>
                  </span>
                </a>
                <span>
                  {" "}
                  and get paid half you payment upfront and the other half upon
                  completion. Report your milestone on same submission
                </span>
              </div>
            </div>
            <div className="flex-1 flex items-start justify-end float-end pt-[1.662rem] px-[0rem] pb-[0rem]">
              <img
                className="w-[2rem] h-[2rem] relative"
                alt=""
                src="/plus.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrantApplication;
