import { useState,useEffect } from "react";
import NavBar from "@/components/nav-bar";
import SectionCreate from "@/components/SectionCreate";
import { useWalletSelector } from "@/context/WalletSelectorContext"
import Footer from "@/components/footer";
import { ViewMethod } from "@/hook/near-method";
import CreateProject from "@/components/CreateProject";
import { useRouter } from "next/navigation";

const CreateProposal = () => {
    const { accountId,selector } = useWalletSelector();
    const [isExist,setIsExist] = useState<boolean>(false)
    const router = useRouter()
    if(!accountId){
        // alert("Please connect your wallet")
        router.push("/proposals")
    }

    const loadRegistrants = async () => {
        const registrants = await ViewMethod(process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"lists.potlock.near":"lists.potlock.testnet","get_registrations_for_list",{
            list_id: 1
        })
        const potlockRegistrants = registrants && registrants.map((item:any) => item.registrant_id);
        setIsExist(potlockRegistrants?.includes(accountId))
    }

    useEffect(() => {
        if(accountId){
            loadRegistrants()
        }
    },[])

    return (
        <div className="flex flex-col w-full h-full">
            <NavBar/>
            {
                accountId && !isExist ? (
                    <div className="flex flex-col">
                        <SectionCreate title="Create Project" subtitle="Project"/>
                        <CreateProject/>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        <SectionCreate title="Create Proposal" subtitle="Proposal"/>
                        <CreateProposal/>
                    </div>
                )
            }
            <Footer/>
        </div>
    )
}

export default CreateProposal;