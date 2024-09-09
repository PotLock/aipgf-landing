export interface AgentData {
    name: string;
    icon: string;
    description: string;
    url: string;
    tags: string[];
    team: string;
    order: number;
    github: string; // Keep this as a required field
}