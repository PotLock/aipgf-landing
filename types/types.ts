export interface ProposalSnapshot {
    author_id: string;
    id: number;
    proposal_version: string;
    snapshot: ProposalTypes;
    snapshot_history: ProposalTypes[];
    social_db_post_block_height: number;
}
export interface ProposalTypes {
    name: string;
    timeline: {
        status: string;
        sponsor_requested_review: boolean;
        reviewer_completed_attestation: boolean;
    };
    summary: string;
    labels: Array<string>;
    author_id: string;
    submission_deadline: number;
    linked_rfp?: number;
    proposal_id: number;
    ts: number;
    views: number;
    linked_proposals: Array<number>;
    block_height: number;
    blockHeight?:number;
    timestamp: number;
};

export interface RFPsSnapshot {
    author_id: string;
    id: number;
    rfp_version: string;
    snapshot: RFPsTypes;
    snapshot_history: RFPsTypes[];
    social_db_post_block_height: number;
}

export interface RFPsTypes {
    name: string;
    timeline: {
        status: string;
    };
    summary: string;
    labels: Array<string>;
    author_id: string;
    submission_deadline: number;
    linked_rfp?: number;
    rfp_id: number;
    ts: number;
    views: number;
    linked_proposals: Array<number>;
    block_height: number;
    blockHeight?:number;
    timestamp: number;
};

export interface DropdownProps {
    options: { icon: string, label: string }[];
    defaultValue: string;
    onChange: (value: string) => void;
    buttonClassName?: string;
    labelClassName?: string;
    fullLabel?: string;
    iconSrc?: string;
    iconWidth?: number;
    modalClassName?: string;
}

export interface SectionProps {
    title?: string;
    description?: string;
    search?: (searchTerm: string) => void;
    sortBy?: (sortBy: string) => void;
    sortCategory?: (category: string) => void;
    sortByStage?: (stage: string) => void;
    type?: string;
}
export interface ProposalDetailTypes {
    editor_id: string;
    author_id: string;
    name: string;
    summary: string;
    description: string;
    timestamp: number;
    proposal_id: number;
    timeline: {
        reviewer_completed_attestation: boolean;
        sponsor_requested_review: boolean;
        status: string;
    };
    labels: Array<string>;
    linked_proposals: Array<number>;
    linked_rfp: number | null;
    requested_sponsorship_usd_amount: number;
    requested_sponsorship_paid_in_currency: string;
    receiver_account: string;
    requested_sponsor: string;
    supervisor: string;
    block_height: number;
}

export interface RFPDetailTypes {
    editor_id: string;
    name: string;
    summary: string;
    description: string;
    timestamp: number;
    labels: Array<string>;
    linked_proposals: Array<number>;
    linked_rfp: number | null;
    block_height: number;
    submission_deadline: string;
    timeline: {
        status: string;
    };
}
export interface CategoryOption {
    bgColor: string;
    title: string;
    description: string;
}

export interface ProposalCategoryDropdownProps {
    options: CategoryOption[];
    selectedOption: CategoryOption;
    onSelect: (option: CategoryOption) => void;
}

export interface AvatarProfileProps {
    accountId: string;
    size?: number;
    style?: string;
    image?: string;
}

export interface LinkProposalProps {
    linkedProposalIds: number[];
    showStatus?: boolean;
}

export interface VoteButtonProps {
    proposalId: number;
    blockHeight: number;
    notifyAccountId: string;
    accountId: string;
}