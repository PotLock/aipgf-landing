import { useCallback, useEffect, useMemo, useState } from "react";

const TimeLine = ({proposalStatusOptions,timeline}: {proposalStatusOptions: any[], timeline: any}) => {
    const [paymentHashes, setPaymentHashes] = useState([""]);
    const [updatedProposalStatus, setUpdatedProposalStatus] = useState<any>({});
    const stepsArray = [1,2,3,4,5];
    const proposalStatus = useCallback(
        () =>
            proposalStatusOptions.find(
                (i) => i.value.status === timeline.status,
            ),
        [timeline],
    );
    
    useEffect(() => {
        setUpdatedProposalStatus({
            ...proposalStatus(),
            value: { ...proposalStatus()?.value, ...timeline },
        });
        //console.log('updatedProposalStatus',updatedProposalStatus)
    }, [proposalStatus,timeline]);

    //console.log('proposalStatus',proposalStatus())

    const selectedStatusIndex = useMemo(
        () =>
            proposalStatusOptions.findIndex((i) => {
                return proposalStatus()?.value?.status === i.value.status;
            }),
        [proposalStatus],
    );

    const TimelineItems = ({ title, children, value, values }: { title: string, children: any, value: string, values?: string[] }) => {
        const indexOfCurrentItem = proposalStatusOptions.findIndex((i) =>
            Array.isArray(values)
            ? values.includes(i.value.status)
            : value === i.value.status,
        );
        let color = "transparent";
        let statusIndex = selectedStatusIndex;

        // index 2,3,4,5  is of decision
        if (selectedStatusIndex === 3 || selectedStatusIndex === 2) {
            statusIndex = 2;
        }
        if (statusIndex === indexOfCurrentItem) {
            color = "#FEF6EE";
        }
        if (
            statusIndex > indexOfCurrentItem ||
            timeline?.status === "FUNDED"
        ) {
            color = "#EEFEF0";
        }
        // reject
        if (statusIndex === 4 && indexOfCurrentItem === 2) {
            color = "#FF7F7F";
        }
        // cancelled
        if (statusIndex === 5 && indexOfCurrentItem === 2) {
            color = "#F4F4F4";
        }

        return (
            <div
                className="p-2 rounded-3"
                style={{
                backgroundColor: color,
                }}
            >
                <div className="h6 text-black"> {title}</div>
                <div className="text-sm">{children}</div>
            </div>
        );
    };

    const CheckBox = ({ value, isChecked, label, disabled, onClick }: { value: any, isChecked: any, label: any, disabled: any, onClick: any }) => {
        return (
            <div className="flex gap-2 items-center">
                <input
                    className="border-[1px] border-solid border-aipgf-geyser rounded-sm"
                    type="checkbox"
                    value={value}
                    checked={isChecked}
                    disabled={disabled}
                    onChange={(e) => onClick(e.target.checked)}
                />
                <label style={{ width: "90%" }} className="text-sm text-black">
                {label}
                </label>
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
            <div className="flex gap-3 mt-2">
                <div className="flex flex-col gap-2">
                    {stepsArray.map((_, index) => {
                
                        const indexOfCurrentItem = index;
                        let color = "";
                        let statusIndex = selectedStatusIndex;
                        // index 2,3,4 is of decision
                        if (
                            selectedStatusIndex === 3 ||
                            selectedStatusIndex === 2 ||
                            selectedStatusIndex === 4 ||
                            selectedStatusIndex === 5
                        ) {
                            statusIndex = 2;
                        }
                        if (selectedStatusIndex === 6) {
                            statusIndex = 3;
                        }
                        const current = statusIndex === indexOfCurrentItem;
                        const completed =
                            statusIndex > indexOfCurrentItem ||
                            timeline?.status ==="FUNDED";
                        return (
                            <div key={index} className="flex flex-col items-center gap-1">
                                <div
                                    className={
                                    "w-6 h-6 rounded-full " +
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
                                        "w-[3px] h-[110px] " +
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
                title="1) Draft"
                value={'DRAFT'}
                >
                <div>
                    Once an author submits a proposal, it is in draft mode
                    and open for community comments. The author can still
                    make changes to the proposal during this stage and
                    submit it for official review when ready.
                </div>
                </TimelineItems>
                <TimelineItems
                title="2) Review"
                value={'REVIEW'}
                >
                <div className="flex flex-col gap-2">
                    Sponsors who agree to consider the proposal may
                    request attestations from work groups.
                    <CheckBox
                    value=""
                    disabled={selectedStatusIndex !== 1}
                    onClick={(value: any) =>
                        setUpdatedProposalStatus((prevState: any) => ({
                        ...prevState,
                        value: {
                            ...prevState.value,
                            sponsor_requested_review: value,
                        },
                        }))
                    }
                    label="Sponsor provides feedback or requests reviews"
                    isChecked={
                        updatedProposalStatus?.value?.sponsor_requested_review || proposalStatus()?.value
                        .sponsor_requested_review
                    }
                    />
                    <CheckBox
                    value=""
                    disabled={selectedStatusIndex !== 1}
                    label="Reviewer completes attestations (Optional)"
                    onClick={(value: any) =>
                        setUpdatedProposalStatus((prevState: any) => ({
                        ...prevState,
                        value: {
                            ...prevState.value,
                            reviewer_completed_attestation: value,
                        },
                        }))
                    }
                    isChecked={
                        updatedProposalStatus?.value?.reviewer_completed_attestation || proposalStatus()?.value
                        .reviewer_completed_attestation
                    }
                    />
                </div>
                </TimelineItems>
                <TimelineItems
                title="3) Decision"
                value={''}
                values={[
                    'APPROVED',
                    'APPROVED_CONDITIONALLY',
                    'REJECTED',
                ]}
                >
                <div className="flex flex-col gap-2">
                    <div>Sponsor makes a final decision:</div>
                    <RadioButton
                        value=""
                        label={<div className="fw-bold">Approved</div>}
                        isChecked={
                            updatedProposalStatus?.value?.status ||
                            proposalStatus()?.value?.status ===
                            'APPROVED' ||
                            updatedProposalStatus?.value?.status|| 
                            proposalStatus()?.value?.status ===
                            'PAYMENT_PROCESSING' ||
                            updatedProposalStatus?.value?.status ||
                            proposalStatus()?.value?.status ===
                            'FUNDED'
                        }
                    />
                    <RadioButton
                    value=""
                    label={
                        <>
                        <div className="font-bold">
                            Approved - Conditional{" "}
                        </div>
                        <span>
                            Requires follow up from recipient. Moderators
                            will provide further details.
                        </span>
                        </>
                    }
                    isChecked={
                        updatedProposalStatus?.value?.status ===
                        'APPROVED_CONDITIONALLY' ||
                        proposalStatus()?.value?.status ===
                        'APPROVED_CONDITIONALLY'
                    }
                    />
                    <RadioButton
                    value="Reject"
                    label={<div className="font-bold">Rejected</div>}
                    isChecked={
                        updatedProposalStatus?.value?.status ===
                        'REJECTED' ||
                        proposalStatus()?.value?.status ===
                        'REJECTED'
                    }
                    />
                    <RadioButton
                    value="Canceled"
                    label={<div className="font-bold">Canceled</div>}
                    isChecked={
                        updatedProposalStatus?.value?.status ===
                        'CANCELED' ||
                        proposalStatus()?.value?.status ===
                        'CANCELED'
                    }
                    />
                </div>
                </TimelineItems>
                <TimelineItems
                title="4) Payment Processing"
                value={'PAYMENT_PROCESSING'}
                >
                <div className="flex flex-col gap-2">
                    <CheckBox
                    value={proposalStatus()?.value?.kyc_verified}
                    label="Sponsor verifies KYC/KYB"
                    disabled={selectedStatusIndex !== 6}
                    onClick={(value: any) =>
                        setUpdatedProposalStatus((prevState: any) => ({
                        ...prevState,
                        value: {
                            ...prevState.value,
                            kyc_verified: value,
                        },
                        }))
                    }
                    isChecked={updatedProposalStatus?.value?.kyc_verified || proposalStatus()?.value?.kyc_verified}
                    />
                    <CheckBox
                    value={
                        updatedProposalStatus?.value?.test_transaction_sent || proposalStatus()?.value?.test_transaction_sent
                    }
                    disabled={selectedStatusIndex !== 6}
                    label="Sponsor confirmed sponsorship and shared funding steps with recipient"
                    onClick={(value: any) =>
                        setUpdatedProposalStatus((prevState: any) => ({
                        ...prevState,
                        value: {
                            ...prevState.value,
                            test_transaction_sent: value,
                        },
                        }))
                    }
                    isChecked={
                        updatedProposalStatus?.value?.test_transaction_sent || proposalStatus()?.value?.test_transaction_sent
                    }
                    />
                </div>
                </TimelineItems>
                <TimelineItems
                title="5) Funded"
                value={'FUNDED'}
                >
                <div className="flex flex-col gap-2">
                    {paymentHashes?.length > 1 ? (
                    paymentHashes.slice(0, -1).map((link, index) => (
                        <a
                        key={index}
                        href={link}
                        className="underline"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        Payment Link
                        <i className="bi bi-arrow-up-right"></i>
                        </a>
                    ))
                    ) : updatedProposalStatus?.value?.payouts || proposalStatus()?.value?.payouts ? (
                    <div>
                        {!updatedProposalStatus?.value ? proposalStatus()?.value?.payouts.map(
                        (link: any) => {
                            return (
                            <a
                                href={link}
                                className="underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Payment Link
                                {/* <i className="bi bi-arrow-up-right"></i> */}
                            </a>
                            );
                        },
                        ):(
                            updatedProposalStatus?.value?.payouts.map(
                                (link: any) => {
                                    return (
                                        <a
                                            href={link}
                                            className="underline"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Payment Link
                                            {/* <i className="bi bi-arrow-up-right"></i> */}
                                        </a>
                                    );
                                }
                            )
                        )}
                    </div>
                    ) : (
                    "No Payouts yet"
                    )}
                </div>
                </TimelineItems>
            </div>
            </div>
        </div>
    )
}

export default TimeLine;