import type { NextPage } from "next";
import Link from "next/link";
import { useState,useEffect } from "react";
import Tag from "./tag";




const labelIcons: any = {
    MVP: { icon: "solarcrownbroken.svg", color: "#f0cf8e" },
    Bounty: { icon: "bounty.svg", color: "#7b66dc", textColor: "#fff" },
    "Quick Start": {
        icon: "QuickStart.svg",
        color: "#0646bc",
        textColor: "#fff",
    },
};


const timelineStyle: any = {
    DRAFT: "#757575",
    REVIEW: "#1976d2",
    APPROVED:"#43a047",
    APPROVED_CONDITIONALLY: "#43a047",
    FUNDED: "#43a047",
    PAYMENT_PROCESSING: "#ff9800",
    CANCELLED: "#f44336",
    REJECTED:"#f44336"
}



const timeAgo = (blockTimestamp:number): string => {
    const now = Date.now(); // Current timestamp in milliseconds
    const blockTimestampMs = Math.floor(blockTimestamp / 1000000); // Convert nanoseconds to milliseconds
    const diffMs = now - blockTimestampMs;

    const date = new Date(blockTimestampMs)
    const dateNow = new Date()

    return diffMs < 60000
        ? `${(diffMs / 1000) | 0}s ago`
        : diffMs < 3600000
            ? `${(diffMs / 60000) | 0}m ago`
            : diffMs < 86400000
            ? `${(diffMs / 3600000) | 0}h ago`
            : date.getFullYear() === dateNow.getFullYear()
                ? date.toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                })
                : date.toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                });
};

const ProposalPost: NextPage<{proposals: ProposalTypes[]}> = ({proposals}) => {
    const [windowSize, setWindowSize] = useState<any>({
        width: null,
        height: null
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth as number,
                height: window.innerHeight as number,
            });
        }
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []); 


    const truncateString = (str: string) =>{
        if(str.length > 100){
            return str.slice(0,100)+"..."
        }
        return str
    }


    const renderProposals = () => {
        if (proposals.length === 0) {
            return <div>No proposals found</div>;
        }
        //console.log(proposals)
        return(
            proposals.length &&(
                proposals.map((proposal)=>{

                    return(
                        <div 
                            key={proposal.proposal_id} 
                            className="w-full border-aipgf-geyser border-[1px] border-solid box-border md:h-44 rounded-lg shadow-sm p-3 md:p-5 no-underline"
                            style={{color: "unset"}}
                            >
                            <div className="flex md:flex-row flex-col gap-3 items-end md:items-center justify-between">
                                <div className="flex flex-col md:flex-row md:gap-3 gap-1">
                                    <div className="flex flex-row gap-2 items-center md:items-start">
                                        <img width={30} className="rounded-full md:w-8 md:h-8 w-6 h-6" src={`/assets/avatar.png`} alt="avatar" />
                                        {
                                            windowSize?.width <= 768&&(
                                                <div className="flex flex-row gap-3">
                                                    <span className="text-sm md:text-lg font-semibold">{proposal.name}</span>
                                                    <div className="flex flex-row gap-1 items-center bg-[#F2CE8F] p-1 px-2 rounded-full">
                                                        <img width={windowSize?.width<768?12:14} src="/assets/icon/mvp.svg" alt="icon" />
                                                        <small className="text-[#24292F] text-[10px]">MVP</small>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <Link 
                                        style={{color: "unset", textDecoration: "none"}}
                                        target="_blank"
                                        href={`https://forum.aipgf.com/bos.forum.potlock.near/widget/app?page=proposal&id=${proposal.proposal_id}`} 
                                        className="flex flex-col gap-1">
                                        {
                                            windowSize?.width > 768 &&(
                                                <div className="flex flex-row gap-3">
                                                    <span className="text-sm md:text-lg font-semibold">{proposal.name}</span>
                                                    {proposal.labels?.map((data) => (
                                                        <Tag
                                                            key={data}
                                                            propBackgroundColor={
                                                                labelIcons[data]?.color ?? "#b7b7b7"
                                                            }
                                                            propWidth="max-content"
                                                            x={labelIcons[data]?.icon ?? "icon.svg"}
                                                            cancel={data}
                                                            propFontWeight="unset"
                                                            propColor={
                                                                labelIcons[data]?.textColor ?? "#000"
                                                            }
                                                            cancelFontSize="0.75rem"
                                                        />
                                                    ))}
                                                </div>
                                            )
                                        }
                                        <div className="flex flex-col gap-2">
                                            <small className="font-semibold flex flex-row gap-1 items-center mt-2">
                                                By{" "}
                                                {proposal?.author_id?.length > 20
                                                    ? `${proposal?.author_id?.slice(0, 20)}...`
                                                    : proposal?.author_id}
                                                <span className="font-thin">| {timeAgo(proposal.ts)}</span>
                                            </small>
                                            <span className="md:text-base text-xs">{truncateString(proposal.summary)}</span>
                                        </div>
                                        <div className="flex flex-row gap-5 mt-3 items-center">
                                            <div className="flex flex-row gap-1 items-center">
                                                <img width={15} src="/assets/icon/heart.svg" alt="icon" />
                                                <small className="text-[#E0023D] font-semibold text-xs">3 votes</small>
                                            </div>
                                            <div className="flex flex-row gap-1 items-center">
                                                <img width={15} src="/assets/icon/reply.svg" alt="icon" />
                                                <small className="text-[#04A46E] font-semibold text-xs">3 replies</small>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <button  
                                    style={{
                                        borderColor:
                                        timelineStyle[
                                            JSON.parse(proposal?.timeline)?.status
                                        ],
                                    }}
                                    className="cursor-pointer border-aipgf-geyser border-[1px] border-solid box-border bg-white hover:bg-stone-50 h-8 p-1 px-4 rounded-full flex flex-row gap-1 items-center">
                                    {/* <img width={16} src="/assets/icon/pen.svg" alt="icon" /> */}
                                    <small
                                        style={{
                                            color:
                                            timelineStyle[
                                                JSON.parse(proposal?.timeline)?.status
                                            ],
                                        }}
                                    >
                                        {proposal?.timeline &&
                                            JSON.parse(proposal?.timeline)
                                                ?.status.replace("_", " ")
                                                .toLowerCase()
                                                .replace(/\b\w/g, (c: any) =>
                                                    c.toUpperCase()
                                                )}
                                    </small>
                                </button>
                            </div>
                        </div>
                    )
                })
            )
        )
    
    }

    return(
        <div className="flex flex-col gap-3">
            {renderProposals()}
        </div>
    )
}

export default ProposalPost;