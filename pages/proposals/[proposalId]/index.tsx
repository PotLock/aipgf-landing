import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Markdown from 'markdown-to-jsx';
import { Social } from "@builddao/near-social-js";

// Shadcn imports
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Custom components
import NavBar from "@/components/nav-bar";
import CommentsAndLogs from "@/components/CommentsAndLogs";
import TimeLine from "@/components/TimeLine";
import AvatarProfile from '@/components/AvatarProfile';
import TiptapEditor from "@/components/TiptapEditor"

// Types & Utils
import { ProposalDetailTypes } from "@/types/types";
import { readableDate, timeAgo, sliceAddress } from "@/lib/common";
import { timelineStyle, proposalStatusOptions } from "@/lib/constant";
import { ViewMethod } from "@/hook/near-method";
import TagProposal from "@/components/TagProposal";

//Icons
import { ChatsCircle, Link as LinkIcon, ShareNetwork, Heart, Plus } from "@phosphor-icons/react";


const ProposalPage = () => {
    const router = useRouter();
    const { proposalId } = router.query;
    const [proposal, setProposal] = useState<ProposalDetailTypes>();
    const [totalComments, setTotalComments] = useState<number>(0);
    const [totalVotes, setTotalVotes] = useState<number>(0);
    const [verificationStatus, setVerificationStatus] = useState<string>("");
    const [blockHeight, setBlockHeight] = useState<number>(0);
    const [timestamp, setTimestamp] = useState<number>(0);
    const [history, setHistory] = useState<any>();
    const [author, setAuthor] = useState<string|null>(null);
    const [isLiked, setIsLiked] = useState(false);
    const [commentContent, setCommentContent] = useState("")

    if(!proposalId){
        return <div>Loading...</div>
    }
    

    const variables = {
        where: {
        proposal_id: {
            _eq: proposalId as string
        }
        },
    };

    const loadProposal = useCallback(async () => {
        if(proposalId){
        const proposal = await ViewMethod("forum.potlock.near", "get_proposal", {
            proposal_id: parseInt(proposalId as string)
        });

        setAuthor(proposal.author_id)
        setHistory(proposal.snapshot_history)
        setProposal(proposal.snapshot)
        setBlockHeight(proposal.social_db_post_block_height)
        setTimestamp(proposal.snapshot.timestamp)
        }
    }, [proposalId]);


    useEffect(() => {
        loadProposal();
    }, [proposalId, loadProposal]);


    const copyToClipboard = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
        //setCopySuccess(true);
        alert("Copied to clipboard");
        //setTimeout(() => setCopySuccess(false), 2000);
        });
    };

    useEffect(() => {
        if (
        proposal?.receiver_account.length === 64 ||
        (proposal?.receiver_account ?? "").includes(".near") ||
        (proposal?.receiver_account ?? "").includes(".tg")
        ) {
        fetch(
            `https://neardevhub-kyc-proxy.shuttleapp.rs/kyc/${proposal?.receiver_account}`,
            {
            mode: 'cors',
            headers: {
                'Origin': window.location.origin
            }
            }
        )
        .then((response) => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((res: any) => {
            let displayableText = "";
            switch (res?.kyc_status) {
            case "Approved":
                displayableText = "Verified";
                break;
            case "Pending":
                displayableText = "Pending";
                break;
            case "NotSubmitted":
            case "Rejected":
                displayableText = "Not Verified";
                break;
            default:
                displayableText = "Failed to get status";
                break;
            }
            setVerificationStatus(displayableText);
        })
        .catch((error) => {
            console.error('Error fetching KYC status:', error);
            setVerificationStatus("Failed to get status");
        });
        }
    }, [proposal?.receiver_account]);

    const social = new Social({
        contractId: process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"social.near":"v1.social08.testnet",
    });

    const getTotalComments = async () => {
        const result:any = await social.index({
        action: 'comment',
        key: {
            type: "social",
            path: `${process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"forum.potlock.near":"forum.potlock.testnet"}/post/main`,
            blockHeight: proposal?.block_height,
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
            path: `${process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"forum.potlock.near":"forum.potlock.testnet"}/post/main`,
            blockHeight: proposal?.block_height,
        },
        });
        setTotalVotes(result?.length);
        //console.log(result)
    };

    useEffect(() => {
        getTotalComments(); 
        getTotalVotes();
    }, [proposal?.author_id]);

    const handleLike = () => {
        setIsLiked(!isLiked);
        // Here you would typically also make an API call to update the like status
    };

    return (
        <div className="min-h-screen bg-background">
            <NavBar />
            <main className="container mx-auto px-4 py-6 max-w-7xl">
                {proposal && (
                <div className="space-y-6">
                    {/* Header Card */}
                    <Card className="border-[1px] border-solid border-aipgf-geyser rounded-lg">
                        <CardContent className="pt-6">
                            <button  
                                style={{
                                    borderColor:
                                    timelineStyle[
                                        proposal?.timeline?.status.toUpperCase()
                                    ]?.color,
                                }}
                                className="cursor-pointer border-aipgf-geyser border-[1px] border-solid box-border bg-white hover:bg-stone-50 h-8 p-1 px-4 rounded-full flex flex-row gap-1 items-center">
                                <img width={16} src={`/${timelineStyle[proposal?.timeline?.status.toUpperCase()]?.icon}`} alt="icon" />
                                <small
                                    style={{
                                        color:
                                        timelineStyle[
                                            proposal?.timeline
                                                ?.status.toUpperCase()
                                        ]?.color,
                                    }}
                                >
                                    {proposal?.timeline &&
                                        proposal?.timeline
                                            ?.status.replace("_", " ")
                                            .toLowerCase()
                                            .replace(/\b\w/g, (c: any) =>
                                                c.toUpperCase()
                                            )}
                                </small>
                            </button>
                            
                            <h1 className="text-3xl font-bold tracking-tight mb-2">
                                {proposal?.name}
                            </h1>
                            
                            <p className="text-sm text-muted-foreground">
                                <Link 
                                    href={`https://bos.potlock.org/?tab=profile&accountId=${author}`}
                                    className="hover:underline no-underline text-black font-semibold"
                                >
                                    {author}
                                </Link>
                                {" "}created on {readableDate(proposal?.timestamp/1000000)}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Column - Main Content */}
                        <div className="flex flex-col gap-4 md:col-span-2 space-y-6">
                            <div className="flex flex-row gap-2 border-b-[2px] border-aipgf-geyser border-solid box-border pb-4">
                                <div className="h-14 w-14">
                                    <AvatarProfile accountId={author as string} size={40} style="hidden md:block" />
                                </div>
                                <div className="w-full space-y-6">
                                    <Card className="border-[1px] border-solid border-aipgf-geyser rounded-lg">
                                        <CardHeader className="bg-gray-100 bg-opacity-10 rounded-t-lg px-6 py-2">
                                            <CardTitle className="flex flex-row justify-between">
                                                <div className="flex flex-row gap-2 items-center">
                                                    <p className="text-sm">
                                                        <Link target="_blank" href={`https://bos.potlock.org/?tab=profile&accountId=${author}`} className="hover:underline font-semibold no-underline capitalize" style={{color: "unset"}}>{sliceAddress(author as string)}</Link> <span className="font-normal">created RFP</span>
                                                    </p>
                                                    <p className="text-xs text-gray-500">{timeAgo(proposal?.timestamp)}</p>
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
                                                    PROPOSAL CATEGORY
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
                                                    {proposal?.summary}
                                                </p>
                                            </div>

                                            {/* Description */}
                                            <div className="space-y-4 mb-6">
                                                <h2 className="text-sm font-semibold pb-2 border-b-[1px] border-aipgf-geyser border-solid box-border">
                                                    DESCRIPTION
                                                </h2>
                                                <div className="prose max-w-none">
                                                    <Markdown>
                                                    {proposal?.description}
                                                    </Markdown>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-4">
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="gap-2 bg-transparent hover:bg-transparent p-0" 
                                                    onClick={handleLike}
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
                                        latestSnapshot={proposal} 
                                        block_height={blockHeight.toString()} 
                                        ts={timestamp} 
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                {/* Reply Comment Section */}
                                <div className="flex flex-row gap-3 w-full items-start relative border-b-[2px] border-aipgf-geyser border-solid box-border pb-4">
                                    <AvatarProfile accountId={author as string} size={40} />
                                    <div className="w-full flex flex-col gap-2">
                                        <span className="font-semibold text-lg">Reply</span>
                                        <TiptapEditor
                                            content={commentContent}
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
                                            <Button 
                                                className="bg-blue-500 hover:bg-blue-600 text-white flex flex-row gap-2 items-center px-4 py-5 rounded-xl"
                                                onClick={() => router.push(`/proposals/create?rfpId=${proposalId}`)}
                                            >
                                                <Plus color="white" className="w-4 h-4" /> Submit Proposal
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="px-4 md:w-96 md:min-w-96 rounded-lg shadow-sm space-y-4">
                            <div className="border-b-[1px] border-aipgf-geyser border-solid box-border pb-4">
                                <h2 className="text-lg font-semibold">Author</h2>
                                <div className="flex items-center space-x-2 mt-1">
                                    <AvatarProfile accountId={author as string} size={40} />
                                    <Link target="_blank" href={`https://bos.potlock.org/?tab=profile&accountId=${author}`} className="hover:underline font-semibold no-underline" style={{color: "unset"}}>{sliceAddress(author as string)}</Link>
                                </div>
                            </div>
                            {
                                proposal?.linked_proposals?.length > 0 && (
                                    <div className="border-b-[1px] border-aipgf-geyser border-solid box-border pb-2">
                                        <h2 className="text-lg font-semibold">Link RFPs ({proposal?.linked_rfp?proposal?.linked_rfp:0})</h2>
                                        {
                                            proposal?.linked_rfp && (
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <img src="https://placehold.co/24x24" alt="RFP icon" className="w-10 h-10 rounded-full"/>
                                                    <div className="flex-1">
                                                        <p className="text-sm text-gray-900">#170: PotLock & Agentoor Contributor's Report</p>
                                                        <p className="text-xs text-gray-500">created on April 28, 2024 15:30 UTC</p>
                                                    </div>
                                                    <i className="fas fa-link text-gray-400"></i>
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            }
                            {
                                proposal?.linked_proposals?.length > 0 && (
                                    <div className="border-b-[1px] border-aipgf-geyser border-solid box-border pb-2">
                                        <h2 className="text-lg font-semibold">Link Proposals ({proposal?.linked_proposals?.length})</h2>
                                        {
                                            proposal?.linked_proposals?.map((data) => (
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <img src="https://placehold.co/24x24" alt="Proposal icon" className="w-10 h-10 rounded-full"/>
                                                    <div className="flex-1">
                                                        <p className="text-sm text-gray-900">#170: PotLock & Agentoor Contributor's Report</p>
                                                        <p className="text-xs text-gray-500">created on April 28, 2024 15:30 UTC</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                            <div className="border-b-[1px] border-aipgf-geyser border-solid box-border pb-2">
                                <h2 className="text-lg font-semibold">Funding Ask</h2>
                                <p className="text-[30px] font-semibold -mt-2 -mb-2">{proposal?.requested_sponsorship_usd_amount} USD</p>
                                <p className="text-xs text-gray-500">Requested in {proposal?.requested_sponsorship_paid_in_currency}</p>
                            </div>
                            {verificationStatus !== "Failed to get status" && (
                                <div className="border-b-[1px] border-aipgf-geyser border-solid box-border pb-2">
                                    <h2 className="text-lg font-semibold">Recipient Verification Status</h2>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <img className="w-10 h-10 rounded-full p-2 bg-green-100" src="/assets/icon/verification.svg" alt="icon" />
                                        <div className="flex-1 -mt-2">
                                            <p className="text-sm text-gray-900">KYC {verificationStatus}</p>
                                            <p className="text-xs text-gray-500 -mt-2">Expires on Aug 24, 2024</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* <div className="border-b-[1px] border-aipgf-geyser border-solid box-border pb-2">
                                <h2 className="text-lg font-semibold">Github Project Address</h2>
                                <p className="text-sm text-gray-500">[Add GitHub Address]</p>
                            </div> */}
                            {
                                proposal?.supervisor && (
                                    <div className="border-b-[1px] border-aipgf-geyser border-solid box-border pb-4">
                                        <h2 className="text-lg font-semibold">Project Supervisor</h2>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <AvatarProfile accountId={proposal?.supervisor} size={40} />
                                            <Link target="_blank" href={`https://bos.potlock.org/?tab=profile&accountId=${proposal?.supervisor}`} className="hover:underline font-semibold no-underline" style={{color: "unset"}}>{proposal?.supervisor}</Link>
                                        </div>
                                    </div>
                                )
                            }
                            {/* Timeline */}
                            <TimeLine proposalStatusOptions={proposalStatusOptions} timeline={proposal?.timeline} />
                        </div>
                    </div>
                </div>
                )}
            </main>
        </div>
    );
};

export default ProposalPage;