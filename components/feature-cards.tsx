import type { NextPage } from "next";
import { useCallback } from "react";
import { Button } from "@mui/material";
import styles from "./feature-cards.module.css";

export type FeatureCardsType = {
  className?: string;
};

const FeatureCards: NextPage<FeatureCardsType> = ({ className = "" }) => {
  const onButtonClick = useCallback(() => {
    window.open("https://forum.aipgf.com");
  }, []);

  const onButtonContainerClick = useCallback(() => {
    window.open("https://aipgf.com/ideas");
  }, []);

  return (
    <div className={[styles.featureCards, className].join(" ")}>
      <div className={styles.featureCardItems}>
        <div className={styles.featureCard}>
          <div className={styles.proactiveGrantsProgramParent}>
            <h1 className={styles.proactiveGrantsProgram}>
              Proactive Grants Program
            </h1>
            <Button
              className={styles.button}
              endIcon={
                <img width="18.4px" height="18.4px" src="/arrowupright-2.svg" />
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
                width: 154.6,
                height: 41.5,
              }}
              onClick={onButtonClick}
            >
              Get Funded
            </Button>
          </div>
          <div className={styles.brainIcon}>
            <div className={styles.frameParent}>
              <div className={styles.frameGroup}>
                <div className={styles.frameWrapper}>
                  <div className={styles.ellipseParent}>
                    <div className={styles.frameChild} />
                    <div className={styles.frameChild} />
                    <div className={styles.frameChild} />
                  </div>
                </div>
                <div className={styles.rectangleDiv} />
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.claritycoinBagLineParent}>
                  <div className={styles.claritycoinBagLine}>
                    <div className={styles.vectorParent}>
                      <img
                        className={styles.vectorIcon}
                        alt=""
                        src="/vector-6.svg"
                      />
                      <img className={styles.vectorIcon1} alt="" />
                    </div>
                    <div className={styles.vectorGroup}>
                      <img
                        className={styles.vectorIcon2}
                        alt=""
                        src="/vector-8.svg"
                      />
                      <img
                        className={styles.vectorIcon3}
                        alt=""
                        src="/vector-9.svg"
                      />
                    </div>
                    <div className={styles.vectorWrapper}>
                      <img
                        className={styles.vectorIcon2}
                        alt=""
                        src="/vector-8.svg"
                      />
                    </div>
                  </div>
                  <div className={styles.vectorContainer}>
                    <img
                      className={styles.vectorIcon5}
                      alt=""
                      src="/vector-11.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            className={styles.sealcheckIcon}
            loading="lazy"
            alt=""
            src="/sealcheck.svg"
          />
        </div>
        <div className={styles.featureCard1}>
          <div className={styles.featureCardInner}>
            <div className={styles.fundingAgiParent}>
              <h1 className={styles.proactiveGrantsProgram}>Funding AGI</h1>
              <div className={styles.button1} onClick={onButtonContainerClick}>
                <div className={styles.build}>Build</div>
                <div className={styles.arrowuprightWrapper}>
                  <img
                    className={styles.arrowuprightIcon}
                    alt=""
                    src="/arrowupright-3.svg"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.brain}>
            <div className={styles.brainChild} />
            <div className={styles.dataVisualization}>
              <div className={styles.dataElements}>
                <div className={styles.dataPoints}>
                  <img
                    className={styles.vectorParent}
                    alt=""
                    src="/vector-12.svg"
                  />
                  <div className={styles.frameDiv}>
                    <img
                      className={styles.vectorIcon7}
                      alt=""
                      src="/vector-13.svg"
                    />
                    <img
                      className={styles.vectorIcon7}
                      alt=""
                      src="/vector-14.svg"
                    />
                    <img
                      className={styles.vectorIcon7}
                      alt=""
                      src="/vector-15.svg"
                    />
                    <div className={styles.ellipseGroup}>
                      <div className={styles.ellipseDiv} />
                      <div className={styles.frameChild1} />
                      <div className={styles.frameChild2} />
                      <div className={styles.frameChild3} />
                      <img
                        className={styles.vectorIcon10}
                        alt=""
                        src="/vector-16.svg"
                      />
                      <img
                        className={styles.vectorIcon11}
                        alt=""
                        src="/vector-17.svg"
                      />
                      <div className={styles.frameChild4} />
                      <div className={styles.frameChild5} />
                      <img
                        className={styles.vectorIcon12}
                        alt=""
                        src="/vector-18.svg"
                      />
                      <img
                        className={styles.frameIcon}
                        alt=""
                        src="/frame-52.svg"
                      />
                      <img
                        className={styles.frameChild6}
                        alt=""
                        src="/frame-53.svg"
                      />
                      <div className={styles.vectorParent1}>
                        <img className={styles.vectorIcon13} alt="" />
                        <div className={styles.vectorParent2}>
                          <img
                            className={styles.vectorIcon14}
                            alt=""
                            src="/vector-20.svg"
                          />
                          <div className={styles.vectorParent3}>
                            <img
                              className={styles.vectorIcon15}
                              alt=""
                              src="/vector-21.svg"
                            />
                            <div className={styles.vectorParent4}>
                              <img
                                className={styles.vectorIcon16}
                                alt=""
                                src="/vector-22.svg"
                              />
                              <div className={styles.vectorParent5}>
                                <img
                                  className={styles.vectorIcon17}
                                  alt=""
                                  src="/vector-23.svg"
                                />
                                <img
                                  className={styles.vectorIcon18}
                                  alt=""
                                  src="/vector-24.svg"
                                />
                                <img
                                  className={styles.vectorIcon19}
                                  alt=""
                                  src="/vector-25.svg"
                                />
                                <img
                                  className={styles.vectorIcon20}
                                  alt=""
                                  src="/vector-26.svg"
                                />
                                <img
                                  className={styles.vectorIcon20}
                                  alt=""
                                  src="/vector-27.svg"
                                />
                              </div>
                            </div>
                          </div>
                          <div className={styles.vectorParent6}>
                            <img
                              className={styles.vectorIcon22}
                              alt=""
                              src="/vector-28.svg"
                            />
                            <img
                              className={styles.vectorParent}
                              alt=""
                              src="/group-116.svg"
                            />
                            <img
                              className={styles.vectorIcon23}
                              alt=""
                              src="/vector-29.svg"
                            />
                          </div>
                          <div className={styles.vectorParent7}>
                            <img
                              className={styles.vectorIcon24}
                              alt=""
                              src="/vector-30.svg"
                            />
                            <img
                              className={styles.vectorIcon25}
                              alt=""
                              src="/vector-31.svg"
                            />
                            <img
                              className={styles.vectorIcon26}
                              alt=""
                              src="/vector-32.svg"
                            />
                            <img
                              className={styles.vectorParent}
                              alt=""
                              src="/group-118.svg"
                            />
                            <img
                              className={styles.vectorIcon27}
                              alt=""
                              src="/vector-33.svg"
                            />
                            <div className={styles.vectorParent8}>
                              <img
                                className={styles.vectorIcon28}
                                alt=""
                                src="/vector-34.svg"
                              />
                              <img
                                className={styles.vectorIcon29}
                                alt=""
                                src="/vector-35.svg"
                              />
                            </div>
                          </div>
                          <div className={styles.vectorParent9}>
                            <img
                              className={styles.vectorIcon30}
                              alt=""
                              src="/vector-36.svg"
                            />
                            <img
                              className={styles.vectorParent}
                              alt=""
                              src="/group-117.svg"
                            />
                            <img
                              className={styles.vectorIcon31}
                              alt=""
                              src="/vector-37.svg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.dataPoints}>
                  <img
                    className={styles.vectorIcon32}
                    alt=""
                    src="/vector-38.svg"
                  />
                  <div className={styles.vectorParent11}>
                    <img
                      className={styles.vectorIcon33}
                      alt=""
                      src="/vector-13.svg"
                    />
                    <img
                      className={styles.vectorIcon33}
                      alt=""
                      src="/vector-14.svg"
                    />
                    <img
                      className={styles.vectorIcon33}
                      alt=""
                      src="/vector-15.svg"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.dataVisualizationInner}>
                <div className={styles.frameParent1}>
                  <div className={styles.frameParent2}>
                    <div className={styles.vectorParent12}>
                      <img className={styles.vectorIcon36} alt="" />
                      <img
                        className={styles.vectorIcon37}
                        alt=""
                        src="/vector-43.svg"
                      />
                      <div className={styles.frameChild9} />
                    </div>
                    <div className={styles.vectorParent13}>
                      <img
                        className={styles.vectorIcon38}
                        alt=""
                        src="/vector-44.svg"
                      />
                      <div className={styles.frameChild9} />
                    </div>
                  </div>
                  <div className={styles.frameWrapper1}>
                    <div className={styles.frameParent3}>
                      <div className={styles.ellipseContainer}>
                        <div className={styles.frameChild11} />
                        <div className={styles.frameChild12} />
                      </div>
                      <div className={styles.ellipseParent1}>
                        <div className={styles.frameChild11} />
                        <div className={styles.frameChild14} />
                      </div>
                    </div>
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

export default FeatureCards;
