import type { NextPage } from "next";
import { useState, useCallback, useEffect } from "react";
import { TextField, Icon } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Button1 from "./button1";
import Tag from "./tag";
import { CANCELLED } from "dns";

export type HeroProposalsType = {
  className?: string;
};

const QUERYAPI_ENDPOINT = `https://near-queryapi.api.pagoda.co/v1/graphql`;
const queryName =
  "bos_forum_potlock_near_ai_pgf_indexer_proposals_with_latest_snapshot";
export const query = `query GetLatestSnapshot($offset: Int = 0, $limit: Int = 10, $where: ${queryName}_bool_exp = {}) {
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

const rfpQueryName =
  "bos_forum_potlock_near_ai_pgf_indexer_rfps_with_latest_snapshot";
const rfpQuery = `query GetLatestSnapshot($offset: Int = 0, $limit: Int = 10, $where: ${rfpQueryName}_bool_exp = {}) {
  ${rfpQueryName}(
    offset: $offset
    limit: $limit
    order_by: {rfp_id: desc}
    where: $where
  ) {
    name
    rfp_id
  }
  }`;

type ProposalTypes = {
  name: string;
  timeline: string;
  summary: string;
  labels: Array<string>;
  author_id: string;
  ts: number;
  linked_rfp?: number;
};

const labelIcons: any = {
  MVP: { icon: "solarcrownbroken.svg", color: "#f0cf8e" },
  Bounty: { icon: "bounty.svg", color: "#7b66dc", textColor: "#fff" },
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
  const [aggregateCount, setAggregateCount] = useState(0);
  const [proposals, setProposals] = useState<ProposalTypes[]>([]);

  async function fetchGraphQL(
    operationsDoc: string,
    operationName: string,
    variables: { limit: number; offset: number; where: {} }
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
          if (result.data) {
            const data = result.data?.[queryName];
            const totalResult = result.data?.[`${queryName}_aggregate`];
            let filteredData: ProposalTypes[] = [];
            const promises = data.map((item: ProposalTypes) => {
              if (Number(item.linked_rfp)) {
                return;
              } else {
                filteredData.push(item);

                return Promise.resolve(item);
              }
            });
            setProposals(filteredData);
            Promise.all(promises).then((res) => {
              setAggregateCount(totalResult.aggregate.count);
            });
          }
        }
      });
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
                <div className="w-[17.094rem] relative tracking-[-1px] leading-[3rem] font-medium flex items-center shrink-0 sm:text-[1.75rem] sm:leading-[1.813rem] mq825:text-[2.313rem] mq825:leading-[2.375rem]">
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
          <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[1.5rem] max-w-full text-[1.375rem] text-aipgf-shark1 font-aipgf-manrope-semibold-1356">
            {proposals.length &&
              proposals.map((data) => (
                <div className="flex-1 rounded-md bg-aipgf-regent-gray border-aipgf-geyser border-[1px] border-solid box-border overflow-hidden flex flex-row items-start justify-start pt-[3.25rem] pb-[0rem] pl-[0.062rem] pr-[0rem] min-w-[19.25rem] max-w-full">
                  <div className="flex-1 bg-aipgf-white flex flex-col items-start justify-start pt-[1.312rem] px-[0rem] pb-[0rem] box-border relative gap-[1.112rem] max-w-full">
                    <div className="w-[2.563rem] h-[2.563rem] absolute !m-[0] top-[-1.506rem] left-[1rem] rounded-[12811.22px] bg-aipgf-white border-aipgf-white border-[2px] border-solid box-border overflow-hidden shrink-0"></div>
                    <div className="self-stretch flex flex-row items-start justify-start py-[0rem] px-[1rem] box-border max-w-full font-p">
                      <div className="flex-1 flex flex-col items-start justify-start gap-[1.343rem] max-w-full">
                        <div className="self-stretch overflow-hidden flex flex-row items-start justify-start gap-[3.687rem] sm:flex-wrap sm:gap-[1.813rem]">
                          <h2 className="m-0 flex-1 relative text-inherit leading-[1.563rem] font-bold font-[inherit] inline-block min-w-[9.563rem] sm:text-[1.125rem] sm:leading-[1.25rem]">
                            {data?.name}
                          </h2>
                          <Tag
                            propBackgroundColor={
                              labelIcons[data.labels[0]]?.color ?? "#b7b7b7"
                            }
                            propWidth="max-content"
                            x={labelIcons[data.labels[0]]?.icon ?? "icon.svg"}
                            cancel={data.labels[0]}
                            propFontWeight="unset"
                            propColor={
                              labelIcons[data.labels[0]]?.textColor ?? "#000"
                            }
                            cancelFontSize="0.75rem"
                          />
                        </div>
                        <div className="self-stretch h-[3.063rem] overflow-hidden shrink-0 flex flex-row items-start justify-start py-[0rem] pl-[0rem] pr-[1.625rem] box-border max-w-full text-[0.844rem] font-aipgf-manrope-semibold-1356">
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
                        <div className="flex flex-row items-center justify-start py-[0.156rem] px-[0rem]">
                          {/* <div className="flex flex-row items-center justify-start py-[0rem] px-[0rem] gap-[0.5rem]">
                            <div className="flex flex-col items-start justify-center py-[0.093rem] px-[0rem]">
                              <img
                                className="w-[1rem] h-[1rem] relative"
                                alt=""
                                src="/icon-2.svg"
                              />
                            </div>
                            <div className="flex flex-col items-center justify-start">
                              <div className="relative inline-block min-w-[3.375rem]">
                                3 replies
                              </div>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch bg-aipgf-aqua-haze flex flex-row items-start justify-start pt-[0.687rem] px-[1rem] pb-[0.625rem] box-border max-w-full z-[1] text-[0.75rem] text-gray-100">
                      <div className="flex-1 flex flex-row items-start justify-start gap-[0.5rem] max-w-full sm:flex-wrap">
                        <div className="flex flex-col items-start justify-start pt-[0.375rem] px-[0rem] pb-[0rem]">
                          <div className="relative leading-[0.938rem] font-light inline-block min-w-[7.063rem]">
                            Submission Deadline
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col items-start justify-start pt-[0.375rem] pb-[0rem] pl-[0rem] pr-[1.25rem] box-border min-w-[7.375rem] text-black">
                          <div className="h-[0.875rem] relative leading-[3rem] font-semibold flex items-center shrink-0 min-w-[4.75rem]">
                            {getTime(data.ts)}
                          </div>
                        </div>
                        <button
                          style={{
                            borderColor:
                              typeStyle[JSON.parse(data?.timeline)?.status],
                          }}
                          className="cursor-pointer border-aipgf-shark1 border-[1px] w-max border-solid py-[0.187rem] px-[0.437rem] bg-aipgf-white rounded-3xl box-border flex flex-row items-start justify-start gap-[0.187rem]"
                        >
                          <div className="flex flex-col items-start justify-start relative">
                            <svg
                              width="16"
                              height="17"
                              viewBox="0 0 16 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.2075 5.10891L11.4144 2.31641C11.3215 2.22353 11.2113 2.14985 11.0899 2.09958C10.9686 2.04931 10.8385 2.02344 10.7072 2.02344C10.5759 2.02344 10.4458 2.04931 10.3245 2.09958C10.2031 2.14985 10.0929 2.22353 10 2.31641L2.29313 10.0233C2.19987 10.1158 2.12593 10.2259 2.0756 10.3473C2.02528 10.4686 1.99959 10.5988 2.00001 10.7302V13.5233C2.00001 13.7885 2.10536 14.0429 2.2929 14.2304C2.48043 14.4179 2.73479 14.5233 3.00001 14.5233H13.5C13.6326 14.5233 13.7598 14.4706 13.8536 14.3768C13.9473 14.2831 14 14.1559 14 14.0233C14 13.8907 13.9473 13.7635 13.8536 13.6697C13.7598 13.576 13.6326 13.5233 13.5 13.5233H7.20751L14.2075 6.52329C14.3004 6.43042 14.3741 6.32018 14.4243 6.19883C14.4746 6.07749 14.5005 5.94744 14.5005 5.8161C14.5005 5.68476 14.4746 5.5547 14.4243 5.43336C14.3741 5.31202 14.3004 5.20177 14.2075 5.10891ZM5.79313 13.5233H3.00001V10.7302L8.50001 5.23016L11.2931 8.02329L5.79313 13.5233ZM12 7.31641L9.20751 4.52329L10.7075 3.02329L13.5 5.81641L12 7.31641Z"
                                fill={
                                  typeStyle[JSON.parse(data?.timeline)?.status]
                                }
                              />
                            </svg>
                            <div className="w-[1rem] h-[0.063rem] absolute !m-[0] top-[1rem] left-[0rem] hidden" />
                          </div>
                          <div
                            style={{
                              color:
                                typeStyle[JSON.parse(data?.timeline)?.status],
                            }}
                            className="relative text-[0.75rem] font-aipgf-manrope-semibold-1356 text-aipgf-shark1 text-center inline-block w-max min-w-[1.75rem]"
                          >
                            {data?.timeline &&
                              JSON.parse(data?.timeline)?.status}
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </LocalizationProvider>
  );
};

export default HeroProposals;
