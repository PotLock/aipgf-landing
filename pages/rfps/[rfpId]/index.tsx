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
import { ViewMethod } from "@/hook/call-near-method";
import { sliceAddress } from "@/lib/common";
import TimelineConfigurator from "@/components/TimelineConfigurator";
import LinkProposal from "@/components/LinkProposal";

const QUERYAPI_ENDPOINT = `https://near-queryapi.api.pagoda.co/v1/graphql`;

const queryName = "bos_forum_potlock_near_ai_pgf_indexer_rfp_snapshots";
const query = `query GetLatestSnapshot($offset: Int = 0, $limit: Int = 10, $where: ${queryName}_bool_exp = {}) {
  ${queryName}(
    offset: $offset
    limit: $limit
    order_by: {ts: asc}
    where: $where
  ) {
    editor_id
    name
    summary
    description
    ts
    rfp_id
    timeline
    labels
    submission_deadline
    linked_proposals
  }
}`;



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


    const variables = {
        where: {
            rfp_id: {
                _eq: rfpId as string
            }
        },
    };

    const loadRFP = useCallback(async () => {
        if(rfpId){
            const rfp = await ViewMethod("forum.potlock.near", "get_rfp", {
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

    async function fetchGraphQL(
        operationsDoc: string,
        operationName: string,
        variables: { where: { rfp_id: { _eq: string } } }
    ) {
        return fetch(QUERYAPI_ENDPOINT, {
            method: "POST",
            headers: { "x-hasura-role": "bos_forum_potlock_near" },
            body: JSON.stringify({
                query: operationsDoc,
                variables: variables,
                operationName: operationName,
            }),
        })
            .then((data) => data.json())
            .then((result) => {
                if (result.data) {
                    const data = result.data?.[queryName];
                    const rfpData = data?.map((item: any) => {
                        const rfpData = {
                            ...item,
                            timestamp: item.ts,
                            timeline: JSON.parse(item.timeline),
                        };
                        delete rfpData.ts;
                        return rfpData;
                    });
                    //console.log(rfpData)
                    setSnapshotHistory(rfpData)
                    //setRFP(rfpData);
                }
        });
    }    

    useEffect(() => {
        try {
            fetchGraphQL(query, "GetLatestSnapshot", variables);
        } catch (error) {
            console.error(error);
        }
    }, [rfpId]);

    const fetchApprovedRfpProposals = useCallback(async () => {
        if (!rfp?.linked_proposals) {
            setApprovedProposals([]);
            setIsLoading(false);
            return;
        }

        const proposalQueryName = "bos_forum_potlock_near_ai_pgf_indexer_proposals_with_latest_snapshot";
        const proposalQuery = `query GetLatestSnapshot($offset: Int = 0, $limit: Int = 10, $where: ${proposalQueryName}_bool_exp = {}) {
            ${proposalQueryName}(
                offset: $offset
                limit: $limit
                order_by: {proposal_id: desc}
                where: $where
            ) {
                proposal_id
                name
                timeline
            }
        }`;

        const FETCH_LIMIT = 50;
        const variables = {
            limit: FETCH_LIMIT,
            offset: 0,
            where: {
                proposal_id: { _in: rfp.linked_proposals },
            },
        };

        try {
            const response = await fetch(QUERYAPI_ENDPOINT, {
                method: "POST",
                headers: { "x-hasura-role": "bos_forum_potlock_near" },
                body: JSON.stringify({
                    query: proposalQuery,
                    variables: variables,
                    operationName: "GetLatestSnapshot",
                }),
            });

            const result = await response.json();

            if (result.data) {
                const data = result.data?.[proposalQueryName];
                const approved = data.filter((item: any) => {
                    const timeline = JSON.parse(item.timeline);
                    return isProposalApproved(timeline.status);
                });
                setApprovedProposals(approved);
            }
        } catch (error) {
            console.error("Error fetching approved proposals:", error);
        } finally {
            setIsLoading(false);
        }
    }, [rfp]);

    useEffect(() => {
        if (rfp) {
            fetchApprovedRfpProposals();
        }
    }, [rfp, fetchApprovedRfpProposals]);

    //console.log(approvedProposals)

    const social = new Social({
        contractId: 'social.near',
    });

    const getTotalComments = async () => {
        const result:any = await social.index({
            action: 'comment',
            key: {
                type: "social",
                path: `forum.potlock.near/post/main`,
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
                path: `forum.potlock.near/post/main`,
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
            <div className="w-full max-w-[1700px] mx-auto relative bg-aipgf-white overflow-hidden gap-[4.093rem] leading-[normal] tracking-[normal] sm:gap-[1rem] mq825:gap-[2.063rem] md:px-[5rem]">
                <div className="flex justify-center items-center">
                    {
                        rfp&&(
                            <div className="mq825:px-5 w-full mt-10 mq825:mt-4 pb-20 flex flex-col gap-4">
                                <div className="p-6 rounded-lg shadow-sm border-aipgf-geyser border-[1px] border-solid box-border w-full">
                                    <button  
                                        style={{
                                            borderColor:
                                            timelineStyle[
                                                rfp?.timeline?.status
                                            ],
                                        }}
                                        className="cursor-pointer border-aipgf-geyser border-[1px] border-solid box-border bg-white hover:bg-stone-50 h-8 p-1 px-4 rounded-full flex flex-row gap-1 items-center">
                                        {/* <img width={16} src="/assets/icon/pen.svg" alt="icon" /> */}
                                        <small
                                            style={{
                                                color:
                                                timelineStyle[
                                                    rfp?.timeline
                                                        ?.status
                                                ],
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
                                    </button>
                                    <h1 className="text-2xl md:max-w-[800px] w-full font-semibold text-gray-900 mb-2 mt-1">
                                        {rfp?.name}
                                    </h1>
                                    <p className="text-sm text-gray-500">
                                        <Link target="_blank" href={`https://bos.potlock.org/?tab=profile&accountId=${authorId}`} className="hover:underline font-semibold no-underline" style={{color: "unset"}}>{sliceAddress(authorId)}</Link> created on {readableDate(rfp?.timestamp/1000000)}
                                    </p>
                                </div>
                                {
                                    rfp?.timeline?.status === "ACCEPTING_SUBMISSIONS" && (
                                        <div className="flex justify-between items-center bg-blue-100 bg-opacity-60 p-4 rounded-lg">
                                            <div className="gap-1">
                                                <p className="text-black font-semibold text-[19px]">This RFP is accepting submissions.</p>
                                                <p className="text-gray-600 text-sm">Click Submit Proposal if you want to submit a proposal.</p>
                                            </div>
                                            <Link href="/proposals/create-proposal" style={{color: "white", textDecoration: "none"}} className="text-white rounded-full px-4 py-2 outline-none bg-[#3C697D] flex flex-row gap-1 items-center cursor-pointer hover:bg-opacity-80">
                                                {/* <img width={16} src="/assets/icon/view.svg" alt="icon" /> */}
                                                <span className="text-[15px] font-semibold">Submit Proposal</span>
                                            </Link>
                                        </div>
                                    )
                                }
                                <div className="flex flex-col-reverse md:flex-row gap-4 w-full justify-between mt-12">
                                    <div className="flex gap-2 items-start md:max-w-6xl">
                                        <div className="h-14 w-14">
                                            <AvatarProfile accountId={authorId} size={40} style="hidden md:block" />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="w-full mx-auto border-[1px] border-aipgf-geyser border-solid box-border rounded-lg">
                                                <div className="flex items-center justify-between mb-2 bg-gray-100 bg-opacity-10 rounded-t-lg p-4 py-1">
                                                    <div className="flex flex-row gap-2 items-center">
                                                        <p className="text-sm">
                                                            <Link target="_blank" href={`https://bos.potlock.org/?tab=profile&accountId=${authorId}`} className="hover:underline font-semibold no-underline capitalize" style={{color: "unset"}}>{authorId}</Link> created RFP
                                                        </p>
                                                        <p className="text-xs text-gray-500">{timeAgo(rfp?.timestamp)}</p>
                                                    </div>
                                                    <div className="flex flex-row gap-5 items-center">
                                                        <span className="text-sm text-gray-500 bg-transparent outline-none p-3 py-1 pt-1 border-[1px] border-aipgf-geyser border-solid box-border rounded-lg">Author</span>
                                                        <button className="bg-transparent outline-none text-gray-500 cursor-pointer">
                                                            <img width={20} src="/assets/icon/dots.svg" alt="icon" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="p-4">
                                                    <div className="mb-6">
                                                        <h2 className="text-sm font-semibold text-gray-700 border-b-[1px] border-aipgf-geyser border-solid box-border pb-2">RFP CATEGORY</h2>
                                                        {/* <ProposalCategoryDropdown
                                                            options={categoryOptions}
                                                            selectedOption={selectedCategory}
                                                            onSelect={setSelectedCategory}
                                                        /> */}
                                                        <div className="flex flex-row gap-2">
                                                            {rfp.labels?.map((data) => (
                                                                <Tag
                                                                    key={data}
                                                                    propBackgroundColor={
                                                                        labelIcons[data]?.color ?? "#b7b7b7"
                                                                    }
                                                                    propWidth="max-content"
                                                                    x={`/${labelIcons[data]?.icon}`}
                                                                    cancel={data}
                                                                    propFontWeight="unset"
                                                                    propColor={
                                                                        labelIcons[data]?.textColor ?? "#000"
                                                                    }
                                                                    cancelFontSize="0.75rem"
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="mb-6">
                                                        <h2 className="text-sm font-semibold text-gray-700 border-b-[1px] border-aipgf-geyser border-solid box-border pb-2">SUMMARY</h2>
                                                        <p className="text-sm text-gray-700 mt-2">{rfp?.summary}</p>
                                                    </div>
                                                    <div className="mb-6">
                                                        <h2 className="text-sm font-semibold text-gray-700 border-b-[1px] border-aipgf-geyser border-solid box-border pb-2">DESCRIPTION</h2>
                                                        <Markdown options={{ 
                                                            overrides: {
                                                                img: {
                                                                    props: {
                                                                        className: "w-full h-auto",
                                                                    }
                                                                },
                                                                a: {
                                                                    props: {
                                                                        className: "text-green-600",
                                                                        target: "_blank",
                                                                    }
                                                                }
                                                            }
                                                        }}>
                                                            {rfp?.description}
                                                        </Markdown>
                                                    </div>
                                                    <div className="flex items-center space-x-4 mt-4">
                                                        <button className="flex items-center space-x-1 bg-transparent outline-none text-gray-500 cursor-pointer">
                                                            <img width={16} src="/assets/icon/heart.svg" alt="icon" />
                                                            <span className="text-[15px]">{totalVotes}</span>
                                                        </button>
                                                        <button className="flex items-center space-x-1 bg-transparent outline-none text-gray-500 cursor-pointer">
                                                            <img width={20} src="/assets/icon/comment.svg" alt="icon" />
                                                            <span className="text-[15px]">{totalComments}</span>
                                                        </button>
                                                        <button onClick={copyToClipboard} className="flex items-center space-x-1 bg-transparent outline-none text-gray-500 cursor-pointer">
                                                            <img width={20} src="/assets/icon/link.svg" alt="icon" />
                                                        </button>
                                                        <button className="flex items-center space-x-1 bg-transparent outline-none text-gray-500 cursor-pointer">
                                                            <img width={20} src="/assets/icon/share.svg" alt="icon" />
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <CommentsAndLogs snapshotHistory={history} latestSnapshot={rfp} block_height={blockHeight.toString()} ts={timestamp} />
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
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default RFPsDetail;