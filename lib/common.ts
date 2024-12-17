import { ViewMethod } from "@/hook/near-method";

export const timeAgo = (blockTimestamp:number): string => {
    const now = Date.now(); // Current timestamp in milliseconds
    const blockTimestampMs = Math.floor(blockTimestamp / 1000000); // Convert nanoseconds to milliseconds
    const diffMs = now - blockTimestampMs;

    const date = new Date(blockTimestampMs)
    const dateNow = new Date()

    return diffMs < 60000
        ? `${(diffMs / 1000) | 0}s ago`
        : diffMs < 3600000
            ? `${(diffMs / 60000) | 0}m ago`
            : diffMs < 86400000
            ? `${(diffMs / 3600000) | 0}h ago`
            : date.getFullYear() === dateNow.getFullYear()
                ? date.toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                })
                : date.toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                });
};

export const readableDate = (timestamp: number) => {
    var a = new Date(timestamp);
    var options = {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    } as const;
    return a.toLocaleString("en-US", options) + " UTC";
}

export const capitalizeFirstLetter = (string: string) => {
    const updated = string.replace("_", " ");
    return updated.charAt(0).toUpperCase() + updated.slice(1).toLowerCase();
}

export const sliceAddress = (address: string): string => {
  if (address.length > 20) {
    return `${address.slice(0, 10)}...${address.slice(-10)}`;
  }
  return address;
};

const PROPOSALS_APPROVED_STATUS_ARRAY = [
    'APPROVED',
    'APPROVED_CONDITIONALLY',
    'PAYMENT_PROCESSING',
    'FUNDED',
];

export const isProposalApproved = (status: string): boolean => {
    return PROPOSALS_APPROVED_STATUS_ARRAY.includes(status);
};

export const getTeamMembersFromSocialProfileData = (profileData:any) => {
    if (!profileData) return [];
    const team = profileData.plTeam
        ? JSON.parse(profileData.plTeam)
        : profileData.team
        ? Object.entries(profileData.team)
            .filter(([_, v]) => v !== null)
            .map(([k, _]) => k)
        : [];
    return team;
}

export const doesUserHaveDaoFunctionCallProposalPermissions = (accountId:string, policy:any) => {
    const userRoles = policy.roles.filter((role:any) => {
      if (role.kind === "Everyone") return true;
      return role.kind.Group && role.kind.Group.includes(accountId);
    });
    const kind = "call";
    const action = "AddProposal";
    // Check if the user is allowed to perform the action
    const allowed = userRoles.some(({ permissions }:any) => {
      return (
        permissions.includes(`${kind}:${action}`) ||
        permissions.includes(`${kind}:*`) ||
        permissions.includes(`*:${action}`) ||
        permissions.includes("*:*")
      );
    });
    return allowed;
}

export const getGlobalLabels = async () => {
    try {
        const labels = await ViewMethod(
            process.env.NEXT_PUBLIC_NETWORK=="mainnet"
            ?process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT ?? ""
            :process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT_TESTNET ?? "",
            'get_global_labels',
            {}
        );
        
        if (labels) {
            return ensureOtherIsLast(labels);
        }
        return null;
    } catch (error) {
        console.error('Error fetching global labels:', error);
        return null;
    }
};


const ensureOtherIsLast = (labels: string[]) => {
    const otherIndex = labels.findIndex(label => label.toLowerCase() === 'other');
    if (otherIndex !== -1) {
        const other = labels.splice(otherIndex, 1)[0];
        labels.push(other);
    }
    return labels;
};

export function getTimestamp(date:Date) {
    // in nanoseconds
    return Math.floor(date.getTime() * 1000000).toString();
}

export function getDate(timestamp:string) {
    const stamp =
      !timestamp || timestamp === "0" || timestamp === "NaN" ? null : timestamp;
    return new Date(Number(stamp) / 1000000).toISOString().split("T")[0];
}