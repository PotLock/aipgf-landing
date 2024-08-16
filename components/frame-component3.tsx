import type { NextPage } from "next";
import { useState, useCallback } from "react";
import { TextField, Icon } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Button1 from "./button1";
import Tag from "./tag";
import styles from "./frame-component3.module.css";

export type FrameComponent3Type = {
  className?: string;
};

const FrameComponent3: NextPage<FrameComponent3Type> = ({ className = "" }) => {
  const [
    authorDetailsDateTimePickerValue,
    setAuthorDetailsDateTimePickerValue,
  ] = useState(new Date("2024-04-15"));

  const onButtonClick = useCallback(() => {
    window.open("https://forum.aipgf.com");
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <section className={[styles.contentWrapper, className].join(" ")}>
        <div className={styles.content}>
          <div className={styles.headingSubheading}>
            <div className={styles.titleWrapperWrapper}>
              <div className={styles.titleWrapper}>
                <div className={styles.activeRfps}>Active RFPs</div>
                <div className={styles.description}>
                  <h3 className={styles.discoverFundingOpportunities}>
                    Discover funding opportunities currently available for
                    innovative projects.
                  </h3>
                </div>
              </div>
            </div>
            <Button1
              button="View All"
              onButtonClick3={onButtonClick}
              propHeight="4.25rem"
              propWidth="9.75rem"
              buttonFlex="unset"
            />
          </div>
          <div className={styles.rFPList}>
            <div className={styles.rpfsClosingSoon}>
              <div className={styles.background}>
                <div className={styles.avatars}>
                  <img
                    className={styles.memojiMale14}
                    loading="lazy"
                    alt=""
                    src="/memoji--male-14@2x.png"
                  />
                </div>
                <div className={styles.contentWrappers}>
                  <div className={styles.innerContentWrappers}>
                    <div className={styles.title}>
                      <h2
                        className={styles.loremIpsumDolor}
                      >{`Lorem ipsum dolor sit amet consectetur. `}</h2>
                      <Tag
                        propBackgroundColor="#b7b7b7"
                        propWidth="5.125rem"
                        x="/icon.svg"
                        cancel="Bounty"
                        propFontWeight="unset"
                        propColor="#24292f"
                      />
                    </div>
                    <div className={styles.link}>
                      <div
                        className={styles.loremIpsumDolor1}
                      >{`Lorem ipsum dolor sit amet consectetur. Neque quam mattis in non condimentum. Mauris morbi volutpat ac vitae curabitur purus enim pellentesque. `}</div>
                    </div>
                  </div>
                </div>
                <div className={styles.submissionInfo}>
                  <div className={styles.container}>
                    <div className={styles.button}>
                      <div className={styles.icon}>
                        <img
                          className={styles.pencilsimplelineIcon}
                          alt=""
                          src="/icon-1.svg"
                        />
                      </div>
                      <div className={styles.voteCount}>
                        <div className={styles.proposals}>3 Proposals</div>
                      </div>
                    </div>
                    <div className={styles.container1}>
                      <div className={styles.button1}>
                        <div className={styles.icon}>
                          <img
                            className={styles.pencilsimplelineIcon}
                            alt=""
                            src="/icon-2.svg"
                          />
                        </div>
                        <div className={styles.voteCount}>
                          <div className={styles.replies}>3 replies</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.editInfo}>
                  <div className={styles.editContent}>
                    <div className={styles.submissionDeadlineWrapper}>
                      <div className={styles.submissionDeadline}>
                        Submission Deadline
                      </div>
                    </div>
                    <div className={styles.descriptionWrappers}>
                      <div className={styles.paragraph}>April 15, 2024</div>
                    </div>
                    <button className={styles.tag}>
                      <div className={styles.icon4}>
                        <img
                          className={styles.pencilsimplelineIcon}
                          alt=""
                          src="/pencilsimpleline.svg"
                        />
                        <div className={styles.icon5} />
                      </div>
                      <div className={styles.text}>Draft</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.rpfsClosingSoon}>
              <div className={styles.background}>
                <div className={styles.div}>
                  <img
                    className={styles.memojiMale14}
                    alt=""
                    src="/memoji--male-14@2x.png"
                  />
                </div>
                <div className={styles.backgroundInner}>
                  <div className={styles.innerContentWrappers}>
                    <div className={styles.title1}>
                      <h2
                        className={styles.loremIpsumDolor2}
                      >{`Lorem ipsum dolor sit amet consectetur. `}</h2>
                      <div className={styles.tag1}>
                        <div className={styles.icon4}>
                          <img
                            className={styles.solarcrownBrokenIcon}
                            alt=""
                            src="/solarcrownbroken.svg"
                          />
                          <div className={styles.icon5} />
                        </div>
                        <div className={styles.text1}>MVP</div>
                      </div>
                    </div>
                    <div className={styles.link}>
                      <div
                        className={styles.loremIpsumDolor1}
                      >{`Lorem ipsum dolor sit amet consectetur. Neque quam mattis in non condimentum. Mauris morbi volutpat ac vitae curabitur purus enim pellentesque. `}</div>
                    </div>
                  </div>
                </div>
                <div className={styles.containerWrapper}>
                  <div className={styles.container}>
                    <div className={styles.button}>
                      <div className={styles.icon}>
                        <img
                          className={styles.pencilsimplelineIcon}
                          alt=""
                          src="/icon-1.svg"
                        />
                      </div>
                      <div className={styles.voteCount}>
                        <div className={styles.proposals}>3 Proposals</div>
                      </div>
                    </div>
                    <div className={styles.container1}>
                      <div className={styles.button1}>
                        <div className={styles.icon}>
                          <img
                            className={styles.pencilsimplelineIcon}
                            alt=""
                            src="/icon-2.svg"
                          />
                        </div>
                        <div className={styles.voteCount}>
                          <div className={styles.replies}>3 replies</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.frameParent}>
                  <div className={styles.frameGroup}>
                    <div className={styles.submissionDeadlineWrapper}>
                      <div className={styles.submissionDeadline}>
                        Submission Deadline
                      </div>
                    </div>
                    <div className={styles.descriptionWrappers}>
                      <div className={styles.paragraph}>April 15, 2024</div>
                    </div>
                    <button className={styles.tag}>
                      <div className={styles.icon4}>
                        <img
                          className={styles.pencilsimplelineIcon}
                          alt=""
                          src="/pencilsimpleline.svg"
                        />
                        <div className={styles.icon5} />
                      </div>
                      <div className={styles.text}>Draft</div>
                    </button>
                  </div>
                  <div className={styles.evaluationWrapper}>
                    <div className={styles.tag3}>
                      <img
                        className={styles.spinnerIcon}
                        alt=""
                        src="/spinner.svg"
                      />
                      <div className={styles.evaluation}>Evaluation</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.rpfsClosingSoon2}>
              <div className={styles.background2}>
                <div className={styles.div1}>
                  <img
                    className={styles.memojiMale14}
                    alt=""
                    src="/memoji--male-14-2@2x.png"
                  />
                </div>
                <div className={styles.backgroundChild}>
                  <div className={styles.innerContentWrappers}>
                    <div className={styles.title1}>
                      <h2
                        className={styles.loremIpsumDolor2}
                      >{`Lorem ipsum dolor sit amet consectetur. `}</h2>
                      <div className={styles.tag1}>
                        <div className={styles.icon4}>
                          <img
                            className={styles.solarcrownBrokenIcon}
                            alt=""
                            src="/solarcrownbroken.svg"
                          />
                          <div className={styles.icon5} />
                        </div>
                        <div className={styles.text1}>MVP</div>
                      </div>
                    </div>
                    <div className={styles.linkParent}>
                      <div className={styles.link2}>
                        <div
                          className={styles.loremIpsumDolor1}
                        >{`Lorem ipsum dolor sit amet consectetur. Neque quam mattis in non condimentum. Mauris morbi volutpat ac vitae curabitur purus enim pellentesque. `}</div>
                      </div>
                      <div className={styles.container4}>
                        <div className={styles.button}>
                          <div className={styles.icon}>
                            <img
                              className={styles.pencilsimplelineIcon}
                              alt=""
                              src="/icon-1.svg"
                            />
                          </div>
                          <div className={styles.voteCount}>
                            <div className={styles.proposals}>3 Proposals</div>
                          </div>
                        </div>
                        <div className={styles.container1}>
                          <div className={styles.button1}>
                            <div className={styles.icon}>
                              <img
                                className={styles.pencilsimplelineIcon}
                                alt=""
                                src="/icon-2.svg"
                              />
                            </div>
                            <div className={styles.voteCount}>
                              <div className={styles.replies}>3 replies</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.frameDiv}>
                  <div className={styles.frameContainer}>
                    <div className={styles.frameParent1}>
                      <div className={styles.frameParent2}>
                        <div className={styles.submissionDeadlineFrame}>
                          <div className={styles.submissionDeadline}>
                            Submission Deadline
                          </div>
                        </div>
                        <div className={styles.authorDetails}>
                          <DatePicker
                            value={authorDetailsDateTimePickerValue}
                            onChange={(newValue: any) => {
                              setAuthorDetailsDateTimePickerValue(newValue);
                            }}
                            sx={{
                              fieldset: {
                                borderColor: "transparent",
                                borderTopWidth: 1,
                                borderRightWidth: 1,
                                borderBottomWidth: 1,
                                borderLeftWidth: 1,
                              },
                              "&:hover": {
                                fieldset: { borderColor: "transparent" },
                                ".MuiOutlinedInput-notchedOutline": {
                                  borderColor: "transparent",
                                },
                              },
                              "& input::placeholder": {
                                textColor: "#151515",
                                fontSize: 12,
                              },
                              input: {
                                color: "#151515",
                                fontSize: 12,
                                textAlign: "left",
                                fontWeight: "600",
                              },
                              "& .MuiInputBase-root": {
                                height: 14,
                                gap: "8px",
                                flexDirection: { flexDirection: "row" },
                              },
                            }}
                            slotProps={{
                              textField: {
                                size: "medium",
                                fullWidth: true,
                                required: false,
                                autoFocus: false,
                                error: false,
                              },
                              openPickerIcon: {
                                component: () => <></>,
                              },
                            }}
                          />
                        </div>
                      </div>
                      <Tag x="/x.svg" cancel="Cancel" />
                    </div>
                    <div className={styles.tag5}>
                      <div className={styles.icon20}>
                        <img
                          className={styles.spinnerIcon1}
                          alt=""
                          src="/spinner.svg"
                        />
                      </div>
                      <div className={styles.evaluation}>Evaluation</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LocalizationProvider>
  );
};

export default FrameComponent3;
