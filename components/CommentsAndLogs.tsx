import { timeAgo } from "@/lib/common";
import { Social } from "@builddao/near-social-js";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Tag from "./tag";
import { labelIcons } from "@/lib/constant";
import AccountProfile from "./AvatarProfile";
import { timelineStyle } from "@/lib/constant";

const CommentsAndLogs = ({snapshotHistory,latestSnapshot,block_height,ts}:{snapshotHistory?: any,latestSnapshot?: any,block_height?: number,ts?: number}) => {
    const [changedKeysListWithValues, setChangedKeysListWithValues] = useState<any>(null);
    const [data, setData] = useState<any>([]);
    const [comments, setComments] = useState<any>([]);


    const social = new Social({
        contractId: 'social.near',
    });

    const getDifferentKeysWithValues = (obj1: any, obj2: any) => {
        return Object.keys(obj1)
            .filter((key) => {
                if (key !== "editor_id" && obj2.hasOwnProperty(key)) {
                const value1 = obj1[key];
                const value2 = obj2[key];
                if (Array.isArray(value1) && Array.isArray(value2)) {
                    const sortedValue1 = [...value1].sort();
                    const sortedValue2 = [...value2].sort();
                    return JSON.stringify(sortedValue1) !== JSON.stringify(sortedValue2);
                } else if (typeof value1 === "object" && typeof value2 === "object") {
                    return JSON.stringify(value1) !== JSON.stringify(value2);
                } else {
                    return value1 !== value2;
                }
                }
                return false;
            })
            .map((key) => ({
                key,
                originalValue: obj1[key],
                modifiedValue: obj2[key],
            }));
    }

    const sortTimelineAndComments = async () => {
        const comments = await social.index({
            action: 'comment',
            key: {
                type: "social",
                path: `forum.potlock.near/post/main`,
                blockHeight: block_height,
            },
        });

        if (changedKeysListWithValues === null) {
            const changedKeysListWithValues = snapshotHistory
                .slice(1)
                .map((item:any, index:any) => {
                const startingPoint = snapshotHistory[index]; 
                return {
                    editorId: item?.editor_id,
                    ...getDifferentKeysWithValues(startingPoint, item),
                };
                });
            setChangedKeysListWithValues(changedKeysListWithValues);
        }
        

        // sort comments and timeline logs by time
        const snapShotTimeStamp = Array.isArray(snapshotHistory)
            ? snapshotHistory.map((i:any) => {
                return { blockHeight: null, timestamp: parseFloat((i.timestamp / 1e6).toString()) };
                })
            : [];

        const commentsTimeStampPromise = Array.isArray(comments)
            ? Promise.all(
                comments.map((item) => {
                    return fetch(
                    `https://api.near.social/time?blockHeight=${item.blockHeight}`,
                    ).then((res:any) => res.json())
                    .then(data =>{
                        const timeMs = parseFloat(data);
                        return {
                            blockHeight: item.blockHeight,
                            timestamp: timeMs,
                        };
                    });
                }),
                ).then((res) => res)
            : Promise.resolve([])

        commentsTimeStampPromise.then((commentsTimeStamp:any) => {
            const combinedArray = [...snapShotTimeStamp, ...commentsTimeStamp];
            combinedArray.sort((a, b) => a.timestamp - b.timestamp);
            setComments(comments)
            setData(combinedArray)
        });
    }


    useEffect(() => {
        if (snapshotHistory.length > 0) {
            sortTimelineAndComments();
        }
    }, [block_height]);

    //console.log('data',data)

    const Comment = async({ commentItem }: { commentItem: any }) => {
        const { accountId, blockHeight } = commentItem;
        const item = {
            type: "social",
            path: `${accountId}/post/comment`,
            blockHeight,
        };
        const comment:any = await social.get({
            keys:[
                item.path,
            ]
        })
        const content = JSON.parse(comment ?? "null");


        const hightlightComment =
            parseInt(blockHeight ?? "") === blockHeight &&
            accountId === accountId;

        return (
            <div style={{ zIndex: 99, background: "white" }}>
                <div className="flex gap-2 flex-1">
                <div className="hidden md:flex">
                    <img width={20} className="w-10 h-10 rounded-full" src="/assets/avatar.png" alt="avatar" />
                </div>
                <div
                    style={{ border: hightlightComment ? "2px solid black" : "" }}
                    className="rounded-lg flex-1 border-aipgf-geyser border-[1px]"
                >
                    <div className="relative bg-white h-16">
                        <div className="">
                            <Link
                            rel="noopener noreferrer"
                            target="_blank"
                            href={`https://bos.potlock.org/?tab=profile&accountId=${accountId}`}
                            >
                            <span className="fw-bold text-black">{accountId}</span>
                            </Link>
                            commented ･{" "}
                            {timeAgo(ts as number)}
                        </div>
                    </div>
                    {/* <div className="p-2 px-3">
                        <Widget
                            src={`${REPL_DEVHUB}/widget/devhub.components.molecule.MarkdownViewer`}
                            props={{
                            text: content.text,
                            }}
                        />
            
                        <div className="d-flex gap-2 align-items-center mt-4">
                            <Widget
                            src={`${REPL_DEVHUB}/widget/devhub.entity.proposal.LikeButton`}
                            props={{
                                item: item,
                                notifyAccountId: accountId,
                            }}
                            />
                            <Widget
                            src={`${REPL_NEAR}/widget/CopyUrlButton`}
                            props={{
                                url: link,
                            }}
                            />
                        </div>
                    </div> */}
                </div>
                </div>
            </div>
        );
    };

    const LinkToRfp = ({ id }: { id: string }) => {
        return (
            <Link style={{color: "unset", textDecoration: "none"}} href={`https://forum.aipgf.com/bos.forum.potlock.near/widget/app?page=rfp&id=${id}`}>
                #{id}
            </Link>
        )
    }

    const parseTimelineKeyAndValue = (timeline: any, originalValue: any, modifiedValue: any) => {
        const oldValue = originalValue[timeline];
        const newValue = modifiedValue[timeline];
        switch (timeline) {
          case "status": {
            if (
                (newValue === 'APPROVED' ||
                    newValue === 'APPROVED_CONDITIONALLY') &&
                latestSnapshot?.linked_rfp
            ) {
                return (
                    <span className="inline-flex">
                        moved proposal to{" "}
                        <button  
                        style={{
                            borderColor:
                            timelineStyle[newValue],
                        }}
                        className="cursor-pointer border-aipgf-geyser border-[1px] border-solid box-border bg-white hover:bg-stone-50 h-8 p-1 px-4 rounded-full flex flex-row gap-1 items-center">
                        {/* <img width={16} src="/assets/icon/pen.svg" alt="icon" /> */}
                        <small
                            style={{
                                color:
                                timelineStyle[
                                    newValue
                                ],
                            }}
                        >
                            {newValue.replace("_", " ")
                                    .toLowerCase()
                                    .replace(/\b\w/g, (c: any) =>
                                        c.toUpperCase()
                                    )}
                        </small>
                    </button>
                        ･ this proposal is selected for RFP{" "}
                        <LinkToRfp id={latestSnapshot.linked_rfp}/>
                    </span>
                );
            } else
                return (
                    oldValue !== newValue && (
                    <span className="inline-flex gap-2 items-center">
                        moved proposal from{" "}
                        <button  
                        style={{
                            borderColor:
                            timelineStyle[
                                oldValue
                            ],
                        }}
                        className="cursor-pointer border-aipgf-geyser border-[1px] border-solid box-border bg-white hover:bg-stone-50 h-8 p-1 px-4 rounded-full flex flex-row gap-1 items-center">
                        {/* <img width={16} src="/assets/icon/pen.svg" alt="icon" /> */}
                        <small
                            style={{
                                color:
                                timelineStyle[
                                    oldValue
                                ],
                            }}
                        >
                            {oldValue.replace("_", " ")
                                    .toLowerCase()
                                    .replace(/\b\w/g, (c: any) =>
                                        c.toUpperCase()
                                    )}
                        </small>
                    </button>
                        to{" "}
                        <button  
                        style={{
                            borderColor:
                            timelineStyle[
                                newValue
                            ],
                        }}
                        className="cursor-pointer border-aipgf-geyser border-[1px] border-solid box-border bg-white hover:bg-stone-50 h-8 p-1 px-4 rounded-full flex flex-row gap-1 items-center">
                        {/* <img width={16} src="/assets/icon/pen.svg" alt="icon" /> */}
                        <small
                            style={{
                                color:
                                timelineStyle[
                                    newValue
                                ],
                            }}
                        >
                            {newValue.replace("_", " ")
                                    .toLowerCase()
                                    .replace(/\b\w/g, (c: any) =>
                                        c.toUpperCase()
                                    )}
                        </small>
                    </button>
                        stage
                    </span>
                    )
                );
                return null;
            }
            case "sponsor_requested_review":
                return !oldValue && newValue && <span>completed review</span>;
            case "reviewer_completed_attestation":
                return !oldValue && newValue && <span>completed attestation</span>;
            case "kyc_verified":
                return !oldValue && newValue && <span>verified KYC/KYB</span>;
            case "test_transaction_sent":
                return (
                !oldValue &&
                newValue && (
                    <span>
                    confirmed sponsorship and shared funding steps with recipient
                    </span>
                )
                );
            case "payouts":
                return <span>updated the funding payment links.</span>;
            default:
                return null;
        }
    }

    const isNumber = (value: any) => {
        return typeof value === 'number';
    }

    const parseProposalKeyAndValue = (key: any, modifiedValue: any, originalValue: any) => {
        switch (key) {
            case "name":
                return <span>changed title</span>;
            case "summary":
            case "description":
                return <span>changed {key}</span>;
            case "labels":
                return <span>changed labels to {(modifiedValue ?? []).join(", ")}</span>;
            case "category":
                return (
                <span>
                    changed category from {originalValue} to {modifiedValue}
                </span>
                );
            case "linked_proposals":
                return <span>updated linked proposals</span>;
            case "linked_rfp": {
                const isUnlinked = isNumber(originalValue) && !isNumber(modifiedValue);
                const actionText = isUnlinked ? "unlinked" : "linked";
                const rfpId = originalValue ?? modifiedValue;
                return (
                <span>
                    {actionText} an RFP <LinkToRfp id={rfpId}/>
                </span>
                );
            }
            case "requested_sponsorship_usd_amount":
                return (
                <span>
                    changed sponsorship amount from {originalValue} to {modifiedValue}
                </span>
                );
            case "requested_sponsorship_paid_in_currency":
                return (
                <span>
                    changed sponsorship currency from {originalValue} to {modifiedValue}
                </span>
                );
            case "receiver_account":
                return (
                <span className="inline-flex items-center gap-2">
                    changed receiver account from{" "}
                    <AccountProfile accountId={originalValue} size={30} />
                    <Link rel="noopener noreferrer" target="_blank" style={{color: "unset"}} className="hover:underline no-underline" href={`https://bos.potlock.org/?tab=profile&accountId=${originalValue}`}>
                        <span className="text-sm font-semibold">{originalValue}</span>
                    </Link>
                    to <AccountProfile accountId={modifiedValue} size={30} />
                    <Link rel="noopener noreferrer" target="_blank" style={{color: "unset"}} className="hover:underline no-underline" href={`https://bos.potlock.org/?tab=profile&accountId=${modifiedValue}`}>
                        <span className="text-sm font-semibold">{modifiedValue}</span>
                    </Link>
                </span>
                );
            case "supervisor":
                return !originalValue && modifiedValue ? (
                <span className="inline-flex items-center gap-2">
                    added
                    <AccountProfile accountId={modifiedValue} size={30} />
                    <Link rel="noopener noreferrer" target="_blank" style={{color: "unset"}} className="hover:underline no-underline" href={`https://bos.potlock.org/?tab=profile&accountId=${modifiedValue}`}>
                        <span className="text-sm font-semibold">{modifiedValue}</span>
                    </Link>
                    as project coordinator
                </span>
                ) : (
                <span className="inline-flex items-center gap-2 ">
                    changed project coordinator from{" "}
                    to <AccountProfile accountId={modifiedValue} size={30} />
                    <Link rel="noopener noreferrer" target="_blank" style={{color: "unset"}} className="hover:underline no-underline" href={`https://bos.potlock.org/?tab=profile&accountId=${originalValue}`}>
                        <span className="text-sm font-semibold">{originalValue}</span>
                    </Link>
                    <Link rel="noopener noreferrer" target="_blank" style={{color: "unset"}} className="hover:underline no-underline" href={`https://bos.potlock.org/?tab=profile&accountId=${modifiedValue}`}>
                        <span className="text-sm font-semibold">{modifiedValue}</span>
                    </Link>
                </span>
                );
            case "timeline": {
                const modifiedKeys = Object.keys(modifiedValue);
                const originalKeys = Object.keys(originalValue);
                return modifiedKeys.map((i, index) => {
                const text = parseTimelineKeyAndValue(i, originalValue, modifiedValue);
                return (
                    text && (
                    <span key={index} className="inline-flex">
                        {text}
                        {text && "･"}
                    </span>
                    )
                );
                });
            }
            default:
                return null;
        }
    };      

    const Log = ({ timestamp }: { timestamp: number }) => {
        const updatedData = useMemo(
            () =>
                changedKeysListWithValues.find((obj: any) =>
                Object.values(obj).some(
                    (value: any) =>
                    value && parseFloat((value.modifiedValue / 1e6).toString()) === timestamp,
                ),
                ),
            [changedKeysListWithValues, timestamp],
        );


        const editorId = updatedData?.editorId;
        //console.log('updatedData',editorId)
        const valuesArray = Object.values(updatedData ?? {});
        // if valuesArray length is 2 that means it only has timestamp and editorId
        if (!updatedData || valuesArray.length === 2) {
            return <></>;
        }

        return valuesArray.map((i: any, index: any) => {
            if (i.key && i.key !== "timestamp") {
                return (
                    <div
                        className="flex gap-3 items-center z-20"
                        key={index}
                    >
                        <img
                            src="https://ipfs.near.social/ipfs/bafkreiffqrxdi4xqu7erf46gdlwuodt6dm6rji2jtixs3iionjvga6rhdi"
                            height={30}
                        />
                        <div
                            className={
                                "flex flex-1 gap-1 w-10 text-wrap items-center " +
                                (i.key === "timeline" &&
                                Object.keys(i.originalValue ?? {}).length > 1
                                ? ""
                                : "inline-flex")
                            }
                            >
                            <span className="inline-flex items-center gap-2 font-bold text-black">
                                <AccountProfile accountId={editorId} size={30} />{" "}
                                <Link rel="noopener noreferrer" target="_blank" style={{color: "unset"}} className="hover:underline no-underline" href={`https://bos.potlock.org/?tab=profile&accountId=${editorId}`}>
                                    <span className="text-sm font-semibold">{editorId}</span>
                                </Link>
                            </span>
                            {parseProposalKeyAndValue(i.key, i.modifiedValue, i.originalValue)}
                            {i.key !== "timeline" && "･"}
                            <span className="text-sm">
                                {timeAgo(timestamp*1000000)}
                            </span>
                        </div>
                    </div>
                );
            }
        });
    };      

    return (
        <div className="flex flex-col">
            {
                Array.isArray(data) && data.length > 0 && (
                    <div className="relative">
                        <div className="absolute left-[2%] top-0 h-full bg-aipgf-geyser z-10 w-[1px]"></div>
                        <div className="flex flex-col gap-8 mt-5 ml-2">
                            {data.map((i: any, index: any) => {
                                if (i.blockHeight) {
                                    const item = comments.find(
                                    (t: any) => t.blockHeight === i.blockHeight,
                                    );
                                    return <Comment commentItem={item} />;
                                } else {
                                    return <Log timestamp={i.timestamp} key={index} />;
                                }
                            })}
                        </div>
                        
                    </div>
                )
            }
        </div>
    )
}

export default CommentsAndLogs;