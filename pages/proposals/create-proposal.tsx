import NavBar from "@/components/nav-bar";

const CreateProposal = () => {
    return (
        <div className="flex flex-col w-full h-full">
            <NavBar/>
            <div className="w-full max-w-[1700px] mx-auto bg-aipgf-white overflow-hidden gap-[4.093rem] leading-[normal] tracking-[normal] sm:gap-[1rem] mq825:gap-[2.063rem] md:px-[5rem] self-stretch">
                <div className="flex flex-col w-full h-full">
                    <h1>Create Proposal</h1>
                </div>
            </div>
        </div>
    )
}

export default CreateProposal;