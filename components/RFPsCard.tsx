import { RFPsTypes } from "@/types/types"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Social } from '@builddao/near-social-js'
import { readableDate, timeAgo } from "@/lib/common"
import { labelIcons, timelineStyle } from "@/lib/constant"
import AvatarProfile from "./AvatarProfile"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Tag from "./tag"
import { Button } from "./ui/button"

const RFPsCard = ({ rfp }: { rfp: RFPsTypes }) => {
    const [totalComments, setTotalComments] = useState<number>(0)

    if (!rfp) {
        return <small>No RFPs</small>
    }

    const truncateString = (str: string, numberSlice: number) => {
        if (str.length > numberSlice) {
            return str.slice(0, numberSlice) + "..."
        }
        return str
    }

    const social = new Social({
        contractId: process.env.NEXT_PUBLIC_NETWORK == "mainnet" ? "social.near" : "v1.social08.testnet",
    })

    const getTotalComments = async () => {
        const result: any = await social.index({
            action: 'comment',
            key: {
                type: "social",
                path: `${process.env.NEXT_PUBLIC_NETWORK == "mainnet" ? "forum.potlock.near" : "forum.potlock.testnet"}/post/main`,
                blockHeight: rfp.blockHeight ? parseInt(rfp.blockHeight.toString()) : rfp.block_height,
            },
        })
        setTotalComments(result?.length)
    }

    useEffect(() => {
        getTotalComments()
    }, [])

    const timelineStatus = JSON.parse(rfp?.timeline)?.status

    return (
        <Link href={`/rfps/${rfp.rfp_id}`} className="block no-underline border-[1px] border-solid border-aipgf-geyser rounded-lg">
            <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-[41px] h-[41px] rounded-full overflow-hidden">
                            <AvatarProfile size={41} accountId={rfp.author_id} />
                        </div>
                        <span className="font-bold">{rfp.name}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
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
                </CardHeader>

                <CardContent className="-mt-4">
                    <p className="text-sm text-muted-foreground">
                        {truncateString(rfp.summary, 100)}
                    </p>
                    
                    <div className="flex flex-col md:flex-row justify-between gap-2">
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Submission Deadline</p>
                            <p className="font-semibold text-sm">
                                {readableDate(rfp.submission_deadline/1000000)}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Badge variant="outline" className="rounded-full">
                                #{rfp.rfp_id}
                            </Badge>
                            <span className="text-muted-foreground">By</span>
                            <span className="font-semibold">{rfp.author_id}</span>
                            <span className="text-muted-foreground">|</span>
                            <span className="text-muted-foreground">{timeAgo(rfp.ts)}</span>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="bg-muted/50 p-4 flex justify-between items-center">
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
                    
                    <Button  
                        style={{
                            borderColor:
                            timelineStyle[
                                JSON.parse(rfp?.timeline)?.status
                            ]?.color,
                        }}
                        className="cursor-pointer border-aipgf-geyser border-[1px] border-solid box-border bg-white hover:bg-stone-50 h-8 p-1 px-4 rounded-full flex flex-row gap-1 items-center">
                        <img width={13} src={timelineStyle[
                            JSON.parse(rfp?.timeline)?.status
                        ]?.icon} alt="icon" />
                        <small
                            style={{
                                color:
                                timelineStyle[
                                    JSON.parse(rfp?.timeline)?.status
                                ]?.color,
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
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    )
}

export default RFPsCard