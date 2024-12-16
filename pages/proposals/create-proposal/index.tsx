import { useState,useEffect, useCallback } from "react";
import NavBar from "@/components/nav-bar";
import SectionCreate from "@/components/SectionCreate";
import { useWalletSelector } from "@/context/WalletSelectorContext"
import Footer from "@/components/footer";
import { ViewMethod } from "@/hook/near-method";
import CreateProject from "@/components/CreateProject";
import CreateProposal from "@/components/CreateProposal";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CreateProposalPage = () => {
    const { accountId, modal } = useWalletSelector();
    const [isExist,setIsExist] = useState<boolean | null>(null)

    if(!accountId){
        return(
            <div className="flex flex-col w-full min-h-screen font-aipgf-manrope-semibold-1356">
                <NavBar/>
                <div className="flex flex-col w-full flex-grow justify-center items-center px-4">
                    <Card className="max-w-md w-full border-[1px] border-aipgf-gray-200 border-solid rounded-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl text-center">Connect Your Wallet</CardTitle>
                            <CardDescription className="text-center">
                                Please connect your NEAR wallet to create a proposal
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <Button 
                                onClick={() => modal.show()}
                                className="w-full max-w-[200px] cursor-pointer"
                            >
                                Connect Wallet
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                <Footer/>
            </div>
        )
    }

    const loadRegistrants = useCallback(async () => {
        try {
            const registrants = await ViewMethod(
                process.env.NEXT_PUBLIC_NETWORK=="mainnet"
                ?process.env.NEXT_PUBLIC_LISTS_CONTRACT ?? ""
                :process.env.NEXT_PUBLIC_LISTS_CONTRACT_TESTNET ?? "",
                "get_registrations_for_list",
                {
                    list_id: 1
                }
            )
            const potlockRegistrants = registrants && registrants.map((item:any) => item.registrant_id);
            setIsExist(potlockRegistrants?.includes(accountId || ""))
        } catch (error) {
            console.error("Error loading registrants:", error);
            setIsExist(false);
        }
    }, [accountId]);

    useEffect(() => {
        loadRegistrants()
    }, [loadRegistrants])

    if (isExist === null) {
        return (
            <div className="flex flex-col w-full min-h-screen font-aipgf-manrope-semibold-1356">
                <NavBar />
                <div className="flex flex-col w-full flex-grow justify-center items-center">
                    <div className="loader"></div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full h-full font-aipgf-manrope-semibold-1356">
            <NavBar/>
            {
                !isExist ? (
                    <div className="flex flex-col">
                        <SectionCreate title="Create Project" subtitle="Project"/>
                        <CreateProject edit={false}/>
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

export default CreateProposalPage;