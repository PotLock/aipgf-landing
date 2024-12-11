import type { NextPage } from "next";
import { useState, useCallback, useEffect, useRef } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Button1 from "./button1";
import Tag from "./tag";
import { useRouter } from "next/router";
import Link from "next/link";

export type HeroProposalsType = {
  className?: string;
};

const QUERYAPI_ENDPOINT = `https://near-queryapi.api.pagoda.co/v1/graphql`;
const queryName =
  "bos_forum_potlock_near_ai_pgf_indexer_rfps_with_latest_snapshot";
const query = `query GetLatestSnapshot($offset: Int = 0, $limit: Int = 10, $where: ${queryName}_bool_exp = {}) {
    ${queryName}(
      offset: $offset
      limit: $limit
      order_by: {rfp_id: desc}
      where: $where
    ) {
      author_id
      block_height
      name
      summary
      ts
      editor_id
      rfp_id
      timeline
      views
      labels
      submission_deadline
      linked_proposals
    }
    ${queryName}_aggregate(
      order_by: {rfp_id: desc}
      where: $where
    )  {
      aggregate {
        count
      }
    }
  }`;

type ProposalTypes = {
  name: string;
  timeline: string;
  summary: string;
  labels: Array<string>;
  author_id: string;
  submission_deadline: number;
  linked_rfp?: number;
  rfp_id: number;
};

const labelIcons: any = {
  MVP: { icon: "solarcrownbroken.svg", color: "#f0cf8e" },
  Bounty: { icon: "bounty.svg", color: "#7b66dc", textColor: "#fff" },
  "Quick Start": {
    icon: "QuickStart.svg",
    color: "#0646bc",
    textColor: "#fff",
  },
};

const typeStyle: any = {
  REVIEW: "#304053",
  FUNDED: "green",
  CANCELLED: "#f41e1b",
  DRAFT: "#304053",
};

const FETCH_LIMIT = 10;
const variables = {
  limit: FETCH_LIMIT,
  offset: 0,
  where: {},
};

const getOrdinalSuffix = (day: number) => {
  if (day > 3 && day < 21) return "th"; // covers 11th-19th
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const getTime = (timestamp: number) => {
  const dateInMilliseconds = timestamp / 1000000;
  const date = new Date(dateInMilliseconds);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
};

const HeroProposals: NextPage<HeroProposalsType> = ({ className = "" }) => {
  const [proposals, setProposals] = useState<ProposalTypes[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [percentageWidth, setPercentageWidth] = useState(100);

  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        setContainerWidth(carouselRef.current.offsetWidth);
        setCarouselWidth(carouselRef.current.scrollWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to set initial sizes

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [proposals.length]);

  useEffect(() => {
    if (containerWidth > 1000) {
      setPercentageWidth(40);
    } else if (containerWidth < 650) {
      setPercentageWidth(100);
    } else {
      setPercentageWidth(80);
    }
  }, [containerWidth]);

  const maxIndex = Math.max(
    0,
    Math.ceil((carouselWidth - containerWidth) / containerWidth)
  );
  const scrollPrev = () => setCurrentIndex(Math.max(currentIndex - 1, 0));
  const scrollNext = () => {
    const maxPossibleIndex = Math.ceil(
      (carouselWidth - containerWidth) /
        (containerWidth * (percentageWidth / 100))
    );
    setCurrentIndex(Math.min(currentIndex + 1, maxPossibleIndex));
  };

  async function fetchGraphQL(
    operationsDoc: string,
    operationName: string,
    variables: { limit: number; offset: number; where: {} }
  ) {
    try {
      const response = await fetch(QUERYAPI_ENDPOINT, {
        method: "POST",
        headers: { 
          "x-hasura-role": "bos_forum_potlock_near",
          "Content-Type": "application/json",
          "Accept": "application/json",
          // Add CORS headers
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, x-hasura-role"
        },
        mode: "no-cors",
        body: JSON.stringify({
          query: operationsDoc,
          variables: variables,
          operationName: operationName,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0]?.message || 'GraphQL Error');
      }

      if (result.data) {
        const data = result.data?.[queryName];
        let filteredData: ProposalTypes[] = [];
        
        data.forEach((item: ProposalTypes) => {
          if (!Number(item.linked_rfp)) {
            filteredData.push(item);
          }
        });
        
        setProposals(filteredData);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch proposals';
      console.log('Error fetching proposals:', errorMessage);
      setProposals([]);
    }
  }

  useEffect(() => {
    try {
      fetchGraphQL(query, "GetLatestSnapshot", variables);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onButtonClick = useCallback(() => {
    window.open("https://forum.aipgf.com");
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <section
        className={`self-stretch flex flex-row items-start justify-start pt-[0rem] px-[5rem] pb-[1.062rem] box-border max-w-full text-left text-[2.894rem] text-aipgf-shark font-p mq825:pl-[2.5rem] mq825:pr-[2.5rem] mq825:box-border ${className}`}
      >
        <div className="flex-1 flex flex-col items-start justify-start gap-[2rem] max-w-full mq825:gap-[1rem]">
          <div className="self-stretch rounded-4xs border-aipgf-geyser border-[1px] border-solid box-border overflow-hidden flex flex-row items-start justify-between py-[0.687rem] pl-[0.937rem] pr-[1.062rem] max-w-full gap-[1.25rem] mq1425:flex-wrap">
            <div className="w-[55.844rem] flex flex-col items-start justify-start pt-[0.625rem] px-[0rem] pb-[0rem] box-border max-w-full">
              <div className="self-stretch flex flex-row items-start justify-start gap-[2.5rem] max-w-full lg:flex-wrap sm:gap-[1.25rem]">
                <div className="w-[20.094rem] relative tracking-[-1px] leading-[3rem] font-medium flex items-center shrink-0 sm:text-[1.75rem] sm:leading-[1.813rem] mq825:text-[2.313rem] mq825:leading-[2.375rem]">
                  Active RFPs
                </div>
                <div className="flex-1 flex flex-col items-start justify-start pt-[0.062rem] px-[0rem] pb-[0rem] box-border min-w-[23.563rem] max-w-full text-[1.125rem] mq825:min-w-full">
                  <h3 className="m-0 self-stretch relative text-inherit font-normal font-[inherit]">
                    Discover funding opportunities currently available for
                    innovative projects.
                  </h3>
                </div>
              </div>
            </div>
            <Button1
              button="View All"
              onButtonClick3={onButtonClick}
              propHeight="4.25rem"
              propWidth="9.75rem"
              buttonFlex="unset"
            />
          </div>
          <div className="relative w-full">
            <div className="relative flex-row w-full overflow-hidden items-start justify-start  gap-[1.5rem] max-w-full text-[1.375rem] text-aipgf-shark1 font-aipgf-manrope-semibold-1356">
              <div
                className={`flex transition-transform duration-500 space-x-8 w-full sm:space-x-4 items-center ease-in-out`}
                style={{
                  transform: `translateX(-${currentIndex * percentageWidth}%)`,
                }}
                ref={carouselRef}
              >
                {proposals.length &&
                  proposals.map((data) => (
                    <Link
                      key={data.rfp_id}
                      href={`https://forum.aipgf.com/bos.forum.potlock.near/widget/app?page=rfp&id=/${data.rfp_id}`}
                      target="_blank"
                      style={{ textDecoration: "none", color: "unset" }}
                    >
                      <div
                        className={`flex-1 cursor-pointer rounded-md bg-aipgf-regent-gray border-aipgf-geyser border-[1px] border-solid box-border  flex flex-row items-start justify-start pt-[3.25rem] pb-[0rem] pl-[0.062rem] pr-[0rem] min-w-[19.25rem] max-w-[440px]`}
                        style={{
                          width: `${
                            containerWidth < 650
                              ? `calc(${containerWidth - 15}px)`
                              : ""
                          }`,
                          minWidth: `${
                            containerWidth < 650
                              ? `${Math.floor(containerWidth - 15)}px`
                              : ""
                          }`,
                          maxWidth: `${
                            containerWidth < 650
                              ? `${Math.floor(containerWidth - 15)}px`
                              : ""
                          }`,
                        }}
                      >
                        <div className="flex-1 bg-aipgf-white flex flex-col items-start justify-start pt-[1.312rem] px-[0rem] pb-[0rem] box-border relative gap-[1.112rem] max-w-full">
                          <div className="self-stretch flex flex-row items-start justify-start py-[0rem] px-[1rem] box-border max-w-full font-p">
                            <div className="flex-1 flex flex-col items-start justify-start gap-[1.343rem] max-w-full">
                              <div className="self-stretch overflow-hidden flex flex-row items-start justify-start gap-[3.687rem] sm:flex-wrap sm:gap-[1.813rem]">
                                <h2 className="m-0 flex-1 relative text-inherit leading-[1.563rem] font-bold font-[inherit] inline-block min-w-[9.563rem] sm:text-[1.125rem] sm:leading-[1.25rem]">
                                  {data?.name}
                                </h2>
                              </div>
                              <div className="flex flex-row sm:items-between w-100 space-x-3 sm:gap-y-2 sm:flex-wrap sm:space-x-2 ">
                                {data.labels?.map((data) => (
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
                              <div className="self-stretch h-[3.063rem] shrink-0 flex flex-row items-start justify-start py-[0rem] pl-[0rem] pr-[1.625rem] box-border max-w-full text-[0.844rem] font-aipgf-manrope-semibold-1356">
                                <div className="flex-1 relative leading-[1.5rem] font-light [display:-webkit-inline-box] items-center overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical] max-w-full">
                                  {data?.summary}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row items-start justify-start py-[0rem] px-[1rem] box-border max-w-full text-center text-[0.875rem] text-grays-black">
                            <div className="flex flex-row items-start justify-start py-[0rem] pl-[0rem] pr-[1rem] box-border gap-[1.25rem] max-w-full sm:flex-wrap sm:pr-[1.25rem] sm:box-border">
                              <div className="flex flex-row items-center justify-start gap-[0.5rem]">
                                <div className="flex flex-col items-start justify-center py-[0.093rem] px-[0rem]">
                                  <img
                                    className="w-[1rem] h-[1rem] relative"
                                    alt=""
                                    src="/icon-1.svg"
                                  />
                                </div>
                                <div className="flex flex-col items-center justify-start">
                                  <div className="relative inline-block min-w-[4.688rem]">
                                    by{" "}
                                    {data?.author_id?.length > 20
                                      ? `${data?.author_id?.slice(0, 20)}...`
                                      : data?.author_id}
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-row items-center justify-start py-[0.156rem] px-[0rem]"></div>
                            </div>
                          </div>
                          <div className="self-stretch bg-aipgf-aqua-haze flex flex-row items-start justify-start pt-[0.687rem] px-[1rem] pb-[0.625rem] box-border max-w-full z-[1] text-[0.75rem] text-gray-100">
                            <div className="flex-1 flex flex-row items-start justify-start gap-[0.5rem] max-w-full sm:flex-wrap">
                              <div className="flex flex-col items-start justify-start pt-[0.375rem] px-[0rem] pb-[0rem]">
                                <div className="relative leading-[0.938rem] font-light inline-block min-w-[7.063rem] whitespace-nowrap text-[min(2.5vw, 1rem)]">
                                  Submission Deadline
                                </div>
                              </div>
                              <div className="flex-1 flex flex-col items-start justify-start pt-[0.375rem] pb-[0rem] pl-[0rem] pr-[1.25rem] box-border min-w-[7.375rem] text-black">
                                <div className="h-[0.875rem] relative leading-[3rem] font-semibold flex items-center shrink-0 min-w-[4.75rem] whitespace-nowrap text-[min(2.5vw, 1rem)]">
                                  {getTime(data.submission_deadline)}
                                </div>
                              </div>
                              <button
                                style={{
                                  borderColor:
                                    typeStyle[
                                      JSON.parse(data?.timeline)?.status
                                    ],
                                }}
                                className="cursor-pointer border-aipgf-shark1 border-[1px] w-max border-solid py-[0.187rem] px-[0.437rem] bg-aipgf-white rounded-3xl box-border flex flex-row items-start justify-start gap-[0.187rem]"
                              >
                                <div className="flex flex-col items-start justify-start relative">
                                  <div className="w-[1rem] h-[0.063rem] absolute !m-[0] top-[1rem] left-[0rem] hidden" />
                                </div>
                                <div
                                  style={{
                                    color:
                                      typeStyle[
                                        JSON.parse(data?.timeline)?.status
                                      ],
                                  }}
                                  className="relative text-[0.75rem] font-aipgf-manrope-semibold-1356 text-aipgf-shark1 text-center inline-block w-max min-w-[1.75rem] whitespace-nowrap text-[min(2.5vw, 1rem)]"
                                >
                                  {data?.timeline &&
                                    JSON.parse(data?.timeline)
                                      ?.status.replace("_", " ")
                                      .toLowerCase()
                                      .replace(/\b\w/g, (c: any) =>
                                        c.toUpperCase()
                                      )}
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
            {currentIndex > 0 && (
              <div
                className="absolute text-[40px] cursor-pointer hover:opacity-75 transition-all duration-300 top-1/2 left-[-50px] sm:left-[-30px] z-[999] transform -translate-y-1/2  text-black p-2 rounded-full"
                onClick={scrollPrev}
              >
                <img src="leftScroll.svg" alt="" />
              </div>
            )}

            {currentIndex < maxIndex && (
              <div
                className="absolute top-1/2 right-[-50px] sm:right-[-30px] transform -translate-y-1/2 cursor-pointer hover:opacity-75 transition-all duration-300 text-black p-2 rounded-full"
                onClick={scrollNext}
              >
                <img src="rightScroll.svg" alt="" />
              </div>
            )}
          </div>
        </div>
      </section>
    </LocalizationProvider>
  );
};

export default HeroProposals;
