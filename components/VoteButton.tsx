import React from 'react';
import { Social } from "@builddao/near-social-js";
import { useState } from "react";
import { NextPage } from "next";

interface VoteButtonProps {
    proposalId: number;
    blockHeight: number;
    notifyAccountId: string;
    accountId: string;
}

const VoteButton: NextPage<VoteButtonProps> = ({ proposalId, blockHeight, notifyAccountId, accountId }) => {
    const [hasLike, setHasLike] = useState<boolean>(false);
    const social = new Social({
        contractId: 'social.near',
    });

    const item ={
        type: "social",
        path: `forum.potlock.near/post/main`,
        blockHeight: blockHeight,
    };

    const onVote = async () => {
        const data:any = {
            index: {
                like: JSON.stringify({
                    key: item,
                    value: {
                        type: hasLike ? "unlike" : "like",
                    },
                }),
            },
        };
        
        if (
            !hasLike &&
            notifyAccountId &&
            notifyAccountId !== accountId
        ) {
            if (proposalId) {
                data.index.notify = JSON.stringify({
                    key: notifyAccountId,
                    value: {
                        type: "proposal/like",
                        item,
                        proposal: proposalId,
                    },
                });
            } else {
                data.index.notify = JSON.stringify({
                    key: notifyAccountId,
                    value: {
                        type: "like",
                        item,
                    },
                });
            }
        }
        social.set({
            data,
            account: {
                accountID: 'alice.near',
                publicKey: 'ed25519:H9k5eiU4xXS3M4z8HzKJSLaZdqGdGwBG49o7orNC4eZW',
            },
        });

    }

    return(
        <button onClick={onVote} className='outline-none bg-transparent cursor-pointer'>
            <img src="/assets/icon/heart.svg" alt="like" />
        </button>
    )
}

export default VoteButton;