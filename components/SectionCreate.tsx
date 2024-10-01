const SectionCreate = ({title,subtitle}:{title?:string, subtitle?: string}) =>{
    return(
        <div className="h-full w-full relative">
            <img width={20} className="w-full h-16 md:h-full" src="/assets/background/section.png" alt="background" />
            <div className="flex justify-center items-start absolute top-[35%] md:top-[60%] left-[1%] md:left-[10%] transform -translate-y-1/2">
                <div className="w-full md:mt-10 mt-4 md:pb-20">
                    <div className="flex flex-col gap-1 md:gap-3">
                        <span className="font-semibold text-xl md:text-[38px]">{title}</span>
                        <span className="font-semibold text-sm md:text-lg">{subtitle} &#62; <span className="font-thin">{title}</span></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionCreate;