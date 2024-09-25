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
