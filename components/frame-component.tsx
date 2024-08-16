import type { NextPage } from "next";
import styles from "./frame-component.module.css";

export type FrameComponentType = {
  className?: string;
  rFPProposalGenerator?: string;
  prop?: string;
};

const FrameComponent: NextPage<FrameComponentType> = ({
  className = "",
  rFPProposalGenerator,
  prop,
}) => {
  return (
    <div className={[styles.frameParent, className].join(" ")}>
      <div className={styles.rfpProposalGeneratorWrapper}>
        <h1 className={styles.rfpProposalGenerator}>{rFPProposalGenerator}</h1>
      </div>
      <div className={styles.loreumIpsumDolorLoreumIpsuWrapper}>
        <div
          className={styles.loreumIpsumDolor}
        >{`Loreum Ipsum Dolor  Loreum Ipsum Dolor  Loreum Ipsum Dolor  Loreum Ipsum Dolor  Loreum Ipsum Dolor  Loreum Ipsum Dolor  `}</div>
      </div>
      <div className={styles.byParent}>
        <b className={styles.by}>{`By `}</b>
        <div className={styles.ellipseParent}>
          <div className={styles.frameChild} />
          <img className={styles.icon} alt="" src={prop} />
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
  );
};

export default FrameComponent;
