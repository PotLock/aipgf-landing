"use client"
import Footer from "@/components/footer";
import RFPsPost from "@/components/RFPsPost";
import Template from "@/components/Template";
import Section from "@/components/Section";
import Link from "next/link";
import { useEffect,useState } from "react";
import RFPsCard from "@/components/RFPsCard";
import NavBar from "@/components/nav-bar";
import { RFPsTypes } from "@/types/types";
import { ViewMethod } from "@/hook/call-near-method";
const QUERYAPI_ENDPOINT = `https://near-queryapi.api.pagoda.co/v1/graphql`;

const rfpQueryName =
    "bos_forum_potlock_near_ai_pgf_indexer_rfps_with_latest_snapshot";
const rfpQuery = `query GetLatestSnapshot($offset: Int = 0, $limit: Int = 10, $where: ${rfpQueryName}_bool_exp = {}) {
    ${rfpQueryName}(
        offset: $offset
        limit: $limit
        order_by: {rfp_id: desc}
        where: $where
    ) {
        author_id
        block_height
        name
        summary
        editor_id
        rfp_id
        timeline
        views
        labels
        submission_deadline
        linked_proposals
        ts
        linked_proposals
    }
    ${rfpQueryName}_aggregate(
        order_by: {rfp_id: desc}
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

const RFPs = () =>{
    const [rfps, setRfps] = useState<RFPsTypes[]>([]);
    const [rfpsAll, setRfpsAll] = useState<RFPsTypes[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalRfps, setTotalRfps] = useState<number>(0);
    const [totalUsers, setTotalUsers] = useState<number>(0);
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

    const Loading = () => {
        return (
            <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-[2px] border-b-[2px] border-solid border-gray-900"></div>
            </div>
        );
    };

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
                    const data = result.data?.[rfpQueryName];
                    //console.log("data",data)
                    const totalResult = result.data?.[`${rfpQueryName}_aggregate`];
                    setTotalRfps(totalResult.aggregate.count)
                    const filteredRfps: RFPsTypes[] = new Array(data.length);
                    await Promise.all(data.map(async (item: RFPsTypes, index: number) => {
                        const rfp = await loadRfp(item.rfp_id);
                        const new_rfp = { ...item, blockHeight: rfp?.social_db_post_block_height };
                        filteredRfps[index] = new_rfp;
                    }));
                    //console.log(filteredRfps)
                    setRfps(filteredRfps)
                    setRfpsAll(filteredRfps)
                }
            }
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    const loadRfp = async(rfpId:number) => {
        if(rfpId){
            const rfp = await ViewMethod("forum.potlock.near", "get_rfp", {
                rfp_id: rfpId
            });
            return rfp
        }
    }

    console.log(rfps)

    useEffect(() => {
        try {
            fetchGraphQL(rfpQuery, "GetLatestSnapshot", variables);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const searchRFPs = (searchTerm: string) => {
        if(searchTerm === ""){
            fetchGraphQL(rfpQuery, "GetLatestSnapshot", variables);
        }else{
            const filteredRFPs = rfpsAll.filter((rfp) => {
                const lowerCaseSearchTerm = searchTerm.toLowerCase();
                const lowerCaseTitle = rfp.name.toLowerCase();
                const lowerCaseSummary = rfp.summary.toLowerCase();
                return lowerCaseTitle.includes(lowerCaseSearchTerm) || lowerCaseSummary.includes(lowerCaseSearchTerm);
            });
            setRfps(filteredRFPs);
        }
    };

    const loadMoreRFPs = () => {
        fetchGraphQL(rfpQuery, "GetLatestSnapshot", {
            offset: rfps.length,
            limit: 10,
            where: {},
        })
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
        setRfps(sortedRFPs);
    };

    const sortByCategory = (category: string) => {
        if (category === "All") {
            fetchGraphQL(rfpQuery, "GetLatestSnapshot", variables);
        } else {
            const filteredRFPs = rfpsAll.filter((rfp) => {
                return rfp.labels.includes(category);
            });
            setRfps(filteredRFPs);
        }
    };


    const sortByStage = (stage: string) => {
        if (stage === "All") {
            fetchGraphQL(rfpQuery, "GetLatestSnapshot", variables);
        } else {
            const filteredRFPs = rfpsAll.filter((rfp) => {
                const timeline = JSON.parse(rfp?.timeline)
                    ?.status.replace("_", " ")
                    .toLowerCase()
                    .replace(/\b\w/g, (c: any) =>
                        c.toUpperCase()
                    )
                return timeline === stage;
            });
            setRfps(filteredRFPs);
        }
    };

    return(
        <div className="flex flex-col w-full h-full">
            <NavBar />
            <Section title="RFPs" type="rfps" sortByStage={sortByStage} sortCategory={sortByCategory} sortBy={sortRFPs} search={searchRFPs}/>
            <div className="w-full max-w-[1700px] mx-auto relative bg-aipgf-white overflow-hidden gap-[4.093rem] leading-[normal] tracking-[normal] sm:gap-[1rem] mq825:gap-[2.063rem] md:px-[5rem]">
                    <div className="flex justify-center items-center">
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
                                        !isLoading && rfpsAll.slice(0,3).map((rfp) => (
                                            <RFPsCard rfp={rfp}/>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="mt-5 md:mt-10 flex flex-col md:flex-row flex-auto justify-between gap-10">
                                <div className="w-full h-full flex flex-col gap-4">
                                    {
                                        isLoading ? (
                                            <Loading/>
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
                                                <button onClick={loadMoreRFPs} className="border-aipgf-geyser border-[1px] border-solid box-border p-3 text-center rounded-full w-full">
                                                    <span className="font-semibold">Load More</span>
                                                </button>
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
            <div className="w-full bg-[#F6F8FA] h-64 md:mb-14 mb-5 mt-3 flex flex-col md:flex-row justify-center md:gap-20 items-center px-5 md:px-0">
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