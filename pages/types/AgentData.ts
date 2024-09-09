export interface AgentData {
    name: string;
    icon: string;
    description: string;
    url: string;
    tags: string[];
    team: string;
    order: number;
    github?: string; // Make github property optional
  }