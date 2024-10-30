import NavBar from "@/components/nav-bar";
import { NextPage } from "next";
import { useRouter } from "next/router";
import CommentsAndLogs from "@/components/CommentsAndLogs";
import { useCallback, useEffect, useState } from "react";
import { ProposalDetailTypes } from "@/types/types";
import { readableDate, timeAgo } from "@/lib/common";
import { Social } from "@builddao/near-social-js";
import { labelIcons, timelineStyle } from "@/lib/constant";
import Link from "next/link";
import Markdown from 'markdown-to-jsx'
import TimeLine from "@/components/TimeLine";
import Tag from "@/components/tag";
import { proposalStatusOptions } from "@/lib/constant";
import AvatarProfile from '@/components/AvatarProfile';
import { ViewMethod } from "@/hook/near-method";
import { sliceAddress } from "@/lib/common";
const QUERYAPI_ENDPOINT = `https://near-queryapi.api.pagoda.co/v1/graphql`;

const queryName = "bos_forum_potlock_near_ai_pgf_indexer_proposals_with_latest_snapshot";
const query = `query GetLatestSnapshot($offset: Int = 0, $limit: Int = 10, $where: ${queryName}_bool_exp = {}) {
  ${queryName}(
    offset: $offset
    limit: $limit
    order_by: {ts: asc}
    where: $where
  ) {
    editor_id
    author_id
    name
    summary
    description
    ts
    proposal_id
    timeline
    labels
    linked_proposals
    linked_rfp
    requested_sponsorship_usd_amount
    requested_sponsorship_paid_in_currency
    receiver_account
    requested_sponsor
    supervisor
    block_height
  }
}`;



const ProposalPage: NextPage = () => {
    const router = useRouter();
    const { proposalId } = router.query;
    const [proposal, setProposal] = useState<ProposalDetailTypes>();
    const [totalComments, setTotalComments] = useState<number>(0);
    const [totalVotes, setTotalVotes] = useState<number>(0);
    const [verificationStatus, setVerificationStatus] = useState<string>("");
    const [blockHeight, setBlockHeight] = useState<number>(0);
    const [timestamp, setTimestamp] = useState<number>(0);
    const [history, setHistory] = useState<any>();

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
            setHistory(proposal.snapshot_history)
            setBlockHeight(proposal.social_db_post_block_height)
            setTimestamp(proposal.snapshot.timestamp)
        }
    }, [proposalId]);


    useEffect(() => {
        loadProposal();
    }, [proposalId, loadProposal]);

    //console.log(blockHeight, timestamp)

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
        variables: { where: { proposal_id: { _eq: string } } }
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
                    const history = data.map((item: any) => {
                        const proposalData = {
                            ...item,
                            timestamp: item.ts,
                            timeline: JSON.parse(item.timeline),
                        };
                        delete proposalData.ts;
                        return proposalData;
                    });
                    setProposal(history[0]);
                }
        });
    }    

    useEffect(() => {
        try {
            fetchGraphQL(query, "GetLatestSnapshot", variables);
        } catch (error) {
            console.error(error);
        }
    }, [proposalId]);

    //console.log(proposal?.receiver_account)

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

    const categoryOptions = [
        {
            bgColor: 'bg-yellow-100',
            title: 'Small Build',
            description: 'Develop focused solutions to address specific challenges.',
        },
        // Add more category options here
    ];

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

    

    return (
        <div className="flex flex-col w-full h-full">
            <NavBar />
            <div className="w-full max-w-[1700px] mx-auto relative bg-aipgf-white overflow-hidden gap-[4.093rem] leading-[normal] tracking-[normal] sm:gap-[1rem] mq825:gap-[2.063rem] md:px-[5rem]">
                <div className="flex justify-center items-center font-aipgf-manrope-semibold-1356">
                    {
                        proposal&&(
                            <div className="mq825:px-5 w-full mt-10 mq825:mt-4 pb-20 flex flex-col gap-4">
                                <div className="p-6 rounded-lg shadow-sm border-aipgf-geyser border-[1px] border-solid box-border w-full">
                                    <button  
                                        style={{
                                            borderColor:
                                            timelineStyle[
                                                proposal?.timeline?.status
                                            ],
                                        }}
                                        className="cursor-pointer border-aipgf-geyser border-[1px] border-solid box-border bg-white hover:bg-stone-50 h-8 p-1 px-4 rounded-full flex flex-row gap-1 items-center">
                                        {/* <img width={16} src="/assets/icon/pen.svg" alt="icon" /> */}
                                        <small
                                            style={{
                                                color:
                                                timelineStyle[
                                                    proposal?.timeline
                                                        ?.status
                                                ],
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
                                    <h1 className="text-2xl md:max-w-[800px] w-full font-semibold text-gray-900 mb-2 mt-1">
                                        {proposal?.name}
                                    </h1>
                                    <p className="text-sm text-gray-500">
                                        <Link target="_blank" href={`https://bos.potlock.org/?tab=profile&accountId=${proposal?.author_id}`} className="hover:underline font-semibold no-underline" style={{color: "unset"}}>{proposal?.author_id}</Link> created on {readableDate(proposal?.timestamp/1000000)}
                                    </p>
                                </div>
                                {/* <div className="flex justify-between items-center bg-gray-100 bg-opacity-10 p-4 rounded-lg">
                                    <div>
                                        <p className="text-black font-semibold">This proposal is in draft mode and open for community replies.</p>
                                        <p className="text-gray-600 text-sm">Click Submit Proposal if you want to submit a proposal.</p>
                                    </div>
                                    <button className="text-blue-500 border-[1px] border-solid border-blue-400 rounded-full px-4 py-2 outline-none hover:bg-blue-400 hover:text-white flex flex-row gap-1 items-center">
                                        <img width={16} src="/assets/icon/view.svg" alt="icon" />
                                        <span>Ready For Review</span>
                                    </button>
                                </div> */}
                                <div className="flex flex-col-reverse md:flex-row gap-4 w-full justify-between mt-12">
                                    <div className="flex gap-2 items-start md:max-w-6xl">
                                        <div className="h-14 w-14">
                                            <AvatarProfile accountId={proposal.author_id} size={40} style="hidden md:block" />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="w-full mx-auto border-[1px] border-aipgf-geyser border-solid box-border rounded-lg">
                                                <div className="flex items-center justify-between mb-2 bg-gray-100 bg-opacity-10 rounded-t-lg p-4 py-1">
                                                    <div className="flex flex-row gap-2 items-center">
                                                        <p className="text-sm">
                                                            <Link target="_blank" href={`https://bos.potlock.org/?tab=profile&accountId=${proposal?.author_id}`} className="hover:underline font-semibold no-underline capitalize" style={{color: "unset"}}>{sliceAddress(proposal?.author_id)}</Link> created RFP
                                                        </p>
                                                        <p className="text-xs text-gray-500">{timeAgo(proposal?.timestamp)}</p>
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
                                                        <h2 className="text-sm font-semibold text-gray-700 border-b-[1px] border-aipgf-geyser border-solid box-border pb-2">PROPOSAL CATEGORY</h2>
                                                        {/* <ProposalCategoryDropdown
                                                            options={categoryOptions}
                                                            selectedOption={selectedCategory}
                                                            onSelect={setSelectedCategory}
                                                        /> */}
                                                        <div className="flex flex-row gap-2">
                                                            {proposal.labels?.map((data) => (
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
                                                        <p className="text-sm text-gray-700 mt-2">{proposal?.summary}</p>
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
                                                            {proposal?.description}
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
                                            <CommentsAndLogs snapshotHistory={history} latestSnapshot={proposal} block_height={blockHeight.toString()} ts={timestamp} />
                                        </div>
                                    </div>
                                    <div className="px-4 md:w-96 md:min-w-96 rounded-lg shadow-sm space-y-4">
                                        <div className="border-b-[1px] border-aipgf-geyser border-solid box-border pb-4">
                                            <h2 className="text-lg font-semibold">Author</h2>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <AvatarProfile accountId={proposal.author_id} size={40} />
                                                <Link target="_blank" href={`https://bos.potlock.org/?tab=profile&accountId=${proposal?.author_id}`} className="hover:underline font-semibold no-underline" style={{color: "unset"}}>{sliceAddress(proposal?.author_id)}</Link>
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
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ProposalPage;