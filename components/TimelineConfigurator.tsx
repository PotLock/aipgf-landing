import { NextPage } from "next";
import { useState, useMemo } from "react";

interface TimelineConfiguratorProps {
    timeline: any;
    disabled?: boolean;
    setTimeline: (newTimeline: any) => void;
}

const TimelineConfigurator: NextPage<TimelineConfiguratorProps> = ({ timeline, disabled, setTimeline }) => {
    const stepsArray = [1, 2, 3];
    
    const TimelineStatusOptions = [
    {
        label: "Accepting Submissions",
        value: { status: "ACCEPTING_SUBMISSIONS" },
    },
    {
        label: "Evaluation",
        value: {
        status: "EVALUATION",
        },
    },
    {
        label: "Proposal Selected",
        value: {
        status: "PROPOSAL_SELECTED",
        },
    },
    {
        label: "Cancelled",
        value: {
        status: "CANCELLED",
        },
    },
    ];
    
    const selectedTimelineStatusIndex = useMemo(
    () =>
        TimelineStatusOptions.findIndex((i) => i.value.status === timeline.status),
    [timeline],
    );
    
    const TimelineItems = ({ title, children, value, values }:any) => {
        const indexOfCurrentItem = TimelineStatusOptions.findIndex((i) =>
            Array.isArray(values)
            ? values.includes(i.value.status)
            : value === i.value.status,
        );
        let color = "transparent";
        let statusIndex = selectedTimelineStatusIndex;
        // index 2,3 is of decision
        if (selectedTimelineStatusIndex === 3) {
            statusIndex = 2;
        }
        if (statusIndex === indexOfCurrentItem) {
            color = "#FEF6EE";
        }
        if (statusIndex > indexOfCurrentItem) {
            color = "#EEFEF0";
        }
        // cancelled
        if (
            statusIndex === 2 &&
            (values ?? []).includes("CANCELLED") &&
            timeline.status === "CANCELLED"
        ) {
            color = "#F4F4F4";
        }
    
        return (
            <div
            className="p-3 flex flex-col gap-2 rounded-md"
            style={{
                backgroundColor: color,
            }}
            >
            <div className="text-sm font-bold">{title}</div>
            <div className="text-sm text-gray-200 text-opacity-80">{children}</div>
            </div>
        );
    };
    
    const RadioButton = ({ value, isChecked, label }: { value: any, isChecked: any, label: any }) => {
        return (
            <div className="flex gap-2 items-center">
                <input
                className="border-[1px] border-solid border-aipgf-geyser rounded-sm"
                type="radio"
                value={value}
                checked={isChecked}
                disabled={true}
                />
                <label className="text-sm text-black">{label}</label>
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-2">
            {!disabled && (
                <div className="flex flex-col gap-2">
                    <h3 className="mb-0">Timeline</h3>
                </div>
            )}
            <div className="flex gap-3 mt-2">
                <div className="flex flex-col mt-4">
                    {stepsArray.map((_, index) => {
                    const indexOfCurrentItem = index;
                    let color = "";
                    let statusIndex = selectedTimelineStatusIndex;
                    // index 2,3 is of decision
                    if (selectedTimelineStatusIndex === 3) {
                        statusIndex = 2;
                    }
                    const current = statusIndex === indexOfCurrentItem;
                    const completed =
                        statusIndex > indexOfCurrentItem ||
                        timeline.status === "PROPOSAL_SELECTED" ||
                        timeline.status === "CANCELLED";
                    return (
                        <div key={index} className="flex flex-col items-center gap-1">
                            <div
                                className={
                                "w-4 h-4 rounded-full " +
                                (completed && " bg-green-500 ") +
                                (current && " bg-yellow-500 ")+
                                (!completed && !current && " border-[1px] border-solid border-aipgf-geyser ")
                                }
                            >
                                {completed && (
                                <div
                                    className="flex justify-center items-center"
                                    style={{ height: "110%" }}
                                >
                                    <img width={15} src="/assets/icon/bi-check.svg" alt="check" />
                                </div>
                                )}
                            </div>

                            {index !== stepsArray.length - 1 && (
                                <div
                                className={
                                    "w-[3px] h-[70px] " +
                                    (completed && " bg-green-500 ") +
                                    (current && " bg-yellow-500 ") +
                                    (!completed && !current && " bg-aipgf-geyser ")
                                }
                                ></div>
                            )}
                            
                        </div>
                    );
                    })}
                </div>
                <div className="flex flex-col gap-3">
                    <TimelineItems
                        title="1) Accepting Submissions"
                        value="ACCEPTING_SUBMISSIONS"
                    >
                        <div>During this stage, the RFP is still open for submissions.</div>
                    </TimelineItems>
                    <TimelineItems
                        title="2) Evaluation"
                        value="EVALUATION"
                    >
                        <div>
                            This RFP is closed for submissions. All submitted proposals are
                            under review.
                        </div>
                    </TimelineItems>
                    <TimelineItems
                        title="3) Decision"
                        values={[
                            "PROPOSAL_SELECTED",
                            "CANCELLED",
                        ]}
                    >
                        <div className="flex flex-col gap-2">
                            <div>Sponsor makes a final decision:</div>
                            <RadioButton
                                value="PROPOSAL_SELECTED"
                                isChecked={timeline.status === "PROPOSAL_SELECTED"}
                                label="Proposal Selected"
                            />
                            <RadioButton
                                value="CANCELLED"
                                isChecked={timeline.status === "CANCELLED"}
                                label="RFP Cancelled"
                            />
                        </div>
                    </TimelineItems>
                </div>
            </div>
        </div>
    );
    
}

export default TimelineConfigurator;