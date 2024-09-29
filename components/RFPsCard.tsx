import { RFPsTypes } from "@/types/types"
import Tag from "./tag";
import { readableDate, timeAgo } from "@/lib/common";
import { labelIcons, timelineStyle } from "@/lib/constant";
import { Social } from '@builddao/near-social-js';
import { useEffect, useState } from "react";
import AvatarProfile from "./AvatarProfile";
import Link from "next/link";

const RFPsCard = ({rfp}:{rfp: RFPsTypes}) => {
    const [avatar, setAvatar] = useState<string>("");
    const [totalComments, setTotalComments] = useState<number>(0);
    if(!rfp){
        return(
            <small>No RFPs</small>
        );
    };
    const truncateString = (str: string,numberSlice: number) =>{
        if(str.length > numberSlice){
            return str.slice(0,numberSlice)+"..."
        }
        return str
    }

    const social = new Social({
        contractId: 'social.near',
    });

    const getAvatar = async () => {
        try {
            const response = await fetch(`https://dev.potlock.io/api/v1/accounts/${rfp.author_id}`);
            const data = await response.json();
            const avatarUrl = data?.near_social_profile_data?.image?.nft
                ? data?.near_social_profile_data?.image?.nft?.media
                : data?.near_social_profile_data?.image?.ipfs_cid;
            if (data?.near_social_profile_data?.image?.nft) {
                setAvatar(avatarUrl);
            }else{
                setAvatar(`https://ipfs.near.social/ipfs/${avatarUrl}`);
            }
        } catch (error) {
            console.error("Error fetching avatar:", error);
        }
    };

    const getTotalComments = async () => {
        const result:any = await social.index({
            action: 'comment',
            key: {
                type: "social",
                path: `forum.potlock.near/post/main`,
                blockHeight: rfp.blockHeight?parseInt(rfp.blockHeight.toString()):rfp.block_height,
            },
        });
        setTotalComments(result?.length);
        //console.log(result)
    };

    useEffect(() => {
        getAvatar();
        getTotalComments();
    }, []);

    return(
        <Link
            href={`/rfps/${rfp.rfp_id}`}
            style={{textDecoration: "none", color: "unset"}}
            className="flex flex-col gap-3 min-w-[350px] md:w-[550px] p-3 md:p-4 border-aipgf-geyser border-[1px] border-solid box-border rounded-lg shadow-sm relative"
        >
            <div className="flex gap-3 flex-col md:flex-col justify-between items-start">
                <div className="flex flex-row gap-3 items-center">
                    <div className="w-[41px] h-[41px] rounded-full">
                        <AvatarProfile size={41} accountId={rfp.author_id}/>
                    </div>
                    <span className="font-bold w-full">{rfp.name}</span>
                </div>
                <div className="flex flex-row gap-1">
                    {rfp.labels?.map((label) => (
                        <Tag
                            key={label}
                            propBackgroundColor={labelIcons[label]?.color ?? "#b7b7b7"}
                            propWidth="max-content"
                            x={labelIcons[label]?.icon ?? "icon.svg"}
                            cancel={label}
                            propFontWeight="unset"
                            propColor={labelIcons[label]?.textColor ?? "#000"}
                            cancelFontSize="0.75rem"
                        />
                    ))}
                </div>
            </div>
            <small className="mt-2 text-[15px]">{truncateString(rfp.summary,100)}</small>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 md:gap-0 mt-3">
                <div className="flex flex-row gap-3 items-center md:items-start md:gap-2 md:flex-col">
                    <small className="text-xs">Submission Deadline</small>
                    <span className="font-semibold text-sm">{readableDate(rfp.submission_deadline/1000000)}</span>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <div className="p-1 border-aipgf-geyser border-[1px] border-solid box-border rounded-full md:h-5 md:w-8 h-7 w-10 flex items-center justify-center">
                        <span className="text-gray-400 text-[12px] mt-1"># {rfp.rfp_id}</span>
                    </div>
                    <div className="flex gap-1 items-center text-[15px]">
                        <small>By</small>
                        <div className="flex gap-1 items-center">
                            <div className="flex gap-1">
                                <small className="font-semibold">{rfp.author_id}</small>
                                <small>| {timeAgo(rfp.ts)}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between bg-aipgf-geyser bg-opacity-25 items-center p-3 mt-3">
                <div className="flex flex-row gap-5 items-center">
                    <div className="flex flex-row gap-1 items-center">
                        <img width={16} src="/assets/icon/list-blue.svg" alt="icon" />
                        <small className="text-[#0969DA] font-semibold text-sm">{rfp.linked_proposals[0]??0} Proposals</small>
                    </div>
                    <div className="flex flex-row gap-1 items-center">
                        <img width={16} src="/assets/icon/reply.svg" alt="icon" />
                        <small className="text-[#04A46E] font-semibold text-sm">{totalComments} replies</small>
                    </div>
                </div>
                <button  
                    style={{
                        borderColor:
                        timelineStyle[
                            JSON.parse(rfp?.timeline)?.status
                        ],
                    }}
                    className="cursor-pointer border-aipgf-geyser border-[1px] border-solid box-border bg-white hover:bg-stone-50 h-8 p-1 px-4 rounded-full flex flex-row gap-1 items-center">
                    <small className="text-[11px]"
                        style={{
                            color:
                            timelineStyle[
                                JSON.parse(rfp?.timeline)?.status
                            ],
                        }}
                    >
                        {rfp?.timeline &&
                            JSON.parse(rfp?.timeline)
                                ?.status.replace("_", " ")
                                .toLowerCase()
                                .replace(/\b\w/g, (c: any) =>
                                    c.toUpperCase()
                                )}
                    </small>
                </button>
            </div>
        </Link>
    )
}

export default RFPsCard;