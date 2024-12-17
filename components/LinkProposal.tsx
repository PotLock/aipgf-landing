import { NextPage } from "next";
import { ViewMethod } from "@/hook/near-method";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { readableDate } from "@/lib/common";
import AvatarProfile from "./AvatarProfile";
import TimelineStatus from "./TimeLineStatus";
import { LinkProposalProps } from "@/types/types";



const LinkProposal: NextPage<LinkProposalProps> = ({ linkedProposalIds, showStatus }) => {
    
    const isShowStatus = showStatus ?? false;

    const [linkedProposalsData, setLinkedProposalsData] = useState<any[]>([]);

    //console.log(linkedProposalIds);

    const fetchLinkedProposals = useCallback(async () => {
        const promises = linkedProposalIds.map(async (item) => {
            const data = await ViewMethod(process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT as string, "get_proposal", {
                proposal_id: item,
            });
            return data;
        });

        const results = await Promise.all(promises);
        const validResults = results.filter(data => data !== null);
        setLinkedProposalsData(validResults);
    }, [linkedProposalIds]);

    useEffect(() => {
        fetchLinkedProposals();
    }, [fetchLinkedProposals]);
    
    return (
    <div className="flex flex-col gap-3">
        {linkedProposalsData.map((item) => {
        return (
            <Link
                href={`/proposals/${item.id}`}
                target="_blank"
                key={item.id}
                style={{
                    textDecoration: "none",
                    color: "unset",
                }}
            >
                <div className="flex gap-3 items-center">
                    <AvatarProfile
                        accountId={item.snapshot.editor_id}
                        size={40}
                    />
                    <div className="flex flex-col" style={{ maxWidth: 250 }}>
                    <b className="text-truncate">{item.snapshot.name}</b>
                    <div className="text-xs text-gray-500 mt-1">
                        created on {readableDate(item.snapshot.timestamp / 1000000)}
                    </div>
                    {isShowStatus && (
                        <div style={{ width: "fit-content" }} className="mt-1">
                            <TimelineStatus
                                status={item.snapshot.timeline.status}
                            />
                        </div>
                    )}
                    </div>
                </div>
            </Link>
        );
        })}
    </div>
    );
}

export default LinkProposal;