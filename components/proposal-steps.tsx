import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

export type ProposalStepsType = {
  className?: string;
  emptyDraft?: string;
  draftProposal?: string;
  templateHref: string;
  template?: string;

  /** Style props */
  propWidth?: CSSProperties["width"];
  propGap?: CSSProperties["gap"];
  propPadding?: CSSProperties["padding"];
  propMinWidth?: CSSProperties["minWidth"];
  propGap1?: CSSProperties["gap"];
  propMinWidth1?: CSSProperties["minWidth"];
  propAlignSelf?: CSSProperties["alignSelf"];
};

const ProposalSteps: NextPage<ProposalStepsType> = ({
  className = "",
  propWidth,
  propGap,
  propPadding,
  emptyDraft,
  propMinWidth,
  propGap1,
  propMinWidth1,
  draftProposal,
  propAlignSelf,
  templateHref,
  template,
}) => {
  const proposalStepsContainerStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
      gap: propGap,
    };
  }, [propWidth, propGap]);

  const draftStepStyle: CSSProperties = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  const emptyDraftStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  const draftContentStyle: CSSProperties = useMemo(() => {
    return {
      gap: propGap1,
      minWidth: propMinWidth1,
    };
  }, [propGap1, propMinWidth1]);

  const draftYourProposalContainerStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
    };
  }, [propAlignSelf]);

  return (
    <div
      className={`self-stretch border-aipgf-geyser border-[1px] border-solid box-border flex flex-row items-end justify-between pt-[1.062rem] pb-[1.312rem] pl-[1.937rem] pr-[1.812rem] max-w-full gap-[1.25rem] text-left text-[3.75rem] text-aipgf-shark1 font-p lg:flex-wrap ${className}`}
    >
      <div
        className="w-[52.825rem] flex flex-row items-start justify-start gap-[3.512rem] max-w-full sm:gap-[1.75rem] mq825:flex-wrap"
        style={proposalStepsContainerStyle}
      >
        <div
          className="flex flex-col items-start justify-start pt-[0.237rem] px-[0rem] pb-[0rem]"
          style={draftStepStyle}
        >
          <div
            className="relative font-medium inline-block min-w-[4.688rem] sm:text-[2.25rem] mq825:text-[3rem]"
            style={emptyDraftStyle}
          >
            {emptyDraft}
          </div>
        </div>
        <div
          className="flex-1 flex flex-col items-start justify-start gap-[0.587rem] min-w-[29rem] max-w-full text-[2.25rem] text-grays-black mq825:min-w-full"
          style={draftContentStyle}
        >
          <h1 className="m-0 relative text-inherit tracking-[-0.02em] leading-[3rem] font-normal font-[inherit] sm:text-[1.375rem] sm:leading-[1.813rem] mq825:text-[1.813rem] mq825:leading-[2.375rem]">
            {draftProposal}
          </h1>
          <div
            className="relative text-[1rem] leading-[1.5rem] font-aipgf-manrope-semibold-1356"
            style={draftYourProposalContainerStyle}
          >
            <span>{`Draft your proposal with this `}</span>
            <a className="text-[inherit]" href={templateHref} target="_blank">
              <span>
                <span className="[text-decoration:underline]">{template}</span>
              </span>
            </a>
            <span>
              . Make sure to join the community telegram to get feedback
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[1.412rem]">
        <img
          className="w-[2rem] h-[2rem] relative"
          loading="lazy"
          alt=""
          src="/plus.svg"
        />
      </div>
    </div>
  );
};

export default ProposalSteps;
