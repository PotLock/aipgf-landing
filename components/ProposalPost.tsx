import type { NextPage } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Social } from '@builddao/near-social-js';
import { labelIcons, timelineStyle } from "@/lib/constant";
import { timeAgo } from "@/lib/common";
import VoteButton from "./VoteButton";
import AvatarProfile from "./AvatarProfile";
import { ProposalTypes } from "@/types/types";
import { Card, CardContent } from "@/components/ui/card";

import { MessageSquare } from "lucide-react";
import Tag from "./tag";

const ProposalPost: NextPage<{
  proposal: ProposalTypes;
  setTotalReplies: any;
  replies: any;
}> = ({ proposal, setTotalReplies }) => {
  const [totalComments, setTotalComments] = useState<number>(0);
  const [totalVotes, setTotalVotes] = useState<number>(0);
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

  const social = new Social({
    contractId: process.env.NEXT_PUBLIC_NETWORK == "mainnet" ? "social.near" : "v1.social08.testnet",
  });

  const getTotalComments = async () => {
    const result:any = await social.index({
      action: 'comment',
      key: {
        type: "social",
        path: `${process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"forum.potlock.near":"forum.potlock.testnet"}/post/main`,
        blockHeight: proposal.blockHeight?parseInt(proposal.blockHeight.toString()):proposal.block_height,
      },
    });
    setTotalComments(result?.length);
    if(result?.length > 0){
      setTotalReplies((prevReplies:number) => prevReplies + result?.length);
    }
  };

  const getTotalVotes = async () => {
    const result:any = await social.index({
      action: 'like',
      key: {
        type: "social",
        path: `${process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"forum.potlock.near":"forum.potlock.testnet"}/post/main`,
        blockHeight: proposal.blockHeight?parseInt(proposal.blockHeight.toString()):proposal.block_height,
      },
    });
    setTotalVotes(result?.length);
    //console.log(result)
  };

  useEffect(() => {
    getTotalComments(); 
    getTotalVotes();
  }, []);

  const truncateString = (str: string) => {
    if (str.length > 100) {
      return str.slice(0, 100) + "..."
    }
    return str
  }

  const renderProposals = () => {
    if (!proposal) {
      return <div>No proposals found</div>;
    }

    return (
      <Card className="w-full border-[1px] border-aipgf-geyser border-solid">
        <CardContent className="p-5">
          <div className="flex md:flex-row flex-col gap-3 items-end md:items-center justify-between">
            <div className="flex flex-col md:flex-row md:gap-3 gap-1">
              <div className="flex flex-row gap-2 items-start md:items-start">
                <AvatarProfile accountId={proposal.author_id} size={30} />
                {windowSize?.width <= 768 && (
                  <span className="text-sm md:text-lg font-semibold">{proposal.name}</span>
                )}
              </div>
              {
                windowSize?.width <= 768 && (
                  <div className="flex flex-row gap-2">
                      {proposal.labels?.map((data) => (
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
                )
              }
              <Link 
                href={`/proposals/${proposal.proposal_id}`} 
                className="flex flex-col gap-1 text-black hover:no-underline no-underline"
              >
                {windowSize?.width > 768 && (
                  <div className="flex flex-col gap-3">
                    <span className="text-sm md:text-lg font-semibold">{proposal.name}</span>
                    <div className="flex flex-row gap-2">
                    {proposal.labels?.map((data) => (
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
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <small className="font-semibold flex flex-row gap-1 items-center mt-2">
                    By{" "}
                    {proposal?.author_id?.length > 20
                      ? `${proposal?.author_id?.slice(0, 20)}...`
                      : proposal?.author_id}
                    <span className="font-thin">| {timeAgo(proposal.ts)}</span>
                  </small>
                  <span className="md:text-base text-xs">{truncateString(proposal?.summary)}</span>
                </div>

                <div className="flex flex-row gap-5 mt-3 items-center">
                  <div className="flex flex-row gap-1 items-center">
                    <VoteButton
                      proposalId={proposal.proposal_id}
                      blockHeight={proposal.block_height}
                      notifyAccountId={proposal.author_id}
                      accountId={proposal.author_id}
                    />
                    <small className="text-destructive font-semibold text-xs">{totalVotes} votes</small>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <small className="text-emerald-600 font-semibold text-xs">{totalComments} replies</small>
                  </div>
                </div>
              </Link>
            </div>

            <div  
                style={{
                    borderColor:
                    timelineStyle[
                        proposal?.timeline?.status
                    ]?.color,
                }}
                className="cursor-pointer border-aipgf-geyser border-[1px] border-solid box-border bg-white hover:bg-stone-50 h-8 p-1 px-4 rounded-full flex flex-row gap-1 items-center">
                <img width={13} src={timelineStyle[
                  proposal?.timeline?.status
                ]?.icon} alt="icon" />
                <small
                    style={{
                        color:
                        timelineStyle[
                            proposal?.timeline?.status
                        ]?.color,
                    }}
                >
                    {proposal?.timeline &&
                        proposal?.timeline?.status.replace("_", " ")
                            .toLowerCase()
                            .replace(/\b\w/g, (c: any) =>
                                c.toUpperCase()
                            )}
                </small>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return <div className="flex flex-col gap-3">{renderProposals()}</div>;
};

export default ProposalPost;