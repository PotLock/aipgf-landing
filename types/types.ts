export interface ProposalTypes {
    name: string;
    timeline: string;
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
};

export interface RFPsTypes {
    name: string;
    timeline: string;
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
};

export interface DropdownProps {
    options: string[];
    defaultValue: string;
    onChange: (value: string) => void;
    buttonClassName?: string;
    labelClassName?: string;
    fullLabel?: string;
    iconSrc?: string;
    iconWidth?: number;
}

export interface SectionProps {
    title?: string;
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