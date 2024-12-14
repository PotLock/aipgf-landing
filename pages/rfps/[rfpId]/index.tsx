import NavBar from "@/components/nav-bar";
import { NextPage } from "next";
import { useRouter } from "next/router";
import CommentsAndLogs from "@/components/CommentsAndLogs";
import { useCallback, useEffect, useState } from "react";
import { RFPDetailTypes } from "@/types/types";
import { readableDate, timeAgo,isProposalApproved } from "@/lib/common";
import { Social } from "@builddao/near-social-js";
import { labelIcons, timelineStyle } from "@/lib/constant";
import Link from "next/link";
import Markdown from 'markdown-to-jsx'
import Tag from "@/components/tag";
import AvatarProfile from '@/components/AvatarProfile';
import { ViewMethod } from "@/hook/near-method";
import { sliceAddress } from "@/lib/common";
import TimelineConfigurator from "@/components/TimelineConfigurator";
import LinkProposal from "@/components/LinkProposal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card"
import TagProposal from "@/components/TagProposal";
import { ChatsCircle, Link as LinkIcon, ShareNetwork, Heart, Plus } from "@phosphor-icons/react";
import TiptapEditor from "@/components/TiptapEditor";

const RFPsDetail: NextPage = () => {
    const router = useRouter();
    const { rfpId } = router.query;
    const [rfp, setRFP] = useState<RFPDetailTypes>();
    const [totalComments, setTotalComments] = useState<number>(0);
    const [totalVotes, setTotalVotes] = useState<number>(0);
    const [verificationStatus, setVerificationStatus] = useState<string>("");
    const [blockHeight, setBlockHeight] = useState<number>(0);
    const [timestamp, setTimestamp] = useState<number>(0);
    const [history, setHistory] = useState<any>();
    const [snapshotHistory, setSnapshotHistory] = useState<any>();
    const [authorId, setAuthorId] = useState<any>();
    const [timeline, setTimeline] = useState<any>();
    const [warningModal, setWarningModal] = useState<boolean>(false);
    const [cancelModal, setCancelModal] = useState<boolean>(false);
    const [approvedProposals, setApprovedProposals] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [commentContent, setCommentContent] = useState<string|null>(null);

    const loadRFP = useCallback(async () => {
        if(rfpId){
            const rfp = await ViewMethod(process.env.NEXT_PUBLIC_NETWORK === "mainnet" ? process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT as string : process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT_TESTNET as string, "get_rfp", {
                rfp_id: parseInt(rfpId as string)
            });
            //console.log(rfp)
            setRFP(rfp.snapshot)
            setAuthorId(rfp.author_id)
            setHistory(rfp.snapshot_history)
            setBlockHeight(rfp.social_db_post_block_height)
            setTimestamp(rfp.snapshot.timestamp)
        }
    }, [rfpId]);


    useEffect(() => {
        loadRFP();
    }, [rfpId, loadRFP]);

    //console.log(rfp, authorId)

    const copyToClipboard = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
            //setCopySuccess(true);
            alert("Copied to clipboard");
            //setTimeout(() => setCopySuccess(false), 2000);
        });
    };


    const social = new Social({
        contractId: process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"social.near":"v1.social08.testnet",
    });

    const getTotalComments = async () => {
        const result:any = await social.index({
            action: 'comment',
            key: {
                type: "social",
                path: `${process.env.NEXT_PUBLIC_NETWORK=="mainnet"?process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT:process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT_TESTNET}/post/main`,
                blockHeight: rfp?.block_height,
            },
        });
        setTotalComments(result?.length);
        //console.log(result)
    };

    const getTotalVotes = async () => {
        const result:any = await social.index({
            action: 'like',
            key: {
                type: "social",
                path: `${process.env.NEXT_PUBLIC_NETWORK=="mainnet"?process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT:process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT_TESTNET}/post/main`,
                blockHeight: rfp?.block_height,
            },
        });
        setTotalVotes(result?.length);
        //console.log(result)
    };

    useEffect(() => {
        getTotalComments(); 
        getTotalVotes();
    }, [authorId]);

    //console.log(approvedProposals)

    return (
        <div className="flex flex-col w-full h-full">
            <NavBar />
            <div className="w-full max-w-[1700px] mx-auto relative bg-background overflow-hidden gap-[4.093rem] leading-[normal] tracking-[normal] sm:gap-[1rem] mq825:gap-[2.063rem] md:px-[5rem]">
                <div className="flex justify-center items-center">
                    {rfp && (
                        <div className="mq825:px-5 w-full mt-10 mq825:mt-4 pb-20 flex flex-col gap-4">
                            <Card className="bg-white border-[1px] border-aipgf-geyser border-solid box-border">
                                <CardContent className="pt-6 flex flex-col md:flex-row justify-between w-full md:items-center items-start gap-3">
                                    <div className="space-y-3">
                                        <Button  
                                            style={{
                                                borderColor:
                                                timelineStyle[
                                                    rfp?.timeline?.status
                                                ]?.color,
                                            }}
                                            className="cursor-pointer border-aipgf-geyser border-[1px] border-solid box-border bg-white hover:bg-stone-50 h-8 p-1 px-4 rounded-full flex flex-row gap-1 items-center">
                                            <img width={16} src={`/${timelineStyle[rfp?.timeline?.status]?.icon}`} alt="icon" />
                                            <small
                                                style={{
                                                    color:
                                                    timelineStyle[
                                                        rfp?.timeline
                                                            ?.status
                                                    ]?.color,
                                                }}
                                            >
                                                {rfp?.timeline &&
                                                    rfp?.timeline
                                                        ?.status.replace("_", " ")
                                                        .toLowerCase()
                                                        .replace(/\b\w/g, (c: any) =>
                                                            c.toUpperCase()
                                                        )}
                                            </small>
                                        </Button>
                                        <h1 className="text-2xl md:max-w-[800px] w-full font-semibold text-foreground mb-2 mt-1">
                                            {rfp?.name}
                                        </h1>
                                        <p className="text-sm text-muted-foreground">
                                            <Link target="_blank" href={`https://bos.potlock.org/?tab=profile&accountId=${authorId}`} 
                                                className="hover:underline font-semibold no-underline"
                                                style={{color: "unset"}}>
                                                {sliceAddress(authorId)}
                                            </Link> created on {readableDate(rfp?.timestamp/1000000)}
                                        </p>
                                    </div>
                                    <Button asChild variant="default" className="bg-gray-100 hover:bg-gray-200/75 border-aipgf-geyser border-[1px] border-solid box-border p-3 text-center rounded-full cursor-pointer w-20">
                                        <span>Edit</span>
                                    </Button>
                                </CardContent>
                            </Card>

                            {rfp?.timeline?.status === "ACCEPTING_SUBMISSIONS" && (
                                <Card className="bg-blue-100 bg-opacity-60">
                                    <CardContent className="flex md:justify-between flex-col md:flex-row md:items-center items-start p-4">
                                        <div className="gap-1">
                                            <p className="text-foreground font-semibold text-[19px]">
                                                This RFP is accepting submissions.
                                            </p>
                                            <p className="text-muted-foreground text-sm">
                                                Click Submit Proposal if you want to submit a proposal.
                                            </p>
                                        </div>
                                        <Button asChild variant="default" className="bg-blue-500 hover:bg-blue-600/75 border-aipgf-geyser border-[1px] border-solid box-border p-3 text-center rounded-full cursor-pointer w-40">
                                            <Link href="/proposals/create-proposal" className="no-underline flex flex-row gap-2 items-center">
                                                <Plus color="white" className="w-4 h-4" />
                                                Submit Proposal
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}

                            <div className="flex flex-col-reverse md:flex-row gap-4 w-full justify-between mt-12">
                                <div className="flex flex-col gap-4 md:col-span-2 space-y-6">
                                    <div className="flex flex-row gap-2 border-b-[2px] border-aipgf-geyser border-solid box-border pb-4">
                                        <div className="h-14 w-14">
                                        <AvatarProfile accountId={authorId as string} size={40} style="hidden md:block" />
                                    </div>
                                    <div className="w-full space-y-6">
                                        <Card className="border-[1px] border-solid border-aipgf-geyser rounded-lg">
                                            <CardHeader className="bg-gray-100 bg-opacity-10 rounded-t-lg px-6 py-2">
                                                <CardTitle className="flex flex-row justify-between">
                                                    <div className="flex flex-row gap-2 items-center">
                                                        <p className="text-sm">
                                                            <Link target="_blank" href={`https://bos.potlock.org/?tab=profile&accountId=${authorId}`} className="hover:underline font-semibold no-underline capitalize" style={{color: "unset"}}>{sliceAddress(authorId as string)}</Link> <span className="font-normal">created RFP</span>
                                                        </p>
                                                        <p className="text-xs text-gray-500">{timeAgo(rfp?.timestamp)}</p>
                                                    </div>
                                                    <div className="flex flex-row gap-5 items-center">
                                                        <span className="text-sm text-gray-500 bg-transparent outline-none p-3 py-1 pt-1 border-[1px] border-aipgf-geyser border-solid box-border rounded-lg">Author</span>
                                                        <button className="bg-transparent outline-none text-gray-500 cursor-pointer">
                                                            <img width={20} src="/assets/icon/dots.svg" alt="icon" />
                                                        </button>
                                                    </div>
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="pt-6">
                                                {/* Categories */}
                                                <div className="space-y-4 mb-6">
                                                    <h2 className="text-sm font-semibold border-b-[1px] border-aipgf-geyser border-solid box-border pb-2">
                                                        RFPs CATEGORY
                                                    </h2>
                                                    <TagProposal 
                                                        label="A small build" 
                                                        onSelect={(label) => console.log(`Selected: ${label}`)} 
                                                    />
                                                </div>

                                                {/* Summary */}
                                                <div className="space-y-4 mb-6">
                                                    <h2 className="text-sm font-semibold pb-2 border-b-[1px] border-aipgf-geyser border-solid box-border">
                                                        SUMMARY
                                                    </h2>
                                                    <p className="text-sm text-muted-foreground">
                                                        {rfp?.summary}
                                                    </p>
                                                </div>

                                                {/* Description */}
                                                <div className="space-y-4 mb-6">
                                                    <h2 className="text-sm font-semibold pb-2 border-b-[1px] border-aipgf-geyser border-solid box-border">
                                                        DESCRIPTION
                                                    </h2>
                                                    <div className="prose max-w-none">
                                                        <Markdown>
                                                        {rfp?.description}
                                                        </Markdown>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex items-center gap-4">
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm" 
                                                        className="gap-2 bg-transparent hover:bg-transparent p-0" 
                                                        onClick={() => {}}
                                                    >
                                                        <Heart 
                                                            weight={isLiked ? "fill" : "regular"}
                                                            className={`w-4 h-4 ${isLiked ? "text-red-500" : ""}`} 
                                                        />
                                                        <span>{isLiked ? totalVotes + 1 : totalVotes}</span>
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="gap-2 bg-transparent hover:bg-transparent">
                                                        <ChatsCircle className="w-4 h-4" />
                                                        <span>{totalComments}</span>
                                                    </Button>
                                                    <Button variant="ghost" size="sm" onClick={copyToClipboard} className="bg-transparent hover:bg-transparent">
                                                        <LinkIcon className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="bg-transparent hover:bg-transparent">
                                                        <ShareNetwork className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Comments Section */}
                                        <CommentsAndLogs 
                                            snapshotHistory={history} 
                                            latestSnapshot={rfp} 
                                            block_height={blockHeight.toString()} 
                                            ts={timestamp} 
                                        />
                                    </div>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        {/* Reply Comment Section */}
                                        <div className="flex flex-row gap-3 w-full items-start relative border-b-[2px] border-aipgf-geyser border-solid box-border pb-4">
                                            <AvatarProfile accountId={authorId as string} size={40} />
                                            <div className="w-full flex flex-col gap-2">
                                                <span className="font-semibold text-lg">Reply</span>
                                                <TiptapEditor
                                                    content={commentContent ?? ""}
                                                    onChange={setCommentContent}
                                                    onCancel={() => setCommentContent("")}
                                                    onSubmit={() => {
                                                        // Handle comment submission here
                                                        console.log("Comment submitted:", commentContent)
                                                        setCommentContent("")
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Submit Proposal Section */}
                                        <div className="border-[1px] border-solid border-aipgf-geyser rounded-lg bg-[#0969DA1A] bg-opacity-10">
                                            <div className="px-8 ml-5">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-lg font-semibold max-w-[400px]">Want to respond to this RFP? <span className="font-normal">This RFP is accepting submissions.</span></h3>
                                                    <Button asChild variant="default" className="bg-blue-500 hover:bg-blue-600/75 border-aipgf-geyser border-[1px] border-solid box-border p-3 text-center rounded-full cursor-pointer w-40">
                                                        <Link href="/proposals/create-proposal" className="no-underline flex flex-row gap-2 items-center">
                                                            <Plus color="white" className="w-4 h-4" />
                                                            Submit Proposal
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-4 md:w-96 md:min-w-96 rounded-lg shadow-sm">
                                    <div className="border-b-[1px] border-aipgf-geyser border-solid box-border pb-4">
                                        <h2 className="text-lg font-semibold">Submission Deadline</h2>
                                        <span className="font-bold">{readableDate(Number(rfp?.submission_deadline)/1000000)}</span>
                                    </div>
                                    <div className="border-b-[1px] border-aipgf-geyser border-solid box-border pb-4">
                                        <TimelineConfigurator timeline={rfp?.timeline} setTimeline={(v:any) => {
                                            if (
                                                rfp?.timeline.status === v.status &&
                                                rfp?.timeline.status === v.status
                                            ) {
                                                return;
                                            }
                                            // if proposal selected timeline is selected and no approved proposals exist, show warning
                                            if (
                                                v.status === 'PROPOSAL_SELECTED' &&
                                                Array.isArray(rfp?.linked_proposals) &&
                                                !rfp?.linked_proposals.length
                                            ) {
                                                setWarningModal(true);
                                            }

                                            if (v.status === 'CANCELLED') {
                                                setCancelModal(true);
                                            }
                                            setTimeline(v);
                                        }} />
                                    </div>
                                    {!isLoading && approvedProposals?.length > 0 && (
                                        <div className="border-b-[1px] border-aipgf-geyser border-solid box-border pb-2">
                                            <h2 className="text-lg font-semibold">Selected Proposal ({approvedProposals.length})</h2>
                                            <LinkProposal
                                                linkedProposalIds={approvedProposals.map((proposal: any) => proposal.proposal_id)}
                                                showStatus={false}
                                            />
                                        </div>
                                    )}
                                    {!isLoading && rfp?.linked_proposals?.length > 0 && (
                                        <div className="border-b-[1px] border-aipgf-geyser border-solid box-border pb-2">
                                            <h2 className="text-lg font-semibold">All Proposals ({rfp?.linked_proposals?.length})</h2>
                                            <LinkProposal
                                                linkedProposalIds={rfp?.linked_proposals}
                                                showStatus={true}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RFPsDetail;