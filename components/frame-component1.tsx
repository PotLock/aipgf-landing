import type { NextPage } from "next";
import { useCallback } from "react";
import { Button } from "@mui/material";
import Button1 from "./button1";
import styles from "./frame-component1.module.css";

export type FrameComponent1Type = {
  className?: string;
};

const FrameComponent1: NextPage<FrameComponent1Type> = ({ className = "" }) => {
  const onButtonClick = useCallback(() => {
    window.open("https://aipgf.com/about");
  }, []);

  const onButtonClick1 = useCallback(() => {
    window.open("https://forum.aipgf.com");
  }, []);

  return (
    <section className={[styles.frameWrapper, className].join(" ")}>
      <div className={styles.frameParent}>
        <div className={styles.frameContainer}>
          <div className={styles.aiPoweredPublicGoodsFundParent}>
            <h1 className={styles.aiPoweredPublic}>
              AI /powered/ Public Goods Funding
            </h1>
            <h1 className={styles.aiPgfAProactiveContainer}>
              <span>{`AI-PGF: A Proactive Grants Program and Movement to Build towards a `}</span>
              <b>Funding AGI</b>
            </h1>
            <div className={styles.actions}>
              <Button
                className={styles.button}
                variant="contained"
                sx={{
                  textTransform: "none",
                  color: "#fff",
                  fontSize: "20",
                  background: "#0057ff",
                  borderRadius: "41px",
                  "&:hover": { background: "#0057ff" },
                  height: 68,
                }}
                onClick={onButtonClick1}
              >
                Get Funded
              </Button>
              <Button1
                button="Learn More"
                onButtonClick3={onButtonClick}
                propHeight="4.25rem"
                propWidth="9.75rem"
                buttonFlex="unset"
              />
            </div>
          </div>
        </div>
        <div className={styles.frameGroup}>
          <div className={styles.eligibilityAssesmentAgentParent}>
            <h1 className={styles.eligibilityAssesmentAgent}>
              Eligibility Assesment Agent
            </h1>
            <div className={styles.theAiWill}>
              The AI will do an assessment of the project's eligibility against
              the criteria you provide.
            </div>
          </div>
          <textarea className={styles.frameChild} rows={7} cols={24} />
          <div className={styles.frameDiv}>
            <div className={styles.frameWrapper1}>
              <div className={styles.buttonParent}>
                <button className={styles.button1}>
                  <div className={styles.container}>
                    <b className={styles.checkEligibility}>Check Eligibility</b>
                  </div>
                </button>
                <Button1
                  button="Attach files"
                  propHeight="2.313rem"
                  propWidth="6.25rem"
                  buttonFlex="unset"
                />
              </div>
            </div>
            <div className={styles.madeByParent}>
              <div className={styles.madeBy}>{`Made by `}</div>
              <div className={styles.ellipseParent}>
                <div className={styles.frameItem} />
                <img
                  className={styles.icon}
                  loading="lazy"
                  alt=""
                  src="/4@2x.png"
                />
              </div>
              <div className={styles.borisnear}>{`Boris.near `}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent1;
