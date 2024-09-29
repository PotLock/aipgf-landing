import { useState, useEffect } from "react";
import { useWalletSelector } from "@/context/WalletSelectorContext"
import AvatarProfile from './AvatarProfile';
import { NextPage } from "next";
import Link from "next/link";


const ButtonLogin: NextPage = () => {
    const { modal, accountId, selector } = useWalletSelector();
    const [isOpen, setIsOpen] = useState<boolean>(false);
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

    //console.log(accountId);

    const handleSignOut = async () => {
        const wallet = await selector.wallet();
        wallet.signOut();
    };

    if (!accountId) {
        return (
        <button
            onClick={modal.show}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full cursor-pointer"
        >
            <span>Login</span>
        </button>
        );
    }

    const formatAccountId = (accountId: string) => {
        if (accountId.length === 64) {
            return `${accountId.slice(0, 6)}...${accountId.slice(-4)}`;
        } else if (accountId.endsWith('.near')) {
            return accountId.slice(0, -5); // Remove '.near'
        }
        return accountId;
    };

    return (
        <div className="flex items-center space-x-2">
            {
                windowSize?.width >= 768 &&(
                    <div className="relative">
                        <button className="bg-[#64707B] p-1 px-2 rounded-full flex flex-row items-center text-white gap-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                            <div className="mt-1">
                                <AvatarProfile accountId={accountId} size={30} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[12px] font-semibold text-start">{formatAccountId(accountId)}</span>
                                <small>{formatAccountId(accountId)}.near</small>
                            </div>
                            <img width={20} height={20} className="w-6 h-6" src="/assets/icon/arrow-down.svg" alt="icon" />
                        </button>
                        {
                            isOpen && (
                                <div className="min-w-[200px] text-sm mt-10 p-3 border-gray-100 border-[1px] border-solid box-border rounded-lg shadow-sm absolute top-2 right-0 bg-white z-50">
                                    <div className="flex items-center mb-4 gap-2">
                                        <div className="mt-1">
                                            <AvatarProfile accountId={accountId} size={30} />
                                        </div>
                                        <span className="font-semibold text-sm">{formatAccountId(accountId)}</span>
                                    </div>
                                    <div className="mb-4 ml-1 text-sm">
                                        <Link target="_blank" href={`https://bos.potlock.org/?tab=profile&accountId=${accountId}`} style={{ color: 'unset' }} className="text-sm no-underline hover:underline">Visit Near Profile</Link>
                                    </div>
                                    <button onClick={handleSignOut} className="text-red-500 text-sm bg-transparent border-none  cursor-pointer hover:underline">Logout</button>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
};

export default ButtonLogin;
