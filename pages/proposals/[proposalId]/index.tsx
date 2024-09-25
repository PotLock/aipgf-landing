import NavBar from "@/components/nav-bar";
import { NextPage } from "next";
import { useRouter } from "next/router";

const ProposalPage: NextPage = () => {
    const router = useRouter();
    const { proposalId } = router.query;
    
    return (
        <div className="flex flex-col w-full h-full">
            <div className="w-full max-w-[1700px] mx-auto relative bg-aipgf-white overflow-hidden flex flex-col items-start justify-start gap-[4.093rem] leading-[normal] tracking-[normal] sm:gap-[1rem] mq825:gap-[2.063rem]">
                <NavBar />
            </div>
            <div className="w-full max-w-[1700px] mx-auto relative bg-aipgf-white overflow-hidden gap-[4.093rem] leading-[normal] tracking-[normal] sm:gap-[1rem] mq825:gap-[2.063rem] md:px-[5rem]">
                <div className="flex justify-center items-center">
                    <div className="mq825:px-5 w-full mt-10 mq825:mt-4 pb-20 flex flex-col gap-4">
                        <div className="p-6 rounded-lg shadow-sm border-aipgf-geyser border-[1px] border-solid box-border w-full">
                            <div className="flex mb-4 border-[1px] border-aipgf-geyser border-solid box-border rounded-full px-2 py-1 max-w-16 items-center gap-1">
                                <img width={14} src="/assets/icon/pencil-simple-line.svg" alt="icon" />
                                <span className="text-xs text-gray-500 mt-1">Draft</span>
                            </div>
                            <h1 className="text-2xl md:max-w-[800px] w-full font-semibold text-gray-900 mb-2">
                                Lorem ipsum dolor sit amet consectetur. sagittis liquam justo purus dictum mi justo
                            </h1>
                            <p className="text-sm text-gray-500">
                                <strong>example.near</strong> created on April 5, 2024 15:30 UTC
                            </p>
                        </div>
                        {/* <div className="flex justify-between items-center bg-gray-100 bg-opacity-10 p-4 rounded-lg">
                            <div>
                                <p className="text-black font-semibold">This proposal is in draft mode and open for community replies.</p>
                                <p className="text-gray-600 text-sm">Click Submit Proposal if you want to submit a proposal.</p>
                            </div>
                            <button className="text-blue-500 border-[1px] border-solid border-blue-400 rounded-full px-4 py-2 outline-none hover:bg-blue-400 hover:text-white flex flex-row gap-1 items-center">
                                <img width={16} src="/assets/icon/view.svg" alt="icon" />
                                <span>Ready For Review</span>
                            </button>
                        </div> */}
                        <div className="flex row gap-2 mt-12 items-start">
                            <div className="h-14 w-14">
                                <img width={20} className="rounded-full w-10 h-10" src="https://ipfs.near.social/ipfs/bafkreiglmtp2uakj4epycpu524vuetx7uy5byikmtqjvzhlv2dg253thny" alt="icon" />
                            </div>
                            <div className="w-full mx-auto border-[1px] border-aipgf-geyser border-solid box-border rounded-lg">
                                <div className="flex items-center justify-between mb-2 bg-gray-100 bg-opacity-10 rounded-t-lg p-4 py-1">
                                    <div className="flex flex-row gap-2 items-center">
                                        <p className="text-sm"><strong className="font-semibold">Plug.near</strong> created RFP</p>
                                        <p className="text-xs text-gray-500">1d ago</p>
                                    </div>
                                    <div className="flex flex-row gap-5 items-center">
                                        <span className="text-sm text-gray-500 bg-transparent outline-none p-3 py-1 pt-2 border-[1px] border-aipgf-geyser border-solid box-border rounded-lg">Author</span>
                                        <button className="bg-transparent outline-none text-gray-500 cursor-pointer">
                                            <img width={20} src="/assets/icon/dots.svg" alt="icon" />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="mb-6">
                                        <h2 className="text-sm font-semibold text-gray-700 border-b-[1px] border-aipgf-geyser border-solid box-border pb-2">PROPOSAL CATEGORY</h2>
                                        <div className="flex items-center space-x-2 mt-2 border-[1px] border-aipgf-geyser border-solid box-border rounded-lg px-2 justify-between">
                                            <div className="flex flex-row items-center gap-4">
                                                <div className="flex items-center justify-center w-9 h-9 bg-yellow-100 rounded-full">
                                                    <i className="fas fa-hammer text-yellow-500"></i>
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="text-sm font-semibold">Small Build</p>
                                                    <p className="text-xs text-gray-500 -mt-2">Develop focused solutions to address specific challenges.</p>
                                                </div>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                <img width={25} src="/assets/icon/arrow-down-gray.svg" alt="icon" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <h2 className="text-sm font-semibold text-gray-700 border-b-[1px] border-aipgf-geyser border-solid box-border pb-2">SUMMARY</h2>
                                        <p className="text-sm text-gray-700 mt-2">Lorem ipsum dolor sit amet consectetur. Et usit aliquam cras tristique integer enim. Dignissim vitae euismod id viverra morbi laoreet. Faucibus etiam sed dictum nunc lacus ut amet. Pretium velit in ante ac ullamcorper. Sed diam dolor ut sed sed. Rhoncus gravida sem ac viverra enim duis. Purus ac blandit quis a.</p>
                                    </div>
                                    <div className="mb-6">
                                        <h2 className="text-sm font-semibold text-gray-700 border-b-[1px] border-aipgf-geyser border-solid box-border pb-2">DESCRIPTION</h2>
                                        <h3 className="text-lg font-semibold text-gray-900 mt-2">Request</h3>
                                        <p className="text-sm text-gray-700 mt-2">Lorem ipsum dolor sit amet consectetur. Tristique hac mattis convallis nec nam. Aliquam facilisi morbi velit nibh risus. Mi imperdiet iaculis integer at pharetra magna dictum nam nibh. Metus vulputate dictum nibh quis ultrices ornare. Vivamus tempor massa at ut diam est. Nibh tempor consequat nunc ac commodo neque ligula in faucibus. Malesuada ipsum mattis nisi eu proin ultricies.</p>
                                        <p className="text-sm text-gray-700 mt-2">Neque proin lorem justo pellentesque nec in sed vestibulum. Dui vivamus convallis tristique at sed duis nibh ut. Blandit elit nunc nibh mi viverra suspendisse. Vivamus sagittis lacus etiam ac viverra.</p>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Bidding Process</h3>
                                        <p className="text-sm text-gray-700 mt-2">Lorem ipsum dolor sit amet consectetur. Tristique hac mattis convallis nec nam. Aliquam facilisi morbi velit nibh risus. Mi imperdiet iaculis integer at pharetra magna dictum nam nibh. Metus vulputate dictum nibh quis ultrices ornare. Vivamus tempor massa at ut diam est. Nibh tempor consequat nunc ac commodo neque ligula in faucibus. Malesuada ipsum mattis nisi eu proin ultricies.</p>
                                        <p className="text-sm text-gray-700 mt-2">Neque proin lorem justo pellentesque nec in sed vestibulum. Dui vivamus convallis tristique at sed duis nibh ut. Blandit elit nunc nibh mi viverra suspendisse. Vivamus sagittis lacus etiam ac viverra.</p>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Selection Process</h3>
                                        <p className="text-sm text-gray-700 mt-2">Lorem ipsum dolor sit amet consectetur. Tristique hac mattis convallis nec nam. Aliquam facilisi morbi velit nibh risus. Mi imperdiet iaculis integer at pharetra magna dictum nam nibh. Metus vulputate dictum nibh quis ultrices ornare. Vivamus tempor massa at ut diam est.</p>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Funding Process</h3>
                                        <p className="text-sm text-gray-700 mt-2">Lorem ipsum dolor sit amet consectetur. Tristique hac mattis convallis nec nam. Aliquam facilisi morbi velit nibh risus. Mi imperdiet iaculis integer at pharetra magna dictum nam nibh. Metus vulputate dictum nibh quis ultrices ornare. Vivamus tempor massa at ut diam est.</p>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Points of Contact</h3>
                                        <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                                            <li>Lorem ipsum dolor sit amet consectetur.</li>
                                            <li>Tristique hac mattis convallis nec nam.</li>
                                            <li>Aliquam facilisi morbi velit nibh risus.</li>
                                            <li>Mi imperdiet iaculis integer at pharetra magna dictum nam nibh.</li>
                                        </ul>
                                    </div>
                                    <div className="flex items-center space-x-4 mt-4">
                                        <button className="flex items-center space-x-1 bg-transparent outline-none text-gray-500 cursor-pointer">
                                            <img width={16} src="/assets/icon/heart.svg" alt="icon" />
                                            <span className="text-[15px]">3</span>
                                        </button>
                                        <button className="flex items-center space-x-1 bg-transparent outline-none text-gray-500 cursor-pointer">
                                            <img width={20} src="/assets/icon/comment.svg" alt="icon" />
                                            <span className="text-[15px]">0</span>
                                        </button>
                                        <button className="flex items-center space-x-1 bg-transparent outline-none text-gray-500 cursor-pointer">
                                            <img width={20} src="/assets/icon/link.svg" alt="icon" />
                                        </button>
                                        <button className="flex items-center space-x-1 bg-transparent outline-none text-gray-500 cursor-pointer">
                                            <img width={20} src="/assets/icon/share.svg" alt="icon" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProposalPage;