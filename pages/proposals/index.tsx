import type { NextPage } from "next"
import NavBar from "@/components/nav-bar";
import Section from "@/components/Section";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import ProposalPost from "@/components/ProposalPost";
import Template from "@/components/Template";
import Footer from "@/components/footer";
import { ProposalSnapshot, ProposalTypes } from "@/types/types";
import { ViewMethod } from "@/hook/near-method";
import ProposalPostSkeleton from "@/components/PostSkeleton";

const Proposals: NextPage = () => {
    const [proposals, setProposals] = useState<ProposalTypes[]>([]);
    const [allProposals, setAllProposals] = useState<ProposalTypes[]>([]);
    const [totalProposals, setTotalProposals] = useState<number>(0);
    const [totalReplies, setTotalReplies] = useState<number>(0);
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const ITEMS_PER_PAGE = 5;

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

    const loadProposals = useCallback(async () => {
        try {
            const proposals = await ViewMethod(process.env.NEXT_PUBLIC_NETWORK === "mainnet" ? process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT as string : process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT_TESTNET as string, "get_proposals", {});
            console.log(proposals)
            const proposalsWithSnapshot = proposals.map((proposal: ProposalSnapshot) => ({
                name: proposal.snapshot.name,
                timeline: proposal.snapshot.timeline,
                summary: proposal.snapshot.summary,
                labels: proposal.snapshot.labels,
                author_id: proposal.author_id,
                submission_deadline: proposal.snapshot.timeline,
                linked_rfp: proposal.snapshot.linked_rfp,
                proposal_id: proposal.id,
                ts: proposal.snapshot.timestamp,
                views: proposal.snapshot.views,
                linked_proposals: proposal.snapshot.linked_proposals,
                block_height: proposal.social_db_post_block_height,
                blockHeight: proposal.social_db_post_block_height,
            }));

            const uniqueUsers = new Set(proposalsWithSnapshot.map((p: any) => p.author_id));

            setTotalProposals(proposalsWithSnapshot.length);
            setTotalUsers(uniqueUsers.size);
            setAllProposals(proposalsWithSnapshot);
            setProposals(proposalsWithSnapshot.slice(0, ITEMS_PER_PAGE));
        } catch (error) {
            console.error("Error loading proposals:", error);
        } finally {
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
        loadProposals();
    }, [loadProposals]);

    const searchProposals = (searchTerm: string) => {
        try {
            if(searchTerm === "") {
                setTotalReplies(0);
                setProposals(allProposals.slice(0, ITEMS_PER_PAGE));
            } else {
                const filteredProposals = proposals.filter((proposal) => {
                    const lowerCaseSearchTerm = searchTerm.toLowerCase();
                    const lowerCaseTitle = proposal.name.toLowerCase();
                    const lowerCaseSummary = proposal.summary.toLowerCase();
                    return lowerCaseTitle.includes(lowerCaseSearchTerm) || 
                           lowerCaseSummary.includes(lowerCaseSearchTerm);
                });
                setProposals(filteredProposals.slice(0, ITEMS_PER_PAGE));
            }
        } catch (error) {
            console.error("Error searching proposals:", error);
        }
    };


    const sortProposals = (sortBy: string) => {
        try {
            let sortedProposals = [...allProposals];
            switch (sortBy) {
                case 'Most recent':
                    sortedProposals.sort((a, b) => b.ts - a.ts);
                    break;
                case 'Most viewed':
                    sortedProposals.sort((a, b) => (b.views || 0) - (a.views || 0));
                    break;
                case 'All':
                    sortedProposals.sort((a, b) => b.proposal_id - a.proposal_id);
                    break;
                default:
                    setTotalReplies(0);
                    sortedProposals.sort((a, b) => b.proposal_id - a.proposal_id);
                    break;
            }
            setProposals(sortedProposals.slice(0, ITEMS_PER_PAGE));
        } catch (error) {
            console.error("Error sorting proposals:", error);
        }
    };

    const sortByCategory = (category: string) => {
        try {
            if (category === "All") {
                setTotalReplies(0);
                setProposals(allProposals.slice(0, ITEMS_PER_PAGE));
            } else {
                const filteredProposals = allProposals.filter((proposal) => {
                    return proposal.labels.includes(category);
                });
                setProposals(filteredProposals.slice(0, ITEMS_PER_PAGE));
            }
        } catch (error) {
            console.error("Error sorting by category:", error);
        }
    };


    const sortByStage = (stage: string) => {
        try {
            if (stage === "All") {
                setProposals(allProposals.slice(0, ITEMS_PER_PAGE));
            } else {
                const filteredProposals = allProposals.filter((proposal) => {
                    const timeline = proposal.timeline;
                    return timeline.status === stage.toUpperCase();
                });
                setProposals(filteredProposals.slice(0, ITEMS_PER_PAGE));
            }
        } catch (error) {
            console.error("Error sorting by stage:", error);
        }
    };

    const loadMoreProposals = () => {
        const nextPage = currentPage + 1;
        const start = nextPage * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        
        const newProposals = allProposals.slice(0, end);
        setProposals(newProposals);
        setCurrentPage(nextPage);
    }

    //console.log(totalComments)

    return (
        <div className="flex flex-col w-full h-full">
            <NavBar/>
            <Section title="Proposals" description="Stay informed about the latest proposals and initiatives. Here, you can review, comment, and engage with projects that align with your interests." type="proposals" sortByStage={sortByStage} sortCategory={sortByCategory} sortBy={sortProposals} search={searchProposals}/>
            <div className="w-full max-w-[1700px] mx-auto bg-aipgf-white overflow-hidden gap-[4.093rem] leading-[normal] tracking-[normal] sm:gap-[1rem] mq825:gap-[2.063rem] md:px-[5rem] self-stretch">
                <div className="flex justify-center items-center font-aipgf-manrope-semibold-1356">
                    <div className="mq825:px-5 w-full mt-10 mq825:mt-4 pb-20">
                        <div className="flex flex-row justify-between w-full items-center">
                            <div className="flex flex-row mq825:gap-2 gap-4 mq825:text-xs text-xl">
                                <div className="flex flex-row gap-2 mq825:gap-1">
                                    <span className="font-semibold">{totalProposals}</span>
                                    <span>{`Projects funded`}</span>
                                </div>
                                <div className="flex flex-row gap-2 mq825:gap-1">
                                    <span className="font-semibold">{totalReplies}</span>
                                    <span>Replies</span>
                                </div>
                                <div className="flex flex-row gap-2 mq825:gap-1">
                                    <span className="font-semibold">{totalUsers}</span>
                                    <span>Users</span>
                                </div>
                            </div>
                            {
                                windowSize?.width > 768 &&(
                                    <Link href={"/create-proposal"} className="flex flex-row gap-2 p-3 rounded-full bg-[#0969DA] text-white hover:bg-opacity-90 no-underline">
                                        <img width={16} src="/assets/icon/add-white.svg" alt="icon" />
                                        <span>Submit Proposal</span>
                                    </Link>
                                )
                            }
                        </div>
                        <div className="mq825:mt-5 mt-10 flex mq825:flex-col flex-row justify-between gap-10">
                            <div className="w-full h-full flex flex-col gap-5 md:gap-4 ">
                                {isLoading ? (
                                    <ProposalPostSkeleton />
                                ) : (
                                    <div className="flex flex-col gap-5">
                                        {proposals.length > 0 && (
                                            proposals.map((proposal) => (
                                                <ProposalPost key={proposal.proposal_id} proposal={proposal} setTotalReplies={setTotalReplies} replies={totalReplies}/>
                                            ))
                                        )}
                                        {proposals.length === 0 && (
                                            <div className="flex flex-col gap-5">
                                                <span>No proposals found</span>
                                            </div>
                                        )}
                                        {proposals.length < totalProposals && (
                                            <div className="mq825:mt-5 mt-10">
                                                <button onClick={loadMoreProposals} className="border-aipgf-geyser border-[1px] border-solid box-border cursor-pointer hover:bg-stone-50 bg-[#F6F8FA] p-3 text-center rounded-full w-full">
                                                    <span className="font-semibold">{`Load More`}</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="w-96 mq825:w-full flex flex-col gap-3 border-b border-gray-200 pb-10">
                                <div className="flex flex-col">
                                    <span className="text-xl text-[#57606A] font-semibold">Proposal Template</span>
                                    <div className="flex flex-col gap-3 mt-5">
                                        <Template/>
                                        <Template/>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5 mt-5 md:mt-0">
                                    <span className="text-xl text-[#57606A] font-semibold">How it works</span>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-row gap-5 w-full">
                                            <div className="flex flex-col items-center">
                                                <img width={20} className="w-6 h-6" src="/assets/icon/checked.png" alt="icon" />
                                                <div className="h-full w-0.5 bg-[#0969DA]"/>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex flex-col gap-1">
                                                    <span className="font-semibold text-[#24292F]">1. Loreum Ipsum</span>
                                                    <p className="text-xs">Lorem ipsum dolor sit amet consectetur. Consectetur sem id est nam nam et vestibulum imperdiet a. A aliquet volutpat porta malesuada.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-5 w-full">
                                            <div className="flex flex-col items-center">
                                                <img width={20} className="w-6 h-6 md:h-5" src="/assets/icon/check.png" alt="icon" />
                                                <div className="h-full w-0.5 bg-[#0969DA]"/>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex flex-col gap-1">
                                                    <span className="font-semibold text-[#24292F]">2. Loreum Ipsum</span>
                                                    <p className="text-xs">Lorem ipsum dolor sit amet consectetur. Consectetur sem id est nam nam et vestibulum imperdiet a. A aliquet volutpat porta malesuada.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-5 w-full">
                                            <div className="flex flex-col items-center">
                                                <img width={20} className="w-6 h-6 md:h-5" src="/assets/icon/check.png" alt="icon" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex flex-col gap-1">
                                                    <span className="font-semibold text-[#24292F]">3. Loreum Ipsum</span>
                                                    <p className="text-xs">Lorem ipsum dolor sit amet consectetur. Consectetur sem id est nam nam et vestibulum imperdiet a. A aliquet volutpat porta malesuada.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="w-full bg-[#F6F8FA] h-64 md:mb-14 mb-5 mt-3 flex flex-col md:flex-row justify-center md:gap-20 items-center px-5 md:px-0 font-aipgf-manrope-semibold-1356">
                {
                    windowSize?.width >768&&(
                        <img width={20} className="w-96 h-48" src="/assets/background/bannerFooter.png" alt="banner" />
                    )
                }
                <div className="flex flex-col gap-7 max-w-md">
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold">Lorem ipsum dolor sit amet consectetur. Dignissim consectetur egestas .</p>
                        <p className="text-xs">Lorem ipsum dolor sit amet consectetur. Auctor egestas lorem maecenas id amet. In cursus faucibus sed sed justo. Ultrices pharetra accumsan ac urna.</p>
                    </div>
                    <button className="flex cursor-pointer flex-row gap-2 items-center px-4 py-2 rounded-full w-[8.3rem] bg-[#0969DA]">
                        <small className="text-white">Get Funded</small>
                        <img width={20} src="/assets/icon/arrow-up-right-white.svg" alt="arrow" />
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Proposals;