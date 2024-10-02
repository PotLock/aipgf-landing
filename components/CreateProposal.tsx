import { useState,useEffect } from "react";
import { useWalletSelector } from "@/context/WalletSelectorContext"
import AvatarProfile from "@/components/AvatarProfile"
import dynamic from "next/dynamic";
import { ProposalTypes } from "@/types/types";
import { readableDate } from "@/lib/common";

const Editor = dynamic(()=>import("@/components/Editor"),{ssr:false})

const QUERYAPI_ENDPOINT = `https://near-queryapi.api.pagoda.co/v1/graphql`;

const queryName =
    "bos_forum_potlock_near_ai_pgf_indexer_proposals_with_latest_snapshot";
const query = `query GetLatestSnapshot($offset: Int = 0, $limit: Int = 10, $where: ${queryName}_bool_exp = {}) {
    ${queryName}(
    offset: $offset
    limit: $limit
    order_by: {proposal_id: desc}
    where: $where
    ) {
    author_id
    block_height
    name
    labels
    summary
    editor_id
    proposal_id
    ts
    timeline
    views
    linked_rfp
    }
    ${queryName}_aggregate(
    order_by: {proposal_id: desc}
    where: $where
    )  {
    aggregate {
        count
    }
    }
}`;

const FETCH_LIMIT = 10;
const variables = {
    limit: FETCH_LIMIT,
    offset: 0,
    where: {},
};

const CreateProposal = () => {
    const {accountId} = useWalletSelector();
    const [isShowDropDown, setIsShowDropDown] = useState<boolean>(false)
    const [isShow, setIsShow] = useState<boolean>(false)
    const [selectReview, setSelectReview] = useState<boolean>(false)
    const [isShowDropDownCurrency,setIsShowDropDownCurrency] = useState<boolean>(false)
    const [viewAuthorDetails,setViewAuthorDetails] = useState<boolean>(false)
    const [viewFundingDetails,setViewFundingDetails] = useState<boolean>(false)

    const [proposals, setProposals] = useState<ProposalTypes[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [proposalSelected, setProposalSelected] = useState<ProposalTypes | null>(null);
    const [searchTerm, setSearchTerm] = useState<string|null>(null);

    const categories = ["A Small Build","Bounty","MVP","Quick Start"]


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

    async function fetchGraphQL(
        operationsDoc: string,
        operationName: string,
        variables: { limit: number; offset: number; where: {} }
    ) {
        setIsLoading(true);
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
            .then(async(result) => {
                if (result.data) {
                if (result.data) {
                    const data = result.data?.[queryName];
                    setProposals(data)
                }
            }
        })
        .finally(() => {
            setIsLoading(false);
        });
    }


    useEffect(() => {
        try {
            fetchGraphQL(query, "GetLatestSnapshot", variables);
        } catch (error) {
            console.error(error);
        }
    }, []);

    console.log(proposals)

    const handleProposalSelect = (proposal: ProposalTypes) => {
        setShowModal(false);
        setSearchTerm('')
        setProposalSelected(proposal)
    };

    const handleSearchProposal = (searchTerm: string) => {
        setSearchTerm(searchTerm)
        setShowModal(true)
        if (searchTerm === "") {
            fetchGraphQL(query, "GetLatestSnapshot", variables);
            setShowModal(false)
            
        } else {
            const filteredProposals = proposals.filter((proposal) => {
                const lowerCaseSearchTerm = searchTerm.toLowerCase();
                const lowerCaseTitle = proposal.name.toLowerCase();
                const lowerCaseSummary = proposal.summary.toLowerCase();
                return lowerCaseTitle.includes(lowerCaseSearchTerm) || lowerCaseSummary.includes(lowerCaseSearchTerm);
            });
            setProposals(filteredProposals);
        }
    };

    return (
        <div className="w-full max-w-[1700px] mx-auto bg-aipgf-white overflow-hidden gap-[4.093rem] leading-[normal] tracking-[normal] sm:gap-[1rem] mq825:gap-[2.063rem] md:px-[5rem] self-stretch md:pb-[8rem]">
                <div className="flex flex-col-reverse md:flex-row w-full justify-between gap-10 md:gap-20 mt-10">
                    <div className="flex flex-row gap-4 w-full">
                        {
                                windowSize?.width > 768&&(
                                    <AvatarProfile accountId={accountId as string} size={50}/>
                                )
                            }
                            <div className="flex flex-col gap-4 w-full">
                                <div className="flex flex-col gap-2">
                                    <span className="font-semibold text-xl">Category</span>
                                    <small className="text-gray-500">Select the relevant categories that best align with your contribution to the NEAR developer community.</small>
                                    <div className="w-full relative">
                                        <button onClick={()=>setIsShowDropDown((prv)=>!prv)} className="w-full bg-white focus:border-gray-100 shadow-sm cursor-pointer mt-2 border-[1px] border-aipgf-geyser box-border border-solid rounded-lg flex flex-row justify-between px-3 py-2">
                                            <span className="text-sm md:text-base">Choose Category</span>
                                            <img width={20} src="/assets/icon/arrow-down-gray.svg" alt="icon" />
                                        </button>
                                        {
                                            isShowDropDown&&(
                                                <div className="w-full absolute top-12 bg-white border-[1px] border-aipgf-geyser box-border border-solid p-3 rounded-lg h-50 shadow-lg flex flex-col gap-2">
                                                    {
                                                        categories.map((category,index)=>(
                                                            <button key={index} className="w-full text-start text-sm md:text-base bg-white hover:bg-gray-100 hover:bg-opacity-10 rounded-lg p-2 cursor-pointer">
                                                                {category}
                                                            </button>
                                                        ))
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="font-semibold text-xl">Title</span>
                                    <small className="text-gray-500">Highlight the essence of your proposal in a few words. This will appear on your proposal&#39;s detail page and the main proposal feed. Keep it short, please</small>
                                    <input className="w-full text-sm md:text-base rounded-lg px-3 py-2 outline-none border-[1px] border-aipgf-geyser box-border border-solid shadow-sm focus:border-gray-100" type="text" placeholder="Enter Title Here"/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="font-semibold text-xl">Summary</span>
                                    <small className="text-gray-500">Explain your proposal briefly. This is your chance to make a good first impression on the community. Include what needs or goals your work will address, your solution, and the benefit for the NEAR developer community.</small>
                                    <textarea className="w-full text-sm md:text-base rounded-lg px-3 py-2 outline-none border-[1px] border-aipgf-geyser border-solid shadow-sm focus:border-gray-500 h-32 resize-none" placeholder="Enter Summary Here"/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="font-semibold text-xl">Description</span>
                                    <small className="text-gray-500">Expand on your summary with any relevant details like your contribution timeline, key milestones, team background, and a clear breakdown of how the funds will be used. Proposals should be simple and clear (e.g. 1 month). For more complex projects, treat each milestone as a separate proposal.</small>
                                    <Editor/>
                                </div>
                                <div className="flex flex-col gap-2 mt-16">
                                    <span className="font-semibold text-xl">Final Consent</span>
                                    <div className="flex flex-col gap-1 mt-2">
                                        <div className="flex flex-col gap-4">
                                            <div className="cntr flex flex-row items-start gap-2">
                                                <input type="checkbox" id="cbx" className="hidden-xs-up"/>
                                                <label htmlFor="cbx" className="cbx"></label>
                                                <span>I&#39;ve agree to AIPGF&#39;s <strong className="underline">Terms and Conditions</strong> and commit to honoring it</span>
                                            </div>
                                            <div className="cntr flex flex-row items-start gap-2">
                                                <input type="checkbox" id="cbx1" className="hidden-xs-up"/>
                                                <label htmlFor="cbx1" className="cbx"></label>
                                                <span>I&#39;ve agree to AIPGF&#39;s <strong className="underline">Code of Conduct</strong> and commit to honoring it</span>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between w-full md:justify-end items-center md:gap-10 mt-10 pb-[10rem]">
                                    <button className="bg-white cursor-pointer">
                                        <span className="text-[#818181] font-semibold md:text-base text-sm">Discard Changes</span>
                                    </button>
                                    <div className="border-[1px] border-aipgf-geyser border-solid rounded-full flex flex-row">
                                            <button className="flex md:text-base text-sm flex-row gap-2 px-3 py-2 items-center hover:bg-gray-100 hover:bg-opacity-30 rounded-l-full">
                                                {
                                                    selectReview?(
                                                        <button className="flex flex-row items-center gap-2 bg-transparent cursor-pointer">
                                                            <div className="w-2 h-2 bg-[#04A46E] rounded-full"/>
                                                            <span>Ready for review</span>
                                                        </button>
                                                    ):
                                                    (
                                                        <button className="flex flex-row items-center gap-2 bg-transparent cursor-pointer">
                                                            <div className="w-2 h-2 bg-[#979A9C] rounded-full"/>
                                                            <span>Submit draft</span>
                                                        </button>
                                                    )
                                                }
                                            </button>
                                            <button onClick={()=>setIsShow((prv)=>!prv)} className="border-l-[1px] border-aipgf-geyser border-solid px-3 py-2 hover:bg-gray-100 hover:bg-opacity-30 rounded-r-full">
                                                <img width={20} src="/assets/icon/arrow-down-gray.svg" alt="icon" />
                                            </button>
                                        </div>
                                    <div className="relative">
                                        {
                                            isShow&&(
                                                <div className="absolute top-6 right-0">
                                                    <div className="border-[1px] border-aipgf-geyser border-solid  box-border shadow-sm p-3 rounded-lg w-64 bg-white md:text-base text-sm">
                                                        <div className="flex flex-col gap-2">
                                                            <button onClick={()=>{
                                                                setIsShow(false)
                                                                setSelectReview(false)
                                                            }} className="flex flex-row gap-3 items-start text-start bg-white cursor-pointer hover:bg-gray-100 hover:bg-opacity-10 rounded-lg p-2">
                                                                <div className="h-2 w-2 mt-1">
                                                                    <div className="w-2 h-2 bg-[#979A9C] rounded-full"/>
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <small className="font-semibold">Submit draft</small>
                                                                    <p className="text-xs">The author can still edit the proposal and build consensus before sharing it with sponsors.</p>
                                                                </div>
                                                            </button>
                                                            <div className="w-full border-[1px] border-aipgf-geyser border-solid h-[1px]"/>
                                                            <button onClick={()=>{
                                                                setIsShow(false)
                                                                setSelectReview(true)
                                                            }} className="flex flex-row gap-3 items-start text-start bg-white cursor-pointer hover:bg-gray-100 hover:bg-opacity-10 rounded-lg p-2">
                                                                <div className="h-2 w-2 mt-1">
                                                                    <div className="w-2 h-2 bg-[#04A46E] rounded-full"/>
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <small className="font-semibold">Ready for review</small>
                                                                    <p className="text-xs">Start the official review process with sponsors. This will lock the editing function, but comments are still open.</p>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>

                                </div>
                            </div>
                    </div>
                    <div className="md:w-[30rem] w-full">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row justify-between items-center">
                                <span className="text-lg md:text-xl text-[#57606A] font-semibold">Author Details</span>
                                {
                                    windowSize?.width < 768&&(
                                        <button onClick={()=>setViewAuthorDetails((prv)=>!prv)}>
                                            <img width={22} src="/assets/icon/arrow-down-gray.svg" alt="icon" />
                                        </button>
                                    )
                                }
                            </div>
                            {
                                !viewAuthorDetails&&(
                                    <div className="flex flex-col gap-2 mt-1">
                                        <div className="flex flex-col gap-2 pb-3">
                                            <span>Author</span>
                                            <div className="flex flex-row gap-3 items-center">
                                                <AvatarProfile accountId={accountId as string} size={35}/>
                                                <span>Adrian Robison</span>
                                            </div>
                                        </div>
                                        <div className="w-full h-[1px] bg-aipgf-geyser"/>
                                        <div className="flex flex-col gap-3 pb-5 mt-2">
                                            <span>Link Proposals (Optional)</span>
                                            <small className="text-gray-500">Link any relevant proposals(e.g Previous milestones).</small>
                                            {proposalSelected && (
                                                <div className="flex flex-row gap-2 items-center md:items-start w-full justify-between">
                                                    <div className="flex flex-row gap-2 items-center">
                                                        <AvatarProfile accountId={proposalSelected.author_id as string} size={30} />
                                                        <div className="flex flex-col">
                                                            <small>#{proposalSelected.proposal_id}: {proposalSelected.name}</small>
                                                            <small className="text-xs">created on {readableDate(proposalSelected.ts/1000000)}</small>
                                                        </div>
                                                    </div>
                                                    <button className="bg-white cursor-pointer" onClick={() => setProposalSelected(null)}>
                                                        <img width={14} src="/assets/icon/delete.svg" alt="icon" />
                                                    </button>
                                                </div>
                                            )}
                                            <div className="relative">
                                                <div className="flex flex-row h-full w-full justify-between border-[1px] border-aipgf-geyser border-solid p-2 px-3 rounded-lg cursor-pointer">
                                                    <input value={searchTerm as string} type="text" className="outline-none md:text-base text-sm" placeholder="Search Proposal" onChange={(e) => handleSearchProposal(e.target.value)}/>
                                                    <button onClick={() => setShowModal(!showModal)} className="bg-white">
                                                        <img width={windowSize?.width < 768 ? 17 : 23} src="/assets/icon/arrow-down-gray.svg" alt="arrow" />
                                                    </button>
                                                </div>
                                                {showModal && (
                                                    <div className="absolute z-10 mt-1 w-full bg-white border border-aipgf-geyser rounded-lg shadow-lg p-2">
                                                        <div className="max-h-60 overflow-y-auto flex flex-col gap-2">
                                                            {proposals.map((proposal, index) => (
                                                                <div key={index} style={{
                                                                    textDecoration: "none"
                                                                }} className="p-2 hover:bg-gray-100 hover:bg-opacity-10 cursor-pointer rounded-lg" onClick={() => handleProposalSelect(proposal)}>
                                                                    <div className="flex gap-2 items-start">
                                                                        <AvatarProfile accountId={proposal.author_id as string} size={35}/>
                                                                        <div className="flex flex-col gap-1">
                                                                            <div className="font-semibold text-sm">{proposal.name}</div>
                                                                            <div className="text-xs text-gray-500">created on {readableDate(proposal?.ts/1000000)}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            <div className="w-full h-[1px] bg-aipgf-geyser"/>
                            <div className="mt-5">
                                <div className="flex flex-row justify-between items-center pb-3 md:pb-0">
                                    <span className="text-lg md:text-xl text-[#57606A] font-semibold">Funding Details</span>
                                    {
                                        windowSize?.width < 768&&(
                                            <button onClick={()=>setViewFundingDetails((prv)=>!prv)}>
                                                <img width={22} src="/assets/icon/arrow-down-gray.svg" alt="icon" />
                                            </button>
                                        )
                                    }
                                </div>
                                {
                                    !viewFundingDetails&&(
                                        <div className="flex flex-col gap-5 mt-4 pb-5">
                                            <span>Recipient NEAR Wallet Address</span>  
                                            <small className="text-gray-500">Enter the address that will receive the funds. We&#39;ll need this to send a test transaction once your proposal is approved.</small>
                                            <div className="flex flex-row gap-2 items-center md:gap-3 border-[1px] border-aipgf-geyser border-solid rounded-lg p-2 px-3 mt-3">
                                                <span className="text-[#6f7479] md:text-base text-sm">@</span>
                                                <input type="text" className="outline-none md:text-base text-sm" placeholder="Enter Address"/>
                                            </div>
                                            <div className="flex flex-row gap-1 items-center">
                                                <span>Recipient Verification Status</span>
                                                <img width={20} src="/assets/icon/information.svg" alt="icon" />
                                            </div>
                                            <div className="border-[1px] border-aipgf-geyser border-solid rounded-lg p-2 px-3 flex flex-row justify-between items-center">
                                                <div className="flex flex-row gap-3 items-center">
                                                    <img width={20} src="/assets/icon/warning.svg" alt="icon" />
                                                    <div className="flex flex-col">
                                                        <span>Fractal</span>
                                                        <small>Not Verified</small>
                                                    </div>
                                                </div>
                                                <button className="flex flex-row items-center gap-2 bg-black text-white p-2 px-3 rounded-full cursor-pointer">
                                                    <small>Get Verified</small>
                                                    <img width={17} src="/assets/icon/arrow-square-out.svg" alt="icon" />
                                                </button>
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <span>Total Amount (USD)</span>
                                                <small className="text-xs text-gray-500">Enter the exact amount you are requesting in USD. See <strong>Funding Documentation</strong> for guidelines.</small>
                                                <div className="border-[1px] border-aipgf-geyser border-solid rounded-lg p-2 px-3 flex flex-row gap-2 items-center md:gap-3">
                                                    <span className="text-[#6f7479] md:text-base text-sm">$</span>
                                                    <input type="text" className="outline-none md:text-base text-sm" placeholder="0.00" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <span>Currency</span>
                                                <small className="text-xs text-gray-500">Select your preferred currency for receiving funds. Note: The exchange rate for NEAR tokens will be the closing rate at the day of the invoice.</small>
                                                <button disabled className="border-[1px] border-aipgf-geyser border-solid bg-white items-center rounded-lg p-2 px-3 flex flex-row justify-between gap-3">
                                                    <span className="text-[#6f7479] text-sm md:text-base">USDC</span>
                                                    <img width={20} src="/assets/icon/arrow-down-gray.svg" alt="icon" />
                                                </button>
                                                {
                                                    isShowDropDownCurrency&&(
                                                        <div className="relative">
                                                            <div className="w-full absolute -top-2 bg-white border-[1px] border-aipgf-geyser border-solid p-3 rounded-lg h-20 shadow-sm">

                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <span>Requested Sponsor</span>
                                                <div className="border-[1px] border-aipgf-geyser border-solid rounded-lg p-2 px-3 flex flex-row gap-2 items-center md:gap-3">
                                                    <span className="text-[#6f7479] md:text-base text-sm">@</span>
                                                    <input type="text" className="outline-none md:text-base text-sm" placeholder="Enter Address" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <span>Supervisor (Optional)</span>
                                                <div className="border-[1px] border-aipgf-geyser border-solid rounded-lg p-2 px-3 flex flex-row gap-2 items-center md:gap-3">
                                                    <span className="text-[#6f7479] md:text-base text-sm">@</span>
                                                    <input type="text" className="outline-none md:text-base text-sm" placeholder="Enter Address" />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                <div className="w-full h-[1px] bg-aipgf-geyser"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default CreateProposal;