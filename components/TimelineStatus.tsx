import { timelineStyle } from "@/lib/constant";

const TimelineStatus = ({ status }: { status: string }) => {
    return (
        <button  
        style={{
            borderColor:
            timelineStyle[
                status
            ],
        }}
        className="cursor-pointer border-aipgf-geyser border-[1px] border-solid box-border bg-white hover:bg-stone-50 h-8 p-1 px-4 rounded-full flex flex-row gap-1 items-center">
        {/* <img width={16} src="/assets/icon/pen.svg" alt="icon" /> */}
        <small
            style={{
                color:
                timelineStyle[
                    status
                ],
            }}
        >
            {status.replace("_", " ")
                    .toLowerCase()
                    .replace(/\b\w/g, (c: any) =>
                        c.toUpperCase()
                    )}
        </small>
    </button>
    )
}

export default TimelineStatus;