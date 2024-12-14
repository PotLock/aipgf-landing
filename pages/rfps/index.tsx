"use client"
import Footer from "@/components/footer";
import RFPsPost from "@/components/RFPsPost";
import Template from "@/components/Template";
import Section from "@/components/Section";
import Link from "next/link";
import { useCallback, useEffect,useState } from "react";
import RFPsCard from "@/components/RFPsCard";
import NavBar from "@/components/nav-bar";
import { RFPsSnapshot, RFPsTypes } from "@/types/types";
import { ViewMethod } from "@/hook/near-method";
import PostSkeleton from "@/components/PostSkeleton";
import RFPsCardSkeleton from "@/components/RFPsCardSkeleton";
import { Button } from "@/components/ui/button";

const RFPs = () =>{
    const [rfps, setRfps] = useState<RFPsTypes[]>([]);
    const [rfpsAll, setRfpsAll] = useState<RFPsTypes[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalRfps, setTotalRfps] = useState<number>(0);
    const [windowSize, setWindowSize] = useState<any>({
        width: null,
        height: null
    });

    const [currentPage, setCurrentPage] = useState<number>(0);
    const ITEMS_PER_PAGE = 5;

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


    const loadRFPs = useCallback(async () => {
        try {
            const rfps = await ViewMethod(process.env.NEXT_PUBLIC_NETWORK === "mainnet" ? process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT as string : process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT_TESTNET as string, "get_rfps", {});
            //console.log('rfps', rfps)
            const rfpWithSnapshot = rfps.map((rfp: RFPsSnapshot) => ({
                name: rfp.snapshot.name,
                timeline: rfp.snapshot.timeline,
                summary: rfp.snapshot.summary,
                labels: rfp.snapshot.labels,
                author_id: rfp.author_id,
                submission_deadline: rfp.snapshot.timeline,
                linked_rfp: rfp.snapshot.linked_rfp,
                rfp_id: rfp.id,
                ts: rfp.snapshot.timestamp,
                views: rfp.snapshot.views,
                linked_proposals: rfp.snapshot.linked_proposals,
                block_height: rfp.snapshot.block_height,
                blockHeight: rfp.social_db_post_block_height,
            }));

            setTotalRfps(rfpWithSnapshot.length);
            setRfpsAll(rfpWithSnapshot.slice(0, ITEMS_PER_PAGE));
            setRfps(rfpWithSnapshot.slice(0, ITEMS_PER_PAGE));
        } catch (error) {
            console.error("Error loading proposals:", error);
        } finally {
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
        loadRFPs();
    }, [loadRFPs]);

    const searchRFPs = (searchTerm: string) => {
        if(searchTerm === ""){
            setRfps(rfpsAll.slice(0, ITEMS_PER_PAGE));
        }else{
            const filteredRFPs = rfpsAll.filter((rfp) => {
                const lowerCaseSearchTerm = searchTerm.toLowerCase();
                const lowerCaseTitle = rfp.name.toLowerCase();
                const lowerCaseSummary = rfp.summary.toLowerCase();
                return lowerCaseTitle.includes(lowerCaseSearchTerm) || lowerCaseSummary.includes(lowerCaseSearchTerm);
            });
            setRfps(filteredRFPs.slice(0, ITEMS_PER_PAGE));
        }
    };

    const sortRFPs = (sortBy: string) => {
        let sortedRFPs = [...rfpsAll];
        switch (sortBy) {
            case 'Most recent':
                sortedRFPs.sort((a, b) => b.ts - a.ts);
                break;
            case 'Most viewed':
                sortedRFPs.sort((a, b) => (b.views || 0) - (a.views || 0));
                break;
            case 'All':
                sortedRFPs.sort((a, b) => b.rfp_id - a.rfp_id);
                break;
            default:
                sortedRFPs.sort((a, b) => b.rfp_id - a.rfp_id);
                break;
        }
        setRfps(sortedRFPs.slice(0, ITEMS_PER_PAGE));
    };

    const sortByCategory = (category: string) => {
        if (category === "All") {
            setRfps(rfpsAll.slice(0, ITEMS_PER_PAGE));
        } else {
            const filteredRFPs = rfpsAll.filter((rfp) => {
                return rfp.labels.includes(category);
            });
            setRfps(filteredRFPs.slice(0, ITEMS_PER_PAGE));
        }
    };


    const sortByStage = (stage: string) => {
        if (stage === "All") {
            setRfps(rfpsAll.slice(0, ITEMS_PER_PAGE));
        } else {
            const filteredRFPs = rfpsAll.filter((rfp) => {
                const timeline = rfp?.timeline?.status
                    ?.replace("_", " ")
                    .toLowerCase()
                    .replace(/\b\w/g, (c: any) =>
                        c.toUpperCase()
                    )
                return timeline === stage;
            });
            setRfps(filteredRFPs.slice(0, ITEMS_PER_PAGE));
        }
    };

    const loadMoreRFPs = () => {
        const nextPage = currentPage + 1;
        const start = nextPage * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        
        const newRFPs = rfpsAll.slice(0, end);
        setRfps(newRFPs.slice(0, ITEMS_PER_PAGE));
        setCurrentPage(nextPage);
    }

    return(
        <div className="flex flex-col w-full h-full">
            <NavBar />
            <Section title="RFPs" description="Stay informed about the latest proposals and initiatives. Here, you can review, comment, and engage with projects that align with your interests." type="rfps" sortByStage={sortByStage} sortCategory={sortByCategory} sortBy={sortRFPs} search={searchRFPs}/>
            <div className="w-full max-w-[1700px] mx-auto bg-aipgf-white overflow-hidden gap-[4.093rem] leading-[normal] tracking-[normal] sm:gap-[1rem] mq825:gap-[2.063rem] md:px-[5rem] self-stretch">
                    <div className="flex justify-center items-center font-aipgf-manrope-semibold-1356">
                        <div className="mq825:px-5 w-full mt-10 mq825:mt-4 pb-20">
                            <div className="flex flex-row justify-between w-full">
                                <div className="flex flex-row gap-2 md:gap-4 text-xs md:text-2xl">
                                    <div className="flex flex-row md:gap-2 gap-1">
                                        <span className="font-semibold">$10,299</span>
                                        <span>Total Awarded</span>
                                    </div>
                                    <div className="flex flex-row md:gap-2 gap-1">
                                        <span className="font-semibold">{totalRfps}</span>
                                        <span>RFPs</span>
                                    </div>
                                    <div className="flex flex-row md:gap-2 gap-1">
                                        <span className="font-semibold">140</span>
                                        <span>Non RFPs</span>
                                    </div>
                                </div>
                                {
                                    windowSize?.width > 768 &&(
                                        <Link href={"/rfps/create-rfps"} style={{textDecoration: "none"}} className="flex flex-row gap-2 p-3 rounded-full bg-[#0969DA] text-white hover:bg-opacity-90">
                                            <img width={16} src="/assets/icon/add-white.svg" alt="icon" />
                                            <span>Submit RFPs</span>
                                        </Link>
                                    )
                                }
                            </div>
                            <div className="flex flex-col gap-5 w-full mt-10">
                                <div className="flex flex-row gap-5 overflow-y-auto w-full">
                                    {
                                        !isLoading ? rfpsAll.slice(0,3).map((rfp) => (
                                            <RFPsCard rfp={rfp}/>
                                        )) : (
                                            <RFPsCardSkeleton/>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="mt-5 md:mt-10 flex flex-col md:flex-row flex-auto justify-between gap-10">
                                <div className="w-full h-full flex flex-col gap-4">
                                    {
                                        isLoading ? (
                                            <PostSkeleton/>
                                        ) : (
                                            rfps.map((rfp) => (
                                                <RFPsPost rfp={rfp}/>
                                            ))
                                        )
                                    }
                                    {
                                        !isLoading && rfps.length ==0 &&(
                                            <div className="flex flex-col items-start justify-start h-full">
                                                <span className="text-sm">No RFPs found</span>
                                            </div>
                                        )
                                    }
                                    {
                                        !isLoading && rfps.length > 0 && (
                                            <div className="mt-5 md:mt-10">
                                                <Button variant="outline" onClick={loadMoreRFPs} className="border-aipgf-geyser border-[1px] border-solid box-border p-3 text-center rounded-full w-full cursor-pointer">
                                                    <span className="font-semibold">Load More</span>
                                                </Button>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="md:w-96 w-full flex flex-col gap-3 border-b border-gray-200 pb-10">
                                    <div className="flex flex-col">
                                        <span className="text-xl text-[#57606A] font-semibold">RFPs Template</span>
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
                                                    <img width={20} className="w-6 h-6" src="/assets/icon/check.png" alt="icon" />
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
                                                    <img width={20} className="w-6 h-6" src="/assets/icon/check.png" alt="icon" />
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

export default RFPs;