const Template = () =>{
    return(
            <div className="border border-gray-300 shadow-sm rounded-lg p-3 flex flex-col gap-3">
                <img width={20} height={40} className="w-full h-full" src="/assets/background/skeleton.png" alt="background" />
                <small className="text-[#636C76] text-lg font-semibold">Lorem ipsum dolor sit amet consectetur.</small>
                <small className="text-[#24292F]">Lorem ipsum dolor sit amet consectetur. Consectetur sem id est nam nam et vestibulum imperdiet a. A aliquet volutpat porta malesuada.</small>
                <button className="bg-[#0969DA] p-2 rounded-full text-white w-24 items-center justify-center flex">
                    <small className="text-xs">Learn more</small>
                </button>
            </div>
    )
}

export default Template;