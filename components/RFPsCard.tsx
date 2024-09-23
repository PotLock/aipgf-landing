const RFPsCard = () => {
    const truncateString = (str: string,numberSlice: number) =>{
        if(str.length > numberSlice){
            return str.slice(0,numberSlice)+"..."
        }
        return str
    }
    return(
        <div className="flex flex-col gap-3 min-w-[350px] md:w-[445px] p-3 md:p-4 border border-gray-300 rounded-lg shadow-sm">
            <div className="flex gap-3 flex-col md:flex-row justify-between items-start">
                <div className="flex flex-row gap-3">
                    <div className="w-[41px] h-[41px]">
                        <img width={41} src="/assets/icon/avatar.png" alt="avatar" />
                    </div>
                    <span className="font-bold md:max-w-[12rem]">Lorem ipsum dolor sit amet consectetur. </span>
                </div>
                <div className="bg-[#0747BC] flex flex-row gap-1 p-2 rounded-full text-white w-34 h-8 items-center">
                    <img width={17} src="/assets/icon/clock.svg" alt="icon" />
                    <small className="text-xs">Quick Start</small>
                </div>
            </div>
            <small>{truncateString("Lorem ipsum dolor sit amet consectetur. Neque quam mattis in non condimentum. Mauris morbi volutpat ac vitae curabitur purus enim pellentesque.",100)}</small>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 md:gap-0">
                <div className="flex flex-row gap-3 items-center md:items-start md:gap-0 md:flex-col">
                    <small className="text-sm md:text-xs">Submission Deadline</small>
                    <span className="font-semibold">April 15, 2024</span>
                </div>
                <div className="flex flex-row gap-2">
                    <div className="p-2 border-2 border-gray-300 rounded-full md:h-8 md:w-12 h-7 w-10 flex items-center justify-center">
                        <span className="text-gray-400 text-xs md:text-lg"># 1</span>
                    </div>
                    <div className="flex gap-1 items-center">
                        <small>By</small>
                        <div className="flex gap-1 items-center">
                            <div className="flex gap-1">
                                <small className="font-semibold">Potluck.near</small>
                                <small>| 2 days ago</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between bg-gray-100 bg-opacity-75 items-center p-3">
                <div className="flex flex-row gap-5 items-center">
                    <div className="flex flex-row gap-1 items-center">
                        <img width={16} src="/assets/icon/list-blue.svg" alt="icon" />
                        <small className="text-[#0969DA] font-semibold text-sm">3 Proposals</small>
                    </div>
                    <div className="flex flex-row gap-1 items-center">
                        <img width={16} src="/assets/icon/reply.svg" alt="icon" />
                        <small className="text-[#04A46E] font-semibold text-sm">3 replies</small>
                    </div>
                </div>
                <button className="flex cursor-pointer bg-white border border-gray-400 p-2 py-1 gap-1 rounded-2xl">
                    <img width={14} src="/assets/icon/pencil-simple-line.svg" alt="icon" />
                    <small className="text-xs">Dralf</small>
                </button>
            </div>
        </div>
    )
}

export default RFPsCard;