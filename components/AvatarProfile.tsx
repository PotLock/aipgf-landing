import React, { useState, useEffect } from 'react';
import { Social } from '@builddao/near-social-js';
import { ViewMethod } from '@/hook/call-near-method';


interface AvatarProfileProps {
  accountId: string;
  size?: number;
}

const AvatarProfile: React.FC<AvatarProfileProps> = ({ accountId, size = 40 }) => {
    const [avatar, setAvatar] = useState<string | null>(null);

    // console.log(accountId)

    useEffect(() => {
        const getAvatarBySocial = async () => {
            if (accountId) {
                const social = new Social({
                    contractId: 'social.near',
                });
                try {
                const result: any = await social.get({
                    keys: [`${accountId}/profile/**`],
                });
                const avatarUrl = result?.[accountId]?.profile?.image?.ipfs_cid;
                // Check for NFT avatar
                const nftData = result?.[accountId]?.profile?.image?.nft;
                if (nftData) {
                    const { contractId, tokenId } = nftData;
                    try {
                        const nftMetadata = await ViewMethod(contractId, 'nft_metadata', { token_id: tokenId });
                        const nftAvatarUrl = nftMetadata?.icon;
                        if (nftAvatarUrl) {
                            setAvatar(nftAvatarUrl);
                            return; // Exit if NFT avatar is found
                        }
                    } catch (error) {
                        console.error("Error fetching NFT metadata:", error);
                    }
                }
                if (avatarUrl) {
                    setAvatar(`https://ipfs.near.social/ipfs/${avatarUrl}`);
                }
                } catch (error) {
                console.error("Error fetching avatar by social.get:", error);
                }
            }
        };

    getAvatarBySocial();
    }, [accountId]);

    return (
        <div className="avatar-profile">
        {avatar ? (
            <img
            src={avatar}
            alt="User Avatar"
            width={size}
            height={size}
            className="rounded-full"
            />
        ) : (
            <img
                src="https://ipfs.near.social/ipfs/bafkreibiyqabm3kl24gcb2oegb7pmwdi6wwrpui62iwb44l7uomnn3lhbi"
                alt="Default Avatar"
                width={size}
                height={size}
                className="rounded-full"
            />
        )}
        </div>
    );
};

export default AvatarProfile;