import type { NextPage } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import Tag from "./tag";
import { RFPsTypes } from "@/types/types";
import { timeAgo } from "@/lib/common";
import { labelIcons, timelineStyle } from "@/lib/constant";
import { Social } from "@builddao/near-social-js";
import AvatarProfile from "./AvatarProfile";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { MessageSquare, GitPullRequest } from "lucide-react";

const RFPsPost: NextPage<{ rfp?: RFPsTypes }> = ({ rfp }) => {
    const [avatar, setAvatar] = useState<string>("");
    const [totalComments, setTotalComments] = useState<number>(0);
    const [windowSize, setWindowSize] = useState<any>({
        width: null,
        height: null
    });

    const social = new Social({
        contractId: process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"social.near":"v1.social08.testnet",
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

    const getTotalComments = async () => {
        const result:any = await social.index({
            action: 'comment',
            key: {
                type: "social",
                path: `${process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"forum.potlock.near":"forum.potlock.testnet"}/post/main`,
                blockHeight: rfp?.block_height,
            },
        });
        setTotalComments(result?.length);
        //console.log(result)
    };

    useEffect(() => {
        getTotalComments();
    }, []);

    const truncateString = (str: string) =>{
        if(str.length > 100){
            return str.slice(0,100)+"..."
        }
        return str
    }

    const renderRFPs = () => {
        if (!rfp) {
            return <div>No RFPs found</div>;
        }

        return (
            <Card className="w-full border-aipgf-geyser border-[1px] border-solid box-border">
                <CardContent className="p-6">
                    <div className="flex md:flex-row flex-col gap-2 items-end md:items-center justify-between">
                        <div className="flex flex-col md:flex-row md:gap-3 gap-1 flex-1">
                            <div className="flex flex-row gap-2 items-center md:items-start">
                                <AvatarProfile accountId={rfp?.author_id} size={30} />
                                {windowSize?.width <= 768 && (
                                    <div className="flex flex-row gap-3">
                                        <span className="text-sm md:text-lg font-semibold">{rfp.name}</span>
                                        <div className="flex flex-wrap gap-2">
                                            {rfp.labels?.map((data) => (
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
                            </div>

                            <Link 
                                href={`/rfps/${rfp.rfp_id}`}
                                className="flex flex-col gap-1 flex-1 text-black no-underline"
                            >
                                {windowSize?.width > 768 && (
                                    <div className="flex flex-col gap-3">
                                        <span className="text-sm md:text-lg font-semibold">{rfp.name}</span>
                                        <div className="flex flex-wrap gap-2">
                                            {rfp.labels?.map((data) => (
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
                                    <small className="text-muted-foreground flex flex-row gap-1 items-center mt-2">
                                        By{" "}
                                        <span className="font-medium">
                                            {rfp?.author_id?.length > 20
                                                ? `${rfp?.author_id?.slice(0, 20)}...`
                                                : rfp?.author_id}
                                        </span>
                                        <span className="text-muted-foreground">| {timeAgo(rfp.ts)}</span>
                                    </small>
                                    <p className="md:text-base text-xs text-muted-foreground">
                                        {truncateString(rfp.summary)}
                                    </p>
                                </div>

                                <div className="flex flex-row gap-5 mt-3 items-center">
                                    <div className="flex flex-row gap-1 items-center">
                                        <img width={16} src="/assets/icon/list-blue.svg" alt="icon" />
                                        <small className="text-[#0969DA] font-semibold text-sm">{rfp.linked_proposals[0]??0} Proposals</small>
                                    </div>
                                    <div className="flex flex-row gap-1 items-center">
                                        <img width={16} src="/assets/icon/reply.svg" alt="icon" />
                                        <small className="text-[#04A46E] font-semibold text-sm">{totalComments} replies</small>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <Button  
                            style={{
                                borderColor:
                                timelineStyle[
                                    rfp?.timeline?.status
                                ]?.color,
                            }}
                            className="cursor-pointer border-aipgf-geyser border-[1px] border-solid box-border bg-white hover:bg-stone-50 h-8 p-1 px-4 rounded-full flex flex-row gap-1 items-center">
                            <img width={16} src={timelineStyle[
                                rfp?.timeline?.status
                            ]?.icon} alt="icon" />
                            <small
                                style={{
                                    color:
                                    timelineStyle[
                                        rfp?.timeline?.status
                                    ]?.color,
                                }}
                            >
                                {rfp?.timeline &&
                                    rfp?.timeline?.status
                                        ?.replace("_", " ")
                                        .toLowerCase()
                                        .replace(/\b\w/g, (c: any) =>
                                            c.toUpperCase()
                                        )}
                            </small>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="flex flex-col gap-3">
            {renderRFPs()}
        </div>
    );
};

export default RFPsPost;