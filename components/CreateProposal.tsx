import { useState,useEffect, useMemo } from "react";
import { useWalletSelector } from "@/context/WalletSelectorContext"
import AvatarProfile from "@/components/AvatarProfile"
import dynamic from "next/dynamic";
import { ProposalTypes } from "@/types/types";
import { readableDate } from "@/lib/common";
import { ViewMethod } from "@/hook/near-method";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from 'react-hot-toast';
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ArrowSquareOut } from "@phosphor-icons/react";

const Editor = dynamic(()=>import("@/components/Editor"),{ssr:false})

const CreateProposal = () => {
    const router = useRouter();
    const { id, timestamp, rfpId } = router.query;
    const isEditPage = typeof id === "string";
    const {accountId,selector} = useWalletSelector();

    const [isShowDropDown, setIsShowDropDown] = useState<boolean>(false)
    const [isShow, setIsShow] = useState<boolean>(false)
    const [isShowDropDownCurrency,setIsShowDropDownCurrency] = useState<boolean>(false)
    const [viewAuthorDetails,setViewAuthorDetails] = useState<boolean>(false)
    const [viewFundingDetails,setViewFundingDetails] = useState<boolean>(false)

    const [proposals, setProposals] = useState<ProposalTypes[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [proposalSelected, setProposalSelected] = useState<ProposalTypes | null>(null);
    const [searchTerm, setSearchTerm] = useState<string|null>(null);
    const [editProposalData, setEditProposalData] = useState<any| null>(null);
    

    const [linkedRfp, setLinkedRfp] = useState<number|null>(rfpId ? parseInt(rfpId as string) : null);
    const [labels, setLabels] = useState<any>([]);
    const [title, setTitle] = useState<any>(null);
    const [description, setDescription] = useState<any>(null);
    const [summary, setSummary] = useState<any>(null);
    const [consent, setConsent] = useState({ toc: false, coc: false });
    const [linkedProposals, setLinkedProposals] = useState<any>([]);
    const [requestedSponsorshipAmount, setRequestedSponsorshipAmount] = useState<any>(null);
    const [allowDraft, setAllowDraft] = useState<boolean>(true);
    const [receiverAccount, setReceiverAccount] = useState<any>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [disabledSubmitBtn, setDisabledSubmitBtn] = useState<boolean>(false);
    const [isDraftBtnOpen, setDraftBtnOpen] = useState<boolean>(false);
    const [selectedStatus, setSelectedStatus] = useState<string>("draft");
    const [isReviewModalOpen, setReviewModal] = useState<boolean>(false);

    const [showProposalViewModal, setShowProposalViewModal] = useState<boolean>(false); // when user creates/edit a proposal and confirm the txn, this is true
    const [proposalId, setProposalId] = useState<any>(null);
    const [proposalIdsArray, setProposalIdsArray] = useState<any>(null);
    const [isTxnCreated, setCreateTxn] = useState<boolean>(false);
    const [oldProposalData, setOldProposalData] = useState<any>(null);
    const [supervisor, setSupervisor] = useState<any>(null);
    const [isModerator, setIsModerator] = useState<boolean>(false);
    const [draftProposalData, setDraftProposalData] = useState<any>(null);
    const [transactionHashes, setTransactionHashes] = useState<string|null>(null);

    const [selectedCategory, setSelectedCategory] = useState<string>("Choose Category");

    const btnOptions = [
        {
            label: "Submit Draft",
            description:
                "The author can still edit the proposal and build consensus before sharing it with sponsors.",
            value: "draft",
        },
        {
            label: "Ready for Review",
            description:
                "Start the official review process with sponsors. This will lock the editing function, but comments are still open.",
            value: "review",
        },
    ];

    const categories = ["A Small Build","Bounty","MVP","Quick Start"]
    const tokensOptions = [
        { label: "NEAR", value: "NEAR" },
        { label: "USDT", value: "USDT" },
        {
            label: "USDC", 
            value: "USDC",
        },
        {
            label: "Other",
            value: "OTHER",
        },
    ];
    const [selectedToken, setSelectedToken] = useState(tokensOptions[2]);    

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

    useEffect(() => {
        if (allowDraft) {
            const draftProposalData = localStorage.getItem("AI_PGF_PROPOSAL_EDIT");
            if (draftProposalData) {
                setDraftProposalData(JSON.parse(draftProposalData));
            }
        }
    }, [allowDraft]);

    const loadProposal = async(proposalId:number) => {
        if(proposalId){
            const proposal = await ViewMethod(
                process.env.NEXT_PUBLIC_NETWORK=="mainnet"
                ?process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT ?? ""
                :process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT_TESTNET ?? "", 
                "get_proposal", 
                {
                    proposal_id: proposalId
                }
            );
            return proposal
        }
    }

    useEffect(() => {
        if (isEditPage) {
            try{
                loadProposal(parseInt(id as string)).then(setEditProposalData);
            }catch(error){
                console.error(error)
            }
        }
    }, [isEditPage, id]);

    useEffect(() => {
        if(accountId){
            const loadIsModerator = async()=>{
                const isModerator = await ViewMethod(
                    process.env.NEXT_PUBLIC_NETWORK=="mainnet"
                    ?process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT ?? ""
                    :process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT_TESTNET ?? "", 
                    "is_allowed_to_write_rfps", 
                    {
                        editor: accountId
                    }
                );
                setIsModerator(isModerator)
            }
            loadIsModerator()
        }
    }, [accountId]);

    const memoizedDraftData = useMemo(
        () => ({
            id: editProposalData?.id ?? null,
            snapshot: {
                linked_rfp: linkedRfp,
                name: title,
                description: description,
                labels: labels,
                summary: summary,
                requested_sponsorship_usd_amount: requestedSponsorshipAmount,
                requested_sponsorship_paid_in_currency: selectedToken.value,
                receiver_account: accountId,
            },
        }),
        [
            linkedRfp,
            title,
            summary,
            description,
            labels,
            requestedSponsorshipAmount,
            selectedToken,
            accountId,
        ],
    );

    useEffect(() => {
        if (showProposalViewModal) {
            return;
        }
        setDisabledSubmitBtn(
            isTxnCreated ||
            !title ||
            !description ||
            !summary ||
            !(labels ?? []).length ||
            !requestedSponsorshipAmount ||
            !receiverAccount ||
            !consent.toc ||
            !consent.coc,
        );
        const handler = setTimeout(() => {
            localStorage.setItem("AI_PGF_PROPOSAL_EDIT", JSON.stringify(memoizedDraftData));
        }, 10000);
        
        return () => clearTimeout(handler);
    }, [
        memoizedDraftData,
        draftProposalData,
        consent,
        isTxnCreated,
        showProposalViewModal,
    ]);

    //console.log(draftProposalData)

    useEffect(() => {
        if (allowDraft) {
            let data = editProposalData || draftProposalData;
            let snapshot = data?.snapshot;
            if (data) {
                if (timestamp) {
                snapshot =
                    data?.snapshot_history.find((item:any) => item.timestamp === timestamp) ??
                    data?.snapshot;
                }
                if (
                draftProposalData &&
                editProposalData &&
                editProposalData.id === JSON.parse(draftProposalData).id
                ) {
                snapshot = {
                    ...editProposalData.snapshot,
                    ...JSON.parse(draftProposalData).snapshot,
                };
                }
                if (!Number.isFinite(linkedRfp)) {
                    setLinkedRfp(snapshot.linked_rfp);
                }
                    setLabels(snapshot.labels ?? []);
                    setTitle(snapshot.name);
                    setSummary(snapshot.summary);
                    setDescription(snapshot.description);
                    setReceiverAccount(snapshot.receiver_account);
                    setRequestedSponsorshipAmount(snapshot.requested_sponsorship_usd_amount);
                    setSupervisor(snapshot.supervisor);
        
                const token = tokensOptions.find(
                (item) =>
                    item.value === snapshot.requested_sponsorship_paid_in_currency,
                );
                setSelectedToken(token ?? tokensOptions[2]);
                if (isEditPage) {
                setConsent({ toc: true, coc: true });
                }
            }
        }
    }, [editProposalData, draftProposalData, allowDraft]);


    useEffect(() => {
        const handler = setTimeout(() => {
            setAllowDraft(false);
            setLoading(false);
        }, 500);
        return () => clearTimeout(handler);
    }, []);


      // set RFP labels, disable link rfp change when linked rfp is past accepting stage
    const [disabledLinkRFP, setDisableLinkRFP] = useState<boolean>(false);

    useEffect(() => {
        if (linkedRfp) {
            ViewMethod(process.env.NEXT_PUBLIC_NETWORK=="mainnet"
            ?process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT ?? ""
            :process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT_TESTNET ?? "", "get_rfp", {
                rfp_id: linkedRfp
            }).then((i) => {
                const timeline = JSON.parse(i.snapshot.timeline);
                setDisableLinkRFP(
                    !isModerator &&
                    timeline.status !== 'ACCEPTING_SUBMISSIONS',
                );
                setLabels(i.snapshot.labels);
            });
        }
    }, [linkedRfp, isModerator]);proposals

    useEffect(() => {
        if (
            editProposalData &&
            editProposalData?.snapshot?.linked_proposals?.length > 0
        ) {
            editProposalData.snapshot.linked_proposals.forEach(async (item:any) => {
                try {
                    const proposal = await ViewMethod(process.env.NEXT_PUBLIC_NETWORK=="mainnet"
                    ?process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT ?? ""
                    :process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT_TESTNET ?? "", "get_proposal", {
                        proposal_id: parseInt(item)
                    });
                    setLinkedProposals((prevProposals:any) => [
                        ...prevProposals,
                        {
                            label: "# " + proposal.id + " : " + proposal.snapshot.name,
                            value: proposal.id,
                        },
                    ]);
                } catch (error) {
                    console.error("Error fetching linked proposal:", error);
                }
            });
        }
    }, [editProposalData]);

    // show proposal created after txn approval for popup wallet
    useEffect(() => {
        if (isTxnCreated) {
            if (editProposalData) {
                setOldProposalData(editProposalData);
                if (
                    editProposalData &&
                    typeof editProposalData === "object" &&
                    oldProposalData &&
                    typeof oldProposalData === "object" &&
                    JSON.stringify(editProposalData) !== JSON.stringify(oldProposalData)
                ) {
                    setCreateTxn(false);
                    setProposalId(editProposalData.id);
                    setShowProposalViewModal(true);
                }
            } else {
                ViewMethod(process.env.NEXT_PUBLIC_NETWORK=="mainnet"
                ?process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT ?? ""
                :process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT_TESTNET ?? "", "get_all_proposal_ids", {})
                    .then((proposalIds) => {
                        if (Array.isArray(proposalIds) && !proposalIdsArray) {
                            setProposalIdsArray(proposalIds);
                        }
                        if (
                            Array.isArray(proposalIds) &&
                            Array.isArray(proposalIdsArray) &&
                            proposalIds.length !== proposalIdsArray.length
                        ) {
                            setCreateTxn(false);
                            setProposalId(proposalIds[proposalIds.length - 1]);
                            setShowProposalViewModal(true);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching proposal IDs:", error);
                    });
            }
        }
        setLoading(false);
    }, [isTxnCreated, editProposalData, oldProposalData, proposalIdsArray]);

    useEffect(() => {
        if (transactionHashes) {
            setLoading(true);
            fetch(`${process.env.NEXT_PUBLIC_NETWORK=="mainnet"
                    ?process.env.NEXT_PUBLIC_NEAR_RPC_URL
                    :process.env.NEXT_PUBLIC_NEAR_RPC_URL_TESTNET}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    jsonrpc: "2.0",
                    id: "dontcare",
                    method: "tx",
                    params: [transactionHashes, accountId],
                }),
            })
            .then(response => response.json())
            .then(data => {
                const transaction_method_name = data?.result?.transaction?.actions[0]?.FunctionCall?.method_name;

                const is_edit_or_add_post_transaction =
                    transaction_method_name === "add_proposal" ||
                    transaction_method_name === "edit_proposal";

                if (is_edit_or_add_post_transaction) {
                    setShowProposalViewModal(true);
                    localStorage.removeItem("AI_PGF_PROPOSAL_EDIT");
                }

                if (transaction_method_name === "add_proposal") {
                    ViewMethod(
                        process.env.NEXT_PUBLIC_NETWORK === "mainnet" 
                        ? process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT ?? ""
                        : process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT_TESTNET ?? "",
                        "get_all_proposal_ids",
                        {}
                    )
                    .then((proposalIdsArray) => {
                        setProposalId(proposalIdsArray[proposalIdsArray.length - 1]);
                    })
                    .catch(error => {
                        console.error("Error fetching proposal IDs:", error);
                    });
                } else {
                    setProposalId(id);
                }
            })
            .catch(error => {
                console.error("Error fetching transaction:", error);
            })
            .finally(() => {
                setLoading(false);
            });
        } else if (showProposalViewModal) {
            setShowProposalViewModal(false);
        }
    }, [transactionHashes, accountId, id]);

    const onSubmit = async ({ isDraft, isCancel }: { isDraft: boolean; isCancel?: boolean }) => {
        try {
            setCreateTxn(true);
            const wallet = await selector.wallet();
            
            const linkedProposalsIds = linkedProposals.map((item: { value: string }) => item.value) ?? [];
            const body = {
                proposal_body_version: "V1",
                linked_rfp: linkedRfp,
                category: "AI PGF",
                name: title,
                description: description,
                summary: summary,
                linked_proposals: linkedProposalsIds,
                requested_sponsorship_usd_amount: requestedSponsorshipAmount,
                requested_sponsorship_paid_in_currency: selectedToken.value,
                receiver_account: receiverAccount,
                requested_sponsor: "impact.sputnik-dao.near",
                supervisor: supervisor,
                timeline: isCancel
                    ? {
                        status: "CANCELLED",
                        sponsor_requested_review: false,
                        reviewer_completed_attestation: false,
                    }
                    : isDraft
                        ? { status: "DRAFT" }
                        : {
                            status: "REVIEW",
                            sponsor_requested_review: false,
                            reviewer_completed_attestation: false,
                        },
            };
            
            const args:any = {
                labels: linkedRfp ? [] : (labels ?? []).map((i: { value: string }) => i.value ?? i),
                body: body,
            };
            
            if (isEditPage && editProposalData) {
                args['id'] = editProposalData.id;
            }

            // Show loading toast
            const loadingToast = toast.loading(
                isEditPage 
                    ? 'Updating proposal...' 
                    : 'Creating proposal...'
            );
            
            await wallet.signAndSendTransaction({
                callbackUrl: `${window.location.origin}/create-proposal`,
                actions: [
                    {
                        type: "FunctionCall",
                        params: {
                            methodName: isEditPage ? "edit_proposal" : "add_proposal",
                            args: args,
                            gas: "270000000000000",
                            deposit: "100000000000000000000000",
                        }
                    }
                ],
            });

            // Dismiss loading toast and show success
            toast.dismiss(loadingToast);
            toast.success(
                isEditPage 
                    ? 'Proposal updated successfully!' 
                    : 'Proposal created successfully!'
            );

        } catch (error) {
            console.error('Error submitting proposal:', error);
            // Show error toast
            toast.error(
                'Error submitting proposal. Please try again.'
            );
            setCreateTxn(false);
        }
    };

    const cleanDraft = () => {
        localStorage.removeItem("AI_PGF_PROPOSAL_EDIT");
    }

    const handleProposalSelect = (proposal: ProposalTypes) => {
        setShowModal(false);
        setSearchTerm('')
        setProposalSelected(proposal)
    };

    const handleSearchProposal = (searchTerm: string) => {
        setSearchTerm(searchTerm)
        setShowModal(true)
        if (searchTerm === "") {
            // fetchGraphQL(query, "GetLatestSnapshot", variables);
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

    const handleOptionClick = (option: { value: string }) => {
        setDraftBtnOpen(false);
        setSelectedStatus(option.value);
        handleSubmit(option.value);
    };

    const handleSubmit = (status: string) => {
        const isDraft = status === "draft";
        if (isDraft) {
            onSubmit({ isDraft});
            cleanDraft();
        } else {
            setReviewModal(true);
        }
    };


    const VerificationBtn = () => {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="bg-black text-white rounded-lg px-3 py-2 flex flex-row gap-2 items-center cursor-pointer">
                        <span className="text-sm">Get Verified</span>
                        <ArrowSquareOut className="w-4 h-4" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[300px]">
                    <DropdownMenuItem className="cursor-pointer">
                        <div className="flex items-center gap-2">
                            <img src="/assets/icon/kyc.svg" alt="KYC" className="w-8 h-8" />
                            <Link href="https://go.fractal.id/near-social-kyc" target="_blank" className="flex flex-col no-underline text-black">
                                <span>KYC</span>
                                <small className="text-gray-500">Choose this if you are an individual.</small>
                            </Link>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                        <div className="flex items-center gap-2">
                            <img src="/assets/icon/kyb.svg" alt="KYB" className="w-8 h-8" />
                            <Link href="https://go.fractal.id/near-social-kyb" target="_blank" className="flex flex-col no-underline text-black">
                                <span>KYB</span>
                                <small className="text-gray-500">Choose this if you are a business or corporate entity.</small>
                            </Link>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    };

    return (
        <div className="w-full max-w-[1700px] mx-auto bg-aipgf-white overflow-hidden gap-[4.093rem] leading-[normal] tracking-[normal] sm:gap-[1rem] mq825:gap-[2.063rem] md:px-[5rem] self-stretch md:pb-[8rem] font-aipgf-manrope-semibold-1356">
                <div className="flex flex-col-reverse md:flex-row w-full justify-between gap-10 md:gap-20 mt-10">
                    <div className="flex flex-row gap-4 w-full">
                        {
                                windowSize?.width > 768&&(
                                    <AvatarProfile accountId={accountId as string} size={50}/>
                                )
                            }
                            <div className="flex flex-col gap-4 w-full">
                                <div className="flex flex-col gap-2 w-full">
                                    <Label className="font-semibold text-xl">Category</Label>
                                    <Label className="text-gray-500">Select the relevant categories that best align with your contribution to the NEAR developer community.</Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button 
                                                variant="outline" 
                                                className="w-full justify-between border-[1px] border-aipgf-geyser border-solid rounded-lg font-aipgf-manrope-semibold-1356"
                                            >
                                                <span className="text-sm md:text-base">
                                                    {selectedCategory}
                                                </span>
                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent 
                                            className="w-[--radix-dropdown-menu-trigger-width] font-aipgf-manrope-semibold-1356"
                                            align="start"
                                            sideOffset={4}
                                        >
                                            {categories.map((category, index) => (
                                                <DropdownMenuItem
                                                    key={index}
                                                    onClick={() => setSelectedCategory(category)}
                                                    className="cursor-pointer"
                                                >
                                                    {category}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label className="font-semibold text-xl">Title</Label>
                                    <Label className="text-gray-500">Highlight the essence of your proposal in a few words. This will appear on your proposal&#39;s detail page and the main proposal feed. Keep it short, please</Label>
                                    <Input className="w-full text-sm md:text-base rounded-lg px-3 py-2 outline-none border-[1px] border-aipgf-geyser box-border border-solid shadow-sm focus:border-gray-100 font-aipgf-manrope-semibold-1356" type="text" placeholder="Enter Title Here"/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label className="font-semibold text-xl">Summary</Label>
                                    <Label className="text-gray-500">Explain your proposal briefly. This is your chance to make a good first impression on the community. Include what needs or goals your work will address, your solution, and the benefit for the NEAR developer community.</Label>
                                    <Textarea className="w-full text-sm md:text-base rounded-lg px-3 py-2 outline-none border-[1px] border-aipgf-geyser border-solid shadow-sm focus:border-gray-500 h-32 resize-none font-aipgf-manrope-semibold-1356" placeholder="Enter Summary Here"/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label className="font-semibold text-xl">Description</Label>
                                    <Label className="text-gray-500">Expand on your summary with any relevant details like your contribution timeline, key milestones, team background, and a clear breakdown of how the funds will be used. Proposals should be simple and clear (e.g. 1 month). For more complex projects, treat each milestone as a separate proposal.</Label>
                                    <Editor/>
                                </div>
                                <div className="flex flex-col gap-2 mt-16">
                                    <Label className="font-semibold text-xl">Final Consent</Label>
                                    <div className="flex flex-col gap-1 mt-2">
                                        <div className="flex flex-col gap-4">
                                            <div className="cntr flex flex-row items-center gap-2">
                                                <Input type="checkbox" id="cbx" className="hidden-xs-up"/>
                                                <Label htmlFor="cbx" className="cbx"></Label>
                                                <Label>I&#39;ve agree to AIPGF&#39;s <Link target="_blank" href={"https://aipgf.com/terms"} style={{color: "unset"}} className="no-underline hover:underline"><strong>Terms and Conditions</strong></Link> and commit to honoring it</Label>
                                            </div>
                                            <div className="cntr flex flex-row items-center gap-2">
                                                <Input type="checkbox" id="cbx1" className="hidden-xs-up"/>
                                                <Label htmlFor="cbx1" className="cbx"></Label>
                                                <Label>I&#39;ve agree to AIPGF&#39;s <Link target="_blank" href="https://aipgf.com/conduct" style={{color: "unset"}} className="no-underline hover:underline"><strong>Code of Conduct</strong></Link> and commit to honoring it</Label>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between w-full md:justify-end items-center md:gap-10 mt-10 pb-[10rem]">
                                    <Button variant="outline" className="bg-transparent hover:bg-transparent border-none shadow-none cursor-pointer">
                                        <Label className="text-[#818181] font-semibold md:text-base text-sm">Discard Changes</Label>
                                    </Button>
                                    <div className="border-[1px] border-aipgf-geyser border-solid rounded-full flex flex-row">
                                        <Button className="flex bg-transparent md:text-base text-sm flex-row gap-2 px-3 py-2 items-center hover:bg-gray-100 hover:bg-opacity-30 rounded-l-full cursor-pointer">
                                            {isDraftBtnOpen ? (
                                                <Button className="flex flex-row items-center gap-2 cursor-pointer bg-transparent hover:bg-transparent shadow-none border-none">
                                                    <div className="w-2 h-2 bg-[#04A46E] rounded-full"/>
                                                    <Label className="text-[#04A46E] font-semibold md:text-base text-sm">Ready for review</Label>
                                                </Button>
                                            ) : (
                                                <Button className="flex flex-row items-center gap-2 cursor-pointer bg-transparent hover:bg-transparent shadow-none border-none">
                                                    <div className="w-2 h-2 bg-[#979A9C] rounded-full"/>
                                                    <Label className="text-[#979A9C] font-semibold md:text-base text-sm">Submit draft</Label>
                                                </Button>
                                            )}
                                        </Button>
                                        <Button onClick={() => setIsShow((prev) => !prev)} className="border-l-[1px] bg-transparent cursor-pointer border-aipgf-geyser border-solid px-3 py-2 hover:bg-gray-100 hover:bg-opacity-30 rounded-r-full">
                                            <img width={20} src="/assets/icon/arrow-down-gray.svg" alt="icon" />
                                        </Button>
                                    </div>
                                    <div className="relative font-aipgf-manrope-semibold-1356">
                                        {isShow && (
                                            <div className="absolute top-6 right-0">
                                                <div className="border-[1px] border-aipgf-geyser border-solid box-border shadow-sm p-3 rounded-lg w-64 bg-white md:text-base text-sm">
                                                    <div className="flex flex-col gap-2">
                                                        {btnOptions.map((option) => (
                                                            <button
                                                                key={option.value}
                                                                onClick={() => {
                                                                    setIsShow(false);
                                                                    setDraftBtnOpen(option.value === "review");
                                                                    handleOptionClick(option);
                                                                }}
                                                                className="flex bg-white text-black text-wrap flex-row gap-3 items-start text-start cursor-pointer hover:bg-gray-100 hover:bg-opacity-10 rounded-lg p-2"
                                                            >
                                                                <div className="h-2 w-2 mt-1">
                                                                    <div className={`w-2 h-2 bg-[${option.value === "draft" ? "#979A9C" : "#04A46E"}] rounded-full`}/>
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <small className="font-semibold">{option.label}</small>
                                                                    <p className="text-xs">{option.description}</p>
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                    </div>
                    <div className="md:w-[30rem] w-full">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row justify-between items-center">
                                <Label className="text-lg md:text-xl text-[#57606A] font-semibold">Author Details</Label>
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
                                            <Label>Author</Label>
                                            <div className="flex flex-row gap-3 items-center">
                                                <AvatarProfile accountId={accountId as string} size={35}/>
                                                <Link href={`${process.env.NEXT_PUBLIC_NETWORK === "mainnet" 
                                                        ? "https://near.social/mob.near/widget/ProfilePage?accountId=" 
                                                        : "https://test.near.social/eugenethedream/widget/Profile?accountId="}${accountId}`} target="_blank" className="text-sm md:text-base font-aipgf-manrope-semibold-1356 no-underline hover:underline text-black font-semibold">{accountId}</Link>
                                            </div>
                                        </div>
                                        <div className="w-full h-[1px] bg-aipgf-geyser"/>
                                        <div className="flex flex-col gap-3 pb-5 mt-2">
                                            <Label>Link Proposals (Optional)</Label>
                                            <Label className="text-gray-500">Link any relevant proposals(e.g Previous milestones).</Label>
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
                                                    <Input value={searchTerm as string} type="text" className="outline-none md:text-base text-sm font-aipgf-manrope-semibold-1356 border-none shadow-none focus:border-none" placeholder="Search Proposal" onChange={(e) => handleSearchProposal(e.target.value)}/>
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
                                    <Label className="text-lg md:text-xl text-[#57606A] font-semibold">Funding Details</Label>
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
                                            <Label>Recipient NEAR Wallet Address</Label>  
                                            <Label className="text-gray-500">Enter the address that will receive the funds. We&#39;ll need this to send a test transaction once your proposal is approved.</Label>
                                            <div className="flex flex-row gap-2 items-center md:gap-3 border-[1px] border-aipgf-geyser border-solid rounded-lg px-3 mt-3">
                                                <Label className="text-[#6f7479] md:text-base text-sm">@</Label>
                                                <Input type="text" className="outline-none md:text-base text-sm border-none shadow-none focus:border-none font-aipgf-manrope-semibold-1356" placeholder="Enter Address"/>
                                            </div>
                                            <div className="flex flex-row gap-1 items-center">
                                                <Label>Recipient Verification Status</Label>
                                                <img width={20} src="/assets/icon/information.svg" alt="icon" />
                                            </div>
                                            <div className="border-[1px] border-aipgf-geyser border-solid rounded-lg p-2 px-3 flex flex-row justify-between items-center">
                                                <div className="flex flex-row gap-3 items-center">
                                                    <img width={20} src="/assets/icon/warning.svg" alt="icon" />
                                                    <div className="flex flex-col">
                                                        <Label className="font-semibold text-lg">Fractal</Label>
                                                        <Label>Not Verified</Label>
                                                    </div>
                                                </div>
                                                <VerificationBtn/>
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <Label>Total Amount (USD)</Label>
                                                <Label className="text-gray-500">Enter the exact amount you are requesting in USD. See <strong>Funding Documentation</strong> for guidelines.</Label>
                                                <div className="border-[1px] border-aipgf-geyser border-solid rounded-lg px-3 flex flex-row gap-2 items-center md:gap-3">
                                                    <Label className="text-[#6f7479] md:text-base text-sm">$</Label>
                                                    <Input type="text" className="outline-none md:text-base text-sm border-none shadow-none focus:border-none font-aipgf-manrope-semibold-1356" placeholder="0.00" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <Label>Currency</Label>
                                                <Label className="text-gray-500">Select your preferred currency for receiving funds. Note: The exchange rate for NEAR tokens will be the closing rate at the day of the invoice.</Label>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button 
                                                            className="w-full border-[1px] border-aipgf-geyser border-solid bg-white items-center rounded-lg p-2 px-3 flex flex-row justify-between gap-3 bg-transparent hover:bg-transparent shadow-none cursor-pointer"
                                                        >
                                                            <Label className="text-[#6f7479] text-sm md:text-base">{selectedToken.label}</Label>
                                                            <img width={20} src="/assets/icon/arrow-down-gray.svg" alt="icon" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent 
                                                        className="w-[var(--radix-dropdown-menu-trigger-width)] mt-1 bg-white border-[1px] border-aipgf-geyser rounded-lg shadow-lg p-2 z-10 font-aipgf-manrope-semibold-1356"
                                                        align="start"
                                                        sideOffset={4}
                                                    >
                                                        {tokensOptions.map((token, index) => (
                                                            <DropdownMenuItem 
                                                                key={index} 
                                                                className="w-full text-start text-sm md:text-base bg-white hover:bg-gray-100 hover:bg-opacity-10 rounded-lg p-2 cursor-pointer"
                                                                onSelect={() => {
                                                                    setSelectedToken(token);
                                                                }}
                                                            >
                                                                {token.label}
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <Label>Requested Sponsor</Label>
                                                <div className="border-[1px] border-aipgf-geyser border-solid rounded-lg px-3 flex flex-row gap-2 items-center md:gap-3">
                                                    <Label className="text-[#6f7479] md:text-base text-sm">@</Label>
                                                    <Input type="text" className="outline-none md:text-base text-sm border-none shadow-none focus:border-none font-aipgf-manrope-semibold-1356" placeholder="Enter Address" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <Label>Supervisor (Optional)</Label>
                                                <div className="border-[1px] border-aipgf-geyser border-solid rounded-lg px-3 flex flex-row gap-2 items-center md:gap-3">
                                                    <Label className="text-[#6f7479] md:text-base text-sm">@</Label>
                                                    <Input type="text" className="outline-none md:text-base text-sm border-none shadow-none focus:border-none font-aipgf-manrope-semibold-1356" placeholder="Enter Address" />
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