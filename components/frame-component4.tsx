import type { NextPage } from "next";
import { useCallback } from "react";
import Button1 from "./button1";
import FrameComponent from "./frame-component";
import styles from "./frame-component4.module.css";

export type FrameComponent4Type = {
  className?: string;
};

const FrameComponent4: NextPage<FrameComponent4Type> = ({ className = "" }) => {
  const onButtonClick = useCallback(() => {
    window.open("https://app.aipgf.com");
  }, []);

  return (
    <section className={[styles.frameWrapper, className].join(" ")}>
      <div className={styles.headingSubheadingParent}>
        <div className={styles.headingSubheading}>
          <div className={styles.fundingAgentsWrapper}>
            <div className={styles.fundingAgents}>Funding Agents</div>
          </div>
          <div className={styles.exploreFundingAgentsDesigneWrapper}>
            <h3
              className={styles.exploreFundingAgents}
            >{`Explore   funding agents designed to streamline grant workflows `}</h3>
          </div>
          <Button1 button="Explore" onButtonClick3={onButtonClick} />
        </div>
        <div className={styles.agentCardParent}>
          <div className={styles.agentCard}>
            <div className={styles.agentLogo}>
              <div className={styles.container}>
                <div className={styles.logo}>
                  <div className={styles.logo}>
                    <img
                      className={styles.monochromeRegularpngIcon}
                      loading="lazy"
                      alt=""
                      src="/monochrome-regularpng.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <FrameComponent
              rFPProposalGenerator="RFP Proposal Generator"
              prop="/4-1@2x.png"
            />
          </div>
          <div className={styles.agentCard}>
            <div className={styles.agentLogo}>
              <div className={styles.container}>
                <img className={styles.logo} />
              </div>
            </div>
            <FrameComponent
              rFPProposalGenerator="Project Reccomendation"
              prop="/4-2@2x.png"
            />
          </div>
          <div className={styles.agentCard2}>
            <div className={styles.agentCardInner}>
              <div className={styles.copyGivingParent}>
                <img
                  className={styles.copyGivingIcon}
                  loading="lazy"
                  alt=""
                  src="/copy-giving@2x.png"
                />
                <div className={styles.loremIpsumDolorSitAmetConParent}>
                  <h1 className={styles.loremIpsumDolor}>CopyGiving</h1>
                  <div
                    className={styles.loreumIpsumDolor}
                  >{`Loreum Ipsum Dolor  Loreum Ipsum Dolor  Loreum Ipsum Dolor  Loreum Ipsum Dolor  Loreum Ipsum Dolor  Loreum Ipsum Dolor  `}</div>
                </div>
              </div>
            </div>
            <div className={styles.byParent}>
              <b className={styles.by}>{`By `}</b>
              <div className={styles.ellipseParent}>
                <div className={styles.frameChild} />
                <img className={styles.icon} alt="" src="/4-3@2x.png" />
              </div>
              <div className={styles.borisnear2Container}>
                <span className={styles.borisnear2Container1}>
                  <b>{`Boris.near `}</b>
                  <span className={styles.span}>|</span>
                  <b>{` `}</b>
                  <span className={styles.span}>2 hours ago</span>
                </span>
              </div>
              <div className={styles.users}>
                <div className={styles.kUsers}>
                  <div className={styles.users1}>
                    <div className={styles.projectTag}>Project Tag</div>
                  </div>
                </div>
                <div className={styles.kUsers1}>
                  <div className={styles.users1}>
                    <div className={styles.projectTag}>Project Tag</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent4;
