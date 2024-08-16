import type { NextPage } from "next";
import Container from "./container";
import styles from "./frame-component5.module.css";

export type FrameComponent5Type = {
  className?: string;
};

const FrameComponent5: NextPage<FrameComponent5Type> = ({ className = "" }) => {
  return (
    <section className={[styles.frameWrapper, className].join(" ")}>
      <div className={styles.headingSubheadingParent}>
        <div className={styles.headingSubheading}>
          <div className={styles.frequentlyAskedQuestions}>
            Frequently Asked Questions
          </div>
        </div>
        <div className={styles.frameParent}>
          <div className={styles.question01Parent}>
            <div className={styles.question01}>
              <div className={styles.whatIfImBuildingClosedSoParent}>
                <h1 className={styles.whatIfIm}>
                  What if I’m building closed source?
                </h1>
                <div className={styles.weAreOnly}>
                  We are only funding open source builders.
                </div>
              </div>
              <img className={styles.minusIcon} alt="" src="/minus.svg" />
            </div>
            <Container
              doINeedToBuildOnNEAR="Do I need to build on NEAR?"
              canISubmitAnExistingProduct="Can I submit an existing product?"
              whatIfImJustBuildingOpenSour="What if I’m just building open source AI?"
            />
          </div>
          <Container
            propAlignSelf="unset"
            propFlex="1"
            propMinWidth="26rem"
            propGap="67px"
            doINeedToBuildOnNEAR="How much funds are you giving to builders?"
            propDisplay="inline-block"
            propGap1="76px"
            canISubmitAnExistingProduct="Where can I get feedback for my proposal?"
            whatIfImJustBuildingOpenSour="Where can I get ideas to build?"
          />
        </div>
      </div>
    </section>
  );
};

export default FrameComponent5;
