import type { NextPage } from "next";
import { useCallback } from "react";
import styles from "./footer.module.css";

export type FooterType = {
  className?: string;
};

const Footer: NextPage<FooterType> = ({ className = "" }) => {
  const onSocialsIconClick = useCallback(() => {
    window.open("https://twitter.com/ai_pgf");
  }, []);

  const onVectorIconClick = useCallback(() => {
    window.open("https://aipgf.com/telegram");
  }, []);

  const onFrameContainerClick = useCallback(() => {
    window.open("https://bento.me/potlock");
  }, []);

  const onTagClick = useCallback(() => {
    window.open("https://subscribe.potlock.org");
  }, []);

  return (
    <footer className={[styles.footer, className].join(" ")}>
      <div className={styles.footer1}>
        <div className={styles.socials}>
          <img
            className={styles.socialsIcon}
            alt=""
            src="/vector-45.svg"
            onClick={onSocialsIconClick}
          />
          <img className={styles.newsletterIcon} alt="" src="/vector-46.svg" />
          <img
            className={styles.vectorIcon}
            alt=""
            src="/vector-47.svg"
            onClick={onVectorIconClick}
          />
        </div>
        <div className={styles.partOfTheParent} onClick={onFrameContainerClick}>
          <div className={styles.partOfThe}>Part of the </div>
          <img className={styles.potlockIcon} alt="" src="/-potlock-1.svg" />
          <div className={styles.openFundingStack}>open funding stack</div>
        </div>
        <div className={styles.subscribe}>
          <div className={styles.subscribeToOur}>
            Subscribe to our newsletter
          </div>
          <button className={styles.tag} onClick={onTagClick}>
            <div className={styles.button}>
              <div className={styles.text}>Subscribe</div>
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
