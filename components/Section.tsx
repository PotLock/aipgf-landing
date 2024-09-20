import { useEffect,useState } from "react";

const Section = ({title}:{title?: string}) =>{

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


    return(
        <div className="relative w-full h-full">
            {
                windowSize?.width <= 768?(
                    <img width={100} className="w-full h-60" src="/assets/background/background-mobile.png" alt="background" />
                ):(
                    <img width={100} className="w-full h-full" src="/assets/background/background-section.png" alt="background" />
                )
            }
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col text-center px-5 items-center">
                    <span className="font-semibold mq825:text-3xl text-10xl">{title?title:""}</span>
                    <p className="font-semibold text-sm mq825:max-w-sm max-w-6xl">Lorem ipsum dolor sit amet consectetur. Tortor ac amet imperdiet nam odio varius proin. </p>
                    <div className="flex mq825:flex-col flex-row gap-3 mt-3 items-center ">
                        <div className="flex flex-row gap-2 bg-white text-black p-2 rounded-full mq825:w-full w-[250px] items-center">
                            <img width={14} src="/assets/icon/search.svg" alt="icon" />
                            <input className="outline-none text-xs placeholder:text-sm w-full" type="text" placeholder="Select"/>
                            <img width={14} src="/assets/icon/close.svg" alt="icon" />
                        </div>
                        <div className="flex flex-row gap-3 mq825:max-w-sm max-w-6xl">
                            <button className="flex flex-row justify-between gap-2 bg-white text-black px-3 py-2 mq825:px-3 mq825:py-1 rounded-full mq825:w-[100px] w-[170px] items-center">
                                {
                                    windowSize?.width <= 768 ?(
                                        <small className="text-[#666F8D] text-xs">Recent</small>
                                    ):(
                                        <small className="text-[#666F8D]">Sort by: Recent</small>
                                    )
                                }
                                <img width={17} src="/assets/icon/arrow-down-gray.svg" alt="icon" />
                            </button>
                            <button className="flex flex-row justify-between gap-2 bg-white text-black px-3 py-2 mq825:px-3 mq825:py-1 rounded-full mq825:w-[100px] w-[170px] items-center">
                                {
                                    windowSize?.width <= 768 ?(
                                        <small className="text-[#666F8D] text-xs">Bounty</small>
                                    ):(
                                        <small className="text-[#666F8D]">Category: Bounty</small>
                                    )
                                }
                                <img width={17} src="/assets/icon/arrow-down-gray.svg" alt="icon" />
                            </button>
                            <button className="flex flex-row justify-between gap-2 bg-white text-black px-3 py-2 mq825:px-3 mq825:py-1 rounded-full mq825:w-[100px] w-[170px] items-center">
                                {
                                    windowSize?.width <= 768 ?(
                                        <small className="text-[#666F8D] text-xs">All</small>
                                    ):(
                                        <small className="text-[#666F8D]">Stage: All</small>
                                    )
                                }
                                <img width={17} src="/assets/icon/arrow-down-gray.svg" alt="icon" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section;