"use client"

import { Button } from "@/components/ui/button";
import { Social } from "@builddao/near-social-js";
import { Heart } from "@phosphor-icons/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useWalletSelector } from "@/context/WalletSelectorContext";
import { CallMethod } from "@/hook/near-method";

interface LikeButtonProps {
    proposalId: string;
    blockHeight: number;
    accountId: string;
}

const LikeButton = ({ proposalId, blockHeight, accountId }: LikeButtonProps) => {
    const { accounts, selector, modal } = useWalletSelector();
    const [likesByUsers, setLikesByUsers] = useState<{[key: string]: any}>({});
    const [loading, setLoading] = useState(false);
    const [hasLikeOptimistic, setHasLikeOptimistic] = useState<boolean | undefined>(undefined);

    const social = new Social({
        contractId: process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"social.near":"v1.social08.testnet",
        network: process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"mainnet":"testnet"
    });


    const getLikes = useCallback(async () => {
        const likes: any = await social.index({
            action: 'like',
            key: {
                type: "social",
                path: `${process.env.NEXT_PUBLIC_NETWORK=="mainnet"
                ? process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT
                : process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT_TESTNET}/post/main`,
                blockHeight: blockHeight,
            },
        });

        console.log(likes);

        const newLikesByUsers: {[key: string]: any} = {};
        (likes || []).forEach((like: any) => {
            if (like.value.type === "like") {
                newLikesByUsers[like.accountId] = like;
            } else if (like.value.type === "unlike") {
                delete newLikesByUsers[like.accountId];
            }
        });
        
        setLikesByUsers(newLikesByUsers);
        setHasLikeOptimistic(undefined);
    }, [blockHeight, proposalId]);

    useEffect(() => {
        getLikes();
    }, [getLikes]);

    const handleLike = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (loading || !accountId) return;

        // Check if user is signed in
        if (!accounts.length) {
            modal.show();
            return;
        }

        const activeAccount = accounts.find(a => a.active);
        if (!activeAccount) {
            toast.error('Please connect your wallet', {
                duration: 3000,
                position: 'top-center'
            });
            return;
        }

        setLoading(true);
        setHasLikeOptimistic(!hasLike);

        try {
            if (!activeAccount.publicKey) {
                throw new Error("No public key found");
            }

            const data = {
                [accountId]: {
                    index: {
                        like: JSON.stringify({
                            key: {
                                type: "social",
                                path: `${process.env.NEXT_PUBLIC_NETWORK=="mainnet"
                                ? process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT
                                : process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT_TESTNET}/post/main`,
                                blockHeight: blockHeight,
                            },
                            value: {
                                type: hasLike ? "unlike" : "like"
                            }
                        }),
                        ...((!hasLike) && activeAccount.accountId !== accountId ? {
                            notify: JSON.stringify({
                                key: accountId,
                                value: {
                                    type: "proposal/like",
                                    item: {
                                        type: "social",
                                        path: `${process.env.NEXT_PUBLIC_NETWORK=="mainnet"
                                        ? process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT
                                        : process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT_TESTNET}/post/main`,
                                        blockHeight: blockHeight,
                                    },
                                    proposal: proposalId,
                                    blockHeight: blockHeight
                                }
                            })
                        } : {
                            notify: JSON.stringify({
                                key: accountId,
                                value: {
                                    type: "like",
                                    item: {
                                        type: "social",
                                        path: `${process.env.NEXT_PUBLIC_NETWORK=="mainnet"
                                        ? process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT
                                        : process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT_TESTNET}/post/main`,
                                        blockHeight: blockHeight,
                                    }
                                }
                            })
                        }),
                    }
                }
            };

            const transaction = await social.set({
                data,
                account: {
                    accountID: activeAccount.accountId,
                    publicKey: activeAccount.publicKey
                }
            });

            await CallMethod(
                activeAccount.accountId,
                selector,
                transaction.receiverId,
                transaction.actions[0].functionCall?.methodName || "",
                transaction.actions[0].functionCall?.args,
                {
                    gas: transaction.actions[0].functionCall?.gas?.toString(),
                    deposit: transaction.actions[0].functionCall?.deposit.toString()
                }
            );

            toast.success(hasLike ? 'Unlike successful!' : 'Like successful!', {
                duration: 3000,
                position: 'top-center'
            });
            
            setTimeout(getLikes, 1000);
        } catch (error) {
            console.error("Error handling like:", error);
            setLoading(false);
            setHasLikeOptimistic(hasLike);
            
            toast.error('Failed to update like status', {
                duration: 3000,
                position: 'top-center'
            });
        }
    }

    // Calculate derived states
    const accountsWithLikes = Object.keys(likesByUsers);
    const hasLike = accountId ? Boolean(likesByUsers[accountId]) : false;
    const currentLikeState = hasLikeOptimistic === undefined ? hasLike : hasLikeOptimistic;
    const totalLikes =
        accountsWithLikes.length +
        (hasLike === false && hasLikeOptimistic === true ? 1 : 0) -
        (hasLike === true && hasLikeOptimistic === false ? 1 : 0);
    
    return (
        <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2 bg-transparent hover:bg-transparent p-0" 
            onClick={handleLike}
        >
            <Heart 
                weight={currentLikeState ? "fill" : "regular"}
                className={`w-4 h-4 ${currentLikeState ? "text-red-500" : ""}`} 
            />
            <span>{totalLikes}</span>
        </Button>
    )
}

export default LikeButton;