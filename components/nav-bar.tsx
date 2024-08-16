import type { NextPage } from "next";
import styles from "./nav-bar.module.css";

export type NavBarType = {
  className?: string;
};

const NavBar: NextPage<NavBarType> = ({ className = "" }) => {
  return (
    <header className={[styles.navBar, className].join(" ")}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.link}>
            <div className={styles.logoParent}>
              <div className={styles.logo1}>
                <div className={styles.vectorParent}>
                  <img className={styles.vectorIcon} alt="" src="/vector.svg" />
                  <div className={styles.frameChild} />
                  <img
                    className={styles.vectorIcon1}
                    alt=""
                    src="/vector-1.svg"
                  />
                  <img
                    className={styles.vectorIcon2}
                    alt=""
                    src="/vector-2.svg"
                  />
                  <img
                    className={styles.vectorIcon3}
                    alt=""
                    src="/vector-3.svg"
                  />
                  <img
                    className={styles.vectorIcon4}
                    alt=""
                    src="/vector-4.svg"
                  />
                  <img
                    className={styles.vectorIcon5}
                    alt=""
                    src="/vector-5.svg"
                  />
                </div>
              </div>
              <a className={styles.aiPgf}>AI-PGF</a>
            </div>
          </div>
        </div>
        <nav className={styles.proposalsParent}>
          <a className={styles.proposals}>Proposals</a>
          <nav className={styles.navigation}>
            <div className={styles.rFPsIdeas}>
              <a className={styles.rfps}>RFPs</a>
            </div>
            <a className={styles.projects}>Projects</a>
            <div className={styles.rFPsIdeas1}>
              <a className={styles.about}>About</a>
            </div>
            <a className={styles.ideas}>Ideas</a>
          </nav>
        </nav>
        <div className={styles.cta}>
          <div className={styles.list}>
            <div className={styles.buttonWrapper}>
              <div className={styles.button}>
                <div className={styles.rFPsIdeas}>
                  <img className={styles.svgIcon} alt="" src="/svg.svg" />
                </div>
                <div className={styles.container1}>
                  <div className={styles.submitProposal}>Submit Proposal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
