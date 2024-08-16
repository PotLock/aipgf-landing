import type { NextPage } from "next";
import { useCallback } from "react";
import { Button } from "@mui/material";
import styles from "./frame-component2.module.css";

export type FrameComponent2Type = {
  className?: string;
};

const FrameComponent2: NextPage<FrameComponent2Type> = ({ className = "" }) => {
  const onButtonClick = useCallback(() => {
    window.open("https://aipgf.com/telegram");
  }, []);

  const onButtonClick1 = useCallback(() => {
    window.open("https://app.aipgf.com");
  }, []);

  return (
    <div className={[styles.frameWrapper, className].join(" ")}>
      <div className={styles.featureCardParent}>
        <div className={styles.featureCard}>
          <div className={styles.proactiveGrantsProgramParent}>
            <h1 className={styles.proactiveGrantsProgram}>
              Funding Innovation Community
            </h1>
            <Button
              className={styles.button}
              endIcon={
                <img width="18.4px" height="18.4px" src="/arrowupright.svg" />
              }
              disableElevation
              variant="outlined"
              sx={{
                textTransform: "none",
                color: "#1c1c1e",
                fontSize: "16.1",
                borderColor: "#dadadd",
                borderRadius: "48.42px",
                "&:hover": { borderColor: "#dadadd" },
                width: 97.6,
                height: 41.5,
              }}
              onClick={onButtonClick}
            >
              Join
            </Button>
          </div>
          <div className={styles.usersListWrapper}>
            <div className={styles.usersList}>
              <div className={styles.firstUserPair}>
                <img
                  className={styles.phuserCircleFillIcon}
                  alt=""
                  src="/phusercirclefill.svg"
                />
                <img
                  className={styles.phuserCircleFillIcon1}
                  alt=""
                  src="/phusercirclefill-1.svg"
                />
              </div>
              <div className={styles.firstUserPair}>
                <img
                  className={styles.phuserCircleFillIcon}
                  alt=""
                  src="/phusercirclefill-2.svg"
                />
                <img
                  className={styles.phuserCircleFillIcon1}
                  alt=""
                  src="/phusercirclefill-3.svg"
                />
                <img
                  className={styles.firstUserPairChild}
                  alt=""
                  src="/group-13080.svg"
                />
              </div>
              <div className={styles.claritycoinBagSolidParent}>
                <img
                  className={styles.claritycoinBagSolidIcon}
                  loading="lazy"
                  alt=""
                  src="/claritycoinbagsolid.svg"
                />
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/group-13078.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.component2}>
          <div className={styles.component2Inner}>
            <div className={styles.proactiveGrantsProgramGroup}>
              <h1 className={styles.proactiveGrantsProgram}>
                Grant Agent Portal + Playground
              </h1>
              <Button
                className={styles.button1}
                endIcon={
                  <img
                    width="18.4px"
                    height="18.4px"
                    src="/arrowupright-1.svg"
                  />
                }
                disableElevation
                variant="outlined"
                sx={{
                  textTransform: "none",
                  color: "#1c1c1e",
                  fontSize: "16.1",
                  borderColor: "#dadadd",
                  borderRadius: "48.42px",
                  "&:hover": { borderColor: "#dadadd" },
                  width: 122.6,
                  height: 41.5,
                }}
                onClick={onButtonClick1}
              >
                Explore
              </Button>
            </div>
          </div>
          <div className={styles.frameParent}>
            <div className={styles.frameGroup}>
              <div className={styles.frameContainer}>
                <div className={styles.ellipseParent}>
                  <div className={styles.frameItem} />
                  <div className={styles.frameItem} />
                  <div className={styles.frameItem} />
                </div>
              </div>
              <div className={styles.rectangleDiv} />
              <div className={styles.internetDataCard}>
                <div className={styles.internetDataCardInner}>
                  <div className={styles.internetDataPairParent}>
                    <div className={styles.internetDataPair}>
                      <div className={styles.internet}>Internet</div>
                    </div>
                    <div className={styles.internetDataPair1}>
                      <div className={styles.userData}>User Data</div>
                    </div>
                  </div>
                </div>
                <div className={styles.internetDataCardChild} />
              </div>
            </div>
            <div className={styles.frameDiv}>
              <img
                className={styles.frameIcon}
                alt=""
                src="/frame-1410068537@2x.png"
              />
              <img
                className={styles.frameChild1}
                loading="lazy"
                alt=""
                src="/frame-1410068541@2x.png"
              />
            </div>
            <div className={styles.frameParent1}>
              <div className={styles.frameParent2}>
                <div className={styles.frameWrapper1}>
                  <div className={styles.ellipseGroup}>
                    <div className={styles.frameChild2} />
                    <div className={styles.frameChild2} />
                    <div className={styles.frameChild2} />
                  </div>
                </div>
                <div className={styles.frameChild5} />
              </div>
              <div className={styles.sliderLabels}>
                <div className={styles.contextLength}>Context Length</div>
                <div className={styles.slider}>
                  <div className={styles.sliderComponents}>
                    <div className={styles.range} />
                    <div className={styles.thumb} />
                  </div>
                </div>
              </div>
              <div className={styles.sliderLabels}>
                <div className={styles.contextLength}>Temperature</div>
                <div className={styles.slider}>
                  <div className={styles.sliderComponents}>
                    <div className={styles.range} />
                    <div className={styles.thumb} />
                  </div>
                </div>
              </div>
              <div className={styles.sliderLabels}>
                <div className={styles.contextLength}>{`Max `}</div>
                <div className={styles.slider}>
                  <div className={styles.sliderComponents}>
                    <div className={styles.range} />
                    <div className={styles.thumb} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent2;
