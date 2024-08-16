import type { NextPage } from "next";
import { useCallback } from "react";
import styles from "./company-logo.module.css";

export type CompanyLogoType = {
  className?: string;
};

const CompanyLogo: NextPage<CompanyLogoType> = ({ className = "" }) => {
  const onPotLockClick = useCallback(() => {
    window.open("https://potlock.org");
  }, []);

  const onNEARFoundation1ImageClick = useCallback(() => {
    window.open("https://near.foundation");
  }, []);

  const onWhiteLogo56effa5f1ImageClick = useCallback(() => {
    window.open("https://masa.ai");
  }, []);

  const onFrameContainerClick = useCallback(() => {
    window.open("https://gitcoin.co");
  }, []);

  return (
    <div className={[styles.companyLogo, className].join(" ")}>
      <h2 className={styles.buildingWithThe}>Building with the Best</h2>
      <div className={styles.potlockParent}>
        <img
          className={styles.potlockIcon}
          loading="lazy"
          alt=""
          src="/-potlock.svg"
          onClick={onPotLockClick}
        />
        <img
          className={styles.nearfoundation1Icon}
          loading="lazy"
          alt=""
          src="/nearfoundation-1@2x.png"
          onClick={onNEARFoundation1ImageClick}
        />
        <img
          className={styles.whiteLogo56effa5f1Icon}
          loading="lazy"
          alt=""
          src="/white-logo56effa5f-1@2x.png"
          onClick={onWhiteLogo56effa5f1ImageClick}
        />
        <div
          className={styles.c2b9f9cb98d610d7661e6GtcIconParent}
          onClick={onFrameContainerClick}
        >
          <img
            className={styles.c2b9f9cb98d610d7661e6GtcIcon}
            loading="lazy"
            alt=""
            src="/642c2b9f9cb98d610d7661e6-gtciconlight-1.svg"
          />
          <img
            className={styles.c5d029c6bb20c5f00bf8GtcLogotIcon}
            loading="lazy"
            alt=""
            src="/6433c5d029c6bb20c5f00bf8-gtclogotypedark-1.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyLogo;
