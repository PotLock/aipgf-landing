import type { NextPage } from "next";
import Button1 from "./button1";
import ProposalSteps from "./proposal-steps";
import styles from "./grant-application.module.css";

export type GrantApplicationType = {
  className?: string;
};

const GrantApplication: NextPage<GrantApplicationType> = ({
  className = "",
}) => {
  return (
    <section className={[styles.grantApplication, className].join(" ")}>
      <div className={styles.applicationContent}>
        <div className={styles.header}>
          <div className={styles.container}>
            <div className={styles.applyGrantContainer}>
              <h1 className={styles.applyForGrant}>Apply for Grant</h1>
              <h3 className={styles.buildingAtThe}>
                Building at the intersection of funding, Web3, and AI? Apply for
                a grant through our on-chain portal to build open source today!
              </h3>
              <Button1
                button="Apply Now"
                propHeight="4.25rem"
                propWidth="9.75rem"
                buttonFlex="unset"
              />
            </div>
          </div>
        </div>
        <div className={styles.parent}>
          <div className={styles.div}>
            <div className={styles.background}>
              <div className={styles.browseIdeasContent}>
                <div className={styles.group}>
                  <div className={styles.div1}>01</div>
                  <div className={styles.browseIdeasTitleContainer}>
                    <div className={styles.browseIdeasTitle}>
                      <div className={styles.browseIdeasDescription}>
                        <b className={styles.browseIdeas}>Browse Ideas</b>
                        <div className={styles.lookAtExisting}>
                          Look at existing ideas that we are funding
                        </div>
                      </div>
                      <h2 className={styles.browseTheRfpsContainer}>
                        {`Browse the RFPs, and `}
                        <a
                          className={styles.ideas}
                          href="https://aipgf.com/ideas"
                          target="_blank"
                        >
                          <span className={styles.ideas1}>ideas</span>
                        </a>{" "}
                        list .
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <img
                className={styles.minusIcon}
                loading="lazy"
                alt=""
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
            propGap="55.2px"
            propPadding="var(--padding-9xs-4) 0rem 0rem"
            emptyDraft="03"
            propMinWidth="4.75rem"
            propGap1="9px"
            propMinWidth1="16.063rem"
            draftProposal="Get Feedback"
            propAlignSelf="stretch"
            templateHref="https://aipgf.com/telegram"
            template="telegram"
          />
          <div className={styles.proposalSteps}>
            <div className={styles.wrapper}>
              <div className={styles.div2}>04</div>
            </div>
            <div className={styles.createOnChainProfileSubmParent}>
              <h1
                className={styles.createOnChainProfile}
              >{`Create On-Chain Profile  & Submit Proposal`}</h1>
              <div className={styles.createAnOnContainer}>
                <span>
                  {`Create an on chain profile on NEAR and submit your proposal through the AI-PGF `}
                </span>
                <a
                  className={styles.ideas}
                  href="https://forum.aipgf.com"
                  target="_blank"
                >
                  <span>
                    <span className={styles.ideas1}>Forum</span>
                  </span>
                </a>
                <span>. Wait for feedback if revisions are needed.</span>
              </div>
            </div>
            <div className={styles.plusIcons}>
              <img className={styles.plusIcon} alt="" src="/plus.svg" />
            </div>
          </div>
          <div className={styles.proposalSteps1}>
            <div className={styles.frame}>
              <div className={styles.div3}>05</div>
            </div>
            <div className={styles.kycPayoutsParent}>
              <h1 className={styles.kycPayouts}>{`KYC & Payouts`}</h1>
              <div className={styles.createAnOnContainer}>
                <a
                  className={styles.ideas}
                  href="https://aipgf.com/kyc"
                  target="_blank"
                >
                  <span>
                    <span className={styles.ideas1}>KYC</span>
                  </span>
                </a>
                <span>
                  {" "}
                  and get paid half you payment upfront and the other half upon
                  completion. Report your milestone on same submission
                </span>
              </div>
            </div>
            <div className={styles.plusWrapper}>
              <img className={styles.plusIcon} alt="" src="/plus.svg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrantApplication;
