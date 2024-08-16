import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import styles from "./container.module.css";

export type ContainerType = {
  className?: string;
  doINeedToBuildOnNEAR?: string;
  canISubmitAnExistingProduct?: string;
  whatIfImJustBuildingOpenSour?: string;

  /** Style props */
  propAlignSelf?: CSSProperties["alignSelf"];
  propFlex?: CSSProperties["flex"];
  propMinWidth?: CSSProperties["minWidth"];
  propGap?: CSSProperties["gap"];
  propDisplay?: CSSProperties["display"];
  propGap1?: CSSProperties["gap"];
};

const Container: NextPage<ContainerType> = ({
  className = "",
  propAlignSelf,
  propFlex,
  propMinWidth,
  propGap,
  doINeedToBuildOnNEAR,
  propDisplay,
  propGap1,
  canISubmitAnExistingProduct,
  whatIfImJustBuildingOpenSour,
}) => {
  const containerStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      flex: propFlex,
      minWidth: propMinWidth,
    };
  }, [propAlignSelf, propFlex, propMinWidth]);

  const question03Style: CSSProperties = useMemo(() => {
    return {
      gap: propGap,
    };
  }, [propGap]);

  const doINeedStyle: CSSProperties = useMemo(() => {
    return {
      display: propDisplay,
    };
  }, [propDisplay]);

  const question5Style: CSSProperties = useMemo(() => {
    return {
      gap: propGap1,
    };
  }, [propGap1]);

  return (
    <div
      className={[styles.container, className].join(" ")}
      style={containerStyle}
    >
      <div className={styles.question03} style={question03Style}>
        <h1 className={styles.doINeed} style={doINeedStyle}>
          {doINeedToBuildOnNEAR}
        </h1>
        <img className={styles.plusIcon} alt="" src="/plus-4.svg" />
      </div>
      <div className={styles.question5} style={question5Style}>
        <h1 className={styles.canISubmit}>{canISubmitAnExistingProduct}</h1>
        <img className={styles.plusIcon} alt="" src="/plus-4.svg" />
      </div>
      <div className={styles.question5}>
        <h1 className={styles.canISubmit}>{whatIfImJustBuildingOpenSour}</h1>
        <img className={styles.plusIcon} alt="" src="/plus-4.svg" />
      </div>
    </div>
  );
};

export default Container;
