import { useState,useEffect } from "react";
import { useWalletSelector } from "@/context/WalletSelectorContext"
import AvatarProfile from "@/components/AvatarProfile"
import dynamic from "next/dynamic";
import { getTimestamp } from "@/lib/common";
import { CallMethod } from "@/hook/near-method";
import Link from "next/link";
import { toast } from 'react-hot-toast';
import { Label } from "./ui/label";
import { Button } from "./ui/button";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, ChevronDown } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import StatusTracker from "@/components/status-tracker"
import ProposalSelector from "./ProposalSelector";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Editor = dynamic(()=>import("@/components/Editor"),{ssr:false})

const CreateRFP = () => {
    const {accountId,selector} = useWalletSelector();
    const [isShow, setIsShow] = useState<boolean>(false)
    const [title, setTitle] = useState<any>(null);
    const [description, setDescription] = useState<any>(null);
    const [summary, setSummary] = useState<any>(null);
    const [disabledSubmitBtn, setDisabledSubmitBtn] = useState<boolean>(false);
    const [isDraftBtnOpen, setDraftBtnOpen] = useState<boolean>(false);
    const [date, setDate] = useState<Date>()
    const [timeline, setTimeline] = useState<any>(null);
    const [selectedProposals, setSelectedProposals] = useState<any[]>([]);
    const [termsConsent, setTermsConsent] = useState<boolean>(false);
    const [codeOfConductConsent, setCodeOfConductConsent] = useState<boolean>(false);
    const categories = ["A Small Build","Bounty","MVP","Quick Start"]
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

    useEffect(() => {
        if (!timeline) {
          setTimeline({
            status: 'ACCEPTING_SUBMISSIONS',
          });
        }
    }, [timeline]);

    const btnOptions = [
        {
            label: "Submit Draft",
            description:
                "The author can still edit the proposal and build consensus before sharing it with sponsors.",
            value: "draft",
        },
        {
            label: "Ready for Review",
            description:
                "Start the official review process with sponsors. This will lock the editing function, but comments are still open.",
            value: "review",
        },
    ];

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

    useEffect(() => {
        setDisabledSubmitBtn(
            !title ||
            !description ||
            !summary ||
            !date ||
            !termsConsent ||
            !codeOfConductConsent
        );
    }, [
        title,
        description,
        summary,
        date,
        termsConsent,
        codeOfConductConsent
    ]);

    const onSubmit = async () => {
        try {
            if(disabledSubmitBtn) {
                toast.error("Please fill in all required fields");
                return;
            }
            
            const body = {
                rfp_body_version: "V0",
                name: title,
                description: description,
                summary: summary,
                submission_deadline: getTimestamp(date as Date),
                timeline: timeline,
            };
            const args = { labels: (selectedCategory ?? []).map((i) => i), body: body };
            toast.loading("Submitting RFP...", {
                id: "submit-rfp",
            });

            await CallMethod(
                accountId as string,
                selector,
                process.env.NEXT_PUBLIC_NETWORK === "mainnet"
                    ? process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT ?? ""
                    : process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT_TESTNET ?? "",
                "add_rfp",
                args,
                {
                    callbackUrl: `${window.location.origin}/rfps`,
                    gas: "270000000000000",
                    deposit: "100000000000000000000000"
                }
            );      

            toast.success("RFP submitted successfully!", {
                id: "submit-rfp",
            });

        } catch (error) {
            console.error("Error submitting RFP:", error);
            toast.error("Failed to submit RFP. Please try again.", {
                id: "submit-rfp",
            });
        }
    };


    const handleOptionClick = (option: { value: string }) => {
        setDraftBtnOpen(false);
        handleSubmit(option.value);
    };

    const handleSubmit = (status: string) => {
        const isDraft = status === "draft";
        if (isDraft) {
            onSubmit();
        }
    };


    const handleProposalSelect = (proposal: any) => {
        setSelectedProposals(prev => {
            const isAlreadySelected = prev.some(p => p.id === proposal.id);
            if (isAlreadySelected) {
                return prev.filter(p => p.id !== proposal.id);
            }
            return [...prev, proposal];
        });
    };


    return (
        <div className="w-full max-w-[1700px] mx-auto bg-aipgf-white overflow-hidden gap-[4.093rem] leading-[normal] tracking-[normal] sm:gap-[1rem] mq825:gap-[2.063rem] md:px-[5rem] self-stretch md:pb-[8rem] font-aipgf-manrope-semibold-1356">
                <div className="flex flex-col-reverse md:flex-row w-full justify-between gap-10 md:gap-20 mt-10">
                    <div className="flex flex-row gap-4 w-full">
                        {
                                windowSize?.width > 768&&(
                                    <AvatarProfile accountId={accountId as string} size={50}/>
                                )
                            }
                            <div className="flex flex-col gap-4 w-full">
                                <div className="flex flex-col gap-2 w-full">
                                    <Label className="font-semibold text-xl">Category</Label>
                                    <Label className="text-gray-500">Select the relevant categories that best align with your contribution to the NEAR developer community.</Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button 
                                                variant="outline" 
                                                className="w-full justify-between border-[1px] border-aipgf-geyser border-solid rounded-lg font-aipgf-manrope-semibold-1356"
                                            >
                                                <span className="text-xs">
                                                    {selectedCategory.length > 0 ? selectedCategory.join(", ") : "Select Category"}
                                                </span>
                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent 
                                            className="w-[--radix-dropdown-menu-trigger-width] font-aipgf-manrope-semibold-1356"
                                            align="start"
                                            sideOffset={4}
                                        >
                                            {categories.map((category, index) => (
                                                <DropdownMenuItem
                                                    key={index}
                                                    onClick={() => setSelectedCategory([...selectedCategory, category])}
                                                    className="cursor-pointer"
                                                >
                                                    {category}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label className="font-semibold text-xl">Title</Label>
                                    <Label className="text-gray-500">Highlight the essence of your proposal in a few words. This will appear on your proposal&#39;s detail page and the main proposal feed. Keep it short, please</Label>
                                    <Input 
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full text-sm md:text-base rounded-lg px-3 py-2 outline-none border-[1px] border-aipgf-geyser box-border border-solid shadow-sm focus:border-gray-100 font-aipgf-manrope-semibold-1356" 
                                        type="text" 
                                        placeholder="Enter Title Here"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label className="font-semibold text-xl">Summary</Label>
                                    <Label className="text-gray-500">Explain your proposal briefly. This is your chance to make a good first impression on the community. Include what needs or goals your work will address, your solution, and the benefit for the NEAR developer community.</Label>
                                    <Textarea 
                                        value={summary}
                                        onChange={(e) => setSummary(e.target.value)}
                                        className="w-full text-sm md:text-base rounded-lg px-3 py-2 outline-none border-[1px] border-aipgf-geyser border-solid shadow-sm focus:border-gray-500 h-32 resize-none font-aipgf-manrope-semibold-1356" 
                                        placeholder="Enter Summary Here"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label className="font-semibold text-xl">Description</Label>
                                    <Label className="text-gray-500">Expand on your summary with any relevant details like your contribution timeline, key milestones, team background, and a clear breakdown of how the funds will be used. Proposals should be simple and clear (e.g. 1 month). For more complex projects, treat each milestone as a separate proposal.</Label>
                                    <Editor 
                                        value={description} 
                                        onDescriptionChange={(e) => setDescription(e)}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 mt-16">
                                    <Label className="font-semibold text-xl">Final Consent</Label>
                                    <div className="flex flex-col gap-1 mt-2">
                                        <div className="flex flex-col gap-4">
                                            <div className="cntr flex flex-row items-center gap-2">
                                                <Input checked={termsConsent} onChange={() => setTermsConsent(!termsConsent)} type="checkbox" id="cbx" className="hidden-xs-up"/>
                                                <Label htmlFor="cbx" className="cbx"></Label>
                                                <Label>I&#39;ve agree to AIPGF&#39;s <Link target="_blank" href={"https://aipgf.com/terms"} style={{color: "unset"}} className="no-underline hover:underline"><strong>Terms and Conditions</strong></Link> and commit to honoring it</Label>
                                            </div>
                                            <div className="cntr flex flex-row items-center gap-2">
                                                <Input checked={codeOfConductConsent} onChange={() => setCodeOfConductConsent(!codeOfConductConsent)} type="checkbox" id="cbx1" className="hidden-xs-up"/>
                                                <Label htmlFor="cbx1" className="cbx"></Label>
                                                <Label>I&#39;ve agree to AIPGF&#39;s <Link target="_blank" href="https://aipgf.com/conduct" style={{color: "unset"}} className="no-underline hover:underline"><strong>Code of Conduct</strong></Link> and commit to honoring it</Label>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between w-full md:justify-end items-center md:gap-10 mt-10 pb-[10rem]">
                                    <Button variant="outline" className="bg-transparent hover:bg-transparent border-none shadow-none cursor-pointer">
                                        <Label className="text-[#818181] font-semibold md:text-base text-sm">Discard Changes</Label>
                                    </Button>
                                    <div className="border-[1px] border-aipgf-geyser border-solid rounded-full flex flex-row">
                                        <Button 
                                            className="flex bg-transparent md:text-base text-sm flex-row gap-2 px-3 py-2 items-center hover:bg-gray-100 hover:bg-opacity-30 rounded-l-full cursor-pointer"
                                            onClick={() => setDraftBtnOpen(true)}
                                        >
                                            {isDraftBtnOpen ? (
                                                <Button className="flex flex-row items-center gap-2 cursor-pointer bg-transparent hover:bg-transparent shadow-none border-none">
                                                    <div className="w-2 h-2 bg-[#04A46E] rounded-full"/>
                                                    <Label className="text-[#04A46E] font-semibold md:text-base text-sm">Ready for review</Label>
                                                </Button>
                                            ) : (
                                                <Button className="flex flex-row items-center gap-2 cursor-pointer bg-transparent hover:bg-transparent shadow-none border-none">
                                                    <div className="w-2 h-2 bg-[#979A9C] rounded-full"/>
                                                    <Label className="text-[#979A9C] font-semibold md:text-base text-sm">Submit draft</Label>
                                                </Button>
                                            )}
                                        </Button>
                                        <Button onClick={() => setIsShow((prev) => !prev)} className="border-l-[1px] bg-transparent cursor-pointer border-aipgf-geyser border-solid px-3 py-2 hover:bg-gray-100 hover:bg-opacity-30 rounded-r-full">
                                            <img width={20} src="/assets/icon/arrow-down-gray.svg" alt="icon" />
                                        </Button>
                                    </div>
                                    <div className="relative font-aipgf-manrope-semibold-1356">
                                        {isShow && (
                                            <div className="absolute top-6 right-0">
                                                <div className="border-[1px] border-aipgf-geyser border-solid box-border shadow-sm p-3 rounded-lg w-64 bg-white md:text-base text-sm">
                                                    <div className="flex flex-col gap-2">
                                                        {btnOptions.map((option) => (
                                                            <button
                                                                key={option.value}
                                                                onClick={() => {
                                                                    setIsShow(false);
                                                                    setDraftBtnOpen(option.value === "review");
                                                                    handleOptionClick(option);
                                                                }}
                                                                className="flex bg-white text-black text-wrap flex-row gap-3 items-start text-start cursor-pointer hover:bg-gray-100 hover:bg-opacity-10 rounded-lg p-2"
                                                            >
                                                                <div className="h-2 w-2 mt-1">
                                                                    <div className={`w-2 h-2 bg-[${option.value === "draft" ? "#979A9C" : "#04A46E"}] rounded-full`}/>
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <small className="font-semibold">{option.label}</small>
                                                                    <p className="text-xs">{option.description}</p>
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                    </div>
                    <div className="md:w-[30rem] w-full">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-2 border-b-[1px] border-aipgf-geyser border-solid pb-4">
                                <Label className="font-semibold text-xl">Submission Deadline</Label>
                                <Label className="text-gray-500">Enter the deadline for submitting proposals.</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-between text-left font-normal border-[1px] border-aipgf-geyser border-solid rounded-lg px-3 py-2",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            {date ? format(date, "PPP") : <span>Choose a date</span>}
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label className="font-semibold text-xl">Timeline</Label>  
                                <Label className="text-gray-500 text-lg">Status</Label>
                                <StatusTracker />   
                            </div>
                            <div className="flex flex-col gap-2"> 
                                <Label className="font-semibold text-xl">Select Proposal</Label>
                                <Label className="text-gray-500 text-xs">Add the proposal(s) you want to approve for this RFP. Only approved proposals are shown in the list.</Label>
                                <ProposalSelector 
                                    onProposalSelect={handleProposalSelect}
                                    selectedProposals={selectedProposals}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default CreateRFP;