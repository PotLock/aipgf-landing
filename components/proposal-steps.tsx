import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import styles from "./proposal-steps.module.css";

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
    <div className={[styles.proposalSteps, className].join(" ")}>
      <div
        className={styles.proposalStepsContainer}
        style={proposalStepsContainerStyle}
      >
        <div className={styles.draftStep} style={draftStepStyle}>
          <div className={styles.emptyDraft} style={emptyDraftStyle}>
            {emptyDraft}
          </div>
        </div>
        <div className={styles.draftContent} style={draftContentStyle}>
          <h1 className={styles.draftProposal}>{draftProposal}</h1>
          <div
            className={styles.draftYourProposalContainer}
            style={draftYourProposalContainerStyle}
          >
            <span>{`Draft your proposal with this `}</span>
            <a className={styles.template} href={templateHref} target="_blank">
              <span>
                <span className={styles.template1}>{template}</span>
              </span>
            </a>
            <span>
              . Make sure to join the community telegram to get feedback
            </span>
          </div>
        </div>
      </div>
      <div className={styles.submitStep}>
        <img
          className={styles.plusIcon}
          loading="lazy"
          alt=""
          src="/plus.svg"
        />
      </div>
    </div>
  );
};

export default ProposalSteps;
